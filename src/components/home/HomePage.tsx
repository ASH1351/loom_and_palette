import React from 'react';
import { HeroSection } from './HeroSection';
import { MarqueeStrip } from '../common/MarqueeStrip';
import { CategoriesSection } from './CategoriesSection';
import { NewArrivalsSection } from './NewArrivalsSection';
import { SizeInclusiveSection } from './SizeInclusiveSection';
import { LoomScroll3D } from '../3d/LoomScroll3D';
import { PaletteOrbs3D } from '../3d/PaletteOrbs3D';
import { BestSellersSection } from './BestSellersSection';
import { MeetDesignerSection } from './MeetDesignerSection';
import { CustomerReviewsSection } from './CustomerReviewsSection';
import { InstagramSection } from './InstagramSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-[#FAF7F2]">
      {/* 1. 3D Hero Scene with Flowing Silk Ribbon & Parallax Copy */}
      <HeroSection />

      {/* 2. Marquee Strip: Inclusive Sizing & Shipping Highlights */}
      <MarqueeStrip />

      {/* 3. Shop by Category with 3D Tilt Cards */}
      <CategoriesSection />

      {/* 4. New Arrivals Swipe-Friendly Carousel */}
      <NewArrivalsSection />

      {/* 5. Size Inclusive Interactive Feature Section (XS -> 4XL Slider & Philosophy) */}
      <SizeInclusiveSection />

      {/* 6. Loom-to-Wardrobe 3D Craft Scroll Story */}
      <LoomScroll3D />

      {/* 7. Shop by Colour: 3D Floating Palette Orbs */}
      <PaletteOrbs3D />

      {/* 8. Best Sellers 4-Column Grid */}
      <BestSellersSection />

      {/* 9. Meet the Designer: Vaishnavi's Story, Portrait & Signature */}
      <MeetDesignerSection />

      {/* 10. Customer Reviews Slider with Photos & Verified Sizes */}
      <CustomerReviewsSection />

      {/* 11. Instagram Feed Grid & Newsletter Privilege Box */}
      <InstagramSection />
    </div>
  );
};
