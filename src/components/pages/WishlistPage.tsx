import React from 'react';
import { Heart, Sparkles, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/helpers';
import { ProductCard } from '../shop/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigateTo, addToCart, toggleWishlist } = useShop();

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center sm:justify-start gap-2 mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#C9A96E]" />
          <span>Personal Vault</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B0B0B]">
          Your Saved Desires
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-light">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'creation' : 'creations'} saved for your next bespoke celebration.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="p-12 sm:p-20 text-center rounded-3xl bg-white border border-[#E8E2D9] max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] text-[#C9A96E] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0B0B0B] mb-2">
            Your wishlist is untouched
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-sm mx-auto mb-6 font-light">
            Tap the heart icon on any kurti, saree, or co-ord set to save your favorite sizes and shades.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-semibold transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Handloom Edits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favoriteProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
