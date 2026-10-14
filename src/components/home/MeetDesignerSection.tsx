import React from 'react';
import { Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MeetDesignerSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Designer Portrait with luxury gold frame & signature accent */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                alt="Vaishnavi — Founder & Creative Director, Loom & Palette"
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Caption inside Portrait */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold block mb-1">
                  Creative Director & Founder
                </span>
                <h4 className="font-serif text-2xl font-bold">Vaishnavi</h4>
                <p className="text-xs text-white/80 font-light mt-0.5">
                  Atelier Loom & Palette, New Delhi
                </p>
              </div>
            </div>

            {/* Decorative Gold Border Offset Box */}
            <div className="absolute -inset-2.5 rounded-3xl border border-[#C9A96E]/50 -z-10 translate-x-3 translate-y-3 hidden sm:block pointer-events-none" />

            {/* Artisanal Heritage Seal Badge */}
            <div className="absolute -bottom-5 -right-2 sm:right-4 z-20 p-4 rounded-2xl bg-[#0B0B0B] text-white border border-[#C9A96E]/60 shadow-xl max-w-[210px]">
              <div className="flex items-center gap-2 mb-1 text-[#C9A96E]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-semibold">Our Promise</span>
              </div>
              <p className="text-xs font-serif italic text-white/90 leading-tight">
                "No woman should ever have to alter her dream outfit to feel divine."
              </p>
            </div>
          </div>

          {/* Right: Vaishnavi's Story Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center gap-2 mb-3">
              <HeartHandshake className="w-4 h-4" />
              The Artisan Behind the Loom
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B] leading-tight mb-6">
              "Weaving craft into modern couture — for every body."
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#6B6B6B] font-light leading-relaxed mb-8">
              <p>
                Growing up immersed in the rich handloom heritage of central India, I was mesmerized by how a simple wooden loom could interlace pure silk and fine metallic zari into wearable poetry. But as I watched women shop, a painful recurring pattern emerged: high-end luxury fashion was ruthlessly standardized for a singular body size.
              </p>
              <p>
                Women wearing sizes XL, 2XL, or 4XL were relegated to shapeless, oversized tunics hidden in forgotten corners of boutiques. I created <strong className="text-[#0B0B0B] font-medium">Loom & Palette</strong> to shatter that compromise forever.
              </p>
              <p>
                Every silhouette we produce is individually pattern-graded from XS to 4XL. We adjust bust darts, neckline plunge, sleeve circumference and flare volume with millimeter precision so you feel regally comfortable, empowered, and truly seen.
              </p>
            </div>

            {/* Sizing Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D9]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="text-xs font-medium text-[#0B0B0B]">Individual pattern grading per size</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D9]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="text-xs font-medium text-[#0B0B0B]">100% Certified authentic handloom silks</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D9]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="text-xs font-medium text-[#0B0B0B]">Zero mass production shortcuts</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E2D9]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span className="text-xs font-medium text-[#0B0B0B]">Real women fit-tested across XS–4XL</span>
              </div>
            </div>

            {/* Handwritten Signature Accent */}
            <div className="flex items-center justify-between w-full pt-4 border-t border-[#E8E2D9]">
              <div>
                <p className="font-script-accent text-3xl sm:text-4xl text-[#0B0B0B]">
                  Vaishnavi
                </p>
                <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] mt-1">
                  Vaishnavi • Founder, Loom & Palette
                </p>
              </div>

              <button
                onClick={() => navigateTo('about')}
                className="px-5 py-2.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Read Full Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
