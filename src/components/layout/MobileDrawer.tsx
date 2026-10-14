import React from 'react';
import { X, Sparkles, ChevronRight, Heart, ShoppingBag, User, Phone, Ruler } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ActivePage } from '../../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { navigateTo, setIsSizeGuideOpen, setIsFindSizeOpen, wishlist, cartCount, setIsCartOpen } = useShop();

  if (!isOpen) return null;

  const handleNav = (page: ActivePage, params?: any) => {
    navigateTo(page, params);
    onClose();
  };

  const categories = [
    'Kurtis',
    'Co-ord Sets',
    'Dresses',
    'Sarees',
    'Tops',
    'Ethnic Wear',
    'Western Wear',
    'Occasion Wear',
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF7F2] overflow-y-auto animate-fade-in sm:hidden">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2D9]">
        <img
          src="/logo.png"
          alt="Loom & Palette By Vaishnavi"
          className="h-10 w-auto object-contain"
        />
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-black/5 text-[#0B0B0B]"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Inclusive Sizing Callout Banner */}
      <div className="m-4 p-4 rounded-2xl bg-white border border-[#C9A96E]/40 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#C9A96E] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Core Philosophy
          </span>
          <h4 className="font-serif text-base font-bold text-[#0B0B0B]">Inclusive Sizing XS to 4XL</h4>
          <p className="text-xs text-[#6B6B6B]">Every piece tailored for every silhouette.</p>
        </div>
        <button
          onClick={() => {
            setIsFindSizeOpen(true);
            onClose();
          }}
          className="px-3 py-1.5 rounded-full bg-[#0B0B0B] text-white text-xs font-medium"
        >
          Find My Size
        </button>
      </div>

      {/* Navigation Links */}
      <div className="px-6 py-4 flex flex-col gap-1 divide-y divide-[#E8E2D9]/60">
        <button
          onClick={() => handleNav('home')}
          className="py-3.5 text-left font-serif text-xl font-medium text-[#0B0B0B] flex items-center justify-between"
        >
          <span>Home</span>
          <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        <button
          onClick={() => handleNav('shop')}
          className="py-3.5 text-left font-serif text-xl font-medium text-[#0B0B0B] flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span>All Collections</span>
            <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#0B0B0B]">XS–4XL</span>
          </span>
          <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        {/* Quick Category List */}
        <div className="py-3 pl-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleNav('shop', { category: cat })}
              className="px-3 py-1.5 rounded-full bg-white border border-[#E8E2D9] text-xs font-medium text-[#0B0B0B] hover:border-[#C9A96E]"
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleNav('lookbook')}
          className="py-3.5 text-left font-serif text-xl font-medium text-[#0B0B0B] flex items-center justify-between"
        >
          <span>The Editorial Lookbook</span>
          <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        <button
          onClick={() => handleNav('about')}
          className="py-3.5 text-left font-serif text-xl font-medium text-[#0B0B0B] flex items-center justify-between"
        >
          <span>Our Story & Vaishnavi</span>
          <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        <button
          onClick={() => handleNav('size-guide')}
          className="py-3.5 text-left font-serif text-xl font-medium text-[#0B0B0B] flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#C9A96E]" />
            <span>Dedicated Size Guide (XS–4XL)</span>
          </span>
          <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
        </button>

        <button
          onClick={() => handleNav('contact')}
          className="py-3.5 text-left font-serif text-xl font-medium text-[#0B0B0B] flex items-center justify-between"
        >
          <span>Atelier Contact & WhatsApp</span>
          <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
        </button>
      </div>

      {/* Footer Info inside Drawer */}
      <div className="mt-auto p-6 bg-white border-t border-[#E8E2D9]">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[#6B6B6B]">
            <p className="font-semibold text-[#0B0B0B]">Loom & Palette Atelier</p>
            <p>New Delhi • Worldwide Shipping</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleNav('wishlist');
              }}
              className="p-2.5 rounded-full bg-[#FAF7F2] text-[#0B0B0B] border border-[#E8E2D9] relative"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setIsCartOpen(true);
                onClose();
              }}
              className="p-2.5 rounded-full bg-[#0B0B0B] text-white relative"
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A96E] text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <p className="text-[11px] text-[#6B6B6B] text-center">
          © {new Date().getFullYear()} Loom & Palette By Vaishnavi. Woven With Love.
        </p>
      </div>
    </div>
  );
};
