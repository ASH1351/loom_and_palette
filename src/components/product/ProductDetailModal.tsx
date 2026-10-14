import React, { useState } from 'react';
import {
  X,
  Heart,
  Star,
  Sparkles,
  Ruler,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, checkPincodeDelivery } from '../../utils/helpers';
import { useShop } from '../../context/ShopContext';
import { ProductViewer3D } from '../3d/ProductViewer3D';
import { ProductCard } from '../shop/ProductCard';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsFindSizeOpen,
    setIsCheckoutOpen,
    products,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>('3d');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion tabs
  const [openAccordion, setOpenAccordion] = useState<'desc' | 'fabric' | 'shipping'>('desc');

  // Pincode
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ valid: boolean; message: string } | null>(null);

  const isFavorited = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincodeDelivery(pincode);
    setPincodeStatus(result);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this exquisite ${product.name} from Loom & Palette By Vaishnavi!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E2D9] max-h-[94vh] overflow-y-auto">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0B0B0B] border border-[#E8E2D9] shadow-md transition-all hover:scale-105"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: 3D Viewer & Gallery Tabs */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* View Switcher Tabs: 3D 360° Studio vs High-Res Editorial Gallery */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E2D9] self-start">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === '3d'
                      ? 'bg-[#0B0B0B] text-[#C9A96E] shadow-sm'
                      : 'text-[#6B6B6B] hover:text-[#0B0B0B]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive 360° Drape</span>
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-[#0B0B0B] text-[#C9A96E] shadow-sm'
                      : 'text-[#6B6B6B] hover:text-[#0B0B0B]'
                  }`}
                >
                  <span>Atelier Gallery ({product.images.length})</span>
                </button>
              </div>

              {/* Display Area */}
              {activeTab === '3d' ? (
                <div className="relative">
                  <ProductViewer3D product={product} />
                  <p className="text-center text-[11px] text-[#6B6B6B] mt-2 italic">
                    Drag horizontally to inspect drape, seam flow, and luxury silhouette in 360 degrees.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border border-[#E8E2D9] shadow-sm">
                    <img
                      src={product.images[selectedImageIndex] || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Image Thumbnails */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          selectedImageIndex === idx
                            ? 'border-[#C9A96E] scale-105 shadow-md'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Measurement Transparency */}
              {product.modelSize && (
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D9] text-xs text-[#6B6B6B] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A96E] shrink-0" />
                  <span>
                    <strong>Model Fit:</strong> {product.modelSize}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Category, Rating, Badges */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A96E]">
                  {product.category} {product.subCategory ? `• ${product.subCategory}` : ''}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-[#6B6B6B] hover:text-[#0B0B0B]"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-1.5 text-[#0B0B0B] hover:text-[#C9A96E]"
                    title="Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorited ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#0B0B0B]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B0B0B] leading-tight mb-2">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C9A96E] text-[#C9A96E]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#0B0B0B]">{product.rating}</span>
                <span className="text-xs text-[#6B6B6B]">({product.reviewCount} verified reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E8E2D9]">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B0B0B]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#6B6B6B] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D8B4A6] text-[#0B0B0B] text-xs font-bold">
                    {product.discount}
                  </span>
                )}
                <span className="text-[11px] text-[#6B6B6B] ml-auto">Inclusive of all taxes</span>
              </div>

              {/* Size Selector with XS to 4XL & Out of Stock handling */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B]">
                    Select Size: <strong className="font-serif text-sm">{selectedSize}</strong>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#C9A96E] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                    <button
                      onClick={() => setIsFindSizeOpen(true)}
                      className="text-xs text-[#0B0B0B] hover:text-[#C9A96E] underline flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                      <span>Find My Size</span>
                    </button>
                  </div>
                </div>

                {/* Size Buttons Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {product.sizes.map((sz) => {
                    const isAvailable = product.availableSizes.includes(sz);
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-xl text-xs font-serif font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#0B0B0B] text-[#C9A96E] border-[#0B0B0B] shadow-md scale-105'
                            : isAvailable
                            ? 'bg-white text-[#0B0B0B] border-[#E8E2D9] hover:border-[#C9A96E]'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-widest font-semibold text-[#0B0B0B] block mb-2">
                  Shade / Palette: <span className="font-normal text-[#6B6B6B]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                        selectedColor === c.name
                          ? 'border-[#0B0B0B] bg-white font-semibold shadow-sm'
                          : 'border-[#E8E2D9] bg-white/50 text-[#6B6B6B]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
                {/* Quantity */}
                <div className="flex items-center bg-white rounded-full border border-[#E8E2D9] p-1 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#0B0B0B] hover:bg-[#FAF7F2]"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-serif font-bold text-sm text-[#0B0B0B]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#0B0B0B] hover:bg-[#FAF7F2]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full py-3.5 px-6 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C9A96E] group-hover:text-white transition-colors" />
                  <span>Add to Wardrobe</span>
                </button>

                {/* Buy Now Instant Checkout */}
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#C9A96E] text-[#0B0B0B] hover:bg-[#b89758] text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                >
                  Buy Now
                </button>
              </div>

              {/* Pincode Delivery Check */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D9] mb-8">
                <label className="text-xs font-semibold text-[#0B0B0B] flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Delivery Availability & PIN Code Check</span>
                </label>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Indian PIN Code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D9] focus:outline-none focus:border-[#C9A96E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0B0B0B] text-white text-xs font-medium hover:bg-[#C9A96E] transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p
                    className={`text-xs mt-2 font-medium flex items-center gap-1.5 ${
                      pincodeStatus.valid ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {pincodeStatus.valid && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    <span>{pincodeStatus.message}</span>
                  </p>
                )}
              </div>

              {/* Accordion Tabs */}
              <div className="divide-y divide-[#E8E2D9] border-y border-[#E8E2D9]">
                {/* Description Tab */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'desc' ? ('' as any) : 'desc')}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]"
                  >
                    <span>Garment Story & Silhouette</span>
                    {openAccordion === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="pt-3 text-xs text-[#6B6B6B] leading-relaxed space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {product.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Fabric & Care */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'fabric' ? ('' as any) : 'fabric')}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]"
                  >
                    <span>Fabric Composition & Care</span>
                    {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'fabric' && (
                    <div className="pt-3 text-xs text-[#6B6B6B] leading-relaxed space-y-2">
                      <p>
                        <strong>Weave:</strong> {product.fabric}
                      </p>
                      <p>
                        <strong>Care:</strong> {product.careInstructions}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'shipping' ? ('' as any) : 'shipping')}
                    className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0B]"
                  >
                    <span>Complimentary Shipping & Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pt-3 text-xs text-[#6B6B6B] leading-relaxed space-y-1">
                      <p>• Complimentary express shipping throughout India on orders above ₹1999.</p>
                      <p>• 7-day hassle-free doorstep exchange and return policy.</p>
                      <p>• Complimentary custom alterations available on every order.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Complete the Look / You May Also Like */}
          <div className="mt-16 pt-10 border-t border-[#E8E2D9]">
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#C9A96E] font-semibold block mb-1">
                Atelier Recommendations
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0B0B0B]">
                Complete the Silhouette
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Add to Cart Bottom Bar on Mobile */}
        <div className="sticky bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] flex items-center justify-between gap-3 sm:hidden z-40">
          <div>
            <span className="text-[10px] text-[#6B6B6B] block">Total Price:</span>
            <span className="font-serif text-lg font-bold text-[#0B0B0B]">
              {formatPrice(product.price * quantity)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 rounded-full bg-[#0B0B0B] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
            <span>Add to Cart ({selectedSize})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
