# Hotel OCH - Billing & POS System

Developed for **Hotel OCH (Vistarit Amdar Nivas Uphargruha)**, this is a modern, high-performance web-based Point of Sale (POS) and Billing System built with **Angular 22** using reactive programming, signals, and modern CSS layout techniques. It integrates with Firebase for real-time data persistence and background media upload.

🌐 **Live Demo:** [https://hotelbilloch.web.app](https://hotelbilloch.web.app)

---

## 🚀 Features

### 1. Dynamic Billing Engine
- **Automated Calculations:** Automatically calculates Subtotal, CGST (2.5%), SGST (2.5%), Round-Off, and Grand Total.
- **Header Customization:** Edit and manage fields like Table Number, Customer Name, Waiter Name, Covers (Pax), and Bill Date/Time in real-time.
- **Smart Bill Numbers:** Automated unique bill number generation (e.g., `OCH-0110`), with fallback generation logic.

### 2. Comprehensive Digital Menu Database
- Over 100+ menu items categorized into:
  - Snacks, Bread Varieties, Hot/Cold Drinks
  - Lunch & Dinner, Veg & Non-Veg Punjabi/Veg Dishes
  - Poultry, Mutton, Sea Foods, and Egg Items
  - Starters, Soups, Chinese Delicacies, Rice & Biryani
  - Salads, Papads, Raitas, and Sweet Dishes
- Fast search filtering and instant item selection with custom note insertion per item.

### 3. AI-Powered Food Image Generation
- Dynamically fetches or generates relevant food item thumbnails using an integrated Image Generation API.
- Live loading status indicators (`idle` | `loading` | `done` | `error`) for visual clarity.

### 4. Interactive Digital Stamp
- Add a "PAID" or custom stamp to the invoice.
- **Randomize & Position:** Change the rotation angle and coordinates of the stamp to mimic realistic physical stamping.

### 5. Multi-Format Exports
- **Print Receipt:** Formatted print area styles optimized for standard 80mm thermal receipt printers.
- **Download PNG:** One-click high-resolution PNG receipt generation using `html2canvas`.
- **Download PDF:** Generate scalable PDF invoices using `jspdf`.

### 6. Firebase Backend Integration
- Invoices are saved directly to **Cloud Firestore**.
- Generated food item photos are uploaded to **Firebase Storage** asynchronously in the background.

---

## 🛠️ Technology Stack

- **Framework:** [Angular CLI](https://github.com/angular/angular-cli) v22.0.4 (Standalone components, Signals, computed properties)
- **Database & Storage:** Firebase Firestore & Firebase Storage
- **Libraries:**
  - `html2canvas` (for receipt screenshotting)
  - `jspdf` (for PDF generation)
  - `rxjs` (reactive operations)
- **Styling:** Vanilla CSS (optimized with custom variables, layout grids, and flexbox)

---

## 📦 Setup & Installation

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/nayneshrathod/Hotel-OCH.git
   cd Hotel-OCH
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

---

## 💻 Available Scripts

### Development Server
Run the local development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you modify any source files.

### Scaffolding
Generate Angular code components/services:
```bash
ng generate component component-name
```

### Production Build
Build the project for production deployment:
```bash
ng build
```
The compiled build artifacts will be saved in the `dist/` directory.

### Testing
Execute unit tests using [Vitest](https://vitest.dev/):
```bash
ng test
```

---

## 🏢 Hotel Details
- **Name:** Hotel OCH
- **Tagline:** Vistarit Amdar Nivas Uphargruha
- **Address:** Near Lion Gate, SBS Rd, Colaba, Mumbai 400039
- **Phone:** 22027541
- **FSSAI License:** 11515001000158
- **GSTIN:** 27ABYFS2198G1ZD