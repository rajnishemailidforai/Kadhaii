# Kadhai — Ecommerce Prototype Product Requirements Document

**Document status:** Implementation-ready prototype specification  
**Prepared for:** Claude Code, Codex, or another coding AI  
**Product:** Kadhai  
**Tagline:** *Har Dhage ki apni Kahani hai*  
**Market:** Indian luxury women’s fashion  
**Primary reference:** [You Can Be Anything](https://youcanbeanything.tftl.agency/) [1]  
**Prototype constraint:** No production authentication, payment gateway, courier integration, CRM, or external service is required for this version.

---

## 1. Executive summary

Kadhai is a premium Indian fashion ecommerce storefront for women’s occasionwear. The initial catalog will focus on ready-to-wear sarees, sarees, lehengas, salwar suits, dupattas, jewellery, accessories, and a broader women’s collection. Kadhai owns the inventory; it is not a marketplace and does not require seller onboarding.

The website should combine the visual drama of an immersive fashion editorial with the clarity of a modern shopping experience. The reference website uses a long-form storytelling structure with saturated art direction, a custom preloader, oversized typography, layered imagery, scroll-driven transitions, animated marquees, timeline-like compositions, and canvas/WebGL-supported effects [1]. Kadhai should borrow those principles without copying the reference’s content, exact compositions, assets, or brand identity.

The target output is a polished, responsive prototype that can be demonstrated to stakeholders. Real commerce systems can be represented by believable mock behavior. Users must be able to browse products, search and filter the catalog, open product details, add products to a cart, view a checkout flow, apply a coupon, select COD, submit a simulated order, view mock order tracking, save wishlist items, and access account screens without signing in.

The central product principle is:

> **Kadhai should feel like entering a living textile story, but shopping must remain obvious, fast, and trustworthy.**

---

## 2. Goals and non-goals

### 2.1 Goals

The prototype must establish Kadhai’s brand world, demonstrate a visually memorable luxury experience, and prove the core shopping journey from discovery to simulated order confirmation. It should be suitable for a presentation, portfolio review, investor conversation, design review, or handoff to a production engineering team.

The product should communicate Indian craft, material richness, occasion-based dressing, and contemporary confidence. It should support a complete responsive web experience for desktop, tablet, and mobile layouts. The implementation should be structured cleanly enough that a production backend, authentication provider, payment provider, shipping provider, and real inventory system can be added later without replacing the core UI.

### 2.2 Non-goals for this prototype

The prototype will not process real payments, create legally binding orders, connect to live courier services, send real email or WhatsApp notifications, calculate real tax invoices, support real customer authentication, support multiple sellers, or require a production-grade CMS. It should not imply that an order has been genuinely paid for or dispatched.

The mock checkout must clearly use labels such as **Demo checkout**, **Prototype order**, or **No payment is processed**. This prevents a stakeholder from confusing a visual prototype with a live commerce system.

| Area | Prototype treatment | Production future state |
|---|---|---|
| Authentication | No authentication. Account routes show a guest-friendly demo state. | Customer authentication, profile, addresses, and order history. |
| Payments | Simulated COD and simulated online-payment option if visually useful; no gateway call. | Razorpay, Cashfree, Stripe, or another India-compatible gateway. |
| Inventory | Static seed data plus local state; inventory changes may be simulated. | Database-backed stock, reservations, SKU tracking, and fulfillment. |
| Shipping | Mock pincode checker and configurable delivery estimates. | Courier aggregation, live rates, tracking webhooks, and serviceability APIs. |
| Admin | Protected-looking local admin area with no real authentication. | Authenticated role-based admin console. |
| Content | Static JSON or local mock data. | CMS or admin-managed content and media. |
| Notifications | On-screen confirmation only. | Email, SMS, and WhatsApp notifications. |

---

## 3. Brand and creative direction

### 3.1 Brand personality

Kadhai should feel **desi, luxurious, tactile, celebratory, intimate, and editorial**. The word “Kadhai” should be written in a stylized desi-inspired wordmark for the prototype. The exact logo can remain typographic and text-based until final brand assets are supplied. The design must avoid looking like a generic ethnic marketplace or a wedding invitation template.

The brand should balance heritage and modernity. Traditional references may appear through textile borders, jaali-like line patterns, hand-drawn motifs, zari-inspired highlights, miniature-painting color relationships, brass or antique-gold accents, and fabric-like movement. These references should be abstract and contemporary rather than imitating any specific community’s sacred or protected visual symbols without permission.

### 3.2 Exact brand content

| Content | Required value |
|---|---|
| Brand name | Kadhai |
| Tagline | Har Dhage ki apni Kahani hai |
| Primary market line | Indian luxury womenswear |
| Suggested hero line | Wear a story woven for you. |
| Suggested supporting line | Occasionwear, heirloom textures, and modern silhouettes from the world of Indian craft. |
| Primary CTA | Explore the collection |
| Secondary CTA | Discover the story |
| Demo disclosure | Prototype experience — no real payment is processed. |

### 3.3 Recommended visual system

The palette should be rich and material-led. The main background is warm ivory rather than pure white, allowing product photography to feel editorial. Deep maroon and ink provide luxury contrast. Antique gold is used sparingly for rules, icons, focus states, and decorative lines. A vermilion or rose accent can be used for sale labels, selected states, and small moments of energy.

| Token | Suggested value | Use |
|---|---|---|
| `--kadhai-ivory` | `#F5EFE5` | Main background and product-page canvas. |
| `--kadhai-ink` | `#261D1A` | Body text, navigation, high-contrast UI. |
| `--kadhai-maroon` | `#5A1F2B` | Primary brand color and high-impact sections. |
| `--kadhai-bronze` | `#9A6F3F` | Antique-gold borders, labels, decorative linework. |
| `--kadhai-vermilion` | `#A94A3A` | Accent, selected state, limited sale highlights. |
| `--kadhai-sand` | `#D8C6AF` | Secondary surfaces, dividers, neutral cards. |
| `--kadhai-night` | `#171313` | Full-bleed campaign section and footer contrast. |

Typography should use a high-contrast editorial serif for display text and a restrained sans-serif for interface content. A suitable prototype combination is **Cormorant Garamond** or **Playfair Display** for display typography, paired with **DM Sans**, **Manrope**, or **Inter** for navigation and commerce UI. If Hindi or mixed-script copy is introduced later, include a compatible Devanagari family such as Noto Serif Devanagari or Noto Sans Devanagari.

The brand wordmark should not be generated as a random image. For the prototype, use a stylized text treatment with custom letter spacing, a small decorative line or textile mark, and an alternate compact mark for mobile. Replace it later with a supplied SVG logo.

---

## 4. Experience principles

Kadhai should be structured as an ecommerce site with editorial moments, not as an art microsite with commerce hidden inside it. Every immersive block must lead to a visible action or a clear route into the catalog.

The experience should use progressive disclosure. The homepage can be expressive and animated, while category, product, cart, and checkout screens should become calmer and more functional. Animation should support hierarchy: the strongest motion belongs to the hero, campaign storytelling, and product discovery transitions; buttons, filters, quantity controls, and checkout fields should respond quickly and predictably.

The product should preserve direct navigation. All major routes must be reachable by URL, keyboard, and visible navigation. The website should not require users to scroll through a long sequence to access the Shop page. On mobile, the immersive layers should simplify rather than merely scale down.

---

## 5. Information architecture and routes

The public storefront should expose the following primary routes.

| Route | Purpose | Required behavior |
|---|---|---|
| `/` | Immersive Kadhai homepage | Hero, story sections, featured products, collection CTAs, editorial animation. |
| `/shop` | Catalog discovery | Product grid, search, category filters, sort, price filter, color and fabric filters. |
| `/search` | Search results | Query-driven results, empty state, suggested searches, URL-persisted query. |
| `/product/:slug` | Product detail | Gallery, product information, variants, delivery estimate, wishlist, add to cart. |
| `/cart` | Cart review | Items, quantity, remove, coupon, shipping estimate, order summary, checkout CTA. |
| `/checkout` | Simulated checkout | Guest contact, address, delivery method, payment selection, review, place demo order. |
| `/order-confirmation/:id` | Confirmation | Demo order number, summary, delivery estimate, tracking link, continue shopping. |
| `/account` | Guest account | Guest-friendly state, demo order history, saved wishlist shortcut, account explanation. |
| `/wishlist` | Saved products | Wishlist grid, move to cart, remove item, empty state. |
| `/track-order` | Mock tracking | Order number/mobile input, demo status timeline, delivery estimate. |
| `/about` | Brand story | Kadhai philosophy, craft, material, and “Har Dhage ki apni Kahani hai.” |
| `/contact` | Contact | Contact details, inquiry form, social placeholders, response expectation. |
| `/faq` | Help content | Accordion grouped by ordering, delivery, returns, products, and prototype notice. |
| `/admin` | Demo admin | Product/content/order management simulation without authentication. |

The header should contain the Kadhai mark, Shop, Collections or categories, About, Search, Wishlist, Cart, and a menu trigger. Desktop may use a transparent overlay header on the hero and switch to an ivory or maroon solid header after the user leaves the hero. Mobile should use a compact header with menu, search, wishlist, and cart actions.

The footer should include Shop, Customer Care, About Kadhai, policies, social placeholders, the tagline, and a concise prototype disclosure.

---

## 6. Homepage specification

### 6.1 Preloader

The preloader should feel like a fabric or textile curtain opening. Use a full-viewport maroon or deep-ink layer with a central Kadhai mark, a thin progress line, and the tagline appearing briefly. The exit transition should use an organic masked reveal that resembles a folded fabric opening or a thread path expanding across the screen.

The preloader must have a hard maximum duration. If assets load quickly, it should exit after approximately 900–1,600 ms. If assets are slow, it must not block the visitor indefinitely; use a timeout fallback around 2,500 ms. Add a reduced-motion mode that replaces the elaborate reveal with a short opacity transition.

### 6.2 Hero

The hero should feature a full-bleed campaign image or an image collage supplied by the user. The recommended composition is a large editorial product/model image on one side, a fluid textile shape or color field behind it, and oversized typography on the opposite side. The hero copy should contain the brand name, tagline, and a clear Shop CTA.

Suggested hero content:

> **Kadhai**  
> *Har Dhage ki apni Kahani hai*  
> Occasionwear woven with feeling, detail, and a little drama.

The hero should include a small scroll cue, a subtle progress indicator, and a discreet “Shop the edit” action. The main image may have slight pointer parallax on desktop, but the product itself must not become difficult to inspect.

### 6.3 “The Kadhai edit” collection navigation

Create a visually rich collection block with cards or textile panels for **Ready-to-Wear Sarees**, **Lehengas**, **Salwar Suits**, **Dupattas**, **Jewellery**, **Accessories**, and **All Womenswear**. Each panel should include a category name, a short emotional descriptor, a supporting image, and a route to `/shop?category=...`.

The desktop version may use a horizontal scroll or pinned scroll scene. The mobile version must use a normal vertical grid or horizontal swipe carousel with visible affordances.

### 6.4 Textile story section

Create a scroll-driven “Every thread has a story” section that presents fabric, color, drape, and occasion as a sequence of editorial statements. Use textile photographs, macro details, and small ornamental marks. The block should end with a Shop by occasion CTA: **Wedding guest**, **Festive**, **Sangeet**, **Reception**, **Everyday luxe**, and **Gifting**.

### 6.5 Featured products

The homepage should include a direct product grid with six to eight featured products. The grid is essential because it proves that the page is an ecommerce store. Cards should show image, product name, category, price in INR, optional compare-at price, availability or “Limited pieces,” wishlist button, and a quick-view or View piece CTA.

Hover behavior may reveal a second image, a fabric swatch, or a floating “Add to bag” action. On touch devices, the card should remain simple and should not require hover to understand the product.

### 6.6 Lookbook or campaign block

Create a cinematic lookbook block using the available user-provided listing images. The block should use layered cards, a soft parallax image, a dark maroon or night background, and editorial copy. It should lead to `/shop` or a filtered collection rather than being decorative only.

### 6.7 Closing brand story

End the homepage with a large typographic statement based on the tagline, a textile pattern or slow-moving fabric image, and two actions: **Explore all womenswear** and **Read our story**. The footer begins after this block.

---

## 7. Catalog and product model

The initial product catalog should be seeded with realistic demo products and use the user’s listing images. The implementation must make it easy to replace the seed data with real product records later.

### 7.1 Required product fields

| Field | Type | Requirement |
|---|---|---|
| `id` | string | Stable product identifier. |
| `slug` | string | URL-safe product slug. |
| `name` | string | Customer-facing product name. |
| `category` | enum | Saree, ready-to-wear saree, lehenga, salwar suit, dupatta, jewellery, accessory, womenswear. |
| `collection` | string | Optional campaign or seasonal collection. |
| `shortDescription` | string | One-line card and SEO description. |
| `description` | rich text/string | Detailed product story. |
| `price` | number | INR selling price. |
| `compareAtPrice` | number/null | Optional strike-through price. |
| `images` | string[] | Product gallery image URLs or local asset paths. |
| `thumbnail` | string | Listing image. |
| `fabric` | string | Silk, organza, georgette, chiffon, cotton, velvet, etc. |
| `weaveOrWork` | string | Banarasi, zari, embroidered, printed, sequined, handwork, etc. |
| `origin` | string | Demo origin such as Banaras, Jaipur, Lucknow, or “Kadhai studio.” |
| `color` | string | Primary color and optional color family. |
| `occasion` | string[] | Wedding guest, festive, sangeet, reception, gifting, everyday luxe. |
| `fitOrSize` | string[] | Free size, XS–XXL, or category-specific sizing. |
| `variantOptions` | object[] | Color, size, blouse option, or length where applicable. |
| `stock` | number | Demo stock count. |
| `sku` | string | Displayable inventory reference. |
| `blouseIncluded` | boolean/null | Relevant to sarees. |
| `drapeType` | string/null | Ready-to-wear, pre-stitched, classic drape, etc. |
| `care` | string | Care instruction. |
| `shippingNote` | string | Example delivery note. |
| `tags` | string[] | Searchable tags. |
| `featured` | boolean | Homepage feature flag. |
| `newArrival` | boolean | New-arrival badge. |
| `limitedEdition` | boolean | Limited-piece badge. |
| `rating` | number | Demo rating. |
| `reviewCount` | number | Demo review count. |

### 7.2 Product discovery behavior

The Shop page should support search by product name, category, fabric, color, occasion, weave/work, and tags. Filters should be represented in the URL so a filtered page can be shared. Sorting options should include Featured, Newest, Price low to high, Price high to low, and Best rated.

The product grid should support loading skeletons, a no-results state, a clear-filters action, and a graceful fallback when an image is missing. Use a responsive grid: four columns on large desktop, three on medium desktop/tablet landscape, two on mobile, and one only when the viewport is exceptionally narrow.

### 7.3 Product detail behavior

The product detail page should show an image gallery, product title, price, review summary, product story, fabric/work/origin details, size or variant controls, stock message, delivery estimate, wishlist toggle, quantity selector, and Add to bag CTA. For sarees, show whether the saree is ready-to-wear, whether a blouse piece is included, and an estimated drape length.

The product gallery may use a vertical thumbnail rail on desktop and a swipe gallery on mobile. The main product image can use a restrained zoom or crossfade, but the user must always be able to inspect the garment accurately.

Include a delivery widget with a demo pincode input. The pincode checker may return a deterministic mock response such as “Delivery available — estimated 4–6 business days” for valid-looking Indian pincodes. It must be labeled as demo behavior.

---

## 8. Shopping, cart, checkout, and order simulation

### 8.1 Cart

Cart state should persist in `localStorage` so a page refresh does not destroy the presentation flow. A cart item must retain product ID, selected variants, quantity, unit price, image, and product name. The cart should support quantity changes, remove, save for later or move to wishlist, and a clear-cart action.

The cart summary should show subtotal, discount, shipping, COD fee if configured, and estimated total. Use INR formatting with the Indian numbering system, for example `₹12,500`. The prototype can use a configurable default shipping fee of ₹99 and free shipping above ₹2,999. These are demo defaults and should be clearly marked as configurable.

### 8.2 Coupons and gifts

Provide a coupon input with at least two seeded demo coupons:

| Coupon | Demo behavior |
|---|---|
| `KADHAI10` | 10% off, capped at a configurable amount. |
| `WELCOME500` | ₹500 off above a configurable minimum cart value. |

Add a gift-card option in the checkout or cart flow. It may display a non-functional gift-card field with a successful demo state for a seeded code such as `THREADS1000`. The UI must not claim that a real gift card has monetary value.

### 8.3 Checkout

The checkout is a guest checkout prototype. It should contain contact details, delivery address, pincode, state, city, phone, delivery method, payment method, order summary, coupon state, and a prototype disclosure.

Payment choices should include **Cash on Delivery** and **Online payment (demo only)**. If the user chooses online payment, display a mock payment-success panel rather than opening a real gateway. If the user chooses COD, show a small configurable COD fee if desired. The Place order button creates a simulated order record in local storage and routes to the confirmation page.

### 8.4 Confirmation and tracking

After order submission, show a polished confirmation page with a generated demo order number such as `KDH-2026-1042`, purchased items, amount, delivery estimate, selected payment method, and a clear “This is a prototype order; no payment was processed” notice.

The Track Order page should allow a user to enter the demo order number or mobile number. A valid demo order displays a visual status timeline: **Order placed**, **Preparing your piece**, **Packed**, **Out for delivery**, **Delivered**. The timeline should support a configurable current state so the admin prototype can change it.

### 8.5 Returns and exchanges

The FAQ and product detail experience should include a placeholder returns/exchanges policy. For a prototype, use a concise statement such as: “Returns and exchanges are shown as demo policy content and must be replaced with Kadhai’s final policy before launch.” Do not invent legally binding terms.

---

## 9. Account and wishlist behavior

The Account route should not force sign-in. It should explain that the prototype is being experienced as a guest and provide shortcuts to Wishlist, Orders, Track Order, and Customer Care. A future-ready account screen may include placeholder sections for profile, saved addresses, and preferences.

Wishlist state should persist in `localStorage`. Users can add or remove products from product cards, quick views, and product detail pages. The wishlist page should display an empty state with a CTA back to Shop. The cart and wishlist actions must update immediately with a toast or inline confirmation.

---

## 10. Demo admin panel

The admin panel is required as a prototype demonstration but does not need real authentication. It should be visually separate from the public storefront while retaining Kadhai’s visual language.

### 10.1 Admin routes

| Route | Demo capability |
|---|---|
| `/admin` | Overview dashboard with revenue, orders, low-stock items, and top categories. |
| `/admin/products` | Product table with search, filters, create/edit/delete simulation, stock editing. |
| `/admin/orders` | Orders table with status update simulation. |
| `/admin/content` | Edit homepage headline, featured product IDs, campaign text, and announcement strip. |
| `/admin/coupons` | Manage seeded coupons and active/inactive state. |
| `/admin/settings` | Configure demo shipping fee, free-shipping threshold, COD fee, and delivery copy. |

The admin may use local storage or an in-memory state store. CRUD actions should visibly work within the session. A refresh should preserve data if local storage is used. Include a top banner: **Demo admin — no authentication enabled**.

The admin dashboard should not use the immersive full-screen animation system. Use a calmer dashboard layout with a left sidebar, readable tables, compact cards, responsive data panels, and clear destructive-action confirmation dialogs.

---

## 11. Animation and interaction specification

### 11.1 Animation strategy

The motion direction should be called **Woven Motion**. It combines smooth editorial transitions with restrained commerce feedback. Use CSS transforms and opacity for routine UI interactions. Use Framer Motion for React component transitions and layout animation. Use GSAP with ScrollTrigger for high-value scroll scenes such as the hero reveal, horizontal collection edit, campaign collage, and textile story timeline. A WebGL or canvas layer should be optional and limited to decorative background effects; the site must remain functional if WebGL is unavailable.

The reference site uses a canvas-supported experience, GSAP-related animation primitives, scroll and pointer handling, masked transitions, image collages, marquees, and hover-spread image groups [1]. Kadhai should interpret those patterns through its own textile vocabulary rather than reproducing the reference site.

### 11.2 Required motion moments

| Moment | Desktop behavior | Mobile behavior | Reduced-motion fallback |
|---|---|---|---|
| Preloader | Fabric-mask reveal, logo fade, progress line. | Shorter mask reveal. | Opacity fade under 250 ms. |
| Hero | Layered image entrance, subtle pointer parallax, word-by-word headline reveal. | Vertical reveal with no aggressive parallax. | Static hero with small fade. |
| Header | Transparent-to-solid transition after hero. | Compact sticky header with simple color change. | Instant state change. |
| Collection edit | Horizontal or pinned scroll with product/category panels. | Native horizontal carousel or vertical cards. | Static grid. |
| Product cards | Image crossfade, slight lift, quick-add reveal. | Tap-friendly controls always visible. | No lift; simple color transition. |
| Product detail | Gallery crossfade and restrained image zoom. | Swipe gallery with instant controls. | Static image changes. |
| Campaign collage | Layered cards drift into position as the section enters. | Staggered vertical cards. | Static stacked collage. |
| Cart drawer | Origin-aware slide/fade drawer. | Full-height bottom sheet or page route. | Instant open/close with focus management. |
| Toasts | 180–250 ms slide/fade. | Same or shorter. | Instant display. |
| Page transitions | Soft textile wipe between major public routes where safe. | Simple fade to preserve speed. | No transition. |

Use a custom ease-out close to `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, and a smooth ease-in-out for morphing or long movement. Keep common UI transitions below 300 ms. Use stagger intervals of approximately 40–70 ms for grouped card entrances. Never animate from `scale(0)`; use a small scale such as `0.96` combined with opacity.

### 11.3 Cursor effects

On desktop, use a custom cursor only when the pointer is not coarse. The cursor can become a small ring with a textile-dot center. On hovering a product image, it may change to “View” or “Add” depending on the target. The cursor must not obscure product details, must not replace accessible button labels, and must not be enabled on touch devices.

### 11.4 Fabric-like transitions

Fabric-like motion should be created through masks, clipping paths, SVG noise or grain, layered gradients, and images moving at slightly different speeds. Do not use a heavy full-screen WebGL simulation for every route. A practical prototype can create the feeling through an SVG displacement-style overlay, animated gradients, or a canvas grain layer placed behind content.

### 11.5 Horizontal scroll

Use horizontal scrolling only for curated editorial sections, not for the main product catalog. The primary catalog should remain a conventional vertical grid for search visibility and usability. The homepage’s “Kadhai edit” may pin a section and translate collection panels horizontally while the user scrolls vertically. On mobile, replace the pinned scene with a horizontal swipe carousel or normal vertical cards.

### 11.6 3D/WebGL

WebGL is optional and should be progressive enhancement. Recommended use is a light decorative textile field, floating particles resembling threads, or a slow abstract silk-ribbon background behind the hero. Do not place important copy or product information inside WebGL. Provide a DOM/CSS fallback when WebGL is unsupported, disabled, or too expensive.

### 11.7 Accessibility and reduced motion

Respect `prefers-reduced-motion: reduce`. Disable non-essential parallax, canvas movement, horizontal pinning, cursor effects, looping marquees, and long page transitions. All important content and actions must remain visible. Maintain keyboard focus, visible focus rings, semantic headings, meaningful button labels, alt text, and sufficient contrast.

---

## 12. Responsive behavior

The site must be mobile-first. The mobile version is not a compressed desktop canvas; it is a simplified composition with clear shopping controls.

| Breakpoint | Layout direction |
|---|---|
| Small mobile | One-column content, sticky compact header, two-column product grid where possible, native swipe galleries. |
| Large mobile/tablet | Two-column product grid, horizontal collection carousel, reduced decorative layering. |
| Desktop | Full editorial hero, optional pinned horizontal story sections, four-column product grids, cursor effects. |
| Wide desktop | Constrain readable content width while allowing campaign imagery to reach viewport edges. |

Touch targets should be at least approximately 44 by 44 CSS pixels. Avoid hover-only content. Keep filter and sort controls accessible from a sticky or bottom-sheet interaction on mobile.

---

## 13. Recommended prototype architecture

The coding AI may choose the final framework, but the recommended implementation is a TypeScript React web app using Next.js App Router or Vite React, Tailwind CSS, Framer Motion, GSAP/ScrollTrigger for selected scenes, and a lightweight local state layer such as Zustand or React Context. Since this is a prototype, product data can live in typed JSON or TypeScript modules, while cart, wishlist, orders, admin settings, and content overrides persist in `localStorage`.

A production-capable project structure should separate presentation, domain models, state, content, and motion utilities. Avoid placing all page logic in one file. Keep `products.ts`, `categories.ts`, `content.ts`, `pricing.ts`, `mockOrders.ts`, and `mockAdmin.ts` independent from UI components so the prototype can later be connected to a database.

Suggested structure:

```text
src/
  app-or-pages/
    page.tsx
    shop/page.tsx
    search/page.tsx
    product/[slug]/page.tsx
    cart/page.tsx
    checkout/page.tsx
    order-confirmation/[id]/page.tsx
    account/page.tsx
    wishlist/page.tsx
    track-order/page.tsx
    about/page.tsx
    contact/page.tsx
    faq/page.tsx
    admin/...
  components/
    layout/
    commerce/
    product/
    editorial/
    motion/
    ui/
  data/
    products.ts
    collections.ts
    content.ts
    coupons.ts
  state/
    cart-store.ts
    wishlist-store.ts
    order-store.ts
    admin-store.ts
  lib/
    currency.ts
    filters.ts
    mock-shipping.ts
    animation.ts
  styles/
    tokens.css
    globals.css
public/
  fonts/
  small-config-assets-only/
```

If the coding AI chooses Next.js, it should preserve SEO-friendly route content and avoid placing the entire catalog behind client-only rendering. If the AI chooses Vite React for speed, it should still provide semantic page routes, metadata, accessible headings, and a clean upgrade path.

---

## 14. Content and demo data requirements

Seed the prototype with approximately 18–24 products distributed across the launch categories. The product names should sound premium and Indian without making unsupported claims about handloom origin, artisan communities, or material authenticity.

Suggested naming pattern:

| Category | Example demo names |
|---|---|
| Ready-to-wear saree | Gulab Noor Ready Saree, Chandni Zari Drape, Kesariya Pre-Stitched Edit |
| Saree | Meher Banarasi Silk Saree, Raat ki Rani Organza Saree |
| Lehenga | Noor-e-Mehfil Lehenga, Gulnaar Sequin Lehenga |
| Salwar suit | Aabroo Chikankari Suit, Saanjh Silk Suit Set |
| Dupatta | Mor Zari Dupatta, Gulabi Resham Dupatta |
| Jewellery | Jhumka-e-Kadhai, Noor Choker Set |
| Accessories | Potli No. 01, Zari Hair Bow, Kundan Clutch |

Use the user’s listing images as the primary asset source. Each product should have enough image variation for cards and detail pages. If an item has only one image, use a graceful image fallback rather than duplicating it with obvious crops.

Homepage copy should be treated as editable content. The admin prototype should be able to change the hero headline, tagline support line, featured product IDs, announcement strip text, and campaign section copy.

---

## 15. SEO, performance, and quality requirements

The prototype should still demonstrate production-quality habits. Every route must have a meaningful title and description. Product pages should expose product name, price, availability, category, and descriptive copy in the rendered page structure. Images must use explicit dimensions or aspect-ratio containers to reduce layout shift, and below-the-fold media should lazy-load.

Animation must not prevent content from rendering. The page should show the main brand and a usable CTA even if JavaScript animation fails. Avoid loading large videos or WebGL scenes before the first meaningful content. Use compressed modern image formats where available and provide responsive image sizes.

The coding AI should test keyboard navigation, focus order, mobile layout, empty states, invalid coupon states, cart persistence, quantity updates, product filter combinations, simulated checkout, order confirmation, and reduced-motion behavior.

### Suggested acceptance thresholds for the prototype

| Requirement | Acceptance criterion |
|---|---|
| Route integrity | All listed routes load directly without dead ends. |
| Shopping flow | A user can select a product, add it to cart, apply a demo coupon, complete guest checkout, and view a demo order. |
| Persistence | Cart and wishlist survive a browser refresh during the same device session. |
| Responsive behavior | No horizontal overflow on mobile except intentionally scrollable editorial carousels. |
| Animation safety | Animation failure does not hide core content or actions. |
| Reduced motion | Major decorative motion is disabled or simplified when requested by the OS. |
| Admin prototype | Product/content/order demo changes visibly update the public prototype or local state. |
| Asset safety | Missing images do not create broken layouts. |
| Prototype disclosure | Checkout and order confirmation make it clear that no real payment or fulfillment occurs. |

---

## 16. User stories and acceptance criteria

### Discovery

As a first-time visitor, I want to understand Kadhai’s brand and product category within the first viewport so that the immersive design does not create uncertainty about what is being sold.

**Acceptance:** The hero shows the Kadhai wordmark, exact tagline, a product-oriented supporting line, and a visible Shop CTA. The primary header includes a direct Shop route.

### Product search

As a shopper, I want to search by product name, category, fabric, color, and occasion so that I can find relevant Indian occasionwear quickly.

**Acceptance:** Search results update from the query, the query is reflected in the URL, and no-results states offer clear suggestions and a reset action.

### Product evaluation

As a shopper, I want to see product imagery, fabric, work, origin, size or fit, care, price, stock, and delivery information so that I can evaluate the piece before adding it to my bag.

**Acceptance:** The product detail page contains all required product fields relevant to that category and provides an obvious Add to bag action.

### Cart and coupon

As a shopper, I want to change quantities, remove items, and apply a discount code so that I can review my order before checkout.

**Acceptance:** Cart totals recalculate immediately and valid seeded demo coupon codes produce a visible discount line.

### Guest checkout

As a shopper, I want to place a demo order without creating an account so that I can experience the complete shopping flow.

**Acceptance:** The checkout can be completed with contact and address data, COD or demo online payment, and a final confirmation that clearly states no real payment was processed.

### Wishlist

As a shopper, I want to save pieces for later so that I can compare them before purchase.

**Acceptance:** Wishlist add/remove actions work from cards and product pages, and saved items survive refresh.

### Admin demonstration

As the Kadhai owner, I want to change demo product, order, coupon, and homepage content values so that I can demonstrate how the future storefront could be managed.

**Acceptance:** The `/admin` experience provides visible CRUD-like interactions using local or in-memory state and clearly indicates that authentication is disabled in the prototype.

---

## 17. Implementation instructions for Claude Code or Codex

The coding AI should begin by creating the project shell, installing the chosen UI and motion dependencies, and establishing design tokens before implementing page-specific details. It should then build the shared layout, navigation, local state stores, typed product data, and responsive product card before building the homepage animations.

The implementation should proceed in this order:

| Phase | Output |
|---|---|
| 1 | Project scaffold, fonts, design tokens, layout shell, responsive header/footer. |
| 2 | Product data model, catalog seed data, product card, Shop, Search, filters, sort. |
| 3 | Product detail, gallery, variants, wishlist, cart state, cart page/drawer. |
| 4 | Guest checkout, coupon logic, simulated order creation, confirmation, tracking. |
| 5 | Homepage editorial sections and scroll-driven animation system. |
| 6 | Demo admin panel and editable local content. |
| 7 | Accessibility, responsive QA, reduced-motion behavior, loading/error/empty states. |
| 8 | Final polish, direct-route verification, and presentation-ready demo content. |

The AI should use real user-provided listing images wherever available. It should not invent a large library of unrelated AI-generated fashion assets if the user’s images are intended to represent the actual catalog. Temporary placeholders should be visibly marked as demo content and easy to replace.

When adding animation, first implement the static layout and content hierarchy, then layer motion progressively. The project must remain understandable to a future developer. Create reusable motion components such as `RevealText`, `FabricWipe`, `ParallaxImage`, `HorizontalStory`, `StaggerGrid`, and `PageTransition`, but do not make every component dependent on a single global animation context.

Use a single source of truth for cart totals, coupon logic, product availability, and order generation. Avoid duplicating pricing calculations inside components. Format currency consistently using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` or an equivalent helper.

---

## 18. Prototype completion checklist

The prototype is complete when the homepage feels unmistakably like Kadhai, the visual language expresses desi luxury, the reference-inspired animation system is present but does not obstruct shopping, and all listed public routes can be demonstrated.

A final demo should be able to show the following sequence without manual code changes: enter through the Kadhai preloader; view the animated hero; open Shop; filter to ready-to-wear sarees; open a product; select a variant; add it to Wishlist and Cart; apply `KADHAI10`; complete guest checkout using demo COD; view a generated confirmation; open Track Order; return to Wishlist; and open the Admin panel to change a featured product or order status.

The final interface should include clear loading, empty, error, and success states. It should not use lorem ipsum in customer-facing content. It should not expose broken external links, fake payment claims, hidden scroll traps, or animation that prevents keyboard navigation.

---

## 19. Future production roadmap

After stakeholder approval of the prototype, the next phase should introduce a real backend, authenticated admin roles, production inventory management, real product media storage, payment integration, shipping serviceability, tax and invoice logic, order notifications, customer accounts, returns workflows, analytics, SEO enhancements, and content management.

The visual system should remain reusable. The hero, collection story, product card, editorial collage, textile transitions, and product gallery should be designed as composable modules so future campaigns can be added without rewriting the storefront.

---

## References

[1]: https://youcanbeanything.tftl.agency/ "You Can Be Anything — reference website"
