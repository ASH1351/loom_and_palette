import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, PackageCheck, Printer, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/helpers';

export const OrderConfirmation: React.FC = () => {
  const { completedOrder, navigateTo } = useShop();

  useEffect(() => {
    // Subtle luxury champagne & gold confetti burst
    if (completedOrder) {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#C9A96E', '#DFCA9B', '#D8B4A6', '#0B0B0B'],
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [completedOrder]);

  if (!completedOrder) return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E2D9] shadow-xl text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] border-2 border-[#C9A96E] text-[#C9A96E] flex items-center justify-center mx-auto mb-6 shadow-md">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        {/* Brand Tag */}
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C9A96E] block mb-2">
          Woven With Love • Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B0B0B] mb-3">
          Thank you, {completedOrder.customer.fullName}
        </h1>

        <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto mb-8 font-light">
          Your order has been safely placed with our master weavers. A confirmation email with tracking credentials has been sent to{' '}
          <strong className="text-[#0B0B0B]">{completedOrder.customer.email}</strong>.
        </p>

        {/* Order Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9] text-left mb-8 text-xs">
          <div>
            <span className="text-[#6B6B6B] block text-[10px] uppercase font-semibold">Order Number</span>
            <span className="font-mono font-bold text-[#0B0B0B] text-sm">{completedOrder.orderId}</span>
          </div>
          <div>
            <span className="text-[#6B6B6B] block text-[10px] uppercase font-semibold">Date</span>
            <span className="font-medium text-[#0B0B0B]">{completedOrder.date}</span>
          </div>
          <div>
            <span className="text-[#6B6B6B] block text-[10px] uppercase font-semibold">Payment</span>
            <span className="font-medium text-[#0B0B0B]">{completedOrder.customer.paymentMethod}</span>
          </div>
          <div>
            <span className="text-[#6B6B6B] block text-[10px] uppercase font-semibold">Total Paid</span>
            <span className="font-serif font-bold text-[#0B0B0B] text-sm">
              {formatPrice(completedOrder.total)}
            </span>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="text-left mb-8 border border-[#E8E2D9] rounded-2xl p-4 bg-white">
          <h4 className="font-serif text-sm font-semibold text-[#0B0B0B] mb-3">
            Garments in this Shipment ({completedOrder.items.length})
          </h4>
          <div className="divide-y divide-[#FAF7F2]">
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 rounded-lg bg-[#FAF7F2] overflow-hidden border border-[#E8E2D9]">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-[#0B0B0B]">{item.product.name}</h5>
                    <p className="text-[10px] text-[#6B6B6B]">
                      Size: <strong className="text-[#0B0B0B]">{item.size}</strong> • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-serif font-bold text-[#0B0B0B]">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Destination Recap */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9] text-left text-xs mb-8 flex items-start gap-3">
          <PackageCheck className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
          <div>
            <strong className="block text-[#0B0B0B] mb-0.5">Shipping Destination:</strong>
            <p className="text-[#6B6B6B]">
              {completedOrder.customer.address}, {completedOrder.customer.city},{' '}
              {completedOrder.customer.state} — {completedOrder.customer.pincode}
            </p>
            <p className="text-[#6B6B6B] mt-0.5">Recipient Contact: +91 {completedOrder.customer.phone}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            <ShoppingBag className="w-4 h-4 text-[#C9A96E] group-hover:text-white" />
            <span>Continue Shopping</span>
          </button>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#0B0B0B] hover:bg-[#FAF7F2] border border-[#E8E2D9] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#6B6B6B]" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
