// ─────────────────────────────────────────────────────────────────────────────
//  billing.model.ts — Complete Menu Database (from actual menu card)
// ─────────────────────────────────────────────────────────────────────────────

export type MenuCategory =
  | 'Snacks'
  | 'Bread Varieties'
  | 'Hot Drinks'
  | 'Cold Drinks'
  | 'Lunch & Dinner'
  | 'Punjabi Dishes'
  | 'Veg Dishes'
  | 'Curry & Dal'
  | 'Poultry'
  | 'Mutton / Farm House'
  | 'Sea Foods'
  | 'Egg Items'
  | 'Starters'
  | 'Soups'
  | 'Chinese Soups'
  | 'Chinese Rice'
  | 'Chinese Noodles'
  | 'Rice & Biryani'
  | 'Charcoal / Breads'
  | 'Salad, Papad & Raita'
  | 'Sweet Dishes';

export type ImageGenStatus = 'idle' | 'loading' | 'done' | 'error';
export type InvoiceStatus = 'draft' | 'saved' | 'printed' | 'cancelled';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  unit: string;
  description: string;
  isVeg: boolean;
  imageKeyword: string;
}

export interface InvoiceItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  rate: number;
  amount: number;
  imageUrl: string | null;
  imageStatus: ImageGenStatus;
}

export interface GSTBreakdown {
  cgstRate: number;
  sgstRate: number;
  cgstAmount: number;
  sgstAmount: number;
  totalGST: number;
}

export interface Invoice {
  id?: string;
  billNo: string;
  date: Date;
  tableNo: string;
  customerName: string;
  waiterName: string;
  items: InvoiceItem[];
  subtotal: number;
  gst: GSTBreakdown;
  roundOff: number;
  total: number;
  status: InvoiceStatus;
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HotelInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  gstin: string;
  fssai: string;
  logoUrl: string;
}

// ─── Hotel Info ───────────────────────────────────────────────────────────────
export const HOTEL_INFO: HotelInfo = {
  name: 'HOTEL OCH',
  tagline: 'Vistarit Amdar Nivas Uphargruha',
  address: 'Near Lion Gate, SBS Rd, Colaba, Mumbai 400039',
  phone: '22027541',
  email: '',
  website: '',
  gstin: '27ABYFS2198G1ZD',
  fssai: '11515001000158',
  logoUrl: 'assets/hotel-logo.svg',
};

export const GST_RATES = {
  cgst: 0.025,  // 2.5%
  sgst: 0.025,  // 2.5%
};

// ─── Complete Menu Database (Verified from actual menu card images) ──────────
export const MENU_ITEMS: MenuItem[] = [
  // ── SALAD, PAPAD & RAITA ──────────────────────────────────────────────────
  { id: 'PR001', name: 'Green Salad', category: 'Salad, Papad & Raita', price: 50, unit: 'plate', description: 'Fresh green salad with seasonal vegetables', isVeg: true, imageKeyword: 'green salad' },
  { id: 'PR002', name: 'Papad Roasted', category: 'Salad, Papad & Raita', price: 12, unit: 'piece', description: 'Roasted lentil papad', isVeg: true, imageKeyword: 'papad roasted' },
  { id: 'PR003', name: 'Papad Fry', category: 'Salad, Papad & Raita', price: 18, unit: 'piece', description: 'Deep fried crispy papad', isVeg: true, imageKeyword: 'fried papad' },
  { id: 'PR004', name: 'Masala Papad', category: 'Salad, Papad & Raita', price: 80, unit: 'plate', description: 'Papad topped with onion, tomato and spices', isVeg: true, imageKeyword: 'masala papad' },
  { id: 'PR005', name: 'Vegetable Raita', category: 'Salad, Papad & Raita', price: 80, unit: 'bowl', description: 'Yogurt with grated vegetables and spices', isVeg: true, imageKeyword: 'vegetable raita' },
  { id: 'PR006', name: 'Boondi Raita', category: 'Salad, Papad & Raita', price: 90, unit: 'bowl', description: 'Yogurt with fried boondi and spices', isVeg: true, imageKeyword: 'boondi raita' },
  { id: 'PR007', name: 'Pineapple Raita', category: 'Salad, Papad & Raita', price: 100, unit: 'bowl', description: 'Sweet yogurt with pineapple pieces', isVeg: true, imageKeyword: 'pineapple raita' },

  // ── SWEET DISHES ──────────────────────────────────────────────────────────
  { id: 'SW001', name: 'Gulab Jamun', category: 'Sweet Dishes', price: 40, unit: 'plate', description: 'Soft milk-solid dumplings in rose sugar syrup', isVeg: true, imageKeyword: 'gulab jamun' },
  { id: 'SW002', name: 'Kheer', category: 'Sweet Dishes', price: 40, unit: 'bowl', description: 'Creamy rice pudding with cardamom and saffron', isVeg: true, imageKeyword: 'kheer rice pudding' },
  { id: 'SW003', name: 'Fruit Salad', category: 'Sweet Dishes', price: 80, unit: 'bowl', description: 'Fresh seasonal fruit salad', isVeg: true, imageKeyword: 'fruit salad' },
  { id: 'SW004', name: 'Fruit Salad With Ice Cream', category: 'Sweet Dishes', price: 100, unit: 'bowl', description: 'Fresh fruit salad topped with ice cream', isVeg: true, imageKeyword: 'fruit salad ice cream' },
  { id: 'SW005', name: 'Caramel Clustered', category: 'Sweet Dishes', price: 60, unit: 'plate', description: 'Caramel cluster dessert', isVeg: true, imageKeyword: 'caramel dessert' },
  { id: 'SW006', name: 'Matka Rubdi', category: 'Sweet Dishes', price: 90, unit: 'matka', description: 'Creamy reduced milk dessert served in earthen pot', isVeg: true, imageKeyword: 'matka rabri' },
  { id: 'SW007', name: 'Shrikhand', category: 'Sweet Dishes', price: 50, unit: 'bowl', description: 'Sweetened strained yogurt with saffron', isVeg: true, imageKeyword: 'shrikhand' },

  // ── COLD DRINKS ───────────────────────────────────────────────────────────
  { id: 'CL001', name: 'Sweet Lassi', category: 'Cold Drinks', price: 40, unit: 'glass', description: 'Chilled sweet yogurt drink', isVeg: true, imageKeyword: 'sweet lassi' },
  { id: 'CL002', name: 'Butter Milk', category: 'Cold Drinks', price: 30, unit: 'glass', description: 'Chilled spiced chaas / buttermilk', isVeg: true, imageKeyword: 'buttermilk chaas' },
  { id: 'CL003', name: 'Dahi', category: 'Cold Drinks', price: 40, unit: 'bowl', description: 'Fresh set curd', isVeg: true, imageKeyword: 'fresh curd bowl' },
  { id: 'CL004', name: 'Sol Kadi', category: 'Cold Drinks', price: 40, unit: 'glass', description: 'Kokum & coconut milk digestive drink', isVeg: true, imageKeyword: 'sol kadi drink' },

  // ── SOUPS ─────────────────────────────────────────────────────────────────
  { id: 'SP001', name: 'Tomato Soup', category: 'Soups', price: 150, unit: 'bowl', description: 'Rich creamy tomato soup with croutons', isVeg: true, imageKeyword: 'tomato soup bowl' },
  { id: 'SP002', name: 'Palak Soup', category: 'Soups', price: 150, unit: 'bowl', description: 'Smooth spinach soup with spices', isVeg: true, imageKeyword: 'palak spinach soup' },

  // ── STARTERS ──────────────────────────────────────────────────────────────
  { id: 'ST001', name: 'Chicken Roasted', category: 'Starters', price: 300, unit: 'plate', description: 'Whole roasted chicken pieces with spices', isVeg: false, imageKeyword: 'roasted chicken' },
  { id: 'ST002', name: 'Chicken Lollypop', category: 'Starters', price: 300, unit: 'plate', description: 'Chicken lollipops in spicy sauce', isVeg: false, imageKeyword: 'chicken lollipop' },
  { id: 'ST003', name: 'Chicken Tikka', category: 'Starters', price: 300, unit: 'plate', description: 'Tender chicken marinated in spiced yogurt, tandoor grilled', isVeg: false, imageKeyword: 'chicken tikka' },
  { id: 'ST004', name: 'Paneer Tikka', category: 'Starters', price: 260, unit: 'plate', description: 'Marinated cottage cheese cubes grilled in tandoor', isVeg: true, imageKeyword: 'paneer tikka' },
  { id: 'ST005', name: 'Chicken Tandoori (Full)', category: 'Starters', price: 370, unit: 'plate', description: 'Full tandoori chicken with mint chutney', isVeg: false, imageKeyword: 'tandoori chicken full' },
  { id: 'ST006', name: 'Chicken Tandoori (Half)', category: 'Starters', price: 220, unit: 'plate', description: 'Half tandoori chicken with mint chutney', isVeg: false, imageKeyword: 'tandoori chicken' },
  { id: 'ST007', name: 'Veg. Spring Roll', category: 'Starters', price: 250, unit: 'plate', description: 'Crispy rolls filled with seasoned vegetables', isVeg: true, imageKeyword: 'vegetable spring roll' },
  { id: 'ST008', name: 'Chicken Spring Roll', category: 'Starters', price: 290, unit: 'plate', description: 'Crispy rolls filled with spiced chicken', isVeg: false, imageKeyword: 'chicken spring roll' },
  { id: 'ST009', name: 'Green Peace Dry', category: 'Starters', price: 140, unit: 'plate', description: 'Dry green peas preparation with spices', isVeg: true, imageKeyword: 'green peas dry' },
  { id: 'ST010', name: 'Chana Dry', category: 'Starters', price: 140, unit: 'plate', description: 'Dry spiced chickpeas preparation', isVeg: true, imageKeyword: 'chana dry' },

  // ── CHINESE RICE ──────────────────────────────────────────────────────────
  { id: 'CR001', name: 'Veg. Fried Rice', category: 'Chinese Rice', price: 210, unit: 'plate', description: 'Stir-fried rice with mixed vegetables', isVeg: true, imageKeyword: 'veg fried rice' },
  { id: 'CR002', name: 'Non Veg. Fried Rice', category: 'Chinese Rice', price: 230, unit: 'plate', description: 'Stir-fried rice with chicken and egg', isVeg: false, imageKeyword: 'non veg fried rice' },
  { id: 'CR003', name: 'Veg. Schezwan Fried Rice', category: 'Chinese Rice', price: 220, unit: 'plate', description: 'Spicy schezwan style fried rice with vegetables', isVeg: true, imageKeyword: 'schezwan fried rice' },
  { id: 'CR004', name: 'Non Veg. Schezwan Fried Rice', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Spicy schezwan fried rice with chicken', isVeg: false, imageKeyword: 'non veg schezwan rice' },
  { id: 'CR005', name: 'Veg. Singapore Fried Rice', category: 'Chinese Rice', price: 220, unit: 'plate', description: 'Singapore style fried rice with vegetables', isVeg: true, imageKeyword: 'singapore fried rice' },
  { id: 'CR006', name: 'Non Veg. Singapore Fried Rice', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Singapore style fried rice with chicken', isVeg: false, imageKeyword: 'non veg singapore rice' },
  { id: 'CR007', name: 'Veg. Hongkong Fried Rice', category: 'Chinese Rice', price: 220, unit: 'plate', description: 'Hongkong style fried rice with vegetables', isVeg: true, imageKeyword: 'hongkong fried rice' },
  { id: 'CR008', name: 'Non Veg. Hongkong Fried Rice', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Hongkong style fried rice with chicken', isVeg: false, imageKeyword: 'non veg hongkong rice' },
  { id: 'CR009', name: 'Veg. Triple Sz. Fried Rice', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Triple schezwan style fried rice with vegetables', isVeg: true, imageKeyword: 'triple schezwan rice' },
  { id: 'CR010', name: 'Non Veg. Triple Sz. Fried Rice', category: 'Chinese Rice', price: 260, unit: 'plate', description: 'Triple schezwan fried rice with chicken', isVeg: false, imageKeyword: 'non veg triple rice' },
  { id: 'CR011', name: 'Veg. Mixed Fried Rice', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Mixed style fried rice with vegetables', isVeg: true, imageKeyword: 'mixed fried rice' },
  { id: 'CR012', name: 'Non Veg. Mixed Fried Rice', category: 'Chinese Rice', price: 260, unit: 'plate', description: 'Mixed fried rice with chicken and egg', isVeg: false, imageKeyword: 'non veg mixed rice' },
  { id: 'CR013', name: 'Egg Fried Rice', category: 'Chinese Rice', price: 230, unit: 'plate', description: 'Classic egg fried rice', isVeg: false, imageKeyword: 'egg fried rice' },
  { id: 'CR014', name: 'Prawns Fried Rice', category: 'Chinese Rice', price: 260, unit: 'plate', description: 'Fried rice tossed with prawns', isVeg: false, imageKeyword: 'prawn fried rice' },
  { id: 'CR015', name: 'Veg. Comb. Fried Rice', category: 'Chinese Rice', price: 250, unit: 'plate', description: 'Combination fried rice with vegetables', isVeg: true, imageKeyword: 'combination fried rice' },
  { id: 'CR016', name: 'Non Veg. Comb. Fried Rice', category: 'Chinese Rice', price: 270, unit: 'plate', description: 'Combination fried rice with chicken and egg', isVeg: false, imageKeyword: 'non veg comb rice' },

  // ── CHINESE SOUPS ─────────────────────────────────────────────────────────
  { id: 'CS001', name: 'Veg. Sweet Corn Soup', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Sweet corn and vegetable soup', isVeg: true, imageKeyword: 'sweet corn soup' },
  { id: 'CS002', name: 'Non Veg. Sweet Corn Soup', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Sweet corn soup with chicken', isVeg: false, imageKeyword: 'chicken sweet corn soup' },
  { id: 'CS003', name: 'Veg. Hot-N-Sour Soup', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Spicy and tangy Chinese hot and sour soup', isVeg: true, imageKeyword: 'hot sour soup' },
  { id: 'CS004', name: 'Non Veg. Hot-N-Sour Soup', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Hot and sour soup with chicken', isVeg: false, imageKeyword: 'chicken hot sour soup' },
  { id: 'CS005', name: 'Veg. Clear Soup', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Light and clear vegetable broth', isVeg: true, imageKeyword: 'clear soup' },
  { id: 'CS006', name: 'Non Veg. Clear Soup', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Clear chicken broth soup', isVeg: false, imageKeyword: 'chicken clear soup' },
  { id: 'CS007', name: 'Veg. Manchow Soup', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Thick spiced manchow soup with fried noodles', isVeg: true, imageKeyword: 'manchow soup' },
  { id: 'CS008', name: 'Non Veg. Manchow Soup', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Manchow soup with chicken and fried noodles', isVeg: false, imageKeyword: 'chicken manchow soup' },

  // ── CHINESE NOODLES ───────────────────────────────────────────────────────
  { id: 'CN001', name: 'Veg. Hakka Noodles', category: 'Chinese Noodles', price: 210, unit: 'plate', description: 'Stir-fried hakka noodles with vegetables', isVeg: true, imageKeyword: 'hakka noodles' },
  { id: 'CN002', name: 'Non Veg. Hakka Noodles', category: 'Chinese Noodles', price: 230, unit: 'plate', description: 'Hakka noodles with chicken', isVeg: false, imageKeyword: 'non veg hakka noodles' },
  { id: 'CN003', name: 'Veg. Singapore Noodles', category: 'Chinese Noodles', price: 220, unit: 'plate', description: 'Singapore style noodles with vegetables', isVeg: true, imageKeyword: 'singapore noodles' },
  { id: 'CN004', name: 'Non Veg. Singapore Noodles', category: 'Chinese Noodles', price: 240, unit: 'plate', description: 'Singapore style noodles with chicken', isVeg: false, imageKeyword: 'non veg singapore noodles' },
  { id: 'CN005', name: 'Veg. Hongkond Noodles', category: 'Chinese Noodles', price: 220, unit: 'plate', description: 'Hongkong style noodles with vegetables', isVeg: true, imageKeyword: 'hongkong noodles' },
  { id: 'CN006', name: 'Non Veg. Hongkond Noodles', category: 'Chinese Noodles', price: 240, unit: 'plate', description: 'Hongkong style noodles with chicken', isVeg: false, imageKeyword: 'non veg hongkong noodles' },
  { id: 'CN007', name: 'Veg. Schezwan Noodles', category: 'Chinese Noodles', price: 220, unit: 'plate', description: 'Spicy schezwan noodles with vegetables', isVeg: true, imageKeyword: 'schezwan noodles' },
  { id: 'CN008', name: 'Non Veg. Schezwan Noodles', category: 'Chinese Noodles', price: 240, unit: 'plate', description: 'Spicy schezwan noodles with chicken', isVeg: false, imageKeyword: 'non veg schezwan noodles' },

  // ── EGG ITEMS ─────────────────────────────────────────────────────────────
  { id: 'EG001', name: 'Egg Chilly (Indian)', category: 'Egg Items', price: 150, unit: 'plate', description: 'Spiced Indian style chilly eggs', isVeg: false, imageKeyword: 'egg chilly' },
  { id: 'EG002', name: 'Egg Bhurji', category: 'Egg Items', price: 120, unit: 'plate', description: 'Scrambled eggs with onion, tomato and spices', isVeg: false, imageKeyword: 'egg bhurji' },
  { id: 'EG003', name: 'Egg Double Omlet', category: 'Egg Items', price: 80, unit: 'plate', description: 'Two-egg omelette with spices', isVeg: false, imageKeyword: 'egg omelette' },
  { id: 'EG004', name: 'Egg Boiled (Double)', category: 'Egg Items', price: 50, unit: 'plate', description: 'Two boiled eggs', isVeg: false, imageKeyword: 'boiled eggs' },

  // ── MUTTON / FARM HOUSE ───────────────────────────────────────────────────
  { id: 'FH001', name: 'Mutton Masala', category: 'Mutton / Farm House', price: 250, unit: 'plate', description: 'Tender mutton in classic spiced masala gravy', isVeg: false, imageKeyword: 'mutton masala curry' },
  { id: 'FH002', name: 'Mutton Maratha', category: 'Mutton / Farm House', price: 320, unit: 'plate', description: 'Fiery Maratha style mutton with dry coconut masala', isVeg: false, imageKeyword: 'mutton maratha' },
  { id: 'FH003', name: 'Mutton Palak', category: 'Mutton / Farm House', price: 300, unit: 'plate', description: 'Mutton cooked with fresh spinach', isVeg: false, imageKeyword: 'mutton palak' },
  { id: 'FH004', name: 'Mutton Do-Pyaza', category: 'Mutton / Farm House', price: 300, unit: 'plate', description: 'Mutton with double onion in tangy gravy', isVeg: false, imageKeyword: 'mutton do pyaza' },
  { id: 'FH005', name: 'Mutton Handi', category: 'Mutton / Farm House', price: 340, unit: 'plate', description: 'Mutton slow-cooked in clay pot handi', isVeg: false, imageKeyword: 'mutton handi' },
  { id: 'FH006', name: 'Mutton Kadai', category: 'Mutton / Farm House', price: 340, unit: 'plate', description: 'Mutton cooked in a wok with spices & peppers', isVeg: false, imageKeyword: 'mutton kadai' },
  { id: 'FH007', name: 'Mutton Fry', category: 'Mutton / Farm House', price: 280, unit: 'plate', description: 'Dry mutton fry with aromatic spices', isVeg: false, imageKeyword: 'mutton fry' },
  { id: 'FH008', name: 'Mutton Kolhapuri', category: 'Mutton / Farm House', price: 280, unit: 'plate', description: 'Fiery Kolhapuri style mutton', isVeg: false, imageKeyword: 'mutton kolhapuri' },
  { id: 'FH009', name: 'Mutton Sukha', category: 'Mutton / Farm House', price: 280, unit: 'plate', description: 'Dry mutton with aromatic spices', isVeg: false, imageKeyword: 'mutton sukka' },
  { id: 'FH010', name: 'Mutton Maharaja', category: 'Mutton / Farm House', price: 360, unit: 'plate', description: 'Royal style mutton preparation', isVeg: false, imageKeyword: 'mutton maharaja' },
  { id: 'FH011', name: 'Mutton Nawabi', category: 'Mutton / Farm House', price: 360, unit: 'plate', description: 'Nawabi rich mutton gravy', isVeg: false, imageKeyword: 'mutton nawabi' },
  { id: 'FH012', name: 'Mutton Peshawari', category: 'Mutton / Farm House', price: 370, unit: 'plate', description: 'North-West frontier style mutton with whole spices', isVeg: false, imageKeyword: 'mutton peshwari' },

  // ── SEA FOODS ─────────────────────────────────────────────────────────────
  { id: 'SF001', name: 'Bangda Fry', category: 'Sea Foods', price: 200, unit: 'plate', description: 'Mackerel fish marinated and fried', isVeg: false, imageKeyword: 'bangda fish fry' },
  { id: 'SF002', name: 'Bangda Masala', category: 'Sea Foods', price: 220, unit: 'plate', description: 'Mackerel fish in spiced coastal masala gravy', isVeg: false, imageKeyword: 'bangda masala' },
  { id: 'SF003', name: 'Promplet Fry', category: 'Sea Foods', price: 340, unit: 'plate', description: 'Pomfret fish shallow fried with spice coating', isVeg: false, imageKeyword: 'pomfret fish fry' },
  { id: 'SF004', name: 'Promplet Masala', category: 'Sea Foods', price: 350, unit: 'plate', description: 'Pomfret in rich spiced masala gravy', isVeg: false, imageKeyword: 'pomfret masala' },
  { id: 'SF005', name: 'Surmai Fry', category: 'Sea Foods', price: 300, unit: 'plate', description: 'King fish (Surmai) marinated and fried', isVeg: false, imageKeyword: 'surmai fish fry' },
  { id: 'SF006', name: 'Surmai Masala', category: 'Sea Foods', price: 320, unit: 'plate', description: 'King fish in tangy coastal masala', isVeg: false, imageKeyword: 'surmai masala' },
  { id: 'SF007', name: 'Prawns Fry', category: 'Sea Foods', price: 300, unit: 'plate', description: 'Prawns marinated in spices and fried', isVeg: false, imageKeyword: 'prawns fry' },
  { id: 'SF008', name: 'Prawns Masala', category: 'Sea Foods', price: 320, unit: 'plate', description: 'Prawns in rich spiced masala gravy', isVeg: false, imageKeyword: 'prawns masala curry' },
  { id: 'SF009', name: 'Prawns Koliwada', category: 'Sea Foods', price: 320, unit: 'plate', description: 'Crispy battered prawns Koliwada style', isVeg: false, imageKeyword: 'prawns koliwada' },

  // ── RICE & BIRYANI ────────────────────────────────────────────────────────
  { id: 'RI001', name: 'Vegetable Pulav', category: 'Rice & Biryani', price: 140, unit: 'plate', description: 'Fragrant basmati rice with seasonal vegetables', isVeg: true, imageKeyword: 'veg pulao' },
  { id: 'RI002', name: 'Peas Pulao', category: 'Rice & Biryani', price: 170, unit: 'plate', description: 'Fragrant basmati rice with green peas', isVeg: true, imageKeyword: 'peas pulao' },
  { id: 'RI003', name: 'Paneer Pulav', category: 'Rice & Biryani', price: 180, unit: 'plate', description: 'Basmati rice cooked with paneer cubes', isVeg: true, imageKeyword: 'paneer pulao' },
  { id: 'RI004', name: 'Jeera Rice', category: 'Rice & Biryani', price: 160, unit: 'plate', description: 'Basmati rice tempered with cumin', isVeg: true, imageKeyword: 'jeera rice' },
  { id: 'RI005', name: 'Jeera Fried Rice', category: 'Rice & Biryani', price: 180, unit: 'plate', description: 'Fried basmati rice with cumin', isVeg: true, imageKeyword: 'jeera fried rice' },
  { id: 'RI006', name: 'Steamed Rice', category: 'Rice & Biryani', price: 140, unit: 'plate', description: 'Plain steamed basmati rice', isVeg: true, imageKeyword: 'steamed rice' },
  { id: 'RI007', name: 'Biryani Rice', category: 'Rice & Biryani', price: 150, unit: 'plate', description: 'Fragrant biryani style basmati rice', isVeg: true, imageKeyword: 'biryani rice' },
  { id: 'RI008', name: 'Veg. Biryani', category: 'Rice & Biryani', price: 170, unit: 'plate', description: 'Dum-cooked basmati with seasonal vegetables', isVeg: true, imageKeyword: 'veg biryani' },
  { id: 'RI009', name: 'Kashmiri Biryani', category: 'Rice & Biryani', price: 200, unit: 'plate', description: 'Aromatic Kashmiri style biryani with dry fruits', isVeg: true, imageKeyword: 'kashmiri biryani' },
  { id: 'RI010', name: 'Paneer Biryani', category: 'Rice & Biryani', price: 230, unit: 'plate', description: 'Dum biryani with paneer and saffron', isVeg: true, imageKeyword: 'paneer biryani' },
  { id: 'RI011', name: 'Paneer Tikka Biryani', category: 'Rice & Biryani', price: 250, unit: 'plate', description: 'Biryani with grilled paneer tikka pieces', isVeg: true, imageKeyword: 'paneer tikka biryani' },
  { id: 'RI012', name: 'Mutton Biryani', category: 'Rice & Biryani', price: 325, unit: 'plate', description: 'Slow dum-cooked basmati with tender mutton', isVeg: false, imageKeyword: 'mutton biryani' },
  { id: 'RI013', name: 'Chicken Biryani', category: 'Rice & Biryani', price: 300, unit: 'plate', description: 'Dum-cooked basmati rice with spiced chicken', isVeg: false, imageKeyword: 'chicken biryani' },
  { id: 'RI014', name: 'Chicken Tikka Biryani', category: 'Rice & Biryani', price: 320, unit: 'plate', description: 'Biryani with grilled chicken tikka', isVeg: false, imageKeyword: 'chicken tikka biryani' },
  { id: 'RI015', name: 'Egg Biryani', category: 'Rice & Biryani', price: 200, unit: 'plate', description: 'Fragrant biryani with spiced boiled eggs', isVeg: false, imageKeyword: 'egg biryani' },
  { id: 'RI016', name: 'Palak Rice', category: 'Rice & Biryani', price: 160, unit: 'plate', description: 'Basmati rice cooked with spinach', isVeg: true, imageKeyword: 'palak rice' },
  { id: 'RI017', name: 'Sambar Rice', category: 'Rice & Biryani', price: 120, unit: 'plate', description: 'Rice mixed with sambar', isVeg: true, imageKeyword: 'sambar rice' },
  { id: 'RI018', name: 'Dal Khichdi', category: 'Rice & Biryani', price: 140, unit: 'plate', description: 'Comforting rice and lentil preparation', isVeg: true, imageKeyword: 'dal khichdi' },
  { id: 'RI019', name: 'Prawns Biryani', category: 'Rice & Biryani', price: 325, unit: 'plate', description: 'Dum biryani with succulent prawns', isVeg: false, imageKeyword: 'prawn biryani' },
  { id: 'RI020', name: 'Dal Rice', category: 'Rice & Biryani', price: 100, unit: 'plate', description: 'Plain dal served with steamed rice', isVeg: true, imageKeyword: 'dal rice' },
  { id: 'RI021', name: 'Curd Rice', category: 'Rice & Biryani', price: 130, unit: 'plate', description: 'Rice mixed with fresh yogurt and tempering', isVeg: true, imageKeyword: 'curd rice' },
  { id: 'RI022', name: 'Plain Rice (Full)', category: 'Rice & Biryani', price: 70, unit: 'plate', description: 'Plain steamed basmati rice, full serving', isVeg: true, imageKeyword: 'plain rice' },
  { id: 'RI023', name: 'Plain Rice (Half)', category: 'Rice & Biryani', price: 60, unit: 'plate', description: 'Plain steamed basmati rice, half serving', isVeg: true, imageKeyword: 'plain rice half' },

  // ── CHARCOAL / BREADS ─────────────────────────────────────────────────────
  { id: 'CB001', name: 'Roti', category: 'Charcoal / Breads', price: 22, unit: 'piece', description: 'Thin whole wheat chapati from tandoor', isVeg: true, imageKeyword: 'roti chapati' },
  { id: 'CB002', name: 'Butter Roti', category: 'Charcoal / Breads', price: 28, unit: 'piece', description: 'Whole wheat roti with butter glaze', isVeg: true, imageKeyword: 'butter roti' },
  { id: 'CB003', name: 'Chapati', category: 'Charcoal / Breads', price: 12, unit: 'piece', description: 'Plain tawa chapati', isVeg: true, imageKeyword: 'chapati' },
  { id: 'CB004', name: 'Special Chapati', category: 'Charcoal / Breads', price: 17, unit: 'piece', description: 'Special thick chapati', isVeg: true, imageKeyword: 'special chapati' },
  { id: 'CB005', name: 'Butter Chapati', category: 'Charcoal / Breads', price: 20, unit: 'piece', description: 'Chapati with butter topping', isVeg: true, imageKeyword: 'butter chapati' },
  { id: 'CB006', name: 'Bhakri', category: 'Charcoal / Breads', price: 20, unit: 'piece', description: 'Traditional Maharashtrian sorghum flatbread', isVeg: true, imageKeyword: 'bhakri bread' },
  { id: 'CB007', name: 'Puri (05 Pcs)', category: 'Charcoal / Breads', price: 50, unit: 'plate', description: 'Deep fried puffed wheat bread, 5 pieces', isVeg: true, imageKeyword: 'puri bread' },
  { id: 'CB008', name: 'Tava Parotha', category: 'Charcoal / Breads', price: 22, unit: 'piece', description: 'Layered paratha cooked on tawa', isVeg: true, imageKeyword: 'tawa paratha' },
  { id: 'CB009', name: 'Tandoor Parotha', category: 'Charcoal / Breads', price: 70, unit: 'piece', description: 'Soft leavened paratha from clay oven', isVeg: true, imageKeyword: 'tandoor paratha' },
  { id: 'CB010', name: 'Butter Parotha', category: 'Charcoal / Breads', price: 90, unit: 'piece', description: 'Paratha with generous butter glaze', isVeg: true, imageKeyword: 'butter paratha' },
  { id: 'CB011', name: 'Naan', category: 'Charcoal / Breads', price: 80, unit: 'piece', description: 'Soft leavened tandoor bread', isVeg: true, imageKeyword: 'naan bread' },
  { id: 'CB012', name: 'Butter Naan', category: 'Charcoal / Breads', price: 90, unit: 'piece', description: 'Soft naan with butter glaze', isVeg: true, imageKeyword: 'butter naan' },
  { id: 'CB013', name: 'Garlic Naan', category: 'Charcoal / Breads', price: 100, unit: 'piece', description: 'Naan topped with garlic and coriander', isVeg: true, imageKeyword: 'garlic naan' },
  { id: 'CB014', name: 'Butter Garlic Naan', category: 'Charcoal / Breads', price: 120, unit: 'piece', description: 'Naan with garlic butter and coriander topping', isVeg: true, imageKeyword: 'garlic butter naan' },
  { id: 'CB015', name: 'Stuff Parotha', category: 'Charcoal / Breads', price: 120, unit: 'piece', description: 'Paratha stuffed with mixed filling', isVeg: true, imageKeyword: 'stuffed paratha' },
  { id: 'CB016', name: 'Gobi Parotha', category: 'Charcoal / Breads', price: 140, unit: 'piece', description: 'Paratha stuffed with spiced cauliflower', isVeg: true, imageKeyword: 'gobi paratha' },
  { id: 'CB017', name: 'Aloo Parotha', category: 'Charcoal / Breads', price: 140, unit: 'piece', description: 'Paratha stuffed with spiced potato filling', isVeg: true, imageKeyword: 'aloo paratha' },
  { id: 'CB018', name: 'Paneer Parotha', category: 'Charcoal / Breads', price: 150, unit: 'piece', description: 'Paratha stuffed with spiced cottage cheese', isVeg: true, imageKeyword: 'paneer paratha' },
  { id: 'CB019', name: 'Paneer Kulcha', category: 'Charcoal / Breads', price: 150, unit: 'piece', description: 'Kulcha stuffed with spiced paneer', isVeg: true, imageKeyword: 'paneer kulcha' },
  { id: 'CB020', name: 'Alu Kulcha', category: 'Charcoal / Breads', price: 140, unit: 'piece', description: 'Kulcha stuffed with spiced potato', isVeg: true, imageKeyword: 'alu kulcha' },
  { id: 'CB021', name: 'Gobi Kulcha', category: 'Charcoal / Breads', price: 140, unit: 'piece', description: 'Kulcha stuffed with spiced cauliflower', isVeg: true, imageKeyword: 'gobi kulcha' },

  // ── SNACKS ────────────────────────────────────────────────────────────────
  { id: 'SN001', name: 'Steam Idli', category: 'Snacks', price: 80, unit: 'plate', description: 'Soft steamed rice idlis served with sambar & chutney', isVeg: true, imageKeyword: 'idli sambar' },
  { id: 'SN002', name: 'Medu Vada Sambar & Chutney', category: 'Snacks', price: 90, unit: 'plate', description: 'Crispy medu vada with sambar and coconut chutney', isVeg: true, imageKeyword: 'medu vada' },
  { id: 'SN003', name: 'Batata Vada', category: 'Snacks', price: 60, unit: 'plate', description: 'Spiced potato dumplings deep fried in gram flour', isVeg: true, imageKeyword: 'batata vada' },
  { id: 'SN004', name: 'Bhajia', category: 'Snacks', price: 70, unit: 'plate', description: 'Mixed vegetable fritters in gram flour batter', isVeg: true, imageKeyword: 'bhajia fritters' },
  { id: 'SN005', name: 'Upma', category: 'Snacks', price: 70, unit: 'plate', description: 'Semolina cooked with vegetables and spices', isVeg: true, imageKeyword: 'upma' },
  { id: 'SN006', name: 'Poha', category: 'Snacks', price: 70, unit: 'plate', description: 'Flattened rice cooked with onion and spices', isVeg: true, imageKeyword: 'poha' },
  { id: 'SN007', name: 'Sada Dosa', category: 'Snacks', price: 90, unit: 'piece', description: 'Plain crispy rice & lentil crepe with chutney', isVeg: true, imageKeyword: 'plain dosa' },
  { id: 'SN008', name: 'Masala Dosa', category: 'Snacks', price: 100, unit: 'piece', description: 'Crispy dosa stuffed with spiced potato filling', isVeg: true, imageKeyword: 'masala dosa' },
  { id: 'SN009', name: 'Rawa Sada Dosa', category: 'Snacks', price: 110, unit: 'piece', description: 'Semolina dosa, crispy and thin', isVeg: true, imageKeyword: 'rava dosa' },
  { id: 'SN010', name: 'Rawa Masala Dosa', category: 'Snacks', price: 120, unit: 'piece', description: 'Semolina dosa stuffed with potato masala', isVeg: true, imageKeyword: 'rava masala dosa' },
  { id: 'SN011', name: 'Uttappam', category: 'Snacks', price: 90, unit: 'piece', description: 'Thick soft dosa with toppings', isVeg: true, imageKeyword: 'uttapam' },
  { id: 'SN012', name: 'Onion Uttappam', category: 'Snacks', price: 100, unit: 'piece', description: 'Thick dosa topped with onions', isVeg: true, imageKeyword: 'onion uttapam' },
  { id: 'SN013', name: 'Tomato Omlet', category: 'Snacks', price: 120, unit: 'piece', description: 'Egg omelette with tomatoes and spices', isVeg: false, imageKeyword: 'tomato omelette' },
  { id: 'SN014', name: 'Mysore Sada Dosa', category: 'Snacks', price: 110, unit: 'piece', description: 'Dosa with Mysore red chutney spread', isVeg: true, imageKeyword: 'mysore dosa' },
  { id: 'SN015', name: 'Mysore Masala Dosa', category: 'Snacks', price: 120, unit: 'piece', description: 'Mysore dosa with spiced potato stuffing', isVeg: true, imageKeyword: 'mysore masala dosa' },
  { id: 'SN016', name: 'Onion Bhaji', category: 'Snacks', price: 110, unit: 'plate', description: 'Crispy onion fritters in gram flour batter', isVeg: true, imageKeyword: 'onion bhaji' },
  { id: 'SN017', name: 'Dahi Idli', category: 'Snacks', price: 80, unit: 'plate', description: 'Soft idlis in sweetened spiced yogurt', isVeg: true, imageKeyword: 'dahi idli' },
  { id: 'SN018', name: 'Fry Idli', category: 'Snacks', price: 80, unit: 'plate', description: 'Idlis lightly fried with spices and curry leaves', isVeg: true, imageKeyword: 'fry idli' },
  { id: 'SN019', name: 'Potato Chips', category: 'Snacks', price: 80, unit: 'plate', description: 'Crispy fried potato chips with masala', isVeg: true, imageKeyword: 'potato chips' },
  { id: 'SN020', name: 'Misal', category: 'Snacks', price: 70, unit: 'bowl', description: 'Spicy sprouted lentil curry topped with farsan', isVeg: true, imageKeyword: 'misal pav' },
  { id: 'SN021', name: 'Usal', category: 'Snacks', price: 60, unit: 'bowl', description: 'Sprouted mixed beans curry', isVeg: true, imageKeyword: 'usal' },
  { id: 'SN022', name: 'Dahi Misal', category: 'Snacks', price: 80, unit: 'bowl', description: 'Misal with yogurt topping', isVeg: true, imageKeyword: 'dahi misal' },
  { id: 'SN023', name: 'Dahi Wada', category: 'Snacks', price: 80, unit: 'plate', description: 'Lentil dumplings in sweetened spiced yogurt', isVeg: true, imageKeyword: 'dahi vada' },
  { id: 'SN024', name: 'Sabudana Vada', category: 'Snacks', price: 90, unit: 'plate', description: 'Tapioca pearl patties with peanuts', isVeg: true, imageKeyword: 'sabudana vada' },
  { id: 'SN025', name: 'Sabudana Khichadi', category: 'Snacks', price: 100, unit: 'plate', description: 'Tapioca pearl preparation with spices', isVeg: true, imageKeyword: 'sabudana khichdi' },
  { id: 'SN026', name: 'Sheera', category: 'Snacks', price: 70, unit: 'bowl', description: 'Sweet semolina pudding with ghee', isVeg: true, imageKeyword: 'sheera halwa' },

  // ── BREAD VARIETIES ───────────────────────────────────────────────────────
  { id: 'BV001', name: 'Vegetable Sandwich', category: 'Bread Varieties', price: 70, unit: 'piece', description: 'Fresh vegetables in bread with green chutney', isVeg: true, imageKeyword: 'vegetable sandwich' },
  { id: 'BV002', name: 'Toast Sandwich', category: 'Bread Varieties', price: 80, unit: 'piece', description: 'Toasted bread sandwich with filling', isVeg: true, imageKeyword: 'toast sandwich' },
  { id: 'BV003', name: 'Egg Omlet Sandwich', category: 'Bread Varieties', price: 90, unit: 'piece', description: 'Egg omelette in bread sandwich', isVeg: false, imageKeyword: 'egg sandwich' },
  { id: 'BV004', name: 'Egg Omlet Toast Sandwich', category: 'Bread Varieties', price: 100, unit: 'piece', description: 'Toasted bread with egg omelette filling', isVeg: false, imageKeyword: 'egg toast sandwich' },
  { id: 'BV005', name: 'Bread Butter', category: 'Bread Varieties', price: 50, unit: 'plate', description: 'Fresh bread with butter', isVeg: true, imageKeyword: 'bread butter' },
  { id: 'BV006', name: 'Toast Butter', category: 'Bread Varieties', price: 60, unit: 'plate', description: 'Toasted bread with butter', isVeg: true, imageKeyword: 'toast butter' },
  { id: 'BV007', name: 'Cheese Sandwich', category: 'Bread Varieties', price: 90, unit: 'piece', description: 'Bread sandwich with melted cheese', isVeg: true, imageKeyword: 'cheese sandwich' },
  { id: 'BV008', name: 'Veg. Grilled Sandwich', category: 'Bread Varieties', price: 100, unit: 'piece', description: 'Grilled sandwich with fresh vegetables', isVeg: true, imageKeyword: 'grilled veg sandwich' },
  { id: 'BV009', name: 'Veg.&Cheese Grilled Sandwich', category: 'Bread Varieties', price: 110, unit: 'piece', description: 'Grilled sandwich with vegetables and cheese', isVeg: true, imageKeyword: 'veg cheese grilled sandwich' },
  { id: 'BV010', name: 'Chicken Grilled Sandwich', category: 'Bread Varieties', price: 130, unit: 'piece', description: 'Grilled bread with spiced chicken filling', isVeg: false, imageKeyword: 'chicken grilled sandwich' },
  { id: 'BV011', name: 'Pav (1 Pc.)', category: 'Bread Varieties', price: 7, unit: 'piece', description: 'Soft Indian bread roll', isVeg: true, imageKeyword: 'pav bread' },

  // ── HOT DRINKS ────────────────────────────────────────────────────────────
  { id: 'HD001', name: 'Tea', category: 'Hot Drinks', price: 20, unit: 'cup', description: 'Hot Indian masala tea', isVeg: true, imageKeyword: 'indian chai tea' },
  { id: 'HD002', name: 'Special Tea', category: 'Hot Drinks', price: 25, unit: 'cup', description: 'Special blend aromatic tea', isVeg: true, imageKeyword: 'special tea' },
  { id: 'HD003', name: 'Nescafe', category: 'Hot Drinks', price: 35, unit: 'cup', description: 'Hot Nescafe coffee', isVeg: true, imageKeyword: 'nescafe coffee' },
  { id: 'HD004', name: 'Milk', category: 'Hot Drinks', price: 40, unit: 'glass', description: 'Fresh hot milk', isVeg: true, imageKeyword: 'hot milk glass' },

  // ── LUNCH & DINNER ────────────────────────────────────────────────────────
  { id: 'LD001', name: 'Thali', category: 'Lunch & Dinner', price: 150, unit: 'thali', description: 'Regular thali with dal, sabzi, roti, rice & salad', isVeg: true, imageKeyword: 'thali meal' },
  { id: 'LD002', name: 'Special Thali', category: 'Lunch & Dinner', price: 170, unit: 'thali', description: 'Special thali with extra items', isVeg: true, imageKeyword: 'special thali' },
  { id: 'LD003', name: 'Deluxe Thali', category: 'Lunch & Dinner', price: 200, unit: 'thali', description: 'Deluxe thali with premium items & sweet dish', isVeg: true, imageKeyword: 'deluxe thali' },
  { id: 'LD004', name: 'Batata Bhaji', category: 'Lunch & Dinner', price: 100, unit: 'plate', description: 'Spiced potato vegetable preparation', isVeg: true, imageKeyword: 'batata bhaji' },
  { id: 'LD005', name: 'Sada Bhaji', category: 'Lunch & Dinner', price: 100, unit: 'plate', description: 'Plain mixed vegetable preparation', isVeg: true, imageKeyword: 'sada bhaji' },
  { id: 'LD006', name: 'Chicken Thali', category: 'Lunch & Dinner', price: 300, unit: 'thali', description: 'Full chicken thali with roti, rice & sides', isVeg: false, imageKeyword: 'chicken thali' },
  { id: 'LD007', name: 'Mutton Thali', category: 'Lunch & Dinner', price: 325, unit: 'thali', description: 'Full mutton thali with roti, rice & sides', isVeg: false, imageKeyword: 'mutton thali' },
  { id: 'LD008', name: 'Fish Thali (Bangda)', category: 'Lunch & Dinner', price: 300, unit: 'thali', description: 'Bangda fish thali with rice, sol kadi & sides', isVeg: false, imageKeyword: 'fish thali' },
  { id: 'LD009', name: 'Fish Thali (Surmai)', category: 'Lunch & Dinner', price: 340, unit: 'thali', description: 'Surmai fish thali with rice, sol kadi & sides', isVeg: false, imageKeyword: 'surmai fish thali' },
  { id: 'LD010', name: 'Fish Thali (Promplet)', category: 'Lunch & Dinner', price: 370, unit: 'thali', description: 'Promplet fish thali with rice, sol kadi & sides', isVeg: false, imageKeyword: 'promplet fish thali' },

  // ── PUNJABI DISHES ────────────────────────────────────────────────────────
  { id: 'PJ001', name: 'Paneer Kurma', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Cottage cheese in rich korma gravy with nuts', isVeg: true, imageKeyword: 'paneer kurma' },
  { id: 'PJ002', name: 'Paneer Masala Kolhapuri', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer in fiery Kolhapuri masala', isVeg: true, imageKeyword: 'paneer kolhapuri' },
  { id: 'PJ003', name: 'Paneer Lababdar', category: 'Punjabi Dishes', price: 230, unit: 'plate', description: 'Paneer in rich onion-tomato gravy', isVeg: true, imageKeyword: 'paneer lababdar' },
  { id: 'PJ004', name: 'Paneer Lahori', category: 'Punjabi Dishes', price: 230, unit: 'plate', description: 'Paneer in Lahori style spiced gravy', isVeg: true, imageKeyword: 'paneer lahori' },
  { id: 'PJ005', name: 'Paneer Makhani', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer in buttery tomato & cream sauce', isVeg: true, imageKeyword: 'paneer makhani' },
  { id: 'PJ006', name: 'Paneer Palak', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer in fresh spinach gravy', isVeg: true, imageKeyword: 'paneer palak' },
  { id: 'PJ007', name: 'Paneer Mutter', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer with green peas in spiced gravy', isVeg: true, imageKeyword: 'paneer mutter' },
  { id: 'PJ008', name: 'Paneer Tikka Masala', category: 'Punjabi Dishes', price: 230, unit: 'plate', description: 'Grilled paneer in spiced tikka masala gravy', isVeg: true, imageKeyword: 'paneer tikka masala' },
  { id: 'PJ009', name: 'Paneer Bhurji', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Scrambled cottage cheese with spices & onion', isVeg: true, imageKeyword: 'paneer bhurji' },
  { id: 'PJ010', name: 'Paneer Kadai', category: 'Punjabi Dishes', price: 240, unit: 'plate', description: 'Paneer cooked in kadai with peppers and spices', isVeg: true, imageKeyword: 'paneer kadai' },
  { id: 'PJ011', name: 'Paneer Handi', category: 'Punjabi Dishes', price: 240, unit: 'plate', description: 'Paneer slow-cooked in clay handi', isVeg: true, imageKeyword: 'paneer handi' },
  { id: 'PJ012', name: 'Chole Masala', category: 'Punjabi Dishes', price: 140, unit: 'plate', description: 'Chickpeas in tangy Punjabi masala gravy', isVeg: true, imageKeyword: 'chole masala' },
  { id: 'PJ013', name: 'Karela Fry', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Crispy bitter gourd fry with spices', isVeg: true, imageKeyword: 'karela fry' },
  { id: 'PJ014', name: 'Bhendi Masala', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Okra in spiced masala', isVeg: true, imageKeyword: 'bhindi masala' },
  { id: 'PJ015', name: 'Tawa Bhendi', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Okra cooked on tawa with spices', isVeg: true, imageKeyword: 'tawa bhendi' },
  { id: 'PJ016', name: 'Tawa Karela', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Bitter gourd cooked on tawa with spices', isVeg: true, imageKeyword: 'tawa karela' },
  { id: 'PJ017', name: 'Methi Moong', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Fenugreek leaves with moong dal', isVeg: true, imageKeyword: 'methi moong' },
  { id: 'PJ018', name: 'Methi Mutter', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Fenugreek leaves with green peas', isVeg: true, imageKeyword: 'methi mutter' },
  { id: 'PJ019', name: 'Moong Masala', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Moong dal in spiced masala', isVeg: true, imageKeyword: 'moong masala' },
  { id: 'PJ020', name: 'Mutki Masala', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Sprouted matki beans in masala', isVeg: true, imageKeyword: 'mutki masala' },
  { id: 'PJ021', name: 'Sukha Pitla', category: 'Punjabi Dishes', price: 150, unit: 'plate', description: 'Dry gram flour preparation with spices', isVeg: true, imageKeyword: 'pitla sabzi' },
  { id: 'PJ022', name: 'Shev Bhaji', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Bhaji topped with crispy sev', isVeg: true, imageKeyword: 'sev sabzi' },
  { id: 'PJ023', name: 'Tomato Chutney', category: 'Punjabi Dishes', price: 140, unit: 'bowl', description: 'Tangy tomato chutney with spices', isVeg: true, imageKeyword: 'tomato chutney' },
  { id: 'PJ024', name: 'Green P. Masala', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Green peas in spiced masala gravy', isVeg: true, imageKeyword: 'green peas masala' },
  { id: 'PJ025', name: 'Baingan Masala', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Brinjal in spiced masala gravy', isVeg: true, imageKeyword: 'baingan masala' },
  { id: 'PJ026', name: 'Alu Simla Fry', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Potato with capsicum stir fry', isVeg: true, imageKeyword: 'alu simla fry' },
  { id: 'PJ027', name: 'Alu Palak', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Potato with spinach in spiced gravy', isVeg: true, imageKeyword: 'alu palak' },
  { id: 'PJ028', name: 'Alu Gobi', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Potato and cauliflower dry preparation', isVeg: true, imageKeyword: 'alu gobi' },
  { id: 'PJ029', name: 'Alu Mutter', category: 'Punjabi Dishes', price: 140, unit: 'plate', description: 'Potato and green peas curry', isVeg: true, imageKeyword: 'aloo matar' },
  { id: 'PJ030', name: 'Alu Methi Fry', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Potato with fenugreek leaves, dry fry', isVeg: true, imageKeyword: 'aloo methi' },
  { id: 'PJ031', name: 'Alu Jeera', category: 'Punjabi Dishes', price: 140, unit: 'plate', description: 'Potato tempered with cumin seeds', isVeg: true, imageKeyword: 'alu jeera' },
  { id: 'PJ032', name: 'Alu Masala', category: 'Punjabi Dishes', price: 140, unit: 'plate', description: 'Potato in spiced masala gravy', isVeg: true, imageKeyword: 'alu masala' },
  { id: 'PJ033', name: 'Malai Kofta', category: 'Punjabi Dishes', price: 190, unit: 'plate', description: 'Soft paneer koftas in creamy tomato gravy', isVeg: true, imageKeyword: 'malai kofta' },
  { id: 'PJ034', name: 'Malai Methi Mutter', category: 'Punjabi Dishes', price: 180, unit: 'plate', description: 'Fenugreek and peas in creamy malai gravy', isVeg: true, imageKeyword: 'methi matar malai' },
  { id: 'PJ035', name: 'Veg. Makhani', category: 'Punjabi Dishes', price: 180, unit: 'plate', description: 'Mixed vegetables in buttery makhani sauce', isVeg: true, imageKeyword: 'veg makhani' },
  { id: 'PJ036', name: 'Mixed Veg.', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Mixed seasonal vegetables in spiced gravy', isVeg: true, imageKeyword: 'mixed vegetables' },
  { id: 'PJ037', name: 'Veg. Kolhapuri', category: 'Punjabi Dishes', price: 160, unit: 'plate', description: 'Vegetables in fiery Kolhapuri masala', isVeg: true, imageKeyword: 'veg kolhapuri' },
  { id: 'PJ038', name: 'Pitla', category: 'Punjabi Dishes', price: 120, unit: 'plate', description: 'Traditional gram flour curry', isVeg: true, imageKeyword: 'pitla' },
  { id: 'PJ039', name: 'Pitla Fry', category: 'Punjabi Dishes', price: 130, unit: 'plate', description: 'Fried gram flour preparation', isVeg: true, imageKeyword: 'pitla fry' },
  { id: 'PJ040', name: 'Dahi Pitla Fry', category: 'Punjabi Dishes', price: 140, unit: 'plate', description: 'Gram flour curry with yogurt base', isVeg: true, imageKeyword: 'dahi pitla' },
  { id: 'PJ041', name: 'Veg. Jalfrezi', category: 'Punjabi Dishes', price: 180, unit: 'plate', description: 'Stir-fried vegetables in tangy sauce', isVeg: true, imageKeyword: 'veg jalfrezi' },
  { id: 'PJ042', name: 'Dum Alu Kashmiri', category: 'Punjabi Dishes', price: 190, unit: 'plate', description: 'Baby potatoes cooked Kashmiri style', isVeg: true, imageKeyword: 'dum aloo kashmiri' },
  { id: 'PJ043', name: 'Navratan Kurma', category: 'Punjabi Dishes', price: 190, unit: 'plate', description: 'Nine vegetable curry in mild creamy sauce', isVeg: true, imageKeyword: 'navratan korma' },
  { id: 'PJ044', name: 'Veg. Nawabi', category: 'Punjabi Dishes', price: 260, unit: 'plate', description: 'Rich Nawabi style vegetable preparation', isVeg: true, imageKeyword: 'veg nawabi' },
  { id: 'PJ045', name: 'Veg. Maharaja', category: 'Punjabi Dishes', price: 260, unit: 'plate', description: 'Royal Maharaja style vegetable preparation', isVeg: true, imageKeyword: 'veg maharaja' },
  { id: 'PJ046', name: 'Veg. Handi', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Mixed vegetables slow-cooked in a clay pot', isVeg: true, imageKeyword: 'veg handi' },

  // ── VEG DISHES ────────────────────────────────────────────────────────────
  { id: 'VG001', name: 'Veg. Kadai', category: 'Veg Dishes', price: 210, unit: 'plate', description: 'Mixed vegetables wok-cooked in kadai masala', isVeg: true, imageKeyword: 'kadai veg' },
  { id: 'VG002', name: 'Mushroom Masala', category: 'Veg Dishes', price: 200, unit: 'plate', description: 'Button mushrooms in spiced masala gravy', isVeg: true, imageKeyword: 'mushroom masala' },
  { id: 'VG003', name: 'Kaju Curry', category: 'Veg Dishes', price: 200, unit: 'plate', description: 'Cashews in rich creamy curry', isVeg: true, imageKeyword: 'kaju curry' },
  { id: 'VG004', name: 'Tawa Vegetable', category: 'Veg Dishes', price: 250, unit: 'plate', description: 'Assorted vegetables tawa-cooked with spices', isVeg: true, imageKeyword: 'tawa vegetables' },

  // ── CURRY & DAL ───────────────────────────────────────────────────────────
  { id: 'CD001', name: 'Dahi Cury', category: 'Curry & Dal', price: 110, unit: 'bowl', description: 'Kadhi — yogurt based curry', isVeg: true, imageKeyword: 'kadhi curry' },
  { id: 'CD002', name: 'Dahi Cury Pakoda', category: 'Curry & Dal', price: 130, unit: 'bowl', description: 'Yogurt curry with gram flour pakodas', isVeg: true, imageKeyword: 'kadhi pakoda' },
  { id: 'CD003', name: 'Spl. Dal Fry', category: 'Curry & Dal', price: 150, unit: 'bowl', description: 'Special mixed lentil fry', isVeg: true, imageKeyword: 'dal fry' },
  { id: 'CD004', name: 'Spl. Dal Fry (Tadka)', category: 'Curry & Dal', price: 160, unit: 'bowl', description: 'Special dal fry with smoky tadka', isVeg: true, imageKeyword: 'dal tadka' },
  { id: 'CD005', name: 'Dal Kolhapuri', category: 'Curry & Dal', price: 170, unit: 'bowl', description: 'Spicy Kolhapuri style lentils', isVeg: true, imageKeyword: 'dal kolhapuri' },
  { id: 'CD006', name: 'Dal Palak', category: 'Curry & Dal', price: 170, unit: 'bowl', description: 'Lentils cooked with spinach', isVeg: true, imageKeyword: 'dal palak' },
  { id: 'CD007', name: 'Dal Methi', category: 'Curry & Dal', price: 170, unit: 'bowl', description: 'Lentils cooked with fenugreek leaves', isVeg: true, imageKeyword: 'dal methi' },
  { id: 'CD008', name: 'Plain Dal', category: 'Curry & Dal', price: 80, unit: 'bowl', description: 'Simple boiled lentils with turmeric', isVeg: true, imageKeyword: 'plain dal' },
  { id: 'CD009', name: 'Sambhar', category: 'Curry & Dal', price: 80, unit: 'bowl', description: 'South Indian tamarind lentil stew', isVeg: true, imageKeyword: 'sambar' },

  // ── POULTRY ───────────────────────────────────────────────────────────────
  { id: 'PT001', name: 'Chicken Keema', category: 'Poultry', price: 200, unit: 'plate', description: 'Minced chicken cooked with spices and peas', isVeg: false, imageKeyword: 'chicken keema' },
  { id: 'PT002', name: 'Butter Chicken', category: 'Poultry', price: 280, unit: 'plate', description: 'Succulent chicken in velvety tomato butter sauce', isVeg: false, imageKeyword: 'butter chicken' },
  { id: 'PT003', name: 'Chicken Mughlai', category: 'Poultry', price: 280, unit: 'plate', description: 'Chicken in rich mughlai style gravy with cream', isVeg: false, imageKeyword: 'chicken mughlai' },
  { id: 'PT004', name: 'Chicken Maratha', category: 'Poultry', price: 300, unit: 'plate', description: 'Fiery Maratha style chicken with dry coconut', isVeg: false, imageKeyword: 'chicken maratha' },
  { id: 'PT005', name: 'Chicken Sagwala', category: 'Poultry', price: 280, unit: 'plate', description: 'Chicken cooked with fresh spinach', isVeg: false, imageKeyword: 'chicken sagwala' },
  { id: 'PT006', name: 'Chicken Tikka Masala', category: 'Poultry', price: 300, unit: 'plate', description: 'Grilled chicken tikka in creamy spiced masala', isVeg: false, imageKeyword: 'chicken tikka masala' },
  { id: 'PT007', name: 'Chicken Dahiwala', category: 'Poultry', price: 280, unit: 'plate', description: 'Chicken cooked in yogurt based gravy', isVeg: false, imageKeyword: 'chicken dahiwala' },
  { id: 'PT008', name: 'Chicken Masala', category: 'Poultry', price: 190, unit: 'plate', description: 'Chicken in classic spiced masala gravy', isVeg: false, imageKeyword: 'chicken masala curry' },
  { id: 'PT009', name: 'Chicken Kadai', category: 'Poultry', price: 320, unit: 'plate', description: 'Chicken cooked in kadai with peppers and spices', isVeg: false, imageKeyword: 'chicken kadai' },
  { id: 'PT010', name: 'Chicken Handi', category: 'Poultry', price: 320, unit: 'plate', description: 'Chicken slow-cooked in clay pot handi', isVeg: false, imageKeyword: 'chicken handi' },
  { id: 'PT011', name: 'Chicken Do-Pyaza', category: 'Poultry', price: 250, unit: 'plate', description: 'Chicken with double onion in tangy gravy', isVeg: false, imageKeyword: 'chicken do pyaza' },
  { id: 'PT012', name: 'Chicken Jalfreizi', category: 'Poultry', price: 280, unit: 'plate', description: 'Stir-fried chicken with peppers in tangy sauce', isVeg: false, imageKeyword: 'chicken jalfrezi' },
  { id: 'PT013', name: 'Chicken Sukka', category: 'Poultry', price: 250, unit: 'plate', description: 'Dry chicken with aromatic spices', isVeg: false, imageKeyword: 'chicken sukka' },
  { id: 'PT014', name: 'Chicken Kolhapuri', category: 'Poultry', price: 250, unit: 'plate', description: 'Fiery Kolhapuri style chicken', isVeg: false, imageKeyword: 'chicken kolhapuri' },
  { id: 'PT015', name: 'Chicken Fry', category: 'Poultry', price: 250, unit: 'plate', description: 'Crispy fried chicken with spices', isVeg: false, imageKeyword: 'chicken fry' },
  { id: 'PT016', name: 'Chicken Maharaja', category: 'Poultry', price: 340, unit: 'plate', description: 'Royal Maharaja style chicken preparation', isVeg: false, imageKeyword: 'chicken maharaja' },
  { id: 'PT017', name: 'Chicken Nawabi', category: 'Poultry', price: 340, unit: 'plate', description: 'Rich Nawabi style chicken gravy', isVeg: false, imageKeyword: 'chicken nawabi' },
  { id: 'PT018', name: 'Chicken Peshawari', category: 'Poultry', price: 350, unit: 'plate', description: 'North-West frontier style chicken with whole spices', isVeg: false, imageKeyword: 'chicken peshawari' },
  { id: 'PT019', name: 'Egg Masala', category: 'Poultry', price: 140, unit: 'plate', description: 'Boiled eggs in spiced masala gravy', isVeg: false, imageKeyword: 'egg masala curry' },
];

