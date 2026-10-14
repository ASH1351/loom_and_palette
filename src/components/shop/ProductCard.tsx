import React, { useState } from 'react';
import { Heart, Star, Sparkles, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/helpers';
import { useShop } from '../../context/ShopContext';
import { TiltCard } from '../common/TiltCard';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[0] || 'M');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    navigateTo('product', { product });
  };

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    addToCart(product, size, product.colors[0]?.name, 1);
  };

  return (
    <TiltCard className="h-full">
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowQuickAdd(false);
        }}
        className="group relative flex flex-col h-full rounded-2xl bg-white border border-[#E8E2D9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        {/* Product Image Container with Dual Image Crossfade */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
              isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            } group-hover:scale-105 transition-transform duration-700`}
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-105 transition-transform duration-700`}
              loading="lazy"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-full bg-[#0B0B0B]/90 backdrop-blur-md text-[#C9A96E] text-[10px] font-semibold tracking-wider uppercase border border-[#C9A96E]/30">
                {product.badge}
              </span>
            )}
            {product.discount && (
              <span className="px-2 py-0.5 rounded-full bg-[#D8B4A6] text-[#0B0B0B] text-[10px] font-bold">
                {product.discount}
              </span>
            )}
          </div>

          {/* Wishlist Heart Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#0B0B0B] shadow-md backdrop-blur-md transition-all hover:scale-110"
            aria-label="Toggle Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#0B0B0B]'
              }`}
            />
          </button>

          {/* Quick-Add Size Overlay on Desktop Hover */}
          <div
            className={`hidden lg:flex absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] transition-all duration-300 transform ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0B0B0B]">
                  Quick Add (XS to 4XL)
                </span>
                <span className="text-[10px] text-[#C9A96E] font-medium">Select Size</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="flex-1 min-w-[32px] py-1 text-[10px] font-semibold rounded bg-[#FAF7F2] hover:bg-[#0B0B0B] hover:text-[#C9A96E] border border-[#E8E2D9] transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Information */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-1.5">
              <span className="uppercase tracking-widest text-[10px] font-medium text-[#C9A96E]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-[#0B0B0B] font-medium">
                <Star className="w-3 h-3 fill-[#C9A96E] text-[#C9A96E]" />
                <span className="text-xs">{product.rating}</span>
                <span className="text-[10px] text-[#6B6B6B]">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Title */}
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#0B0B0B] line-clamp-1 group-hover:text-[#C9A96E] transition-colors">
              {product.name}
            </h3>

            {/* Color Swatch dots */}
            <div className="flex items-center gap-1.5 my-2">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-[#6B6B6B] ml-1">
                {product.colors.length} {product.colors.length === 1 ? 'shade' : 'shades'}
              </span>
            </div>
          </div>

          {/* Pricing & Mobile Quick Action */}
          <div className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base sm:text-lg font-bold text-[#0B0B0B]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#6B6B6B] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile View Pill */}
            <span className="lg:hidden text-[11px] font-semibold text-[#0B0B0B] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#E8E2D9] flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#C9A96E]" />
              View
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};
