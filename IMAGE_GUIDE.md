# Kadhai image placement guide

The website already points to these paths. Add the files with the exact names below and every placeholder will be replaced automatically.

## Export settings

- Product and category images: **1600 × 2000 px**, 4:5 portrait, WebP, sRGB, ideally under 350 KB.
- Hero/editorial portraits: **1800 × 2400 px**, 3:4 portrait, WebP, ideally under 500 KB.
- Wide brand image: **2400 × 1350 px**, 16:9 landscape, WebP, ideally under 650 KB.
- Keep the garment/model inside the central 75% of the frame so responsive crops do not cut important details.
- Use consistent lighting and backgrounds across each product gallery. Do not upscale small marketplace thumbnails.

## Product images

Create `public/images/products/`. Each product accepts three views: `-01` is the catalog cover, `-02` is an alternate/full view, and `-03` is a detail or back view.

| Product | Required filenames |
|---|---|
| Gulab Noor Ready Saree | `gulab-noor-ready-saree-01.webp`, `-02.webp`, `-03.webp` |
| Chandni Zari Drape | `chandni-zari-drape-01.webp`, `-02.webp`, `-03.webp` |
| Kesariya Pre-Stitched Edit | `kesariya-prestitched-edit-01.webp`, `-02.webp`, `-03.webp` |
| Meher Silk Saree | `meher-silk-saree-01.webp`, `-02.webp`, `-03.webp` |
| Raat ki Rani Organza Saree | `raat-ki-rani-organza-01.webp`, `-02.webp`, `-03.webp` |
| Neelambari Silk Saree | `neelambari-silk-saree-01.webp`, `-02.webp`, `-03.webp` |
| Noor-e-Mehfil Lehenga | `noor-e-mehfil-lehenga-01.webp`, `-02.webp`, `-03.webp` |
| Gulnaar Sequin Lehenga | `gulnaar-sequin-lehenga-01.webp`, `-02.webp`, `-03.webp` |
| Chaand Baagh Lehenga | `chaand-baagh-lehenga-01.webp`, `-02.webp`, `-03.webp` |
| Aabroo Embroidered Suit | `aabroo-suit-set-01.webp`, `-02.webp`, `-03.webp` |
| Saanjh Silk Suit Set | `saanjh-silk-suit-01.webp`, `-02.webp`, `-03.webp` |
| Amaltas Anarkali Set | `amaltas-anarkali-01.webp`, `-02.webp`, `-03.webp` |
| Mor Zari Dupatta | `mor-zari-dupatta-01.webp`, `-02.webp`, `-03.webp` |
| Gulabi Resham Dupatta | `gulabi-resham-dupatta-01.webp`, `-02.webp`, `-03.webp` |
| Jhumka-e-Kadhai | `jhumka-e-kadhai-01.webp`, `-02.webp`, `-03.webp` |
| Noor Choker Set | `noor-choker-set-01.webp`, `-02.webp`, `-03.webp` |
| Potli No. 01 | `potli-no-01-01.webp`, `-02.webp`, `-03.webp` |
| Kundan Evening Clutch | `kundan-clutch-01.webp`, `-02.webp`, `-03.webp` |
| Zari Hair Bow | `zari-hair-bow-01.webp`, `-02.webp`, `-03.webp` |
| Mogra Pearl Pins | `mogra-pearl-pins-01.webp`, `-02.webp`, `-03.webp` |

Only the `-01` file is essential. Missing alternate views retain a styled placeholder.

## Homepage and brand images

Create `public/images/editorial/`:

- `hero-main.webp` — 1800 × 2400; primary campaign/model portrait.
- `thread-01.webp` through `thread-04.webp` — 1600 × 2000; story sequence.
- `thread-detail.webp` — 1600 × 2000; textile macro/detail.
- `orbit-look.webp` — 1800 × 2400; full-body look with a simple or transparent-looking background.
- `lookbook-01.webp`, `lookbook-02.webp`, `lookbook-03.webp` — 1600 × 2000.
- `about-hero.webp` — 1800 × 2400.
- `about-wide.webp` — 2400 × 1350.

Create `public/images/categories/` and add these 1600 × 2000 files:

- `ready-saree.webp`
- `lehenga.webp`
- `salwar-suit.webp`
- `dupatta.webp`
- `jewellery.webp`
- `accessory.webp`

After replacing images, run the site and inspect both desktop and mobile crops before publishing.
