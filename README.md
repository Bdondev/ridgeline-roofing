# Ridgeline Roofing

Responsive Astro landing page built from the supplied Ridgeline Roofing mockups and image assets.

## Commands

```sh
npm install
npm run check
npm run build
npm run dev
```

The reference screenshots and source assets remain in `references/` and `assets/`. The implementation uses the supplied photography without text overlays and is designed for 1440px desktop and 390px mobile review.

## Screenshot-to-site asset workflow

The supplied source files are preserved in `assets/` and copied to `public/assets/` for static delivery. The page uses the space-free aliases in `public/assets/` (`hero.png`, `proof-*.png`, `service-*.png`, `process-*.png`, and `faq-roof.png`) so local previews and production URLs resolve consistently. Each alias maps to one supplied source image; update the mapping in `src/pages/index.astro` when replacing an asset.
