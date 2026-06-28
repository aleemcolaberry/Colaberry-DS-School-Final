# Colaberry Learn — reference application

A complete, multi-page application built **entirely on the Colaberry design system** as a
working reference and stress test. Every page links `components.css` (the one-link, no-build
path) and composes the system's tokens, utilities, motion layer, and CSS-only components.

## Pages & flow

| Page | File | What it demonstrates |
|---|---|---|
| Landing | `index.html` | Sticky nav, hero + live SVG chart, scroll reveals, program/pricing cards, stat band, dark CTA |
| Registration | `register.html` | Split brand panel, multi-field form, step indicator, select/textarea/checkbox, social auth |
| Thank you | `thank-you.html` | Success state (spring-pop), application ID, numbered next-steps timeline |
| Login | `login.html` | Dark brand panel, form, remember-me, social auth |
| Dashboard | `dashboard.html` | App shell + sidebar, mobile nav drawer, topbar search, **dark-mode toggle** (persisted), KPI cards w/ sparklines, animated line chart with series switch, donut, skill bars, you-vs-cohort bars, assignments table |

Flow: **Landing → Apply → Thank you → Login → Dashboard** (all linked with relative `<a>` hrefs).

## What it uses from the system

- **One-link styling:** `../components.css` (tokens + base + motion + utilities + all 20 components). No React, no build.
- **Components:** `cb-btn`, `cb-card`, `cb-badge`, `cb-input`, `cb-ta`, `cb-check`, `cb-avatar`, `cb-table`.
- **Utilities:** `cb-container`, `cb-grid` (auto-fit), `cb-stack`, `cb-cluster`, `cb-row`, `cb-scroll`, `cb-panel`, `cb-sr-only`, `cb-skip-link`.
- **Motion:** `data-reveal` (+ `../motion.js`), `cb-anim--rise/scale/pop`, `cb-stagger`, `cb-delay-*`, `cb-hover-lift/grow/glow` — all reduced-motion safe.
- **Charts:** SVG/CSS driven by the `--chart-N` tokens, so the dark-mode toggle re-themes them automatically.

## App-only files (not part of the design system)

- `app.css` — page composition (nav, hero, auth split, dashboard shell, chart primitives). Tokens only, no raw hex.
- `charts.js` — vanilla JS: theme toggle + persistence, line/donut/bar animation, mobile drawer.

## Notes

- The dashboard sidebar collapses below 1024px into a slide-in drawer (hamburger in the topbar).
- Icons use RemixIcon (loaded via a direct `<link>` per page for robustness). Screenshot/PPTX
  capture tools can't embed icon webfonts, so icons may appear as boxes **in exports only** — they
  render correctly in any real browser.
- Forms are demo-wired (any input proceeds); swap the `submit` handlers for a real backend.
