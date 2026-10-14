import React from 'react';
import { Sparkles, HeartHandshake, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigateTo, setIsFindSizeOpen } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          The Soul of Loom & Palette
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#0B0B0B] leading-tight">
          Where Generational Craft Meets Inclusive Couture
        </h1>
        <p className="mt-4 text-[#6B6B6B] text-sm sm:text-base font-light leading-relaxed">
          Founded by Vaishnavi, Loom & Palette was born from an unyielding belief: high luxury should never be restricted to standard sizes. Every woman deserves the poetry of real handloom silk.
        </p>
      </div>

      {/* Two Column Brand Genesis Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
              alt="Handloom Weaving Process"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#0B0B0B] text-white max-w-xs shadow-xl hidden sm:block border border-[#C9A96E]/40">
            <span className="font-serif text-3xl font-bold text-[#C9A96E]">32+ Hours</span>
            <p className="text-xs text-white/80 mt-1">
              Of painstaking manual wooden handloom weaving per heirloom garment.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-semibold mb-2">
            The Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0B0B] leading-tight mb-6">
            "Loom" is the discipline of craft. "Palette" is the celebration of emotion.
          </h2>

          <div className="space-y-4 text-sm text-[#6B6B6B] font-light leading-relaxed mb-8">
            <p>
              In traditional fashion houses, pattern grading is done through algorithmic scaling — an XS pattern is simply enlarged uniformly to make an XL or 3XL. The result? Necklines that sag, armholes that pinch, and garments that lose their intended silhouette.
            </p>
            <p>
              Vaishnavi overturned this convention by developing <strong>individual proportional master patterns</strong> for sizes XS, S, M, L, XL, 2XL, 3XL, and 4XL. We adjust shoulder slope, bust dart placement, and waist ease independently for every size tier.
            </p>
            <p>
              When you wear a Loom & Palette garment, it doesn’t just fit — it empowers you to walk into any room with unconditional majesty and poise.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setIsFindSizeOpen(true)}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#0B0B0B] border border-[#E8E2D9] text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Sizing
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Ethical Artisanal Craft */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C9A96E] flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-2">
            UNESCO Weaving Clusters
          </h3>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Direct partnerships with hereditary master weavers in Varanasi, Chanderi, and Maheshwar. Fair wages and artisan health funds built into every piece.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C9A96E] flex items-center justify-center mb-6">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-2">
            Inclusive Sizing (XS–4XL)
          </h3>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Real women fitting trials across all eight sizes. We ensure true comfort, ease of movement, and regal contouring for petite and plus-size women alike.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C9A96E] flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-2">
            Mindful Zero-Waste Philosophy
          </h3>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Fabric off-cuts are turned into heirloom potli bags and inner facings. Pure AZO-free botanical and vegetal dyes that protect our waterways.
          </p>
        </div>
      </div>
    </div>
  );
};
