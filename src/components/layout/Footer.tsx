import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Welcome to the Circle', 'Use coupon code LOOM10 for 10% off your order!', 'gold');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B0B0B] text-[#FAF7F2] pt-16 pb-24 sm:pb-16 border-t border-[#C9A96E]/20 overflow-hidden">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#C9A96E]/30 text-[#C9A96E]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">Sizes XS to 4XL</h5>
              <p className="text-xs text-[#6B6B6B] mt-0.5">True proportional grading for every curve</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#C9A96E]/30 text-[#C9A96E]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">Free Express Shipping</h5>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Complimentary delivery across India above ₹1999</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#C9A96E]/30 text-[#C9A96E]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">7-Day Easy Returns</h5>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Hassle-free doorstep pickup & exchanges</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-3 rounded-full bg-white/5 border border-[#C9A96E]/30 text-[#C9A96E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">Authentic Handloom</h5>
              <p className="text-xs text-[#6B6B6B] mt-0.5">Direct from certified master craftspeople</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand Identity with exact uploaded logo on soft luxury pill */}
          <div className="lg:col-span-2">
            <div className="inline-block p-3 rounded-2xl bg-white mb-5 shadow-sm">
              <img
                src="/logo.png"
                alt="Loom & Palette — By Vaishnavi"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[#FAF7F2]/70 font-light leading-relaxed max-w-sm mb-6">
              Loom & Palette By Vaishnavi is an artisanal luxury atelier born from a steadfast conviction: haute craftsmanship belongs to every body. Woven with love, worn with confidence.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A96E] flex items-center justify-center text-white transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A96E] flex items-center justify-center text-white transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <span className="text-xs text-[#C9A96E] font-medium tracking-wider">
                @loomandpalette.official
              </span>
            </div>
          </div>

          {/* Column 3: The Collections */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/70 font-light">
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Kurtis' })}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Handcrafted Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Co-ord Sets' })}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Modal & Satin Co-ords
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Dresses' })}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Mulberry Silk Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Sarees' })}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Banarasi Organza Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Occasion Wear' })}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Gota Patti Festive Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-[#C9A96E] font-medium hover:underline"
                >
                  All Inclusive XS–4XL →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Sizing & Concierge */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wider uppercase">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/70 font-light">
              <li>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Full Size Guide (Inches & CM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Vaishnavi’s Atelier Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Atelier Appointments & WhatsApp
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('lookbook')}
                  className="hover:text-[#C9A96E] transition-colors"
                >
                  Editorial Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter Privilege */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wider uppercase">
              Private Circle
            </h4>
            <p className="text-xs text-[#FAF7F2]/70 font-light leading-relaxed mb-4">
              Join the Loom & Palette circle — receive 10% off your inaugural order and private collection previews.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A96E]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#C9A96E] hover:bg-[#b89758] text-[#0B0B0B] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <span>Join Circle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
        <p>© {new Date().getFullYear()} Loom & Palette By Vaishnavi. All Rights Reserved.</p>

        {/* Accepted Payment Methods */}
        <div className="flex items-center gap-2 text-[11px] text-[#FAF7F2]/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span>Secure Payments:</span>
          <span className="text-white font-medium">UPI</span>
          <span>•</span>
          <span className="text-white font-medium">Visa</span>
          <span>•</span>
          <span className="text-white font-medium">Mastercard</span>
          <span>•</span>
          <span className="text-white font-medium">RuPay</span>
          <span>•</span>
          <span className="text-[#C9A96E] font-medium">COD Available</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
            Privacy Policy
          </button>
          <span>•</span>
          <button onClick={() => navigateTo('shipping-returns')} className="hover:text-white transition-colors">
            Shipping & Returns
          </button>
          <span>•</span>
          <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
            FAQ
          </button>
        </div>
      </div>
    </footer>
  );
};
