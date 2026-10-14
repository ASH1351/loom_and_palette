import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';
import { Product, CartItem, ActivePage, ClothingSize } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'gold';
}

export interface OrderData {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: string;
  };
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  selectedProduct: Product | null;
  activePage: ActivePage;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isSizeGuideOpen: boolean;
  isFindSizeOpen: boolean;
  toasts: ToastMessage[];
  filterCategory: string | null;
  filterSize: string | null;
  filterColor: string | null;
  searchQuery: string;
  appliedCoupon: string | null;
  couponDiscount: number;
  completedOrder: OrderData | null;
  orders: OrderData[];
  freeShippingThreshold: number;
  subtotal: number;
  total: number;
  cartCount: number;
  
  // Actions
  setActivePage: (page: ActivePage) => void;
  navigateTo: (page: ActivePage, params?: { category?: string; size?: string; color?: string; product?: Product }) => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setIsFindSizeOpen: (open: boolean) => void;
  setFilterCategory: (category: string | null) => void;
  setFilterSize: (size: string | null) => void;
  setFilterColor: (color: string | null) => void;
  setSearchQuery: (query: string) => void;
  
  addToCart: (product: Product, size: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  placeOrder: (customerData: OrderData['customer']) => OrderData;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(productsData as Product[]);
  
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lp_wishlist');
      return saved ? JSON.parse(saved) : ['lp-001', 'lp-003'];
    } catch {
      return ['lp-001', 'lp-003'];
    }
  });

  const [orders, setOrders] = useState<OrderData[]>(() => {
    try {
      const saved = localStorage.getItem('lp_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isFindSizeOpen, setIsFindSizeOpen] = useState<boolean>(false);
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterSize, setFilterSize] = useState<string | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Orders
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('lp_cart', JSON.stringify(cart));
    } catch {
      // storage quota or private mode
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('lp_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage quota
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('lp_orders', JSON.stringify(orders));
    } catch {
      // storage quota
    }
  }, [orders]);

  const freeShippingThreshold = 1999;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * couponDiscount);
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 199;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (
    page: ActivePage, 
    params?: { category?: string; size?: string; color?: string; product?: Product }
  ) => {
    if (params?.category !== undefined) setFilterCategory(params.category);
    if (params?.size !== undefined) setFilterSize(params.size);
    if (params?.color !== undefined) setFilterColor(params.color);
    if (params?.product) setSelectedProduct(params.product);
    
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, color?: string, quantity: number = 1) => {
    const itemColor = color || product.colors[0]?.name || 'Natural';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === itemColor
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, size, color: itemColor, quantity }];
      }
    });

    showToast('Added to Cart', `${product.name} (Size: ${size}) added to your collection.`, 'gold');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = products.find((p) => p.id === productId);
      if (exists) {
        showToast('Removed from Wishlist', `${prod?.name || 'Item'} removed.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${prod?.name || 'Item'} saved to your favorites.`, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LOOM10') {
      setAppliedCoupon('LOOM10');
      setCouponDiscount(0.10); // 10%
      showToast('Coupon Applied!', '10% discount applied to your order.', 'gold');
      return { success: true, message: '10% discount successfully applied!' };
    } else if (cleanCode === 'VAISHNAVI15') {
      setAppliedCoupon('VAISHNAVI15');
      setCouponDiscount(0.15); // 15%
      showToast('VIP Privilege', 'Vaishnavi circle 15% discount applied!', 'gold');
      return { success: true, message: '15% luxury discount applied!' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try LOOM10 or VAISHNAVI15' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const placeOrder = (customerData: OrderData['customer']): OrderData => {
    const orderId = 'LP-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderData = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      customer: customerData,
    };

    setCompletedOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    removeCoupon();
    setIsCheckoutOpen(false);

    showToast('Order Confirmed!', `Thank you ${customerData.fullName}. Order #${orderId} placed.`, 'gold');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        selectedProduct,
        activePage,
        isCartOpen,
        isCheckoutOpen,
        isSizeGuideOpen,
        isFindSizeOpen,
        toasts,
        filterCategory,
        filterSize,
        filterColor,
        searchQuery,
        appliedCoupon,
        couponDiscount,
        completedOrder,
        orders,
        freeShippingThreshold,
        subtotal,
        total,
        cartCount,
        setActivePage,
        navigateTo,
        setSelectedProduct,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsSizeGuideOpen,
        setIsFindSizeOpen,
        setFilterCategory,
        setFilterSize,
        setFilterColor,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
