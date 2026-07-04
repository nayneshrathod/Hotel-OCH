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

// ─── Complete Menu Database (Transcribed from actual menu card) ───────────────
export const MENU_ITEMS: MenuItem[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // SNACKS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'SN001', name: 'Steam Idli', category: 'Snacks', price: 80, unit: 'plate', description: 'Soft steamed rice idlis served with sambar & chutney', isVeg: true, imageKeyword: 'idli sambar' },
  { id: 'SN002', name: 'Medu Vada Sambar & Chutney', category: 'Snacks', price: 90, unit: 'plate', description: 'Crispy medu vada with sambar and coconut chutney', isVeg: true, imageKeyword: 'medu vada' },
  { id: 'SN003', name: 'Batata Vada', category: 'Snacks', price: 60, unit: 'plate', description: 'Spiced potato dumplings deep fried in gram flour', isVeg: true, imageKeyword: 'batata vada' },
  { id: 'SN004', name: 'Bhajia', category: 'Snacks', price: 70, unit: 'plate', description: 'Mixed vegetable fritters in gram flour batter', isVeg: true, imageKeyword: 'bhajia fritters' },
  { id: 'SN005', name: 'Upma / Poha', category: 'Snacks', price: 70, unit: 'plate', description: 'Semolina upma or flattened rice poha with spices', isVeg: true, imageKeyword: 'poha upma' },
  { id: 'SN006', name: 'Sada Dosa', category: 'Snacks', price: 90, unit: 'piece', description: 'Plain crispy rice & lentil crepe with chutney', isVeg: true, imageKeyword: 'plain dosa' },
  { id: 'SN007', name: 'Masala Dosa', category: 'Snacks', price: 100, unit: 'piece', description: 'Crispy dosa stuffed with spiced potato filling', isVeg: true, imageKeyword: 'masala dosa' },
  { id: 'SN008', name: 'Rawa Sada Dosa', category: 'Snacks', price: 110, unit: 'piece', description: 'Semolina dosa, crispy and thin', isVeg: true, imageKeyword: 'rava dosa' },
  { id: 'SN009', name: 'Rawa Masala Dosa', category: 'Snacks', price: 120, unit: 'piece', description: 'Semolina dosa stuffed with potato masala', isVeg: true, imageKeyword: 'rava masala dosa' },
  { id: 'SN010', name: 'Uttappam', category: 'Snacks', price: 90, unit: 'piece', description: 'Thick soft dosa with toppings', isVeg: true, imageKeyword: 'uttapam' },
  { id: 'SN011', name: 'Onion Uttappam', category: 'Snacks', price: 100, unit: 'piece', description: 'Thick dosa topped with onions', isVeg: true, imageKeyword: 'onion uttapam' },
  { id: 'SN012', name: 'Tomato Omlet', category: 'Snacks', price: 120, unit: 'piece', description: 'Egg omelette with tomatoes and spices', isVeg: false, imageKeyword: 'tomato omelette' },
  { id: 'SN013', name: 'Mysore Sada Dosa', category: 'Snacks', price: 110, unit: 'piece', description: 'Dosa with Mysore red chutney spread', isVeg: true, imageKeyword: 'mysore dosa' },
  { id: 'SN014', name: 'Mysore Masala Dosa', category: 'Snacks', price: 120, unit: 'piece', description: 'Mysore dosa with spiced potato stuffing', isVeg: true, imageKeyword: 'mysore masala dosa' },
  { id: 'SN015', name: 'Sev Phaji', category: 'Snacks', price: 110, unit: 'plate', description: 'Potato bhaji topped with crunchy sev', isVeg: true, imageKeyword: 'sev bhaji' },
  { id: 'SN016', name: 'Dahi Idli', category: 'Snacks', price: 80, unit: 'plate', description: 'Soft idlis in sweetened spiced yogurt', isVeg: true, imageKeyword: 'dahi idli' },
  { id: 'SN017', name: 'Fry Idli', category: 'Snacks', price: 80, unit: 'plate', description: 'Idlis lightly fried with spices and curry leaves', isVeg: true, imageKeyword: 'fry idli' },
  { id: 'SN018', name: 'Potato Chips', category: 'Snacks', price: 80, unit: 'plate', description: 'Crispy fried potato chips with masala', isVeg: true, imageKeyword: 'potato chips' },
  { id: 'SN019', name: 'Misal', category: 'Snacks', price: 70, unit: 'bowl', description: 'Spicy sprouted lentil curry topped with farsan', isVeg: true, imageKeyword: 'misal pav' },
  { id: 'SN020', name: 'Usal', category: 'Snacks', price: 60, unit: 'bowl', description: 'Sprouted mixed beans curry', isVeg: true, imageKeyword: 'usal' },
  { id: 'SN021', name: 'Dahi Misal', category: 'Snacks', price: 80, unit: 'bowl', description: 'Misal with yogurt topping', isVeg: true, imageKeyword: 'dahi misal' },
  { id: 'SN022', name: 'Dahi Wada', category: 'Snacks', price: 80, unit: 'plate', description: 'Lentil dumplings in sweetened spiced yogurt', isVeg: true, imageKeyword: 'dahi vada' },
  { id: 'SN023', name: 'Sabudana Vada', category: 'Snacks', price: 90, unit: 'plate', description: 'Tapioca pearl patties with peanuts', isVeg: true, imageKeyword: 'sabudana vada' },
  { id: 'SN024', name: 'Sabudana Khichadi', category: 'Snacks', price: 100, unit: 'plate', description: 'Tapioca pearl preparation with spices', isVeg: true, imageKeyword: 'sabudana khichdi' },
  { id: 'SN025', name: 'Sheera', category: 'Snacks', price: 70, unit: 'bowl', description: 'Sweet semolina pudding with ghee', isVeg: true, imageKeyword: 'sheera halwa' },

  // ══════════════════════════════════════════════════════════════════════════
  // BREAD VARIETIES
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'BV001', name: 'Vegetable Sandwich', category: 'Bread Varieties', price: 70, unit: 'piece', description: 'Fresh vegetables in bread with green chutney', isVeg: true, imageKeyword: 'vegetable sandwich' },
  { id: 'BV002', name: 'Toast Sandwich', category: 'Bread Varieties', price: 80, unit: 'piece', description: 'Toasted bread sandwich with filling', isVeg: true, imageKeyword: 'toast sandwich' },
  { id: 'BV003', name: 'Egg Omlet Sandwich', category: 'Bread Varieties', price: 90, unit: 'piece', description: 'Egg omelette in bread sandwich', isVeg: false, imageKeyword: 'egg sandwich' },
  { id: 'BV004', name: 'Egg Omlet Toast Sandwich', category: 'Bread Varieties', price: 100, unit: 'piece', description: 'Toasted bread with egg omelette filling', isVeg: false, imageKeyword: 'egg toast sandwich' },
  { id: 'BV005', name: 'Bread Butter', category: 'Bread Varieties', price: 50, unit: 'plate', description: 'Fresh bread with butter', isVeg: true, imageKeyword: 'bread butter' },
  { id: 'BV006', name: 'Toast Butter', category: 'Bread Varieties', price: 60, unit: 'plate', description: 'Toasted bread with butter', isVeg: true, imageKeyword: 'toast butter' },
  { id: 'BV007', name: 'Cheese Sandwich', category: 'Bread Varieties', price: 90, unit: 'piece', description: 'Bread sandwich with melted cheese', isVeg: true, imageKeyword: 'cheese sandwich' },
  { id: 'BV008', name: 'Veg. Grilled Sandwich', category: 'Bread Varieties', price: 100, unit: 'piece', description: 'Grilled sandwich with fresh vegetables', isVeg: true, imageKeyword: 'grilled veg sandwich' },
  { id: 'BV009', name: 'Veg. & Cheese Grilled Sandwich', category: 'Bread Varieties', price: 110, unit: 'piece', description: 'Grilled sandwich with vegetables and cheese', isVeg: true, imageKeyword: 'cheese grilled sandwich' },
  { id: 'BV010', name: 'Chicken Grilled Sandwich', category: 'Bread Varieties', price: 130, unit: 'piece', description: 'Grilled bread with spiced chicken filling', isVeg: false, imageKeyword: 'chicken grilled sandwich' },
  { id: 'BV011', name: 'Pav (1 Pc.)', category: 'Bread Varieties', price: 7, unit: 'piece', description: 'Soft Indian bread roll', isVeg: true, imageKeyword: 'pav bread' },

  // ══════════════════════════════════════════════════════════════════════════
  // HOT DRINKS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'HD001', name: 'Tea', category: 'Hot Drinks', price: 20, unit: 'cup', description: 'Hot Indian masala tea', isVeg: true, imageKeyword: 'indian chai tea' },
  { id: 'HD002', name: 'Special Tea', category: 'Hot Drinks', price: 25, unit: 'cup', description: 'Special blend aromatic tea', isVeg: true, imageKeyword: 'special tea' },
  { id: 'HD003', name: 'Nescafe', category: 'Hot Drinks', price: 35, unit: 'cup', description: 'Hot Nescafe coffee', isVeg: true, imageKeyword: 'nescafe coffee' },
  { id: 'HD004', name: 'Milk', category: 'Hot Drinks', price: 40, unit: 'glass', description: 'Fresh hot milk', isVeg: true, imageKeyword: 'hot milk glass' },

  // ══════════════════════════════════════════════════════════════════════════
  // COLD DRINKS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'CL001', name: 'Cold Drinks (200ml)', category: 'Cold Drinks', price: 25, unit: 'bottle', description: 'Chilled soft drink 200ml', isVeg: true, imageKeyword: 'cold drink bottle' },
  { id: 'CL002', name: 'Cold Drinks (500ml)', category: 'Cold Drinks', price: 45, unit: 'bottle', description: 'Chilled soft drink 500ml', isVeg: true, imageKeyword: 'cold drink' },
  { id: 'CL003', name: 'Cold Drinks (1 Ltr.)', category: 'Cold Drinks', price: 75, unit: 'bottle', description: 'Chilled soft drink 1 Litre', isVeg: true, imageKeyword: 'cold drink large' },
  { id: 'CL004', name: 'Cold Drinks (1.5 Ltr.)', category: 'Cold Drinks', price: 95, unit: 'bottle', description: 'Chilled soft drink 1.5 Litre', isVeg: true, imageKeyword: 'cold drink' },
  { id: 'CL005', name: 'Cold Drinks (2 Ltr.)', category: 'Cold Drinks', price: 120, unit: 'bottle', description: 'Chilled soft drink 2 Litre', isVeg: true, imageKeyword: 'cold drink' },
  { id: 'CL006', name: 'Soda (500ml)', category: 'Cold Drinks', price: 30, unit: 'bottle', description: 'Chilled soda water 500ml', isVeg: true, imageKeyword: 'soda water' },
  { id: 'CL007', name: 'M Water', category: 'Cold Drinks', price: 19, unit: 'bottle', description: 'Packaged mineral water', isVeg: true, imageKeyword: 'mineral water bottle' },
  { id: 'CL008', name: 'Sweet Lassi', category: 'Cold Drinks', price: 40, unit: 'glass', description: 'Chilled sweet yogurt drink', isVeg: true, imageKeyword: 'sweet lassi' },
  { id: 'CL009', name: 'Butter Milk', category: 'Cold Drinks', price: 30, unit: 'glass', description: 'Chilled spiced chaas', isVeg: true, imageKeyword: 'buttermilk chaas' },
  { id: 'CL010', name: 'Dahi', category: 'Cold Drinks', price: 40, unit: 'bowl', description: 'Fresh set curd', isVeg: true, imageKeyword: 'fresh curd bowl' },
  { id: 'CL011', name: 'Sol Kadi', category: 'Cold Drinks', price: 40, unit: 'glass', description: 'Kokum & coconut milk digestive drink', isVeg: true, imageKeyword: 'sol kadi drink' },

  // ══════════════════════════════════════════════════════════════════════════
  // LUNCH & DINNER
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'LD001', name: 'Thali', category: 'Lunch & Dinner', price: 150, unit: 'thali', description: 'Regular thali with dal, sabzi, roti, rice & salad', isVeg: true, imageKeyword: 'thali meal' },
  { id: 'LD002', name: 'Special Thali', category: 'Lunch & Dinner', price: 170, unit: 'thali', description: 'Special thali with extra items', isVeg: true, imageKeyword: 'special thali' },
  { id: 'LD003', name: 'Deluxe Thali', category: 'Lunch & Dinner', price: 200, unit: 'thali', description: 'Deluxe thali with premium items & sweet dish', isVeg: true, imageKeyword: 'deluxe thali' },
  { id: 'LD004', name: 'Batata / Sada Bhaji', category: 'Lunch & Dinner', price: 100, unit: 'plate', description: 'Simple potato vegetable preparation', isVeg: true, imageKeyword: 'batata bhaji' },
  { id: 'LD005', name: 'Chicken Thali', category: 'Lunch & Dinner', price: 300, unit: 'thali', description: 'Full chicken thali with roti, rice & sides', isVeg: false, imageKeyword: 'chicken thali' },
  { id: 'LD006', name: 'Mutton Thali', category: 'Lunch & Dinner', price: 325, unit: 'thali', description: 'Full mutton thali with roti, rice & sides', isVeg: false, imageKeyword: 'mutton thali' },
  { id: 'LD007', name: 'Fish Thali (Bangda)', category: 'Lunch & Dinner', price: 300, unit: 'thali', description: 'Bangda fish thali with rice, sol kadi & sides', isVeg: false, imageKeyword: 'fish thali' },
  { id: 'LD008', name: 'Fish Thali (Surmai)', category: 'Lunch & Dinner', price: 340, unit: 'thali', description: 'Surmai fish thali with rice, sol kadi & sides', isVeg: false, imageKeyword: 'surmai fish thali' },
  { id: 'LD009', name: 'Fish Thali (Promplet)', category: 'Lunch & Dinner', price: 370, unit: 'thali', description: 'Promplet fish thali with rice, sol kadi & sides', isVeg: false, imageKeyword: 'promplet fish thali' },

  // ══════════════════════════════════════════════════════════════════════════
  // SOUPS (Tomato / Palak)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'SP001', name: 'Tomato Soup', category: 'Soups', price: 150, unit: 'bowl', description: 'Rich creamy tomato soup with croutons', isVeg: true, imageKeyword: 'tomato soup bowl' },
  { id: 'SP002', name: 'Palak Soup', category: 'Soups', price: 150, unit: 'bowl', description: 'Smooth spinach soup with spices', isVeg: true, imageKeyword: 'palak spinach soup' },

  // ══════════════════════════════════════════════════════════════════════════
  // CHINESE SOUPS (Veg / Non-Veg)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'CS001', name: 'Sweet Corn Soup (Veg)', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Creamy sweet corn soup, vegetarian', isVeg: true, imageKeyword: 'sweet corn soup' },
  { id: 'CS002', name: 'Sweet Corn Soup (N.Veg)', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Creamy sweet corn soup with chicken', isVeg: false, imageKeyword: 'sweet corn soup' },
  { id: 'CS003', name: 'Hot-N-Sour Soup (Veg)', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Spicy & sour Indo-Chinese soup, vegetarian', isVeg: true, imageKeyword: 'hot sour soup' },
  { id: 'CS004', name: 'Hot-N-Sour Soup (N.Veg)', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Spicy & sour Indo-Chinese soup with chicken', isVeg: false, imageKeyword: 'hot sour soup' },
  { id: 'CS005', name: 'Clear Soup (Veg)', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Light clear vegetable broth', isVeg: true, imageKeyword: 'clear soup' },
  { id: 'CS006', name: 'Clear Soup (N.Veg)', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Light clear soup with chicken', isVeg: false, imageKeyword: 'clear chicken soup' },
  { id: 'CS007', name: 'Manchow Soup (Veg)', category: 'Chinese Soups', price: 160, unit: 'bowl', description: 'Thick Indo-Chinese manchow with fried noodles, veg', isVeg: true, imageKeyword: 'manchow soup' },
  { id: 'CS008', name: 'Manchow Soup (N.Veg)', category: 'Chinese Soups', price: 170, unit: 'bowl', description: 'Thick Indo-Chinese manchow with chicken & noodles', isVeg: false, imageKeyword: 'manchow soup' },

  // ══════════════════════════════════════════════════════════════════════════
  // STARTERS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'ST001', name: 'Chicken Roasted', category: 'Starters', price: 300, unit: 'plate', description: 'Whole roasted chicken pieces with spices', isVeg: false, imageKeyword: 'roasted chicken' },
  { id: 'ST002', name: 'Chicken Lollypop', category: 'Starters', price: 300, unit: 'plate', description: 'Chicken lollipops in spicy sauce', isVeg: false, imageKeyword: 'chicken lollipop' },
  { id: 'ST003', name: 'Chicken Tikka', category: 'Starters', price: 300, unit: 'plate', description: 'Tender chicken marinated in spiced yogurt, tandoor grilled', isVeg: false, imageKeyword: 'chicken tikka' },
  { id: 'ST004', name: 'Paneer Tikka', category: 'Starters', price: 260, unit: 'plate', description: 'Marinated cottage cheese cubes grilled in tandoor', isVeg: true, imageKeyword: 'paneer tikka' },
  { id: 'ST005', name: 'Chicken Tandoori (Full)', category: 'Starters', price: 370, unit: 'plate', description: 'Full tandoori chicken with mint chutney', isVeg: false, imageKeyword: 'tandoori chicken full' },
  { id: 'ST006', name: 'Chicken Tandoori (Half)', category: 'Starters', price: 220, unit: 'plate', description: 'Half tandoori chicken with mint chutney', isVeg: false, imageKeyword: 'tandoori chicken' },
  { id: 'ST007', name: 'Veg. Spring Roll', category: 'Starters', price: 250, unit: 'plate', description: 'Crispy rolls filled with seasoned vegetables', isVeg: true, imageKeyword: 'vegetable spring roll' },
  { id: 'ST008', name: 'Chicken Spring Roll', category: 'Starters', price: 290, unit: 'plate', description: 'Crispy rolls filled with spiced chicken', isVeg: false, imageKeyword: 'chicken spring roll' },
  { id: 'ST009', name: 'Green Peas / Chana Dry', category: 'Starters', price: 140, unit: 'plate', description: 'Dry spiced green peas or chickpeas', isVeg: true, imageKeyword: 'dry chana peas' },

  // ══════════════════════════════════════════════════════════════════════════
  // SALAD, PAPAD & RAITA
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'PR001', name: 'Green Salad', category: 'Salad, Papad & Raita', price: 50, unit: 'plate', description: 'Fresh green salad with seasonal vegetables', isVeg: true, imageKeyword: 'green salad' },
  { id: 'PR002', name: 'Papad Roasted', category: 'Salad, Papad & Raita', price: 12, unit: 'piece', description: 'Roasted lentil papad', isVeg: true, imageKeyword: 'papad' },
  { id: 'PR003', name: 'Papad Fry', category: 'Salad, Papad & Raita', price: 18, unit: 'piece', description: 'Deep fried crispy papad', isVeg: true, imageKeyword: 'fried papad' },
  { id: 'PR004', name: 'Masala Papad', category: 'Salad, Papad & Raita', price: 80, unit: 'plate', description: 'Papad topped with onion, tomato and spices', isVeg: true, imageKeyword: 'masala papad' },
  { id: 'PR005', name: 'Vegetable Raita', category: 'Salad, Papad & Raita', price: 80, unit: 'bowl', description: 'Yogurt with grated vegetables and spices', isVeg: true, imageKeyword: 'vegetable raita' },
  { id: 'PR006', name: 'Boondi Raita', category: 'Salad, Papad & Raita', price: 90, unit: 'bowl', description: 'Yogurt with fried boondi and spices', isVeg: true, imageKeyword: 'boondi raita' },
  { id: 'PR007', name: 'Pineapple Raita', category: 'Salad, Papad & Raita', price: 100, unit: 'bowl', description: 'Sweet yogurt with pineapple pieces', isVeg: true, imageKeyword: 'pineapple raita' },

  // ══════════════════════════════════════════════════════════════════════════
  // SWEET DISHES
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'SW001', name: 'Gulab Jamun / Kheer', category: 'Sweet Dishes', price: 40, unit: 'plate', description: 'Soft gulab jamun in rose syrup or creamy rice kheer', isVeg: true, imageKeyword: 'gulab jamun' },
  { id: 'SW002', name: 'Fruit Salad', category: 'Sweet Dishes', price: 80, unit: 'bowl', description: 'Fresh seasonal fruit salad', isVeg: true, imageKeyword: 'fruit salad' },
  { id: 'SW003', name: 'Fruit Salad with Ice Cream', category: 'Sweet Dishes', price: 100, unit: 'bowl', description: 'Fresh fruit salad topped with ice cream', isVeg: true, imageKeyword: 'fruit salad ice cream' },
  { id: 'SW004', name: 'Caramel Clustered', category: 'Sweet Dishes', price: 60, unit: 'plate', description: 'Caramel cluster dessert', isVeg: true, imageKeyword: 'caramel dessert' },
  { id: 'SW005', name: 'Matka Rubdi', category: 'Sweet Dishes', price: 90, unit: 'matka', description: 'Creamy reduced milk dessert served in earthen pot', isVeg: true, imageKeyword: 'matka rabri' },
  { id: 'SW006', name: 'Shrikhand', category: 'Sweet Dishes', price: 50, unit: 'bowl', description: 'Sweetened strained yogurt with saffron', isVeg: true, imageKeyword: 'shrikhand' },

  // ══════════════════════════════════════════════════════════════════════════
  // PUNJABI DISHES (Paneer)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'PJ001', name: 'Paneer Kurma', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Cottage cheese in rich korma gravy with nuts', isVeg: true, imageKeyword: 'paneer kurma' },
  { id: 'PJ002', name: 'Paneer Masala Kolhapuri', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer in fiery Kolhapuri masala', isVeg: true, imageKeyword: 'paneer kolhapuri' },
  { id: 'PJ003', name: 'Paneer Lababdar', category: 'Punjabi Dishes', price: 230, unit: 'plate', description: 'Paneer in rich onion-tomato gravy', isVeg: true, imageKeyword: 'paneer lababdar' },
  { id: 'PJ004', name: 'Paneer Lahori', category: 'Punjabi Dishes', price: 230, unit: 'plate', description: 'Paneer in Lahori style spiced gravy', isVeg: true, imageKeyword: 'paneer lahori' },
  { id: 'PJ005', name: 'Paneer Makhani', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer in buttery tomato & cream sauce', isVeg: true, imageKeyword: 'paneer makhani' },
  { id: 'PJ006', name: 'Paneer Palak / Mutter', category: 'Punjabi Dishes', price: 210, unit: 'plate', description: 'Paneer with spinach or green peas curry', isVeg: true, imageKeyword: 'palak paneer' },

  // ══════════════════════════════════════════════════════════════════════════
  // VEG DISHES
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'VG001', name: 'Paneer Tikka Masala', category: 'Veg Dishes', price: 230, unit: 'plate', description: 'Grilled paneer in spiced tikka masala gravy', isVeg: true, imageKeyword: 'paneer tikka masala' },
  { id: 'VG002', name: 'Paneer Bhurji', category: 'Veg Dishes', price: 210, unit: 'plate', description: 'Scrambled cottage cheese with spices & onion', isVeg: true, imageKeyword: 'paneer bhurji' },
  { id: 'VG003', name: 'Paneer Kadai / Handi', category: 'Veg Dishes', price: 240, unit: 'plate', description: 'Paneer in wok-tossed kadai or handi gravy', isVeg: true, imageKeyword: 'kadai paneer' },
  { id: 'VG004', name: 'Chole Masala', category: 'Veg Dishes', price: 140, unit: 'plate', description: 'Chickpeas in tangy Punjabi masala gravy', isVeg: true, imageKeyword: 'chole masala' },
  { id: 'VG005', name: 'Karela Fry', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Crispy bitter gourd fry with spices', isVeg: true, imageKeyword: 'karela fry' },
  { id: 'VG006', name: 'Bhendi Masala', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Okra in spiced masala', isVeg: true, imageKeyword: 'bhindi masala' },
  { id: 'VG007', name: 'Tawa Bhendi / Karela', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Okra or bitter gourd tawa preparation', isVeg: true, imageKeyword: 'tawa bhindi' },
  { id: 'VG008', name: 'Methi Moong / Mutter', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Fenugreek with moong or green peas', isVeg: true, imageKeyword: 'methi sabzi' },
  { id: 'VG009', name: 'Moong / Mutki Masala', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Whole moong or matki in spiced gravy', isVeg: true, imageKeyword: 'moong masala' },
  { id: 'VG010', name: 'Sukha Pitla', category: 'Veg Dishes', price: 150, unit: 'plate', description: 'Dry gram flour preparation with spices', isVeg: true, imageKeyword: 'pitla sabzi' },
  { id: 'VG011', name: 'Shev Bhaji', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Bhaji topped with crispy sev', isVeg: true, imageKeyword: 'sev sabzi' },
  { id: 'VG012', name: 'Tomato Chutney', category: 'Veg Dishes', price: 140, unit: 'bowl', description: 'Tangy tomato chutney with spices', isVeg: true, imageKeyword: 'tomato chutney' },
  { id: 'VG013', name: 'Green P. Masala', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Green peas in spiced masala gravy', isVeg: true, imageKeyword: 'green peas masala' },
  { id: 'VG014', name: 'Baigan Masala', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Eggplant / brinjal in spiced masala', isVeg: true, imageKeyword: 'baingan masala' },
  { id: 'VG015', name: 'Alu Simla Fry / Palak / Gobi', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Potato with capsicum, spinach, or cauliflower', isVeg: true, imageKeyword: 'aloo gobi' },
  { id: 'VG016', name: 'Alu Mutter', category: 'Veg Dishes', price: 140, unit: 'plate', description: 'Potato and green peas curry', isVeg: true, imageKeyword: 'aloo matar' },
  { id: 'VG017', name: 'Alu Methi Fry', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Potato with fenugreek leaves, dry fry', isVeg: true, imageKeyword: 'aloo methi' },
  { id: 'VG018', name: 'Alu Jeera / Masala', category: 'Veg Dishes', price: 140, unit: 'plate', description: 'Cumin-spiced potatoes or potato masala', isVeg: true, imageKeyword: 'jeera aloo' },
  { id: 'VG019', name: 'Malai Kofta', category: 'Veg Dishes', price: 190, unit: 'plate', description: 'Soft paneer koftas in creamy tomato gravy', isVeg: true, imageKeyword: 'malai kofta' },
  { id: 'VG020', name: 'Malai Methi Mutter', category: 'Veg Dishes', price: 180, unit: 'plate', description: 'Fenugreek and peas in creamy malai gravy', isVeg: true, imageKeyword: 'methi matar malai' },
  { id: 'VG021', name: 'Veg. Makhani', category: 'Veg Dishes', price: 180, unit: 'plate', description: 'Mixed vegetables in buttery makhani sauce', isVeg: true, imageKeyword: 'veg makhani' },
  { id: 'VG022', name: 'Mixed Veg. / Kolhapuri', category: 'Veg Dishes', price: 160, unit: 'plate', description: 'Mixed vegetables in regular or spicy Kolhapuri style', isVeg: true, imageKeyword: 'mix veg' },
  { id: 'VG023', name: 'Pitla / Pitla Fry', category: 'Veg Dishes', price: 120, unit: 'plate', description: 'Gram flour curry, plain or fry style', isVeg: true, imageKeyword: 'pitla bhakri' },
  { id: 'VG024', name: 'Dahi Pitla Fry', category: 'Veg Dishes', price: 140, unit: 'plate', description: 'Gram flour curry with yogurt base', isVeg: true, imageKeyword: 'dahi pitla' },
  { id: 'VG025', name: 'Veg. Jalfrezi', category: 'Veg Dishes', price: 180, unit: 'plate', description: 'Stir-fried vegetables in tangy sauce', isVeg: true, imageKeyword: 'veg jalfrezi' },
  { id: 'VG026', name: 'Dum Alu Kashmiri', category: 'Veg Dishes', price: 190, unit: 'plate', description: 'Baby potatoes cooked Kashmiri style', isVeg: true, imageKeyword: 'dum aloo kashmiri' },
  { id: 'VG027', name: 'Navratan Kurma', category: 'Veg Dishes', price: 190, unit: 'plate', description: 'Nine vegetable curry in mild creamy sauce', isVeg: true, imageKeyword: 'navratan korma' },
  { id: 'VG028', name: 'Veg. Nawabi / Maharaja', category: 'Veg Dishes', price: 260, unit: 'plate', description: 'Royal vegetable preparation in rich mughlai gravy', isVeg: true, imageKeyword: 'veg nawabi' },
  { id: 'VG029', name: 'Veg. Handi', category: 'Veg Dishes', price: 210, unit: 'plate', description: 'Mixed vegetables slow-cooked in a clay pot', isVeg: true, imageKeyword: 'veg handi' },
  { id: 'VG030', name: 'Veg. Kadai', category: 'Veg Dishes', price: 210, unit: 'plate', description: 'Mixed vegetables wok-cooked in kadai masala', isVeg: true, imageKeyword: 'kadai veg' },
  { id: 'VG031', name: 'Mushroom Masala', category: 'Veg Dishes', price: 200, unit: 'plate', description: 'Button mushrooms in spiced masala gravy', isVeg: true, imageKeyword: 'mushroom masala' },
  { id: 'VG032', name: 'Kaju Curry', category: 'Veg Dishes', price: 200, unit: 'plate', description: 'Cashews in rich creamy curry', isVeg: true, imageKeyword: 'kaju curry' },
  { id: 'VG033', name: 'Tawa Vegetable', category: 'Veg Dishes', price: 250, unit: 'plate', description: 'Assorted vegetables tawa-cooked with spices', isVeg: true, imageKeyword: 'tawa vegetables' },

  // ══════════════════════════════════════════════════════════════════════════
  // CURRY & DAL VARIETIES
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'CD001', name: 'Dahi Cury', category: 'Curry & Dal', price: 110, unit: 'bowl', description: 'Kadhi — yogurt based curry with pakodas', isVeg: true, imageKeyword: 'kadhi curry' },
  { id: 'CD002', name: 'Dahi Cury Pakoda', category: 'Curry & Dal', price: 130, unit: 'bowl', description: 'Yogurt curry with gram flour pakodas', isVeg: true, imageKeyword: 'kadhi pakoda' },
  { id: 'CD003', name: 'Spl. Dal Fry', category: 'Curry & Dal', price: 150, unit: 'bowl', description: 'Special mixed lentil fry', isVeg: true, imageKeyword: 'dal fry' },
  { id: 'CD004', name: 'Spl. Dal Fry (Tadka)', category: 'Curry & Dal', price: 160, unit: 'bowl', description: 'Special dal fry with smoky tadka', isVeg: true, imageKeyword: 'dal tadka' },
  { id: 'CD005', name: 'Dal Kolhapuri', category: 'Curry & Dal', price: 170, unit: 'bowl', description: 'Spicy Kolhapuri style lentils', isVeg: true, imageKeyword: 'dal kolhapuri' },
  { id: 'CD006', name: 'Dal Palak / Methi', category: 'Curry & Dal', price: 170, unit: 'bowl', description: 'Lentils with spinach or fenugreek leaves', isVeg: true, imageKeyword: 'dal palak' },
  { id: 'CD007', name: 'Plain Dal', category: 'Curry & Dal', price: 80, unit: 'bowl', description: 'Simple boiled lentils with turmeric', isVeg: true, imageKeyword: 'plain dal' },
  { id: 'CD008', name: 'Sambhar', category: 'Curry & Dal', price: 80, unit: 'bowl', description: 'South Indian tamarind lentil stew', isVeg: true, imageKeyword: 'sambar' },

  // ══════════════════════════════════════════════════════════════════════════
  // EGG ITEMS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'EG001', name: 'Egg Chilly (Indian)', category: 'Egg Items', price: 150, unit: 'plate', description: 'Spiced Indian style chilly eggs', isVeg: false, imageKeyword: 'egg chilly' },
  { id: 'EG002', name: 'Egg Bhurji', category: 'Egg Items', price: 120, unit: 'plate', description: 'Scrambled eggs with onion, tomato and spices', isVeg: false, imageKeyword: 'egg bhurji' },
  { id: 'EG003', name: 'Egg Double Omlet', category: 'Egg Items', price: 80, unit: 'plate', description: 'Two-egg omelette with spices', isVeg: false, imageKeyword: 'egg omelette' },
  { id: 'EG004', name: 'Egg Boiled (Double)', category: 'Egg Items', price: 50, unit: 'plate', description: 'Two boiled eggs', isVeg: false, imageKeyword: 'boiled eggs' },
  { id: 'EG005', name: 'Egg Masala', category: 'Egg Items', price: 140, unit: 'plate', description: 'Hard boiled eggs in spiced masala gravy', isVeg: false, imageKeyword: 'egg masala curry' },

  // ══════════════════════════════════════════════════════════════════════════
  // POULTRY (Chicken)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'PT001', name: 'Chicken Keema', category: 'Poultry', price: 200, unit: 'plate', description: 'Minced chicken cooked with spices and peas', isVeg: false, imageKeyword: 'chicken keema' },
  { id: 'PT002', name: 'Butter Chicken', category: 'Poultry', price: 280, unit: 'plate', description: 'Succulent chicken in velvety tomato butter sauce', isVeg: false, imageKeyword: 'butter chicken' },
  { id: 'PT003', name: 'Chicken Mughlai', category: 'Poultry', price: 280, unit: 'plate', description: 'Chicken in rich mughlai style gravy with cream', isVeg: false, imageKeyword: 'chicken mughlai' },
  { id: 'PT004', name: 'Chicken Maratha', category: 'Poultry', price: 300, unit: 'plate', description: 'Fiery Maratha style chicken with dry coconut masala', isVeg: false, imageKeyword: 'chicken maratha' },
  { id: 'PT005', name: 'Chicken Sagwala', category: 'Poultry', price: 280, unit: 'plate', description: 'Chicken in spinach and spice gravy', isVeg: false, imageKeyword: 'chicken saagwala' },
  { id: 'PT006', name: 'Chicken Tikka Masala', category: 'Poultry', price: 300, unit: 'plate', description: 'Grilled chicken tikka in tangy masala gravy', isVeg: false, imageKeyword: 'chicken tikka masala' },
  { id: 'PT007', name: 'Chicken Dahiwala', category: 'Poultry', price: 280, unit: 'plate', description: 'Chicken cooked in a yogurt-based gravy', isVeg: false, imageKeyword: 'chicken dahi' },
  { id: 'PT008', name: 'Chicken Masala', category: 'Poultry', price: 190, unit: 'plate', description: 'Classic chicken in homestyle masala gravy', isVeg: false, imageKeyword: 'chicken masala curry' },
  { id: 'PT009', name: 'Chicken Kadai', category: 'Poultry', price: 320, unit: 'plate', description: 'Chicken with bell peppers in wok-tossed masala', isVeg: false, imageKeyword: 'kadai chicken' },
  { id: 'PT010', name: 'Chicken Handi', category: 'Poultry', price: 320, unit: 'plate', description: 'Chicken slow-cooked in clay pot handi', isVeg: false, imageKeyword: 'chicken handi' },
  { id: 'PT011', name: 'Chicken Do-Pyaza', category: 'Poultry', price: 250, unit: 'plate', description: 'Chicken with double onion in tangy gravy', isVeg: false, imageKeyword: 'chicken do pyaza' },
  { id: 'PT012', name: 'Chicken Jalfreizi', category: 'Poultry', price: 280, unit: 'plate', description: 'Stir-fried chicken with peppers and tomatoes', isVeg: false, imageKeyword: 'chicken jalfrezi' },
  { id: 'PT013', name: 'Chicken Sukka', category: 'Poultry', price: 250, unit: 'plate', description: 'Dry chicken preparation with coastal spices', isVeg: false, imageKeyword: 'chicken sukka dry' },
  { id: 'PT014', name: 'Chicken Kolhapuri', category: 'Poultry', price: 250, unit: 'plate', description: 'Fiery Kolhapuri chicken with whole spice masala', isVeg: false, imageKeyword: 'chicken kolhapuri' },
  { id: 'PT015', name: 'Chicken Fry', category: 'Poultry', price: 250, unit: 'plate', description: 'Crispy fried chicken pieces with spices', isVeg: false, imageKeyword: 'chicken fry' },
  { id: 'PT016', name: 'Chicken Maharaja / Nawabi', category: 'Poultry', price: 340, unit: 'plate', description: 'Royal chicken in rich Nawabi style gravy with cream', isVeg: false, imageKeyword: 'chicken nawabi' },
  { id: 'PT017', name: 'Chicken Peshawari', category: 'Poultry', price: 350, unit: 'plate', description: 'North-West frontier style chicken with whole spices', isVeg: false, imageKeyword: 'chicken peshwari' },

  // ══════════════════════════════════════════════════════════════════════════
  // MUTTON / FARM HOUSE
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'FH001', name: 'Mutton Masala', category: 'Mutton / Farm House', price: 250, unit: 'plate', description: 'Tender mutton in classic spiced masala gravy', isVeg: false, imageKeyword: 'mutton masala curry' },
  { id: 'FH002', name: 'Mutton Maratha', category: 'Mutton / Farm House', price: 320, unit: 'plate', description: 'Fiery Maratha style mutton with dry coconut masala', isVeg: false, imageKeyword: 'mutton maratha' },
  { id: 'FH003', name: 'Mutton Palak', category: 'Mutton / Farm House', price: 300, unit: 'plate', description: 'Mutton cooked with fresh spinach', isVeg: false, imageKeyword: 'mutton palak' },
  { id: 'FH004', name: 'Mutton Do-Pyaza', category: 'Mutton / Farm House', price: 300, unit: 'plate', description: 'Mutton with double onion in tangy gravy', isVeg: false, imageKeyword: 'mutton do pyaza' },
  { id: 'FH005', name: 'Mutton Handi', category: 'Mutton / Farm House', price: 340, unit: 'plate', description: 'Mutton slow-cooked in clay pot handi', isVeg: false, imageKeyword: 'mutton handi' },
  { id: 'FH006', name: 'Mutton Kadai', category: 'Mutton / Farm House', price: 340, unit: 'plate', description: 'Mutton cooked in a wok with spices & peppers', isVeg: false, imageKeyword: 'mutton kadai' },
  { id: 'FH007', name: 'Mutton Fry / Kolhapuri', category: 'Mutton / Farm House', price: 280, unit: 'plate', description: 'Mutton fry or Kolhapuri spicy mutton', isVeg: false, imageKeyword: 'mutton fry' },
  { id: 'FH008', name: 'Mutton Sukha', category: 'Mutton / Farm House', price: 280, unit: 'plate', description: 'Dry mutton with aromatic spices', isVeg: false, imageKeyword: 'mutton sukka' },
  { id: 'FH009', name: 'Mutton Maharaja / Nawabi', category: 'Mutton / Farm House', price: 360, unit: 'plate', description: 'Royal mutton preparation in rich Nawabi gravy', isVeg: false, imageKeyword: 'mutton nawabi' },
  { id: 'FH010', name: 'Mutton Peshawari', category: 'Mutton / Farm House', price: 370, unit: 'plate', description: 'North-West frontier style mutton with whole spices', isVeg: false, imageKeyword: 'mutton peshwari' },

  // ══════════════════════════════════════════════════════════════════════════
  // SEA FOODS
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'SF001', name: 'Bangda Fry', category: 'Sea Foods', price: 200, unit: 'plate', description: 'Mackerel fish marinated and fried', isVeg: false, imageKeyword: 'bangda fish fry' },
  { id: 'SF002', name: 'Bangda Masala', category: 'Sea Foods', price: 220, unit: 'plate', description: 'Mackerel fish in spiced coastal masala gravy', isVeg: false, imageKeyword: 'bangda masala' },
  { id: 'SF003', name: 'Promplet Fry', category: 'Sea Foods', price: 340, unit: 'plate', description: 'Pomfret fish shallow fried with spice coating', isVeg: false, imageKeyword: 'pomfret fish fry' },
  { id: 'SF004', name: 'Promplet Masala', category: 'Sea Foods', price: 350, unit: 'plate', description: 'Pomfret in rich spiced masala gravy', isVeg: false, imageKeyword: 'pomfret masala' },
  { id: 'SF005', name: 'Surmai Fry', category: 'Sea Foods', price: 300, unit: 'plate', description: 'King fish (Surmai) marinated and fried', isVeg: false, imageKeyword: 'surmai fish fry' },
  { id: 'SF006', name: 'Surmai Masala', category: 'Sea Foods', price: 320, unit: 'plate', description: 'King fish in tangy coastal masala', isVeg: false, imageKeyword: 'surmai masala' },
  { id: 'SF007', name: 'Prawns Fry', category: 'Sea Foods', price: 300, unit: 'plate', description: 'Prawns marinated in spices and fried', isVeg: false, imageKeyword: 'prawns fry' },
  { id: 'SF008', name: 'Prawns Masala', category: 'Sea Foods', price: 320, unit: 'plate', description: 'Prawns in rich spiced masala gravy', isVeg: false, imageKeyword: 'prawns masala curry' },
  { id: 'SF009', name: 'Prawns Koliwada', category: 'Sea Foods', price: 320, unit: 'plate', description: 'Crispy battered prawns Koliwada style', isVeg: false, imageKeyword: 'prawns koliwada' },

  // ══════════════════════════════════════════════════════════════════════════
  // RICE & BIRYANI (Sugandhi Rice)
  // ══════════════════════════════════════════════════════════════════════════
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
  { id: 'RI016', name: 'Prawns Biryani', category: 'Rice & Biryani', price: 325, unit: 'plate', description: 'Dum biryani with succulent prawns', isVeg: false, imageKeyword: 'prawn biryani' },
  { id: 'RI017', name: 'Palak Rice', category: 'Rice & Biryani', price: 160, unit: 'plate', description: 'Basmati rice cooked with spinach', isVeg: true, imageKeyword: 'palak rice' },
  { id: 'RI018', name: 'Sambar Rice', category: 'Rice & Biryani', price: 120, unit: 'plate', description: 'Rice mixed with sambar', isVeg: true, imageKeyword: 'sambar rice' },
  { id: 'RI019', name: 'Dal Khichdi', category: 'Rice & Biryani', price: 140, unit: 'plate', description: 'Comforting rice and lentil preparation', isVeg: true, imageKeyword: 'dal khichdi' },
  { id: 'RI020', name: 'Dal Rice', category: 'Rice & Biryani', price: 100, unit: 'plate', description: 'Plain dal served with steamed rice', isVeg: true, imageKeyword: 'dal rice' },
  { id: 'RI021', name: 'Curd Rice', category: 'Rice & Biryani', price: 130, unit: 'plate', description: 'Rice mixed with fresh yogurt and tempering', isVeg: true, imageKeyword: 'curd rice' },
  { id: 'RI022', name: 'Plain Rice (Full)', category: 'Rice & Biryani', price: 70, unit: 'plate', description: 'Plain steamed basmati rice, full serving', isVeg: true, imageKeyword: 'plain rice' },
  { id: 'RI023', name: 'Plain Rice (Half)', category: 'Rice & Biryani', price: 60, unit: 'plate', description: 'Plain steamed basmati rice, half serving', isVeg: true, imageKeyword: 'plain rice' },

  // ══════════════════════════════════════════════════════════════════════════
  // CHINESE RICE (Veg / Non-Veg)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'CR001', name: 'Fried Rice (Veg)', category: 'Chinese Rice', price: 210, unit: 'plate', description: 'Wok-tossed basmati with vegetables', isVeg: true, imageKeyword: 'veg fried rice' },
  { id: 'CR002', name: 'Fried Rice (N.Veg)', category: 'Chinese Rice', price: 230, unit: 'plate', description: 'Wok-tossed basmati with egg & chicken', isVeg: false, imageKeyword: 'chicken fried rice' },
  { id: 'CR003', name: 'Schezwan Fried Rice (Veg)', category: 'Chinese Rice', price: 220, unit: 'plate', description: 'Spicy Schezwan sauce rice, vegetarian', isVeg: true, imageKeyword: 'schezwan fried rice' },
  { id: 'CR004', name: 'Schezwan Fried Rice (N.Veg)', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Spicy Schezwan sauce rice with chicken', isVeg: false, imageKeyword: 'schezwan chicken fried rice' },
  { id: 'CR005', name: 'Singapore Fried Rice (Veg)', category: 'Chinese Rice', price: 220, unit: 'plate', description: 'Singapore style flavored rice, vegetarian', isVeg: true, imageKeyword: 'singapore fried rice' },
  { id: 'CR006', name: 'Singapore Fried Rice (N.Veg)', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Singapore style flavored rice with chicken', isVeg: false, imageKeyword: 'singapore noodles rice' },
  { id: 'CR007', name: 'Hongkong Fried Rice (Veg)', category: 'Chinese Rice', price: 220, unit: 'plate', description: 'Hongkong style fried rice, vegetarian', isVeg: true, imageKeyword: 'hongkong fried rice' },
  { id: 'CR008', name: 'Hongkong Fried Rice (N.Veg)', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Hongkong style fried rice with chicken', isVeg: false, imageKeyword: 'hongkong fried rice' },
  { id: 'CR009', name: 'Triple Sz. Fried Rice (Veg)', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Triple sauce fried rice, vegetarian', isVeg: true, imageKeyword: 'triple fried rice' },
  { id: 'CR010', name: 'Triple Sz. Fried Rice (N.Veg)', category: 'Chinese Rice', price: 260, unit: 'plate', description: 'Triple sauce fried rice with chicken & egg', isVeg: false, imageKeyword: 'triple sauce fried rice' },
  { id: 'CR011', name: 'Mixed Fried Rice (Veg)', category: 'Chinese Rice', price: 240, unit: 'plate', description: 'Mixed fried rice, vegetarian', isVeg: true, imageKeyword: 'mixed fried rice' },
  { id: 'CR012', name: 'Mixed Fried Rice (N.Veg)', category: 'Chinese Rice', price: 260, unit: 'plate', description: 'Mixed fried rice with assorted non-veg', isVeg: false, imageKeyword: 'mixed fried rice' },
  { id: 'CR013', name: 'Egg Fried Rice', category: 'Chinese Rice', price: 230, unit: 'plate', description: 'Classic egg fried rice', isVeg: false, imageKeyword: 'egg fried rice' },
  { id: 'CR014', name: 'Prawns Fried Rice', category: 'Chinese Rice', price: 260, unit: 'plate', description: 'Fried rice tossed with prawns', isVeg: false, imageKeyword: 'prawn fried rice' },
  { id: 'CR015', name: 'Comb. Fried Rice (Veg)', category: 'Chinese Rice', price: 250, unit: 'plate', description: 'Combination fried rice, vegetarian', isVeg: true, imageKeyword: 'combination fried rice' },
  { id: 'CR016', name: 'Comb. Fried Rice (N.Veg)', category: 'Chinese Rice', price: 270, unit: 'plate', description: 'Combination fried rice with chicken, egg & prawns', isVeg: false, imageKeyword: 'combination fried rice' },

  // ══════════════════════════════════════════════════════════════════════════
  // CHINESE NOODLES (Veg / Non-Veg)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'CN001', name: 'Hakka Noodles (Veg)', category: 'Chinese Noodles', price: 210, unit: 'plate', description: 'Stir-fried Hakka noodles with vegetables', isVeg: true, imageKeyword: 'hakka noodles' },
  { id: 'CN002', name: 'Hakka Noodles (N.Veg)', category: 'Chinese Noodles', price: 230, unit: 'plate', description: 'Stir-fried Hakka noodles with chicken & egg', isVeg: false, imageKeyword: 'chicken hakka noodles' },
  { id: 'CN003', name: 'Singapore Noodles (Veg)', category: 'Chinese Noodles', price: 220, unit: 'plate', description: 'Singapore style curried noodles, vegetarian', isVeg: true, imageKeyword: 'singapore noodles' },
  { id: 'CN004', name: 'Singapore Noodles (N.Veg)', category: 'Chinese Noodles', price: 240, unit: 'plate', description: 'Singapore style curried noodles with chicken', isVeg: false, imageKeyword: 'singapore noodles' },
  { id: 'CN005', name: 'Hongkong Noodles (Veg)', category: 'Chinese Noodles', price: 220, unit: 'plate', description: 'Hongkong style noodles, vegetarian', isVeg: true, imageKeyword: 'hongkong noodles' },
  { id: 'CN006', name: 'Hongkong Noodles (N.Veg)', category: 'Chinese Noodles', price: 240, unit: 'plate', description: 'Hongkong style noodles with chicken', isVeg: false, imageKeyword: 'hongkong noodles' },
  { id: 'CN007', name: 'Schezwan Noodles (Veg)', category: 'Chinese Noodles', price: 220, unit: 'plate', description: 'Spicy Schezwan noodles, vegetarian', isVeg: true, imageKeyword: 'schezwan noodles' },
  { id: 'CN008', name: 'Schezwan Noodles (N.Veg)', category: 'Chinese Noodles', price: 240, unit: 'plate', description: 'Spicy Schezwan noodles with chicken', isVeg: false, imageKeyword: 'schezwan noodles' },

  // ══════════════════════════════════════════════════════════════════════════
  // CHARCOAL / BREADS (from menu page 1 - top items + Charcoal section)
  // ══════════════════════════════════════════════════════════════════════════
  { id: 'CB001', name: 'Gobi Parotha / Aloo Parotha', category: 'Charcoal / Breads', price: 140, unit: 'piece', description: 'Stuffed paratha with cauliflower or spiced potato', isVeg: true, imageKeyword: 'aloo paratha' },
  { id: 'CB002', name: 'Paneer Parotha / Kulcha', category: 'Charcoal / Breads', price: 150, unit: 'piece', description: 'Stuffed paratha or kulcha with paneer filling', isVeg: true, imageKeyword: 'paneer paratha' },
  { id: 'CB003', name: 'Alu Kulcha / Gobi Kulcha', category: 'Charcoal / Breads', price: 140, unit: 'piece', description: 'Soft kulcha stuffed with potato or cauliflower', isVeg: true, imageKeyword: 'kulcha bread' },
  { id: 'CB004', name: 'Roti', category: 'Charcoal / Breads', price: 17, unit: 'piece', description: 'Thin whole wheat chapati from tandoor', isVeg: true, imageKeyword: 'roti chapati' },
  { id: 'CB005', name: 'Butter Roti', category: 'Charcoal / Breads', price: 22, unit: 'piece', description: 'Whole wheat roti with butter glaze', isVeg: true, imageKeyword: 'butter roti' },
  { id: 'CB006', name: 'Chapati', category: 'Charcoal / Breads', price: 12, unit: 'piece', description: 'Plain tawa chapati', isVeg: true, imageKeyword: 'chapati' },
  { id: 'CB007', name: 'Special Chapati', category: 'Charcoal / Breads', price: 17, unit: 'piece', description: 'Special thick chapati', isVeg: true, imageKeyword: 'special chapati' },
  { id: 'CB008', name: 'Butter Chapati', category: 'Charcoal / Breads', price: 20, unit: 'piece', description: 'Chapati with butter topping', isVeg: true, imageKeyword: 'butter chapati' },
  { id: 'CB009', name: 'Bhakri', category: 'Charcoal / Breads', price: 20, unit: 'piece', description: 'Traditional Maharashtrian sorghum flatbread', isVeg: true, imageKeyword: 'bhakri bread' },
  { id: 'CB010', name: 'Puri (05 Pcs)', category: 'Charcoal / Breads', price: 50, unit: 'plate', description: 'Deep fried puffed wheat bread, 5 pieces', isVeg: true, imageKeyword: 'puri bread' },
  { id: 'CB011', name: 'Tava Parotha', category: 'Charcoal / Breads', price: 22, unit: 'piece', description: 'Layered paratha cooked on tawa', isVeg: true, imageKeyword: 'tawa paratha' },
  { id: 'CB012', name: 'Tandoor Parotha', category: 'Charcoal / Breads', price: 70, unit: 'piece', description: 'Soft leavened paratha from clay oven', isVeg: true, imageKeyword: 'tandoor paratha' },
  { id: 'CB013', name: 'Butter Parotha', category: 'Charcoal / Breads', price: 90, unit: 'piece', description: 'Paratha with generous butter glaze', isVeg: true, imageKeyword: 'butter paratha' },
  { id: 'CB014', name: 'Naan', category: 'Charcoal / Breads', price: 80, unit: 'piece', description: 'Soft leavened tandoor bread', isVeg: true, imageKeyword: 'naan bread' },
  { id: 'CB015', name: 'Butter Naan', category: 'Charcoal / Breads', price: 90, unit: 'piece', description: 'Soft naan with butter glaze', isVeg: true, imageKeyword: 'butter naan' },
  { id: 'CB016', name: 'Garlic Naan', category: 'Charcoal / Breads', price: 100, unit: 'piece', description: 'Naan topped with garlic and coriander', isVeg: true, imageKeyword: 'garlic naan' },
  { id: 'CB017', name: 'Butter Garlic Naan', category: 'Charcoal / Breads', price: 120, unit: 'piece', description: 'Naan with garlic butter and coriander topping', isVeg: true, imageKeyword: 'garlic butter naan' },
  { id: 'CB018', name: 'Stuff Parotha', category: 'Charcoal / Breads', price: 120, unit: 'piece', description: 'Paratha stuffed with mixed filling', isVeg: true, imageKeyword: 'stuffed paratha' },
];
