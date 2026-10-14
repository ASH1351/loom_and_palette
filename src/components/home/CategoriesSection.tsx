import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { TiltCard } from '../common/TiltCard';

interface CategoryCardItem {
  name: string;
  subtitle: string;
  count: string;
  image: string;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    name: 'Kurtis',
    subtitle: 'Maheshwar & Bagru Block Silhouettes',
    count: '24 Designs',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Co-ord Sets',
    subtitle: 'Aari Needlework & Modal Fluidity',
    count: '18 Designs',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dresses',
    subtitle: 'Mulberry Silk & Breathable Mulmul',
    count: '16 Designs',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sarees',
    subtitle: 'Pure Banarasi Katan & Organza Zari',
    count: '20 Designs',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tops',
    subtitle: 'Chiffon Wraps & Crisp Hand-Tucks',
    count: '14 Designs',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ethnic Wear',
    subtitle: 'Festive Velvet & Royal Anarkalis',
    count: '22 Designs',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Western Wear',
    subtitle: 'Resort Crinkle Linen & Contemporary Suits',
    count: '15 Designs',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Occasion Wear',
    subtitle: 'Tilla Embroidery & Scalloped Zari Drapes',
    count: '19 Designs',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },
];

export const CategoriesSection: React.FC = () => {
  const { navigateTo } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    navigateTo('shop', { category: categoryName });
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Artisanal Edits
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
            Shop by Category
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-[#6B6B6B] text-sm max-w-md font-light">
          Each piece uniquely graded and handcrafted across sizes XS through 4XL.
        </p>
      </div>

      {/* 3D Tilt Category Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <TiltCard key={cat.name} className="h-full">
            <div
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-[260px] sm:h-[340px] rounded-2xl overflow-hidden cursor-pointer bg-[#0B0B0B] border border-[#E8E2D9] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-4 sm:p-6"
            >
              {/* Category Background Image with Zoom & Dark Gradient */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-90"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent pointer-events-none" />

              {/* Top Accent Pill */}
              <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C9A96E] group-hover:text-[#0B0B0B] transition-all">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] sm:text-xs text-[#C9A96E] font-medium tracking-widest uppercase block mb-1">
                  {cat.count}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-[#DFCA9B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70 font-light line-clamp-1 mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
