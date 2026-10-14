import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sizeInquiry: 'Size XS to 4XL consultation',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Inquiry Received', 'Vaishnavi’s styling concierge will contact you within 4 hours.', 'gold');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E] flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Private Atelier Appointments
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#0B0B0B]">
          Connect With Our Stylists
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#6B6B6B] font-light leading-relaxed">
          Whether you desire personal sizing consultation from XS to 4XL, bridal trousseau customizations, or styling advice, we are delighted to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Details & Atelier Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Atelier Address Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C9A96E]" />
              <span>Flagship Atelier & Studio</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#6B6B6B]">
              <div>
                <strong className="block text-[#0B0B0B] text-sm font-semibold">
                  Loom & Palette By Vaishnavi
                </strong>
                <p className="mt-0.5">Plot 18, Design District, Near Siri Fort Cultural Complex</p>
                <p>New Delhi — 110049, India</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#FAF7F2]">
                <Clock className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <div>
                  <span className="text-[#0B0B0B] font-medium block">Atelier Hours</span>
                  <span>Monday to Saturday: 10:30 AM – 7:30 PM IST</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#FAF7F2]">
                <Phone className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <div>
                  <span className="text-[#0B0B0B] font-medium block">Concierge Hotline</span>
                  <span>+91 98765 43210 / +91 11 2649 0088</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#FAF7F2]">
                <Mail className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <div>
                  <span className="text-[#0B0B0B] font-medium block">Direct Correspondence</span>
                  <span>atelier@loomandpalette.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="p-6 rounded-3xl bg-[#0B0B0B] text-white border border-[#C9A96E]/40 shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold block mb-1">
                Instant Styling Support
              </span>
              <h4 className="font-serif text-lg font-bold">WhatsApp Concierge</h4>
              <p className="text-xs text-white/70">Connect with Vaishnavi’s styling team live.</p>
            </div>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white transition-all shadow-md shrink-0"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Consultation Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D9] shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-[#C9A96E] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#0B0B0B] mb-2">
                Thank You for Reaching Out
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-sm mx-auto mb-6">
                Your consultation request has been submitted to Vaishnavi and her master tailors. We will reach back within 4 business hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#0B0B0B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A96E] transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-2">
                Request a Styling Consultation
              </h3>
              <p className="text-xs text-[#6B6B6B] font-light mb-6">
                Fill in your details below and our fit specialists will provide personalized sizing advice or coordinate custom tailoring.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gayatri Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="gayatri@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                  Area of Interest
                </label>
                <select
                  value={formData.sizeInquiry}
                  onChange={(e) => setFormData({ ...formData, sizeInquiry: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                >
                  <option value="Size XS to 4XL consultation">Sizing Consultation (XS to 4XL)</option>
                  <option value="Bridal & Occasion Trousseau">Bespoke Bridal / Trousseau</option>
                  <option value="Custom Alteration Inquiry">Custom Tailoring Inquiry</option>
                  <option value="General Atelier Question">General Atelier Question</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#6B6B6B] block mb-1">
                  Message / Particular Measurements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding your desired outfit, preferred silhouette, or event dates..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Submit Consultation Request</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
