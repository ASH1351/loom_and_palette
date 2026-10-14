import React, { useState } from 'react';
import { HelpCircle, Truck, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does inclusive sizing work from XS to 4XL?',
      a: 'Unlike mass brands that uniformly multiply standard measurements, Vaishnavi personally grades each size individually. We independently adapt the armhole depth, bust darts, waist ease, and hip flare so that an XS fits as impeccably as a 4XL with zero pulling or bulkiness.',
    },
    {
      q: 'What if an outfit doesn’t fit me properly?',
      a: 'We offer a 100% Fit Guarantee. Within 7 days of receiving your order, you may request a free doorstep exchange for another size, or send it to our New Delhi atelier for complimentary bespoke alteration adjustments.',
    },
    {
      q: 'Are your fabrics 100% genuine Indian handlooms?',
      a: 'Yes. Every fabric is certified handloom sourced directly from verified weaving clusters across Chanderi, Maheshwar, Varanasi, and Bagru. We never use cheap synthetic polyester blends; our garments are made with pure mulmul, mulberry silk, modal satin, and authentic zari.',
    },
    {
      q: 'How long does domestic delivery take?',
      a: 'Metro areas (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad) typically arrive within 2 to 3 business days. Non-metro cities take 4 to 5 business days via premium express couriers.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is gladly available across 19,000+ Indian pincodes for orders up to ₹15,000.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center gap-2 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          Customer Care
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B0B0B]">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#6B6B6B] font-light">
          Everything you need to know about our inclusive sizing, artisanal fabrics, and shipping.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D9] shadow-sm divide-y divide-[#FAF7F2]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4 text-[#0B0B0B] font-serif text-base sm:text-lg font-semibold hover:text-[#C9A96E] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
              </button>
              {isOpen && (
                <p className="mt-2 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed font-light">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center gap-2 mb-2">
          <Truck className="w-3.5 h-3.5" />
          Complimentary Care
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B0B0B]">
          Shipping & Returns Policy
        </h1>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#6B6B6B] bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D9] shadow-sm leading-relaxed">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#0B0B0B] mb-2">1. Free Shipping</h3>
          <p>
            We offer complimentary express shipping throughout India on all orders above ₹1999. For orders below ₹1999, a flat nominal rate of ₹199 applies. Orders are dispatched within 24 to 48 hours from our New Delhi atelier.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold text-[#0B0B0B] mb-2">2. 7-Day Hassle-Free Returns & Exchanges</h3>
          <p>
            If you wish to exchange a size or return an item, simply initiate a request from your Account dashboard or WhatsApp concierge within 7 days of delivery. Our courier partner will arrange a doorstep pickup at no cost to you.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold text-[#0B0B0B] mb-2">3. Free Custom Alterations</h3>
          <p>
            Every piece purchased is eligible for one complimentary alteration at our atelier if minor adjustments are needed to flatter your shape.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Integrity & Legal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B0B0B]">
          Privacy & Terms
        </h1>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#6B6B6B] bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D9] shadow-sm leading-relaxed">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#0B0B0B] mb-2">Privacy Commitment</h3>
          <p>
            At Loom & Palette By Vaishnavi, we hold your personal data with utmost discretion. We never rent, sell, or disclose your contact or measurement records to third-party advertisers. Payments are processed securely via RBI-compliant encrypted gateways.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold text-[#0B0B0B] mb-2">Handloom Artisanal Disclaimers</h3>
          <p>
            Because our textiles are woven by hand on traditional wooden fly-shuttle looms and dyed with botanical pigments, minor variations in weave texture and slub are intrinsic hallmarks of genuine craft, not defects.
          </p>
        </div>
      </div>
    </div>
  );
};
