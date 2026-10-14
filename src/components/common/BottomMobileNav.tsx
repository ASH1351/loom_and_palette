import React from 'react';
import { Home, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BottomMobileNav: React.FC = () => {
  const { activePage, navigateTo, cartCount, wishlist, setIsCartOpen } = useShop();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => navigateTo('home') },
    { id: 'shop', label: 'Shop', icon: Sparkles, action: () => navigateTo('shop') },
    { 
      id: 'wishlist', 
      label: 'Wishlist', 
      icon: Heart, 
      badge: wishlist.length > 0 ? wishlist.length : undefined,
      action: () => navigateTo('wishlist') 
    },
    { 
      id: 'cart', 
      label: 'Cart', 
      icon: ShoppingBag, 
      badge: cartCount > 0 ? cartCount : undefined,
      action: () => setIsCartOpen(true) 
    },
    { id: 'account', label: 'Account', icon: User, action: () => navigateTo('account') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E8E2D9] py-2 px-3 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] relative py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#0B0B0B]' : 'text-[#6B6B6B]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#C9A96E]' : 'currentColor'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-[10px] font-bold flex items-center justify-center border border-[#C9A96E]/50">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-semibold text-[#0B0B0B]' : 'text-[#6B6B6B]'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C9A96E] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
