import React from 'react';
import { Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { TiltCard } from '../common/TiltCard';

interface LookbookItem {
  id: string;
  title: string;
  season: string;
  modelDetails: string;
  featuredProductSlug: string;
  description: string;
  image: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'The Regal Chanderi Soirée',
    season: 'Festive Couture Edit',
    modelDetails: 'Model is 5’8”, Bust 44”, wearing Size 2XL',
    featuredProductSlug: 'gulabi-chanderi-zari-anarkali-set',
    description: 'A diaphanous symphony of handwoven Maheshwar Chanderi with authentic tilla zari borders. Proportioned to flutter with effortless royal volume.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'look-2',
    title: 'Aari Noir Modernity',
    season: 'Autumn Silhouette',
    modelDetails: 'Model is 5’6”, Bust 48”, wearing Size 3XL',
    featuredProductSlug: 'kashmiri-aari-embroidered-coord-set',
    description: 'High-waisted wide leg trousers paired with an asymmetrical tunic trimmed in hand-guided Kashmiri needlework. Fluid modal silk that caresses natural curves.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'look-3',
    title: 'Banarasi Kadwa Heritage',
    season: 'Heirloom Trousseau',
    modelDetails: 'Draped on Model 5’9”, Size Free (XS–4XL Blouse)',
    featuredProductSlug: 'nawabi-handloom-banarasi-organza-saree',
    description: '32 hours on ancient wooden pit-looms in Varanasi. Kadwa butas in antique champagne gold zari that shimmer beneath evening chandeliers.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'look-4',
    title: 'Mulberry Meadow Romance',
    season: 'Resort & Evening Wear',
    modelDetails: 'Model is 5’7”, Bust 36”, wearing Size M',
    featuredProductSlug: 'roohani-tiered-mulberry-silk-midi-dress',
    description: 'Smocked adaptive bodice with delicate flutter sleeves. Designed to transition effortlessly from afternoon high tea to moonlit dinners.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
  },
];

export const LookbookPage: React.FC = () => {
  const { navigateTo, products, setSelectedProduct } = useShop();

  const handleShopLook = (slug: string) => {
    const product = products.find((p) => p.slug === slug) || products[0];
    setSelectedProduct(product);
    navigateTo('product', { product });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          The Editorial Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#0B0B0B] leading-tight">
          The Vaishnavi Lookbook
        </h1>
        <p className="mt-4 text-[#6B6B6B] text-sm sm:text-base font-light leading-relaxed">
          An editorial homage to the divine diversity of female silhouettes. High fashion photography capturing pure handlooms draped across sizes XS to 4XL.
        </p>
      </div>

      {/* Editorial Vertical Timeline / Full-width spreads */}
      <div className="space-y-24">
        {LOOKBOOK_ITEMS.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              {/* Image Spread with 3D Tilt */}
              <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}>
                <TiltCard maxTilt={6}>
                  <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-[#0B0B0B] border border-[#E8E2D9] group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Model sizing transparency tag */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between text-white text-xs">
                      <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 font-medium">
                        {item.modelDetails}
                      </span>
                      <button
                        onClick={() => handleShopLook(item.featuredProductSlug)}
                        className="px-4 py-2 rounded-full bg-[#C9A96E] text-[#0B0B0B] font-bold uppercase tracking-wider text-[11px] hover:bg-white transition-all shadow-md flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop Look</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Editorial Copy */}
              <div className={`lg:col-span-5 flex flex-col justify-center ${isEven ? '' : 'lg:col-start-1'}`}>
                <span className="text-[11px] uppercase tracking-widest text-[#C9A96E] font-semibold mb-2">
                  {item.season}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B0B0B] leading-tight mb-4">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6B6B] font-light leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D9] mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-semibold block mb-1">
                    Atelier Grading Details
                  </span>
                  <p className="text-xs text-[#0B0B0B]">
                    Cut with our signature sculpted armhole curves and adaptive waist seam for total ease without constriction.
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleShopLook(item.featuredProductSlug)}
                    className="px-7 py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-semibold transition-all shadow-md inline-flex items-center gap-2 group"
                  >
                    <span>View Garment Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
