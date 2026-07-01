// ─────────────────────────────────────────────────────────────────────────────
//  billing.service.ts — Firebase JS SDK direct (no @angular/fire)
// ─────────────────────────────────────────────────────────────────────────────
import { Injectable, signal } from '@angular/core';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, getDoc, getDocs, query, orderBy, limit, where,
  serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Invoice, InvoiceItem } from '../models/billing.model';
import { environment } from '../../environments/environment';

// ── Helpers ───────────────────────────────────────────────────────────────────
function serializeItem(item: InvoiceItem): Record<string, unknown> {
  return {
    id: item.id,
    menuItemId: item.menuItem.id,
    menuItemName: item.menuItem.name,
    menuItemCategory: item.menuItem.category,
    quantity: item.quantity,
    rate: item.rate,
    amount: item.amount,
    imageUrl: item.imageUrl ?? '',
  };
}

function serializeInvoice(inv: Invoice): Record<string, unknown> {
  return {
    billNo: inv.billNo,
    date: Timestamp.fromDate(inv.date),
    tableNo: inv.tableNo,
    customerName: inv.customerName,
    waiterName: inv.waiterName,
    items: inv.items.map(serializeItem),
    subtotal: inv.subtotal,
    cgstRate: inv.gst.cgstRate,
    sgstRate: inv.gst.sgstRate,
    cgstAmount: inv.gst.cgstAmount,
    sgstAmount: inv.gst.sgstAmount,
    totalGST: inv.gst.totalGST,
    roundOff: inv.roundOff,
    total: inv.total,
    status: inv.status,
    notes: inv.notes,
    updatedAt: serverTimestamp(),
  };
}

@Injectable({ providedIn: 'root' })
export class BillingService {
  private col = collection(db, 'invoices');

  readonly isSaving = signal(false);
  readonly saveError = signal<string | null>(null);
  readonly recentInvoices = signal<Invoice[]>([]);

  // ── Generate Bill Number ───────────────────────────────────────────────────
  async generateBillNo(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `${environment.billPrefix}-${year}`;
    try {
      const q = query(this.col, where('billNo', '>=', prefix), orderBy('billNo', 'desc'), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) return `${prefix}-1`;
      const last = snap.docs[0].data()['billNo'] as string;
      const seq = parseInt(last.split('-').pop() ?? '0', 10);
      return `${prefix}-${String(seq + 1).padStart(1, '0')}`;
    } catch {
      const key = `${prefix}_seq`;
      const next = parseInt(localStorage.getItem(key) ?? '0', 10) + 1;
      localStorage.setItem(key, String(next));
      return `${prefix}-${String(next).padStart(1, '0')}`;
    }
  }

  // ── Save Invoice ───────────────────────────────────────────────────────────
  async saveInvoice(invoice: Invoice): Promise<string> {
    this.isSaving.set(true);
    this.saveError.set(null);
    try {
      const data = { ...serializeInvoice(invoice), createdAt: serverTimestamp() };
      const ref = await addDoc(this.col, data);
      return ref.id;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      this.saveError.set(msg);
      throw err;
    } finally {
      this.isSaving.set(false);
    }
  }

  // ── Update item image ──────────────────────────────────────────────────────
  async updateItemImageUrl(invoiceId: string, itemIndex: number, imageUrl: string): Promise<void> {
    try {
      const ref = doc(db, 'invoices', invoiceId);
      const snap = await getDoc(ref);
      if (!snap.exists()) return;
      const items = [...(snap.data()['items'] as Record<string, unknown>[])];
      if (items[itemIndex]) {
        items[itemIndex]['imageUrl'] = imageUrl;
        await updateDoc(ref, { items, updatedAt: serverTimestamp() });
      }
    } catch { /* non-critical */ }
  }

  // ── Load recent ────────────────────────────────────────────────────────────
  async loadRecentInvoices(count = 20): Promise<void> {
    try {
      const q = query(this.col, orderBy('createdAt', 'desc'), limit(count));
      const snap = await getDocs(q);
      this.recentInvoices.set(snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Invoice)));
    } catch { /* ignore */ }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async deleteInvoice(id: string): Promise<void> {
    try { await deleteDoc(doc(db, 'invoices', id)); } catch { /* ignore */ }
  }
}
