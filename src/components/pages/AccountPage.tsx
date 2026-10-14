import React, { useState } from 'react';
import { Package, User, MapPin, Search, CheckCircle2, Truck, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/helpers';

export const AccountPage: React.FC = () => {
  const { orders, navigateTo } = useShop();
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [searchDone, setSearchDone] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchDone(true);
    const found = orders.find(
      (o) => o.orderId.toLowerCase() === trackingIdInput.trim().toLowerCase()
    );
    if (found) {
      setTrackedOrder(found);
    } else {
      // Mock tracking if using sample LP ID
      if (trackingIdInput.trim().toUpperCase().startsWith('LP-')) {
        setTrackedOrder({
          orderId: trackingIdInput.trim().toUpperCase(),
          date: 'Yesterday',
          status: 'In Artisanal Quality Check',
          items: [],
          total: 4299,
          customer: {
            fullName: 'Valued Client',
            city: 'New Delhi',
            pincode: '110001',
          },
        });
      } else {
        setTrackedOrder(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-14 h-14 rounded-full bg-white border border-[#E8E2D9] text-[#C9A96E] flex items-center justify-center mx-auto mb-3 shadow-sm">
          <User className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0B0B]">
          Atelier Client Account & Order Tracking
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-light">
          Track the journey of your hand-loomed apparel from our workshop to your doorstep.
        </p>
      </div>

      {/* Order Tracking Lookup Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm mb-12">
        <h3 className="font-serif text-lg font-bold text-[#0B0B0B] mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#C9A96E]" />
          <span>Real-Time Shipment Lookup</span>
        </h3>
        <p className="text-xs text-[#6B6B6B] font-light mb-4">
          Enter your 6-digit Order ID (e.g. <strong>LP-842910</strong>) or the phone number provided at checkout.
        </p>

        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="e.g. LP-842910"
            value={trackingIdInput}
            onChange={(e) => setTrackingIdInput(e.target.value)}
            className="flex-1 text-xs uppercase px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E] font-mono tracking-wider"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-bold transition-all shadow-md shrink-0"
          >
            Track Shipment
          </button>
        </form>

        {/* Tracking Result Pipeline */}
        {searchDone && (
          <div className="mt-8 pt-6 border-t border-[#FAF7F2] animate-fade-in">
            {trackedOrder ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#FAF7F2]">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B6B6B]">Shipment Status</span>
                    <h4 className="font-serif text-xl font-bold text-[#0B0B0B] flex items-center gap-2">
                      <span>Order #{trackedOrder.orderId}</span>
                      <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        In Transit
                      </span>
                    </h4>
                  </div>
                  <div className="text-xs text-[#6B6B6B] mt-2 sm:mt-0">
                    <span>Estimated Arrival: </span>
                    <strong className="text-[#0B0B0B]">In 2 Business Days (Delhivery Express)</strong>
                  </div>
                </div>

                {/* 5-Step Progress Stepper */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#C9A96E]/40">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <strong className="text-xs text-[#0B0B0B] block">Order Verified</strong>
                    <span className="text-[10px] text-[#6B6B6B]">Pattern Allocated</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#C9A96E]/40">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <strong className="text-xs text-[#0B0B0B] block">Tailoring & Drape</strong>
                    <span className="text-[10px] text-[#6B6B6B]">Atelier Finished</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border-2 border-[#C9A96E]">
                    <Clock className="w-5 h-5 text-[#C9A96E] mx-auto mb-1 animate-pulse" />
                    <strong className="text-xs text-[#0B0B0B] block">Quality Inspection</strong>
                    <span className="text-[10px] text-[#C9A96E] font-medium">Final Steam & Pack</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-gray-200 opacity-60">
                    <Truck className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <strong className="text-xs text-[#0B0B0B] block">Doorstep Delivery</strong>
                    <span className="text-[10px] text-[#6B6B6B]">Out for Delivery</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 text-center">
                Order not found. Please verify the ID or check your confirmation email. (Try entering an existing order ID or "LP-123456").
              </div>
            )}
          </div>
        )}
      </div>

      {/* Past Orders History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm">
        <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-4">
          Order History ({orders.length})
        </h3>

        {orders.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#6B6B6B]">
            <Package className="w-10 h-10 text-[#E8E2D9] mx-auto mb-2" />
            <p>You have not placed any orders yet.</p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-3 text-[#C9A96E] hover:underline font-semibold"
            >
              Start Shopping Now →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#FAF7F2] space-y-4">
            {orders.map((o) => (
              <div key={o.orderId} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base text-[#0B0B0B]">
                      Order #{o.orderId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[10px] font-semibold text-[#C9A96E] border border-[#C9A96E]/30">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    Placed on {o.date} • {o.items.length} items • Total: {formatPrice(o.total)}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setTrackingIdInput(o.orderId);
                    setTrackedOrder(o);
                    setSearchDone(true);
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#0B0B0B] text-xs font-semibold border border-[#E8E2D9] self-start sm:self-auto"
                >
                  View Details & Track
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
