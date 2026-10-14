import React, { useState } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { ReviewItem } from '../../types';

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Ananya Deshmukh',
    city: 'Mumbai',
    rating: 5,
    date: '2 weeks ago',
    sizePurchased: 'Size 3XL',
    verified: true,
    comment:
      'Finding real luxury festive wear in 3XL that actually fits my bust without gaping or pulling at the armholes has been nearly impossible in India. Loom & Palette is a revelation! The Gulabi Chanderi Anarkali draped so gracefully, I received compliments all evening at my sister’s wedding.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rev-2',
    author: 'Radhika Sen',
    city: 'Bengaluru',
    rating: 5,
    date: '1 month ago',
    sizePurchased: 'Size M',
    verified: true,
    comment:
      'The Kashmiri Aari Co-ord Set is pure perfection. The modal silk feels cool against the skin, and the antique gold piping detail is whisper-quiet luxury. The packaging was wrapped in scented muslin cloth like a true Parisian atelier.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rev-3',
    author: 'Meera Nambiar',
    city: 'Kochi',
    rating: 5,
    date: '3 weeks ago',
    sizePurchased: 'Size 4XL',
    verified: true,
    comment:
      'I was hesitant about ordering 4XL online, but Vaishnavi’s sizing chart was 100% accurate down to the centimeter! The velvet kurti set with gota work felt custom-made for my body. Finally, an Indian designer who respects plus-size curves.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rev-4',
    author: 'Dr. Tanya Kapoor',
    city: 'New Delhi',
    rating: 5,
    date: 'Just now',
    sizePurchased: 'Size XS',
    verified: true,
    comment:
      'As someone with a petite frame (XS), standard brands often drown me in fabric. Loom & Palette’s XS proportions have exact shoulder cuts that look tailored to couture standards. The Banarasi organza saree is breathtaking.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
];

export const CustomerReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Real Women, Real Stories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
          Worn With Confidence
        </h2>
        <p className="mt-3 text-[#6B6B6B] text-sm sm:text-base font-light">
          Over 4,800+ women celebrated across India and overseas in sizes XS to 4XL.
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="relative max-w-4xl mx-auto rounded-3xl bg-white border border-[#E8E2D9] p-6 sm:p-12 shadow-xl">
        <Quote className="absolute top-6 right-8 w-16 h-16 text-[#FAF7F2] -z-0 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Customer Avatar & Verified Info */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#C9A96E] shadow-md mb-4">
              <img
                src={current.image}
                alt={current.author}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <h4 className="font-serif text-lg font-bold text-[#0B0B0B]">{current.author}</h4>
            <p className="text-xs text-[#6B6B6B]">{current.city}</p>

            <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D9] text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-[#0B0B0B]">{current.sizePurchased}</span>
            </div>
          </div>

          {/* Review Text & Star Rating */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < current.rating ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="text-xs text-[#6B6B6B] ml-2">{current.date}</span>
              </div>

              <p className="font-serif italic text-base sm:text-xl text-[#0B0B0B] leading-relaxed mb-6">
                "{current.comment}"
              </p>
            </div>

            {/* Stepper Dots & Arrow Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-[#0B0B0B]' : 'w-2 bg-[#E8E2D9]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-[#E8E2D9] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-[#E8E2D9] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
