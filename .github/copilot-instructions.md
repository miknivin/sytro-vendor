# Copilot Instructions for Ecomus eCommerce

## Project Overview
Next.js 14 multi-vendor ecommerce platform using App Router with client-side rendered components. Static data-driven architecture with 30+ home page variants and feature-based component organization.

## Architecture & Data Flow

### Core State Management (Context API)
Located in [`context/Context.jsx`](context/Context.jsx), manages:
- `cartProducts` - array of product objects with quantity
- `wishList` - array of product IDs
- `compareItem` - array of product IDs
- `quickViewItem` / `quickAddItem` - for modal interactions

**Usage pattern:** All components import via `useContextElement()` hook
```jsx
const { cartProducts, addProductToCart, isAddedToCartProducts } = useContextElement();
```

**LocalStorage sync:** Cart and wishlist persist via useEffect handlers (lines 77-101)

### Data Architecture
[`data/products.js`](data/products.js) exports `products1`, `allProducts`, etc. with structure:
```js
{
  id, imgSrc, imgHoverSrc, title, price,
  colors: [{name, colorClass, imgSrc}],
  sizes: [],
  filterCategories: [],
  brand, isAvailable
}
```
Reference products via IDs throughout the app - context looks up full details from `allProducts`.

### Modal-Driven UI
All interactive overlays are Bootstrap modals in [`components/modals/`](components/modals/). Opening handled by `openCartModal()` utility which:
1. Closes any open modals/offcanvas
2. Shows the target modal via Bootstrap's Modal API
3. Example: [ShopCart.jsx](components/modals/ShopCart.jsx), [QuickView.jsx](components/modals/QuickView.jsx)

## Critical Development Patterns

### File Organization Rules
- **`app/(groupName)/`** - Route groups organize pages by feature (blogs, dashboard, homes, otherPages, shop-details, shop)
- **`components/{feature}/`** - Reusable components grouped by feature (homes, blogs, shop, shopDetails, etc.)
- **Naming:** Feature components use PascalCase (e.g., `FilterSidebar.jsx`), organized in subdirectories

### Client-Side vs Server Components
- **"use client"** required on nearly all components (layout, context providers, any DOM manipulation)
- Modals, animations, and event listeners MUST be client components
- No server-only features currently in use

### Styling Approach
- Bootstrap 5 for grid/layout via utility classes (col-md-*, row, etc.)
- SCSS in [`public/scss/`](public/scss/) with color variables and component styles
- Inline className manipulation for dynamic state styling (see ScrollTop.jsx for progress bar pattern)
- Color classes referenced from data: `colors[].colorClass` applied via `className`

### Product Display Patterns
- **Product cards:** Use hover image swap (`imgSrc` vs `imgHoverSrc`)
- **Image galleries:** PhotoSwipe integration for lightbox (imported in layout.js)
- **Image zoom:** react-image-zoom or drift-zoom on product detail pages
- **Sliders:** rc-slider for price ranges, Swiper for carousels

### Form Components
- `Login.jsx`, `Register.jsx`, `ResetPass.jsx` in modals folder
- Email handling via EmailJS (`@emailjs/browser` dependency)
- See AskQuestion modal for EmailJS integration pattern

## Build & Development Commands
```bash
npm run dev       # Start dev server on :3000
npm run build     # Production build
npm start         # Start production server
npm run lint      # Run linting
```

**Key config:** `next.config.mjs` sets `unoptimized: true` for images (no Next.js image optimization). Use `<img>` tags, not `<Image>` component.

## Common Tasks

### Adding a Product to Cart
1. Get product ID from data
2. Call `addProductToCart(id, qty)` from context
3. Component automatically refreshes cart via `cartProducts` state
4. Cart persists to `localStorage.cartList`

### Creating a New Home Variant
1. Create folder in `app/(homes)/home-xxx/`
2. Add `page.jsx` that imports home components
3. Reference [app/(homes)/home-02/page.jsx](app/(homes)/home-02/page.jsx) as template
4. Add navigation link in main menu data

### Modal Workflow
1. Create component in `components/modals/HomesModal.jsx` style
2. Import in [`app/layout.js`](app/layout.js)
3. Use context to trigger: `setQuickViewItem(product)` opens the modal
4. Modal manages its own open/close via Bootstrap Modal API

## Integration Points & Dependencies
- **Bootstrap 5:** Grid, modals, offcanvas, components
- **Swiper 11:** Carousel/slider implementation
- **PhotoSwipe 5:** Image gallery lightbox
- **WOW.js:** CSS animation triggers on scroll
- **EmailJS:** Contact forms (requires API key in environment)
- **3D Model Viewer:** `@google/model-viewer` for product visualization

## Path Aliases
Use `@/` prefix for project imports:
```jsx
import { allProducts } from "@/data/products";
import { useContextElement } from "@/context/Context";
```
Configured in [`jsconfig.json`](jsconfig.json): `"@/*": ["./*"]`

## Known Patterns & Conventions
- Product IDs are 1-based integers from data arrays
- Modal state stored in context (quickViewItem, quickAddItem)
- No TypeScript - JSX files map to React components
- Images stored in `public/images/` organized by category
- Navigation menus built from `data/menu.js` or `data/categories.js`
