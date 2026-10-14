import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, X, Search, Ruler } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { Product } from '../../types';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestseller' | 'rating';

export const ShopPage: React.FC = () => {
  const {
    products,
    filterCategory,
    setFilterCategory,
    filterSize,
    setFilterSize,
    filterColor,
    setFilterColor,
    searchQuery,
    setSearchQuery,
    setIsSizeGuideOpen,
  } = useShop();

  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([1500, 9000]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchFabric && !matchDesc) return false;
        }

        // Category
        if (filterCategory && p.category !== filterCategory && p.subCategory !== filterCategory) {
          return false;
        }

        // Size
        if (filterSize && !p.sizes.some((s) => s.includes(filterSize))) {
          return false;
        }

        // Color
        if (filterColor && !p.colors.some((c) => c.name.toLowerCase().includes(filterColor.toLowerCase()))) {
          return false;
        }

        // Fabric
        if (selectedFabric && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }

        // Price
        if (p.price > priceRange[1]) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        // default newest
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      });
  }, [products, searchQuery, filterCategory, filterSize, filterColor, selectedFabric, priceRange, sortBy]);

  const handleResetFilters = () => {
    setFilterCategory(null);
    setFilterSize(null);
    setFilterColor(null);
    setSelectedFabric(null);
    setPriceRange([1500, 9000]);
    setSearchQuery('');
  };

  const hasActiveFilters = !!(
    filterCategory ||
    filterSize ||
    filterColor ||
    selectedFabric ||
    priceRange[1] < 9000 ||
    searchQuery
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Title & Breadcrumb Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#0B0B0B] font-medium">Atelier Collection</span>
          {filterCategory && (
            <>
              <span>/</span>
              <span className="text-[#C9A96E] font-medium">{filterCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
              {filterCategory ? filterCategory : 'All Creations'}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-light">
              Displaying {filteredProducts.length} handcrafted pieces • Proportional patterns from XS to 4XL
            </p>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D9] hover:border-[#C9A96E] text-xs font-medium text-[#0B0B0B] transition-colors shadow-sm"
          >
            <Ruler className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Inclusive Size Guide</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Mobile Filter Button, Search Preview, Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 mb-6 border-y border-[#E8E2D9]">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8E2D9] text-xs font-semibold text-[#0B0B0B] shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C9A96E]" />
          <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
        </button>

        {/* Active Filter Chips */}
        <div className="hidden sm:flex flex-wrap items-center gap-2 flex-1 mx-2">
          {filterCategory && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#C9A96E] text-xs font-medium text-[#0B0B0B]">
              Category: {filterCategory}
              <button onClick={() => setFilterCategory(null)}>
                <X className="w-3 h-3 text-[#6B6B6B]" />
              </button>
            </span>
          )}

          {filterSize && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0B0B] text-[#C9A96E] text-xs font-bold">
              Size: {filterSize}
              <button onClick={() => setFilterSize(null)}>
                <X className="w-3 h-3 text-white" />
              </button>
            </span>
          )}

          {filterColor && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E2D9] text-xs font-medium text-[#0B0B0B]">
              Color: {filterColor}
              <button onClick={() => setFilterColor(null)}>
                <X className="w-3 h-3 text-[#6B6B6B]" />
              </button>
            </span>
          )}

          {selectedFabric && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E2D9] text-xs font-medium text-[#0B0B0B]">
              Fabric: {selectedFabric}
              <button onClick={() => setSelectedFabric(null)}>
                <X className="w-3 h-3 text-[#6B6B6B]" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#C9A96E] hover:underline font-semibold ml-2"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#6B6B6B]" />
          <span className="text-xs text-[#6B6B6B] hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-[#0B0B0B] focus:outline-none focus:border-[#C9A96E] shadow-sm cursor-pointer"
          >
            <option value="newest">Featured / Newest</option>
            <option value="bestseller">Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex items-start">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          selectedCategory={filterCategory}
          onSelectCategory={setFilterCategory}
          selectedSize={filterSize}
          onSelectSize={setFilterSize}
          selectedColor={filterColor}
          onSelectColor={setFilterColor}
          selectedFabric={selectedFabric}
          onSelectFabric={setSelectedFabric}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          onReset={handleResetFilters}
          isMobileOpen={false}
        />

        {/* Mobile Filter Sheet */}
        <FilterSidebar
          selectedCategory={filterCategory}
          onSelectCategory={setFilterCategory}
          selectedSize={filterSize}
          onSelectSize={setFilterSize}
          selectedColor={filterColor}
          onSelectColor={setFilterColor}
          selectedFabric={selectedFabric}
          onSelectFabric={setSelectedFabric}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          onReset={handleResetFilters}
          isMobileOpen={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Product Cards Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <main className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#E8E2D9] my-6">
              <Sparkles className="w-8 h-8 text-[#C9A96E] mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B] mb-2">
                No designs match this selection
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-sm mx-auto mb-6">
                Try loosening your filters or resetting your size criteria. Every design is crafted with custom ease from XS to 4XL.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
