import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, ArrowRight, Tag, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/helpers';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    total,
    freeShippingThreshold,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    navigateTo,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Free shipping progress calculation
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl border-l border-[#E8E2D9] animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8E2D9] bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
            <h3 className="font-serif text-xl font-bold text-[#0B0B0B]">Your Wardrobe</h3>
            <span className="text-xs text-[#6B6B6B]">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#0B0B0B] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-white border-b border-[#E8E2D9]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#0B0B0B] font-medium flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C9A96E]" />
              {amountNeededForFreeShipping === 0
                ? 'Congratulations! You unlocked Complimentary Express Shipping.'
                : `Add ${formatPrice(amountNeededForFreeShipping)} more for Free Shipping`}
            </span>
            <span className="font-semibold text-[#0B0B0B]">{shippingPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8E2D9]">
            <div
              className="h-full bg-gradient-to-r from-[#DFCA9B] to-[#C9A96E] transition-all duration-300"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <ShoppingBag className="w-12 h-12 text-[#E8E2D9] mb-3" />
              <h4 className="font-serif text-xl font-semibold text-[#0B0B0B] mb-1">
                Your wardrobe is waiting
              </h4>
              <p className="text-xs text-[#6B6B6B] max-w-xs mb-6">
                Explore our handloom creations tailored from XS to 4XL.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="px-6 py-2.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E2D9] flex gap-3 shadow-sm"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E8E2D9]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-semibold text-[#0B0B0B] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="text-[#6B6B6B] hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6B6B6B]">
                      <span className="font-bold text-[#0B0B0B] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E2D9]">
                        Size: {item.size}
                      </span>
                      <span>•</span>
                      <span>{item.color}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF7F2]">
                    <div className="flex items-center border border-[#E8E2D9] rounded-lg bg-[#FAF7F2]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, -1)}
                        className="px-2 py-0.5 text-xs text-[#0B0B0B] hover:bg-white rounded-l"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, 1)}
                        className="px-2 py-0.5 text-xs text-[#0B0B0B] hover:bg-white rounded-r"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-sm font-bold text-[#0B0B0B]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions & Summary */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8E2D9] space-y-4">
            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Code {appliedCoupon} applied ({couponDiscount * 100}% OFF)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-rose-600 hover:underline font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. LOOM10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] uppercase font-mono tracking-wider focus:outline-none focus:border-[#C9A96E]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0B0B0B] text-white text-xs font-medium hover:bg-[#C9A96E] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-xs text-rose-600">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#6B6B6B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#0B0B0B] font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Special Atelier Privilege</span>
                  <span>- {formatPrice(Math.round(subtotal * couponDiscount))}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-[#0B0B0B] font-semibold">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '₹199'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8E2D9] text-base text-[#0B0B0B] font-serif font-bold">
                <span>Total Due</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all duration-300 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
