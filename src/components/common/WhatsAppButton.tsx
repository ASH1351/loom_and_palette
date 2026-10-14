import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent(
    'Hello Vaishnavi & Loom & Palette team! I would love personalized sizing assistance and styling consultation.'
  );

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex flex-col items-end">
      {/* Concierge Tooltip Popup */}
      {isOpen && (
        <div className="mb-3 w-72 p-4 rounded-2xl bg-white border border-[#C9A96E]/40 shadow-2xl backdrop-blur-md animate-fade-in relative text-left">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-[#6B6B6B] hover:text-[#0B0B0B]"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h6 className="font-serif text-sm font-semibold text-[#0B0B0B]">
              Vaishnavi Concierge
            </h6>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed mb-3">
            Need help selecting your exact size from XS to 4XL or customizing a drape? Chat directly with our master stylists.
          </p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 px-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#0B0B0B] hover:bg-[#C9A96E] text-white border-2 border-[#C9A96E] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6 text-[#C9A96E] group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};
