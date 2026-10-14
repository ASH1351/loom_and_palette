export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | '4XL';

export type ProductCategory = 
  | 'Kurtis'
  | 'Co-ord Sets'
  | 'Dresses'
  | 'Sarees'
  | 'Tops'
  | 'Ethnic Wear'
  | 'Western Wear'
  | 'Occasion Wear';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory | string;
  subCategory?: string;
  price: number;
  originalPrice: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  sizes: string[];
  availableSizes: string[];
  colors: ProductColor[];
  selectedColor: string;
  fabric: string;
  occasion: string;
  description: string;
  features: string[];
  careInstructions: string;
  images: string[];
  modelSize?: string;
  weight?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  sizePurchased: string;
  verified: boolean;
  comment: string;
  image?: string;
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'product'
  | 'about'
  | 'lookbook'
  | 'size-guide'
  | 'contact'
  | 'wishlist'
  | 'account'
  | 'order-tracking'
  | 'faq'
  | 'shipping-returns'
  | 'privacy';
