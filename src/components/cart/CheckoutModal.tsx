import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Banknote, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/helpers';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    total,
    couponDiscount,
    appliedCoupon,
    freeShippingThreshold,
    placeOrder,
  } = useShop();

  // Form State
  const [fullName, setFullName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('42, Gulmohar Enclave, Near Siri Fort');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110049');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('priya@okhdfcbank');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod:
        paymentMethod === 'upi'
          ? `UPI (${upiId || 'Instant App'})`
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Cash on Delivery (COD)',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E2D9] max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E2D9] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Loom & Palette" className="h-9 w-auto object-contain" />
            <div className="hidden sm:block h-5 w-[1px] bg-[#E8E2D9]" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
              Atelier Express Checkout
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#0B0B0B]"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form Content */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Contact Information */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
                <h4 className="font-serif text-base font-bold text-[#0B0B0B] mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-[10px] flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Contact Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      Mobile Number (for delivery updates)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      Email Address (for order invoice & tracking)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
                <h4 className="font-serif text-base font-bold text-[#0B0B0B] mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-[10px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Delivery Address</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      House / Flat / Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                      PIN Code (6 Digits)
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Options */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9]">
                <h4 className="font-serif text-base font-bold text-[#0B0B0B] mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-[10px] flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Payment Method</span>
                </h4>
                <div className="space-y-2.5">
                  {/* UPI Option */}
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#C9A96E] bg-[#FAF7F2]'
                        : 'border-[#E8E2D9] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#C9A96E]" />
                      <div>
                        <span className="text-xs font-semibold text-[#0B0B0B] block">
                          Instant UPI (GPay, PhonePe, Paytm, BHIM)
                        </span>
                        <span className="text-[10px] text-[#6B6B6B]">Zero transaction surcharge</span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'upi' ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'upi' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="p-3 bg-white rounded-xl border border-[#E8E2D9] ml-2">
                      <label className="text-[10px] uppercase font-semibold text-[#6B6B6B] block mb-1">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@okaxis or mobile@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                      />
                    </div>
                  )}

                  {/* Cards Option */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C9A96E] bg-[#FAF7F2]'
                        : 'border-[#E8E2D9] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#C9A96E]" />
                      <div>
                        <span className="text-xs font-semibold text-[#0B0B0B] block">
                          Credit / Debit Card (Visa, MasterCard, RuPay)
                        </span>
                        <span className="text-[10px] text-[#6B6B6B]">128-bit Encrypted SSL Gateway</span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'card' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#C9A96E] bg-[#FAF7F2]'
                        : 'border-[#E8E2D9] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-[#C9A96E]" />
                      <div>
                        <span className="text-xs font-semibold text-[#0B0B0B] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] text-[#6B6B6B]">Pay at doorstep upon delivery</span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === 'cod' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D9] shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#0B0B0B] mb-4 pb-3 border-b border-[#FAF7F2]">
                  Order Summary ({cart.length} items)
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E8E2D9]">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-xs font-semibold text-[#0B0B0B] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[10px] text-[#6B6B6B]">
                          Size: <strong className="text-[#0B0B0B]">{item.size}</strong> • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-serif font-bold text-[#0B0B0B] shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Totals */}
                <div className="space-y-2 pt-3 border-t border-[#FAF7F2] text-xs text-[#6B6B6B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#0B0B0B] font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Coupon ({appliedCoupon})</span>
                      <span>- {formatPrice(Math.round(subtotal * couponDiscount))}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#0B0B0B] font-semibold">
                      {subtotal >= freeShippingThreshold ? 'FREE' : '₹199'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#E8E2D9] text-base font-serif font-bold text-[#0B0B0B]">
                    <span>Grand Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Guarantee badge */}
                <div className="mt-5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] flex items-center gap-2 text-[11px] text-[#6B6B6B]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>Complimentary alterations & 7-day hassle-free doorstep returns guaranteed.</span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full mt-6 py-4 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-bold uppercase tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Complete Order • {formatPrice(total)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
