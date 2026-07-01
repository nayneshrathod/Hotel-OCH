// ─────────────────────────────────────────────────────────────────────────────
//  billing.component.ts — Angular 22 | Signals | Standalone
// ─────────────────────────────────────────────────────────────────────────────

import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Invoice,
  InvoiceItem,
  MenuItem,
  MenuCategory,
  HOTEL_INFO,
  GST_RATES,
} from '../models/billing.model';
import { MenuService } from '../services/menu.service';
import { BillingService } from '../services/billing.service';
import { FirebaseStorageService } from '../services/firebase-storage.service';
import { ImageGenService } from '../services/image-gen.service';

function toLocalDatetimeString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, UpperCasePipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css',
})
export class BillingComponent implements OnInit {

  // ── Services ───────────────────────────────────────────────────────────────
  protected readonly menuService = inject(MenuService);
  private readonly billingService = inject(BillingService);
  private readonly storageService = inject(FirebaseStorageService);
  private readonly imageGenService = inject(ImageGenService);

  // ── Static Data ────────────────────────────────────────────────────────────
  readonly hotelInfo = HOTEL_INFO;
  readonly Math = Math;

  // ── Bill Header Signals ────────────────────────────────────────────────────
  readonly billNo = signal<string>('OCH-0110');
  readonly billDate = signal<Date>(new Date());
  // Date/Time input string helper (datetime-local format: yyyy-MM-ddThh:mm)
  readonly billDateInput = signal<string>(toLocalDatetimeString(new Date()));

  readonly tableNo = signal<string>('9');
  readonly customerName = signal<string>('');
  readonly waiterName = signal<string>('Suraj');
  readonly covers = signal<number>(1);

  // ── Stamp Positioning Signals ──────────────────────────────────────────────
  readonly stampTop = signal<string>('auto');
  readonly stampBottom = signal<string>('18%');
  readonly stampLeft = signal<string>('28%');
  readonly stampRotation = signal<number>(-16);

  // ── Form State ─────────────────────────────────────────────────────────────
  readonly selectedMenuItem = signal<MenuItem | null>(null);
  readonly quantity = signal<number>(1);
  readonly notes = signal<string>('');

  // ── Invoice Items ──────────────────────────────────────────────────────────
  readonly items = signal<InvoiceItem[]>([]);

  // ── Computed Totals ────────────────────────────────────────────────────────
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.amount, 0)
  );

  readonly cgstAmount = computed(() =>
    parseFloat((this.subtotal() * GST_RATES.cgst).toFixed(2))
  );

  readonly sgstAmount = computed(() =>
    parseFloat((this.subtotal() * GST_RATES.sgst).toFixed(2))
  );

  readonly totalBeforeRound = computed(() =>
    parseFloat((this.subtotal() + this.cgstAmount() + this.sgstAmount()).toFixed(2))
  );

  readonly roundOff = computed(() => {
    const rounded = Math.round(this.totalBeforeRound());
    return parseFloat((rounded - this.totalBeforeRound()).toFixed(2));
  });

  readonly grandTotal = computed(() => Math.round(this.totalBeforeRound()));

  // ── UI State ───────────────────────────────────────────────────────────────
  readonly isSaving = signal(false);
  readonly savedInvoiceId = signal<string | null>(null);
  readonly showSuccessToast = signal(false);
  readonly showErrorToast = signal(false);
  readonly errorMessage = signal('');

  // ── Derived State ──────────────────────────────────────────────────────────
  readonly activeCategory = computed(() => this.menuService.activeCategory());
  readonly activeMobileTab = signal<'editor' | 'preview'>('editor');

  readonly previewAmount = computed(() => {
    const item = this.selectedMenuItem();
    return item ? item.price * this.quantity() : 0;
  });

  // Receipt formatting helper: DD/MM/YY
  readonly formattedDate = computed(() => {
    const d = this.billDate();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  });

  // Receipt formatting helper: hh:mm AM/PM (in uppercase like "09:40 AM")
  readonly formattedTime = computed(() => {
    const d = this.billDate();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    return strTime;
  });

  get totalItems(): number {
    return this.items().reduce((sum, i) => sum + i.quantity, 0);
  }

  // ── GST Rates (for template) ───────────────────────────────────────────────
  readonly cgstRate = GST_RATES.cgst;
  readonly sgstRate = GST_RATES.sgst;

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  async ngOnInit(): Promise<void> {
    await this.initBillNo();
  }

  private async initBillNo(): Promise<void> {
    try {
      const no = await this.billingService.generateBillNo();
      this.billNo.set(no);
    } catch {
      const pad = (n: number, len = 4) => String(n).padStart(len, '0');
      const now = new Date();
      this.billNo.set(`OCH-${pad(now.getHours() * 60 + now.getMinutes())}`);
    }
  }

  // ── Handle Date Time Input ────────────────────────────────────────────────
  updateBillDate(val: string): void {
    this.billDateInput.set(val);
    if (val) {
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) {
        this.billDate.set(parsed);
      }
    }
  }

  // ── Menu Actions ──────────────────────────────────────────────────────────
  selectMenuItem(item: MenuItem): void {
    this.selectedMenuItem.set(item);
    this.quantity.set(1);
  }

  setCategory(cat: MenuCategory | 'All'): void {
    this.menuService.setCategory(cat);
  }

  setSearch(event: Event): void {
    this.menuService.setSearch((event.target as HTMLInputElement).value);
  }

  // ── Bill Actions ──────────────────────────────────────────────────────────
  addItem(): void {
    const menuItem = this.selectedMenuItem();
    if (!menuItem || this.quantity() < 1) return;

    const existingIdx = this.items().findIndex(i => i.menuItem.id === menuItem.id);
    if (existingIdx >= 0) {
      const newQty = this.items()[existingIdx].quantity + this.quantity();
      this.updateItemQuantity(existingIdx, newQty);
      this.selectedMenuItem.set(null);
      this.quantity.set(1);
      return;
    }

    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      menuItem,
      quantity: this.quantity(),
      rate: menuItem.price,
      amount: menuItem.price * this.quantity(),
      imageUrl: null,
      imageStatus: 'loading',
    };

    this.items.update(prev => [...prev, newItem]);
    this.triggerImageGen(newItem.id, menuItem.imageKeyword);
    this.selectedMenuItem.set(null);
    this.quantity.set(1);
  }

  updateItemQuantity(index: number, qty: number): void {
    if (qty < 1) return;
    this.items.update(prev => {
      const arr = [...prev];
      const it = arr[index];
      arr[index] = { ...it, quantity: qty, amount: it.rate * qty };
      return arr;
    });
  }

  removeItem(index: number): void {
    this.items.update(prev => prev.filter((_, i) => i !== index));
  }

  // ── Image Generation ───────────────────────────────────────────────────────
  private triggerImageGen(itemId: string, keyword: string): void {
    this.imageGenService.generateFoodImage(keyword).subscribe({
      next: url => this.patchItem(itemId, { imageUrl: url, imageStatus: 'done' }),
      error: () => this.patchItem(itemId, { imageStatus: 'error' }),
    });
  }

  private patchItem(itemId: string, patch: Partial<InvoiceItem>): void {
    this.items.update(prev =>
      prev.map(item => item.id === itemId ? { ...item, ...patch } : item)
    );
  }

  // ── Save to Firestore ──────────────────────────────────────────────────────
  async saveBill(): Promise<void> {
    if (this.items().length === 0) return;
    this.isSaving.set(true);

    const invoice: Invoice = {
      billNo: this.billNo(),
      date: this.billDate(),
      tableNo: this.tableNo(),
      customerName: this.customerName(),
      waiterName: this.waiterName() || 'STAFF',
      items: this.items(),
      subtotal: this.subtotal(),
      gst: {
        cgstRate: this.cgstRate,
        sgstRate: this.sgstRate,
        cgstAmount: this.cgstAmount(),
        sgstAmount: this.sgstAmount(),
        totalGST: this.cgstAmount() + this.sgstAmount(),
      },
      roundOff: this.roundOff(),
      total: this.grandTotal(),
      status: 'saved',
      notes: this.notes(),
    };

    try {
      const id = await this.billingService.saveInvoice(invoice);
      this.savedInvoiceId.set(id);
      this.showSuccessToast.set(true);
      setTimeout(() => this.showSuccessToast.set(false), 3500);
      
      // Upload images in the background so the loader stops immediately
      this.uploadImages(id);
      
      await this.initBillNo();
    } catch (err) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Save failed');
      this.showErrorToast.set(true);
      setTimeout(() => this.showErrorToast.set(false), 4000);
    } finally {
      this.isSaving.set(false);
    }
  }

  private async uploadImages(invoiceId: string): Promise<void> {
    const items = this.items();
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.imageUrl && it.imageStatus === 'done') {
        try {
          const url = await this.storageService.uploadFromUrl(
            it.imageUrl, this.billNo(), it.id
          );
          this.patchItem(it.id, { imageUrl: url });
          await this.billingService.updateItemImageUrl(invoiceId, i, url);
        } catch { /* non-critical */ }
      }
    }
  }

  // ── Print ─────────────────────────────────────────────────────────────────
  printBill(): void { window.print(); }

  async downloadReceiptImage(): Promise<void> {
    const element = document.getElementById('printArea');
    if (!element) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#FEFEFA',
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('printArea');
          if (clonedElement) {
            clonedElement.style.width = '320px';
            clonedElement.style.minWidth = '320px';
            clonedElement.style.maxWidth = '320px';
          }
        }
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${this.billNo()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating receipt image:', error);
    }
  }

  async downloadReceiptPdf(): Promise<void> {
    const element = document.getElementById('printArea');
    if (!element) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#FEFEFA',
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('printArea');
          if (clonedElement) {
            clonedElement.style.width = '320px';
            clonedElement.style.minWidth = '320px';
            clonedElement.style.maxWidth = '320px';
          }
        }
      });

      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      // Convert px to points at original scale
      const widthPt = (imgWidthPx * 0.75) / 2.5;
      const heightPt = (imgHeightPx * 0.75) / 2.5;

      const pdf = new jsPDF({
        orientation: widthPt > heightPt ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [widthPt, heightPt],
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, widthPt, heightPt);
      pdf.save(`${this.billNo()}.pdf`);
    } catch (error) {
      console.error('Error generating receipt PDF:', error);
    }
  }

  // ── Stamp Actions ─────────────────────────────────────────────────────────
  randomizeStamp(): void {
    const randomTop = Math.floor(Math.random() * 65) + 10; // 10% to 75%
    const randomLeft = Math.floor(Math.random() * 55) + 10; // 10% to 65%
    const randomRot = Math.floor(Math.random() * 90) - 45; // -45 to +45 deg

    this.stampTop.set(`${randomTop}%`);
    this.stampBottom.set('auto');
    this.stampLeft.set(`${randomLeft}%`);
    this.stampRotation.set(randomRot);
  }

  // ── New / Clear Bill ──────────────────────────────────────────────────────
  async clearBill(): Promise<void> {
    this.items.set([]);
    this.tableNo.set('22-D');
    this.customerName.set('');
    this.waiterName.set('NAFIS');
    this.covers.set(1);
    this.notes.set('');
    this.selectedMenuItem.set(null);
    this.quantity.set(1);
    this.savedInvoiceId.set(null);
    const now = new Date();
    this.billDate.set(now);
    this.billDateInput.set(toLocalDatetimeString(now));

    // Reset stamp positioning to defaults
    this.stampTop.set('auto');
    this.stampBottom.set('18%');
    this.stampLeft.set('28%');
    this.stampRotation.set(-16);

    await this.initBillNo();
  }
}
