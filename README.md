# Loom & Palette — By Vaishnavi 🧵✨
### *Woven With Love. Worn With Confidence.*

A luxury, 3D, and fully mobile-responsive e-commerce platform crafted for **Loom & Palette By Vaishnavi** — an artisanal women's fashion house celebrating body diversity with **dedicated inclusive sizing from XS to 4XL**.

---

## 🏛️ Brand Essence & Identity

- **Brand Name**: Loom & Palette — By Vaishnavi
- **The Philosophy**: *"Loom"* represents ancient handloom heritage, weaving discipline, and UNESCO-honored craft. *"Palette"* represents color psychology, botanical mineral dyes, and feminine self-expression.
- **Core Value**: **Inclusive Sizing (XS to 4XL)**. Rather than uniform scaling, each pattern is individually graded to honor real women's curves with sculpted bust darts, tailored armhole ease, and fluid drape.
- **Color Architecture**:
  - **Primary Ink Black**: `#0B0B0B`
  - **Soft Ivory**: `#FAF7F2` & Pure White `#FFFFFF`
  - **Champagne Gold**: `#C9A96E` (Buttons, 3D trims, interactive highlights)
  - **Dusty Rose**: `#D8B4A6` (Soft accent tags, luxury badges)
  - **Text Grey**: `#6B6B6B`
- **Typography**:
  - Headings: *Cormorant Garamond* / *Playfair Display*
  - Accent / Signature: *Great Vibes* (handwritten flourish matching Vaishnavi's signature)
  - UI / Body: *Plus Jakarta Sans* / *Inter*

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 + Custom Luxury Glassmorphism & Gold Gradients
- **3D Physics & Graphics**: Three.js WebGL (Silk Cloth Ribbon Simulation, 360° Drape Mannequin Viewer, 3D Floating Palette Orbs, Loom-to-Wardrobe Scroll Story)
- **Smooth Scrolling**: Lenis Smooth Scroll
- **Animations & Micro-interactions**: Framer Motion + Canvas Confetti
- **Icons**: Lucide React + Custom Luxury SVG Brand Glyphs

---

## 🔮 3D Experiences (The "WOW" Factor)

1. **Full-Screen 3D Silk Ribbon Hero**:
   - Parametric cloth wave simulation reacting dynamically to mouse cursor ripples and mobile touch drag.
   - Low-power mode and graceful 2D fallback when WebGL is unaccelerated.
   - Automatic pause via `IntersectionObserver` when scrolled out of view.
2. **360° Interactive Product Viewer**:
   - Draggable 360-degree garment inspection with inertia damping.
   - Multi-angle snap controls (Front, Side, Back).
   - 3 Lighting atmosphere presets: *Studio Gold*, *Sunset Runway*, *Atelier Ambient*.
   - Artisanal wireframe mesh inspection toggle.
3. **3D Floating Palette Orbs**:
   - Interactive Three.js metallic orbs representing signature hues (*Champagne Gold*, *Rose Blush*, *Onyx Black*, *Royal Emerald*, etc.).
   - Hover raycasting and direct 1-click filtering of products by shade.
4. **Loom-to-Wardrobe Scroll Story**:
   - Visual craft journey through 3 milestones:
     1. *Raw Silk Spindle & Pure Silver/Gold Zari*
     2. *Handloom Warp & Weft Lattice Grid (120 threads/inch)*
     3. *The Finished Couture Drape (Tailored XS to 4XL)*
5. **Interactive 3D Tilt Cards**:
   - Product cards tilt with mouse trajectory (and mobile gyroscope), featuring dynamic gold specular glare and soft luxury shadows.

---

## 📱 Mobile-First Responsive Architecture

- **Tested Resolutions**: 360px, 390px, 414px, 768px, 1024px, 1280px, 1536px+.
- **Zero Horizontal Scroll**: Strict containment and fluid typography using `clamp()`.
- **Sticky Bottom Mobile Navigation**: Instant access to *Home*, *Shop*, *Wishlist*, *Cart*, and *Account* with live item counter badges.
- **Full-Screen Mobile Menu Overlay**: Large tap targets (&gt;44px), quick category chips, and size selector shortcuts.
- **Mobile Filter Drawer**: Bottom sheet filter with swipe/scroll behavior.
- **Sticky Mobile Add-to-Cart Bar**: Direct purchase access on small screens without scrolling back to top.

---

## 🛍️ Pages & Capabilities

- **Home**: Preloader with signature stroke animation, 3D Hero, Marquee Banner, Categories 3D tilt cards, New Arrivals carousel, Size-Inclusive interactive slider (XS–4XL), Loom Story, 3D Palette Orbs, Best Sellers, Meet Vaishnavi, Verified Customer Reviews with photos, Instagram feed, and Newsletter.
- **Shop / Collection**: Live filters (Size XS–4XL, Category, Color, Price Slider, Fabric, Occasion), Sort dropdown, Desktop dual-image crossfade, and Quick-Add size pills.
- **Product Detail**: Interactive 3D 360° drape viewer, high-resolution gallery, live stock indicators, Indian PIN code delivery checker, accordion tabs, and sizing modals.
- **Inclusive Sizing Tools**:
  - **Size Guide Modal & Page**: Comprehensive bust, waist, hip, and length charts in both **Inches (")** and **Centimeters (cm)**.
  - **"Find My Size" AI Fit Helper**: Input bust, height, weight, and drape preference to receive an instant size recommendation with confidence score.
- **Slide-in Cart Drawer**: Animated Free Shipping progress meter (Free above ₹1999), coupon code engine (`LOOM10` for 10% off, `VAISHNAVI15` for 15% off).
- **1-Page Minimal Checkout**: Fast customer inputs, UPI (GPay/PhonePe/Paytm QR/VPA), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).
- **Order Confirmation**: Celebratory confetti animation, printable receipt, and unique order tracking ID.
- **Editorial Lookbook**: High-fashion photography spreads with model sizing disclosure and direct "Shop Look" links.
- **Atelier Contact & Concierge**: Appointment booking, flagship atelier coordinates in New Delhi, and direct floating WhatsApp concierge.
- **Account & Order Tracking**: Order status pipeline (*Order Verified* → *Artisanal Tailoring* → *Quality Inspection* → *Doorstep Delivery*).

---

## 🗂️ How to Edit Products (`src/data/products.json`)

To update, add, or customize products, open `src/data/products.json`. Each product follows this simple JSON schema:

```json
{
  "id": "lp-001",
  "name": "Gulabi Chanderi Zari Anarkali Set",
  "slug": "gulabi-chanderi-zari-anarkali-set",
  "category": "Ethnic Wear",
  "subCategory": "Kurtis",
  "price": 4299,
  "originalPrice": 5999,
  "discount": "28% OFF",
  "rating": 4.9,
  "reviewCount": 128,
  "badge": "Bestseller",
  "isNew": false,
  "isBestSeller": true,
  "inStock": true,
  "sizes": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  "availableSizes": ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  "colors": [
    { "name": "Rose Blush", "hex": "#D8B4A6" },
    { "name": "Champagne Gold", "hex": "#C9A96E" }
  ],
  "fabric": "Handwoven Pure Chanderi Silk",
  "occasion": "Occasion Wear",
  "description": "An exquisite silhouette woven on authentic Maheshwar handlooms...",
  "images": [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b"
  ],
  "modelSize": "Model (5'8\", Bust 38\") is wearing size XL"
}
```

---

## 💻 Local Development Setup

1. **Clone or Navigate to the Workspace**:
   ```bash
   cd c:\Users\ashif\OneDrive\Desktop\LICO
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview the Production Build Locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Guide

### Deploying to **Vercel**:
1. Push this repository to GitHub or GitLab.
2. Visit [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### Deploying to **Netlify**:
1. Visit [Netlify App](https://app.netlify.com).
2. Click **Add new site** &gt; **Import an existing project**.
3. Select your repository.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. Click **Deploy Site**.

---

## 🏷️ Brand Ownership & Copyright
© 2026 Loom & Palette By Vaishnavi. All Rights Reserved.  
*Woven With Love. Worn With Confidence.*
