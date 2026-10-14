import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, Sparkles, X, ChevronDown, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MobileDrawer } from './MobileDrawer';
import { ActivePage } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setIsSizeGuideOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setIsSearchOpen(false);
    }
  };

  const categories = [
    { name: 'Kurtis', desc: 'Hand-block & Chanderi silk silhouettes' },
    { name: 'Co-ord Sets', desc: 'Modern paired luxury for all bodies' },
    { name: 'Dresses', desc: 'Flowing mulmul & mulberry silk midi cuts' },
    { name: 'Sarees', desc: 'Authentic Banarasi & organza zari weaves' },
    { name: 'Tops', desc: 'Pleated chiffon wraps & tailored shirts' },
    { name: 'Ethnic Wear', desc: 'Royal anarkalis & festive velvet sets' },
    { name: 'Western Wear', desc: 'Resort crinkle linen & fluid satins' },
    { name: 'Occasion Wear', desc: 'Heavy gota patti & kadwa zari heirlooms' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D9] py-2.5'
            : 'bg-[#FAF7F2] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Toggle & Desktop Navigation Links */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-lg text-[#0B0B0B] hover:text-[#C9A96E] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-[0.15em] text-[#0B0B0B]">
                <button
                  onClick={() => navigateTo('home')}
                  className={`gold-hover-underline transition-colors ${
                    activePage === 'home' ? 'text-[#C9A96E] font-semibold' : 'hover:text-[#C9A96E]'
                  }`}
                >
                  Home
                </button>

                {/* Shop with mega-dropdown preview */}
                <div
                  className="relative group py-2"
                  onMouseEnter={() => setIsCategoryHovered(true)}
                  onMouseLeave={() => setIsCategoryHovered(false)}
                >
                  <button
                    onClick={() => navigateTo('shop')}
                    className={`flex items-center gap-1 gold-hover-underline transition-colors ${
                      activePage === 'shop' ? 'text-[#C9A96E] font-semibold' : 'hover:text-[#C9A96E]'
                    }`}
                  >
                    <span>Shop</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  {isCategoryHovered && (
                    <div className="absolute top-full -left-6 w-80 p-3 bg-white rounded-2xl shadow-2xl border border-[#E8E2D9] animate-fade-in z-50">
                      <div className="px-3 py-2 border-b border-[#FAF7F2] mb-1 flex items-center justify-between">
                        <span className="text-[10px] tracking-widest text-[#C9A96E] font-semibold">
                          CURATED CATEGORIES
                        </span>
                        <span className="text-[10px] font-sans text-[#6B6B6B] bg-[#FAF7F2] px-2 py-0.5 rounded-full">
                          XS to 4XL
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {categories.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => {
                              navigateTo('shop', { category: c.name });
                              setIsCategoryHovered(false);
                            }}
                            className="p-2 rounded-xl text-left hover:bg-[#FAF7F2] transition-colors flex flex-col group/cat"
                          >
                            <span className="text-xs font-serif font-semibold text-[#0B0B0B] group-hover/cat:text-[#C9A96E]">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-[#6B6B6B] lowercase">
                              {c.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Inclusive Sizing Direct Link */}
                <button
                  onClick={() => navigateTo('shop')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] transition-all text-[11px] tracking-wider"
                >
                  <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                  <span>XS–4XL Inclusive</span>
                </button>

                <button
                  onClick={() => navigateTo('lookbook')}
                  className={`gold-hover-underline transition-colors ${
                    activePage === 'lookbook' ? 'text-[#C9A96E] font-semibold' : 'hover:text-[#C9A96E]'
                  }`}
                >
                  Lookbook
                </button>

                <button
                  onClick={() => navigateTo('about')}
                  className={`gold-hover-underline transition-colors ${
                    activePage === 'about' ? 'text-[#C9A96E] font-semibold' : 'hover:text-[#C9A96E]'
                  }`}
                >
                  Our Story
                </button>

                <button
                  onClick={() => navigateTo('size-guide')}
                  className={`gold-hover-underline transition-colors ${
                    activePage === 'size-guide' ? 'text-[#C9A96E] font-semibold' : 'hover:text-[#C9A96E]'
                  }`}
                >
                  Size Guide
                </button>
              </nav>
            </div>

            {/* Center: Exact Uploaded Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center flex justify-center">
              <button
                onClick={() => navigateTo('home')}
                className="group flex flex-col items-center focus:outline-none"
              >
                <img
                  src="/logo.png"
                  alt="Loom & Palette — By Vaishnavi"
                  className="h-11 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
                />
              </button>
            </div>

            {/* Right: Search, Currency, Wishlist, Cart, Account */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search Toggle */}
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search kurtis, silk, 3XL..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-36 sm:w-56 text-xs px-3 py-1.5 rounded-full bg-white border border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-1 text-[#6B6B6B] hover:text-[#0B0B0B]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 text-[#0B0B0B] hover:text-[#C9A96E] transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Currency Tag (Desktop) */}
              <div className="hidden sm:flex items-center text-xs font-medium text-[#6B6B6B] bg-white px-2.5 py-1 rounded-full border border-[#E8E2D9]">
                <span>INR (₹)</span>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigateTo('wishlist')}
                className="relative p-1.5 text-[#0B0B0B] hover:text-[#C9A96E] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-4 px-1 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-[10px] font-bold flex items-center justify-center border border-[#C9A96E]/50">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] transition-all flex items-center gap-1.5 group shadow-sm"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#C9A96E] group-hover:text-white transition-colors" />
                <span className="hidden md:inline text-xs font-semibold tracking-wider">
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#C9A96E] group-hover:bg-[#0B0B0B] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account (Desktop) */}
              <button
                onClick={() => navigateTo('account')}
                className="hidden lg:block p-1.5 text-[#0B0B0B] hover:text-[#C9A96E] transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
