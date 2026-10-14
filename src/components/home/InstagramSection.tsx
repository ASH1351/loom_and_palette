import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const INSTA_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    caption: 'Chanderi zari Anarkali in Rose Blush draped on size 2XL. #LoomAndPalette',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    caption: 'Aari embroidery meets modern fluid tailoring. #ArtisanalLuxury',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    caption: 'Pure Kadwa Banarasi weaves fresh off the handloom in Varanasi. #UNESCOCraft',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
    caption: 'Tiered mulberry silk midi dress. Breathable elegance for sizes XS to 4XL.',
  },
];

export const InstagramSection: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Exclusive Invitation', 'Your 10% coupon code LOOM10 is active!', 'gold');
      setEmail('');
    }
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D9] text-xs font-semibold text-[#0B0B0B] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all mb-3 shadow-sm"
        >
          <InstagramIcon className="w-4 h-4 text-[#C9A96E]" />
          <span>Follow @loomandpalette.official</span>
        </a>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#0B0B0B]">
          In the Loom & Palette World
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B6B6B] font-light">
          Behind the scenes at our ateliers, master weaver chronicles, and real client drapes.
        </p>
      </div>

      {/* 4-Column Instagram Editorial Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-16">
        {INSTA_POSTS.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0B0B0B] shadow-sm cursor-pointer"
          >
            <img
              src={post.image}
              alt="Loom & Palette Instagram"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0B0B0B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
              <InstagramIcon className="w-6 h-6 text-[#C9A96E] mb-2" />
              <p className="text-[11px] font-light line-clamp-3 text-white/90">
                {post.caption}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Newsletter Privilege Banner */}
      <div className="relative rounded-3xl bg-[#0B0B0B] text-white p-8 sm:p-14 overflow-hidden border border-[#C9A96E]/30 shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C9A96E]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-[#C9A96E] text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Atelier Privilege
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal leading-tight mb-4">
            Join the Loom & Palette Circle
          </h3>
          <p className="text-xs sm:text-base text-white/70 font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Receive private collection launches, bespoke size consultations, and{' '}
            <strong className="text-[#C9A96E]">10% off your inaugural order</strong> with code{' '}
            <span className="underline decoration-[#C9A96E] font-semibold text-white">LOOM10</span>.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your personal email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs sm:text-sm px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A96E] backdrop-blur-md"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C9A96E] hover:bg-[#b89758] text-[#0B0B0B] text-xs uppercase tracking-widest font-bold transition-all shadow-md shrink-0 flex items-center justify-center gap-2 group"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
