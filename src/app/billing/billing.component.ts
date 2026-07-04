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
  readonly isCrumpled = signal<boolean>(false);
  readonly crumpleSeed = signal<number>(0);
  readonly crumpleDeg1 = signal<number>(135);
  readonly crumpleDeg2 = signal<number>(25);
  readonly crumpleDeg3 = signal<number>(-65);
  readonly crumpleBg = signal<string>('');
  readonly crumpleClip = signal<string>('none');
  readonly isParcel = signal<boolean>(false);
  private prevTableNo = '9';

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

  onParcelToggle(checked: boolean): void {
    this.isParcel.set(checked);
    if (checked) {
      if (this.tableNo() !== 'Parcel') {
        this.prevTableNo = this.tableNo();
      }
      this.tableNo.set('Parcel');
    } else {
      this.tableNo.set(this.prevTableNo || '9');
    }
  }

  private async getModifiedSvg(svgDataUrl: string): Promise<string> {
    let svgContent = '';
    const base64Prefix = 'data:image/svg+xml;base64,';
    const utf8Prefix = 'data:image/svg+xml;charset=utf-8,';

    if (svgDataUrl.startsWith(base64Prefix)) {
      svgContent = atob(svgDataUrl.substring(base64Prefix.length));
    } else if (svgDataUrl.startsWith(utf8Prefix)) {
      svgContent = decodeURIComponent(svgDataUrl.substring(utf8Prefix.length));
    } else {
      return svgDataUrl;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');
    if (!svgEl) return svgDataUrl;

    // Remove inner filter style from the printArea element inside the foreignObject to avoid double distortion
    const receiptWrapper = doc.getElementById('printArea');
    if (receiptWrapper) {
      let styleAttr = receiptWrapper.getAttribute('style') || '';
      styleAttr = styleAttr.replace(/filter:\s*[^;]+;?/g, '');
      receiptWrapper.setAttribute('style', styleAttr);
    }

    if (this.isCrumpled()) {
      // Create defs and filter
      const defs = doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const filter = doc.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', 'crumple-filter-outer');
      filter.setAttribute('x', '-10%');
      filter.setAttribute('y', '-10%');
      filter.setAttribute('width', '120%');
      filter.setAttribute('height', '120%');

      const turbulence = doc.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
      turbulence.setAttribute('type', 'fractalNoise');
      turbulence.setAttribute('baseFrequency', '0.04');
      turbulence.setAttribute('numOctaves', '3');
      turbulence.setAttribute('result', 'noise');
      turbulence.setAttribute('seed', String(this.crumpleSeed()));

      const displacement = doc.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
      displacement.setAttribute('in', 'SourceGraphic');
      displacement.setAttribute('in2', 'noise');
      displacement.setAttribute('scale', '2.5');
      displacement.setAttribute('xChannelSelector', 'R');
      displacement.setAttribute('yChannelSelector', 'G');

      filter.appendChild(turbulence);
      filter.appendChild(displacement);
      defs.appendChild(filter);
      svgEl.insertBefore(defs, svgEl.firstChild);

      // Wrap foreignObject inside a <g filter="url(#crumple-filter-outer)">
      const foreignObject = svgEl.querySelector('foreignObject');
      if (foreignObject) {
        const g = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('filter', 'url(#crumple-filter-outer)');
        svgEl.replaceChild(g, foreignObject);
        g.appendChild(foreignObject);
      }
    }

    const serializer = new XMLSerializer();
    const serialized = serializer.serializeToString(doc);
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(serialized);
  }

  private async svgToPngDataUrl(element: HTMLElement): Promise<string> {
    const htmlToImage = await import('html-to-image');
    const svgDataUrl = await htmlToImage.toSvg(element, {
      backgroundColor: '#FEFEFA',
      style: {
        width: '320px',
        minWidth: '320px',
        maxWidth: '320px'
      }
    });

    const modifiedSvg = await this.getModifiedSvg(svgDataUrl);

    const img = new Image();
    img.src = modifiedSvg;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const scale = 2.5;
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL('image/png');
  }

  // ── Print ─────────────────────────────────────────────────────────────────
  printBill(): void { window.print(); }

  async downloadReceiptImage(): Promise<void> {
    const element = document.getElementById('printArea');
    if (!element) return;

    try {
      const pngDataUrl = await this.svgToPngDataUrl(element);
      const link = document.createElement('a');
      link.download = `${this.billNo()}.png`;
      link.href = pngDataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating receipt image:', error);
    }
  }

  async downloadReceiptPdf(): Promise<void> {
    const element = document.getElementById('printArea');
    if (!element) return;

    try {
      const pngDataUrl = await this.svgToPngDataUrl(element);
      const { jsPDF } = await import('jspdf');

      const img = new Image();
      img.src = pngDataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const imgWidthPx = img.width;
      const imgHeightPx = img.height;

      const widthPt = (imgWidthPx * 0.75) / 2.5;
      const heightPt = (imgHeightPx * 0.75) / 2.5;

      const pdf = new jsPDF({
        orientation: widthPt > heightPt ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [widthPt, heightPt],
      });

      pdf.addImage(pngDataUrl, 'PNG', 0, 0, widthPt, heightPt);
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

  toggleCrumple(): void {
    if (!this.isCrumpled()) {
      const seed = Math.floor(Math.random() * 10000);
      this.crumpleSeed.set(seed);
      this.crumpleDeg1.set(Math.floor(Math.random() * 360));
      this.crumpleDeg2.set(Math.floor(Math.random() * 360));
      this.crumpleDeg3.set(Math.floor(Math.random() * 360));
      
      if (typeof document !== 'undefined') {
        const texture = this.generateCrumpledTexture(400, 800, seed);
        this.crumpleBg.set(texture);
        const clip = this.generateClipPath(seed);
        this.crumpleClip.set(clip);
      }
    } else {
      this.crumpleBg.set('');
      this.crumpleClip.set('none');
    }
    this.isCrumpled.set(!this.isCrumpled());
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
    this.isCrumpled.set(false);
    this.crumpleBg.set('');
    this.crumpleClip.set('none');

    await this.initBillNo();
  }

  private generateCrumpledTexture(width: number, height: number, seed: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Base paper color (warm receipt tint)
    ctx.fillStyle = '#FEFEFA';
    ctx.fillRect(0, 0, width, height);

    const random = () => Math.random();

    // 1. Draw subtle shading facets (large crumpled triangles for flat panels)
    ctx.save();
    ctx.filter = 'blur(60px)';
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(random() * width, random() * height);
      ctx.lineTo(random() * width, random() * height);
      ctx.lineTo(random() * width, random() * height);
      ctx.closePath();
      ctx.fillStyle = random() > 0.5 
        ? `rgba(0,0,0,${0.015 + random() * 0.025})` 
        : `rgba(255,255,255,${0.03 + random() * 0.04})`;
      ctx.fill();
    }
    ctx.restore();

    // 2. Draw soft crease folds (connected network / triangulation to look organic)
    ctx.save();
    ctx.filter = 'blur(2.5px)';
    
    const numNodes = 14 + Math.floor(random() * 8);
    const nodes: {x: number, y: number}[] = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: random() * width,
        y: random() * height
      });
    }

    // Connect nodes to their nearest neighbors
    for (let i = 0; i < numNodes; i++) {
      const nodeA = nodes[i];
      const distances = nodes
        .map((n, idx) => ({ idx, dist: Math.hypot(n.x - nodeA.x, n.y - nodeA.y) }))
        .filter(d => d.idx !== i)
        .sort((a, b) => a.dist - b.dist);

      const connections = 2 + Math.floor(random() * 2);
      for (let c = 0; c < Math.min(connections, distances.length); c++) {
        const nodeB = nodes[distances[c].idx];
        
        if (i < distances[c].idx) {
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const len = Math.sqrt(dx*dx + dy*dy);
          if (len === 0) continue;
          const nx = -dy / len;
          const ny = dx / len;

          // Shadow side (dark)
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.06 + random() * 0.06})`;
          ctx.lineWidth = 0.8 + random() * 1.2;
          ctx.beginPath();
          ctx.moveTo(nodeA.x + nx * 1.5, nodeA.y + ny * 1.5);
          ctx.lineTo(nodeB.x + nx * 1.5, nodeB.y + ny * 1.5);
          ctx.stroke();

          // Highlight side (white)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + random() * 0.35})`;
          ctx.lineWidth = 0.8 + random() * 1.2;
          ctx.beginPath();
          ctx.moveTo(nodeA.x - nx * 1.5, nodeA.y - ny * 1.5);
          ctx.lineTo(nodeB.x - nx * 1.5, nodeB.y - ny * 1.5);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // 3. Draw micro-creases for fine texture details
    ctx.save();
    ctx.filter = 'blur(1px)';
    const numMicroCreases = 12 + Math.floor(random() * 10);
    for (let i = 0; i < numMicroCreases; i++) {
      const x1 = random() * width;
      const y1 = random() * height;
      const length = 15 + random() * 35;
      const angle = random() * Math.PI * 2;
      const x2 = x1 + Math.cos(angle) * length;
      const y2 = y1 + Math.sin(angle) * length;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx*dx + dy*dy);
      if (len === 0) continue;
      const nx = -dy / len;
      const ny = dx / len;

      ctx.strokeStyle = `rgba(0, 0, 0, ${0.04 + random() * 0.04})`;
      ctx.lineWidth = 0.5 + random() * 0.6;
      ctx.beginPath();
      ctx.moveTo(x1 + nx * 0.8, y1 + ny * 0.8);
      ctx.lineTo(x2 + nx * 0.8, y2 + ny * 0.8);
      ctx.stroke();

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + random() * 0.25})`;
      ctx.lineWidth = 0.5 + random() * 0.6;
      ctx.beginPath();
      ctx.moveTo(x1 - nx * 0.8, y1 - ny * 0.8);
      ctx.lineTo(x2 - nx * 0.8, y2 - ny * 0.8);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Fine paper noise texture
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (random() - 0.5) * 4.5;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.9);
  }

  private generateClipPath(seed: number): string {
    const random = () => Math.random();

    const getWobble = (val: number, maxWobble = 0.8) => {
      return val + (random() - 0.5) * maxWobble;
    };

    // Generate points along top, right, bottom, left to create a slightly wavy paper edge
    const top = [
      `0% ${getWobble(0)}%`,
      `25% ${getWobble(0)}%`,
      `50% ${getWobble(0)}%`,
      `75% ${getWobble(0)}%`,
      `100% ${getWobble(0)}%`
    ];
    const right = [
      `${getWobble(100)}% 25%`,
      `${getWobble(100)}% 50%`,
      `${getWobble(100)}% 75%`,
      `${getWobble(100)}% 100%`
    ];
    const bottom = [
      `75% ${getWobble(100)}%`,
      `50% ${getWobble(100)}%`,
      `25% ${getWobble(100)}%`,
      `0% ${getWobble(100)}%`
    ];
    const left = [
      `${getWobble(0)}% 75%`,
      `${getWobble(0)}% 50%`,
      `${getWobble(0)}% 25%`
    ];

    const points = [...top, ...right, ...bottom, ...left];
    return `polygon(${points.join(', ')})`;
  }
}
