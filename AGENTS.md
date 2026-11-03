# Ridgeline Roofing agent guide

## Project scope and source of truth

This repository is the Astro implementation of the Ridgeline Roofing landing page. `DESIGN-SPEC.md` is the authoritative project design specification; follow it for visual system, section order, responsive targets, supplied photography, and interaction expectations rather than duplicating those details here. Preserve approved assets and content in `assets/`, `public/assets/`, and `references/`.

Before editing, verify that work is happening in this repository, on the intended branch, with a clean or understood working tree. Keep this project isolated from sibling repositories and unrelated files.

## Current architecture

- `src/layouts/Layout.astro` provides the document shell, metadata defaults, global stylesheet imports, and page slot.
- `src/pages/index.astro` is the homepage entry point. It currently contains the asset map and most section markup, in this order: header/hero, proof metrics, services, process cards, testimonial, FAQ, and restoration footer. It also contains the small services IntersectionObserver enhancement.
- `src/components/` contains the currently shared `Header.astro`, `SectionLabel.astro`, and `ArrowIcon.astro` components.
- `src/styles/global.css` contains the main design tokens, base rules, component/section styles, responsive media query, focus states, and reduced-motion rules. `src/styles/hero-overrides.css` contains the small hero-specific override.
- `src/pages/_app.ts` imports the global stylesheet for the page runtime; keep stylesheet ownership consistent with the existing layout setup unless the architecture is deliberately changed.
- `public/assets/` contains runtime aliases for the preserved source images in `assets/`. The space-free aliases are used by the page so local and production URL resolution remains reliable; update the mapping in `src/pages/index.astro` when an approved asset changes.
- `tests/visual.spec.ts` contains Playwright visual checkpoints for each major section, the full page, content/container rules, and mobile navigation. Baselines live beside the test in `tests/visual.spec.ts-snapshots/`.

## Intended Astro component approach

Keep `index.astro` as the composition root. Extract a section into `src/components/` only when it has a clear boundary, meaningful reuse, or enough independent behavior to improve maintenance. Preserve the current section order, classes, IDs, content, asset mapping, and rendered geometry while extracting. Prefer explicit typed props for repeated content and small presentational components over a large abstraction or a new dependency. Move section-specific behavior with its section only when that behavior remains equivalent and accessible. Update visual checkpoints when an approved design change—not merely a refactor—requires new baselines.

## Implementation requirements

- Before changing markup, CSS, assets, copy, or responsive behavior, inspect `DESIGN-SPEC.md` plus the approved originals in `references/` and `assets/`. Preserve the approved section order, layout relationships, typography hierarchy, copy, and supplied photography. Do not invent replacement content, imagery, colors, spacing, interactions, or responsive layouts. Escalate ambiguous or inconsistent specification, asset-mapping, mockup, or copy questions to Design and CEO approval.
- Use semantic HTML landmarks and heading hierarchy; keep links, buttons, navigation, `details`/`summary`, and form controls keyboard-operable and appropriately labelled.
- Preserve visible `:focus-visible` states, touch-friendly targets, useful image alt text, and support for `prefers-reduced-motion`. Do not rely on color alone to communicate state.
- Match the approved design in `DESIGN-SPEC.md` and supplied references at exactly 1440px desktop and exactly 390px mobile. Preserve the 1280px centered desktop container, 16–20px mobile gutters, stacked mobile cards, visible focus states, and touch-sized controls. Keep layouts fluid and avoid overflow; verify intermediate-width behavior when changing responsive CSS.
- Preserve meaningful page metadata, canonical/site configuration, descriptive titles and descriptions, crawlable links, and semantic structure. Add structured data only when its content is accurate and approved.
- Prefer the existing Astro/CSS approach and supplied assets. Preserve approved originals and their `public/assets/` runtime aliases and mapping. Optimize image dimensions/formats and loading behavior when appropriate, avoid unnecessary client JavaScript, and keep animations progressively enhanced.
- Treat all copy, phone numbers, email addresses, service areas, testimonials, and contact details as approval-sensitive content. Do not change or fabricate them without Design/CEO approval.
- Keep components and styles readable and focused. Do not introduce dependencies, invent client content, replace approved photography, or make unrelated refactors as part of a focused task.
- Design fidelity and responsive changes require LeToya’s design review; technical implementation, accessibility, SEO, performance, and validation remain Engineering responsibilities. Surface uncertainty instead of inventing a visual or content decision.

## Validation

Run commands that exist in `package.json` from the repository root:

```sh
npm run check
npm run build
npm run test:visual
```

`npm run test:visual` starts the configured Astro dev server and must compare the full page and every section against the approved references at exactly 1440px desktop and exactly 390px mobile. Confirm the 1280px centered desktop container, 16–20px mobile gutters, stacked cards, focus states, and touch-sized controls. Use `npm run test:visual:update` only after an approved design change is documented; never change approved references or refresh baselines merely to make a test pass. `npm run dev` is available for manual inspection. Do not claim a validation command passed unless it was actually run; record failures and environmental limitations in the handoff.

## Git and collaboration workflow

- Work only in the Ridgeline repository for Ridgeline tasks. Check `pwd`, branch, remote, and `git status` before edits.
- Deliver implementation work from a dedicated task branch and prepare a pull request for review. Preserve the existing history and prior commits when creating that branch; do not merge it.
- Keep commits focused and reviewable. Documentation-only work must not include source, asset, dependency, generated-output, or unrelated changes.
- Preserve existing Git history. Do not rewrite history, reset or revert other agents’ work, force-push, or switch branches in a shared checkout without explicit direction.
- Review the diff and validation evidence before handoff. Pushes, pull requests, merges, deployments, and changes to approved baselines require explicit authorization from the project owner/reviewer.
- Do not merge your own work. Hand the focused commit or branch to Morgan for review, and coordinate any shared-checkout changes through the board.
