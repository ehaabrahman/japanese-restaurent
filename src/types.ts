export type DietType = 'veg' | 'non-veg' | 'both';

export type MenuCategory = 'ramen' | 'sushi' | 'donburi' | 'starters' | 'zen-chai';

export interface MenuItem {
  id: string;
  name: string;
  japaneseName?: string;
  category: MenuCategory;
  description: string;
  price: number;
  nonVegPrice?: number;
  diet: DietType;
  tag?: string;
  tagColor?: string;
  pieces?: string;
  spiceBadge?: string;
  featureSubtitle?: string;
  image?: string;
  isCuratedHighlight?: boolean;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  colorClass?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  variant?: 'veg' | 'non-veg';
  brothStyle?: string;
  noodleTexture?: string;
  spiceLevel?: string;
  sweetness?: string;
  iceLevel?: string;
  selectedAddOns: AddOnOption[];
  notes?: string;
  unitPrice: number;
  quantity: number;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seating: 'counter' | 'booth' | 'terrace';
  specialRequests?: string;
  createdAt: string;
}

export interface PlacedOrder {
  orderId: string;
  tokenNumber: string;
  customerName: string;
  customerPhone: string;
  orderType: 'counter-pickup' | 'dine-in';
  items: CartItem[];
  subtotal: number;
  packagingCharge: number;
  tax: number;
  grandTotal: number;
  placedAt: string;
  estimatedMinutes: number;
}
