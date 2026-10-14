import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ShopProvider, useShop } from './context/ShopContext';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer } from './components/common/Toast';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { BottomMobileNav } from './components/common/BottomMobileNav';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { AboutPage } from './components/pages/AboutPage';
import { LookbookPage } from './components/pages/LookbookPage';
import { SizeGuidePage } from './components/pages/SizeGuidePage';
import { ContactPage } from './components/pages/ContactPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AccountPage } from './components/pages/AccountPage';
import { FAQPage, ShippingReturnsPage, PrivacyTermsPage } from './components/pages/PolicyModals';

// Modals & Drawers
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { SizeGuideModal } from './components/product/SizeGuideModal';
import { FindMySizeModal } from './components/product/FindMySizeModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { OrderConfirmation } from './components/cart/OrderConfirmation';

const MainContent: React.FC = () => {
  const {
    activePage,
    selectedProduct,
    setSelectedProduct,
    completedOrder,
  } = useShop();

  const renderActiveView = () => {
    if (completedOrder) {
      return <OrderConfirmation />;
    }

    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'about':
        return <AboutPage />;
      case 'lookbook':
        return <LookbookPage />;
      case 'size-guide':
        return <SizeGuidePage />;
      case 'contact':
        return <ContactPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
      case 'order-tracking':
        return <AccountPage />;
      case 'faq':
        return <FAQPage />;
      case 'shipping-returns':
        return <ShippingReturnsPage />;
      case 'privacy':
        return <PrivacyTermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0B0B0B]">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Luxury Navbar */}
      <Navbar />

      {/* Active Page View */}
      <main className="flex-1 w-full">{renderActiveView()}</main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Floating Concierge & Mobile Sticky Navigation */}
      <WhatsAppButton />
      <BottomMobileNav />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <SizeGuideModal />
      <FindMySizeModal />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // Initialize Lenis smooth luxury scrolling
  useEffect(() => {
    // Only initialize smooth scroll on non-touch devices or when user prefers motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      let animationFrameId: number;
      function raf(time: number) {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }
      animationFrameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(animationFrameId);
        lenis.destroy();
      };
    } catch {
      // Fallback to standard scroll
    }
  }, []);

  return (
    <ShopProvider>
      {/* Preloader with signature stroke reveal */}
      {!isPreloaderDone && (
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* Main Storefront */}
      <MainContent />
    </ShopProvider>
  );
};

export default App;
