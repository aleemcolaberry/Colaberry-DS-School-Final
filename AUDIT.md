# Heuristic audit — Colaberry DS

## Note — 22 Oct 2026 (accelerator: FDE section — reverted to v3)
- User preferred the previous version: the v4 bento is reverted to **v3 (three *How it works*-style cards, single CTA)**. Kept from the v4 round: dash-free copy (captions use "FIG. 0N:", meta uses commas). Files: `ai-home-frontier.jsx` + `dist/`, `frontier.css`, `school.css` (`@build-hash 6626c8d9`), `?v=` restamped. Same markup/CSS as the v3 gate below (clean), so that result stands.

## Note — 22 Oct 2026 (accelerator: FDE section — v4 bento, dash-free, no dead space)
- Feedback: no em/en dashes, no dead space, bento for this section only, stronger hierarchy. **Layout** (`ai-home-frontier.jsx` + `dist/`, `frontier.css` rewritten, `school.css` `@build-hash 08ab2917`, `?v=` restamped): 12-col bento — **The outcome** is the large dark anchor tile (8 cols × 2 rows: eyebrow → 44 px black h3 "Join, and you become highly in demand" → one paragraph → the demand/supply chart, which `flex: 1`s into the remaining height with `preserveAspectRatio="none"` + `vector-effect: non-scaling-stroke` and zero-length round-capped end markers, so the tile fills exactly); **The role** (4 cols: h3 + three icon rows Design / Ship / Run) and **How to start** (4 cols: h3 + two option rows + the single *Start for free* button + "Either way" caption) stack beside it, their rows `flex: 1` so the right column fills whatever height the grid gives. ≤ 1100 the outcome spans 12 and the two small tiles share a row; ≤ 760 everything stacks and rows stop flexing. Eyebrows are 13 px sans medium with a coloured dot (no mono-caps, no numbers); card h3 700 at 20–24 px, the anchor h3 900 at ≥ 30 px (§6.4). Copy: every "—"/"–" removed (harness count in-section = 0); meta uses commas.
- **Gate** (`rwd-lint` + `rwd-sweep`, standalone, 19 widths): `frontier.css` **E0 W1**, `school.css` E0 (hash in sync), standalone HTML E0; sweep **no Frontier findings at any width**; at 1920 the outcome tile is 876×838 against role 392 + start 426 + 20 gap = 838 (no gap), chart plot 810×473, one button in the section. Pre-existing items outside the section unchanged (`tap1`, `h1` ≤ 414, `ov2` nav at 320).
- **Known / accepted:** `.fde-chart__tag` ("The gap") is absolutely positioned **inside the chart plot** (`role="img"`, no text beneath it, the SVG labels are HTML rows above/below the plot) — the §7.1/§1.6 rule targets badges over text; W accepted. "For free" wording still to confirm with Ali against the $149/mo band.

- **Fix after verification:** the chart lines rendered short of their end dots in the final state (`pathLength=1` dash under `preserveAspectRatio="none"` + non-scaling stroke: Chromium scales the dash by user length, not screen length). Dash removed from the markup; the draw-in is now a `<clipPath>` rect sweep (width 0 → 600) animated by GSAP, so the no-JS / reduced-motion state and the post-animation state are both the full line.

## Note — 22 Oct 2026 (accelerator: FDE section — single CTA)
- Feedback: one CTA for the section. "Reserve a seat" removed; the two doors are now plain option rows (icon · title · meta) and one full-width `lg` **Start for free** button sits under both, above the "either way" caption (Hick's law — one action). Files: `ai-home-frontier.jsx` + `dist/`, `frontier.css`, `school.css` (`@build-hash 0cef359b`), `?v=` restamped. Layout-only change inside the card; no new widths/colours, gate result from the v3 note stands.

## Note — 22 Oct 2026 (accelerator: FDE section — v3, rebuilt on the *How it works* spine)
- **Changed** (`ai-home-frontier.jsx` → `dist/ai-home-frontier.js`, `frontier.css` rewritten 184 → 48 lines, `school.css` re-spliced + `@build-hash 36ef4e2c`, `?v=` restamped on all School pages + both standalone sources): the section now mirrors `.home-steps` directly above — kicker · h2 · lead, then **three equal cards** with the exact `.home-step` anatomy (40 px number · mono kicker → black `h3` with one coloured word → `--fs-body-sm` paragraph → dashed rule → blueprint FIG. + caption). **FIG. 01** *Design → Ship → Run* (system box · check · live ring · traffic line) and **FIG. 02** *Demand vs. people who can do it* are drawn in the `AwIlloFrame` blueprint style (same 300×230 viewBox, 2 px strokes, `--neutral-300/500` + one accent, `.aw-illo__t` labels, `.aw-illo__dash` connectors). **FIG. 03** is the two doors (icon tile · title · meta · one `md` full-width button each) closing with the `.aw-illo__cap` line "Either way, you train as an FDE from day one". Card accents follow the step trio (blue-500 · red-500 · green-600 via `textTone()`).
- **Motion (GSAP + ScrollTrigger, once, skipped under reduced motion / without GSAP; markup carries the final state):** FIG. 01 — system scales in, pills slide, flows fade, check and traffic line draw (`pathLength=1` + `strokeDashoffset`), live dots pulse ×3 then rest; FIG. 02 — supply then demand draw, dots pop, gap fills, label lands; FIG. 03 — doors rise, caption fades. No motion MCP in this project; the only infinite loop is the shared `.aw-illo__dash` marching-ants on connectors (same as *How it works*).
- **Gate** (`rwd-lint` + `rwd-sweep`, standalone, 19 widths): `frontier.css` **clean (E0 W0)**, `school.css` E0 (hash in sync), standalone HTML E0; sweep **no Frontier findings at any width**; cards 423×661 equal at 1920, media 340/340/376. Remaining sweep items pre-existing and outside the section (`tap1` lead-card checkbox, `h1` hero ≤ 414, `ov2` nav at 320). Harness contrast not re-run: no new pairs (SVG labels `--text-subtle`/`--text-brand` on `--surface-card`, door tiles `--status-*-bg/-fg`).
- **Known / accepted:** `.fde-step__kick` keeps the mono-caps anatomy of `.home-step__kick` for consistency (tracking `.04em`); `.aw-illo__t/__cap` tracking lives in legacy `aw.css`. "For free" wording still to confirm with Ali against the $149/mo pricing band.

## Note — 22 Oct 2026 (accelerator: FDE section — layout v2 for *The role* and *The outcome*)
- **Changed** (`ai-home-frontier.jsx` → `dist/ai-home-frontier.js`, `frontier.css` rewritten, `school.css` re-spliced + `@build-hash`, `?v=` restamped): the 7/5 bento becomes **three alternating full-width bands** — 01 *The role* on a light card (copy left | an **open pipeline** right: Design → Ship → Run as three connected stage cards; the window chrome, fake log line and typing animation are gone, the *Live* pill moves into the Run stage) · 02 *The outcome* is now the **dark band** and the section's visual anchor (chart left at up to 640 px | copy right; DOM keeps copy first, CSS `order` swaps on desktop) · 03 *How to start* unchanged. Role kick/num colour → `--text-link` (was raw `--blue-600` for a moment; `--status-info` before). Chart tag → the `--status-danger-bg/-fg` chip pair so it holds in both themes inside the dark band.
- **Why:** Von Restorff — the dark ground now sits under the outcome Ali asked to highlight, not under the role illustration; Law of Common Region / Proximity — each idea owns one row with its own artifact; alternating media sides give a scan rhythm; fewer decorative elements (−6: dots, title bar, log, two borders, console frame).
- **Gate** (`rwd-lint` + `rwd-sweep`, standalone, 19 widths): lint **E0** on `frontier.css`, `school.css` (hash in sync), standalone HTML; sweep **no Frontier findings at any width** — first pass showed `.fde-in` spilling 4 px at 1100–1180 (two-column role band too narrow for three stages) → the role band stacks at ≤ 1280, the other two at ≤ 1100. Remaining sweep items are pre-existing and outside the section (`tap1` lead-card checkbox, `h1` hero ≤ 414, `ov2` nav at 320).
- **Known / accepted:** as the note below (livedot W, mono-caps kick, `Magnetic` dropped here only, "for free" wording to confirm).

## Note — 22 Oct 2026 (accelerator: FDE section — Ali's feedback of 21 Oct + Laws-of-UX pass)
- **Changed** (`ai-home-frontier.jsx` → `dist/ai-home-frontier.js`, `frontier.css`, `school.css` regenerated, `?v=` restamped on all School pages + both standalone sources): kicker renamed *Frontier / Forward Deployed Engineer (FDE)*; h2 → "Become an FDE. **Become highly in demand**" (7 words); lead defines the role once and states the free start. Tile 2 *Why it matters now* → *The outcome* ("Join, and you become highly in demand" — you-centric, the gap chart stays). Tile 3 *How Colaberry gets you there* → *How to start*: the frontier-stack cards (Models · Agents · Data · Deployment — duplicated the console's inputs) and the three proof chips (duplicated the lead and tile-3 copy) are **removed**; in their place two equal "doors", one CTA each — *Come to a free Open House* → "Reserve a seat" (jotform, same as every Open House CTA) and *Join the AI Accelerator for free* → "Start for free" (outline; scrolls to the hero lead form via `siteStartClick`, falls back to `/start-free`) — joined by a "Either way, you train as an FDE from day one" pill. Copy cut from ~210 to ~120 words in the tiles.
- **Laws of UX, before → after (honest):** Hick (one vague "Join Colaberry" among 4 cards + 3 chips → two named, parallel choices) 5 → 8 · Von Restorff (CTAs now the only buttons in the section, outcome in red) 5 → 8 · Serial position / peak-end (outcome second, action last) 5 → 8 · Jakob (A/B option cards + "either way" merge is a familiar pattern) 5 → 8 · Cognitive load (3 repeats of "real companies / live projects / mentors" → 1) 5 → 8 · Goal gradient (path to the role now visible) 4 → 7 · Fitts (full-width lg buttons inside each door) 8 → 8 · Aesthetic-usability 8 → 8. **Section overall ≈ 5.5 → 8.**
- **Gate** (`scraps/rwd-lint` + `rwd-sweep`, standalone page, 19 widths): lint `frontier.css` **E0 W1**, `school.css` **E0** (no §8.1 stale), standalone HTML **E0** (the `<noscript>` inline `#4A4A4A`/`#C20E1E` → `--text-muted`/`--text-brand`, both standalone sources). Sweep: **no Frontier findings at any width** — a first pass showed `.fde-in` ("Model") spilling at 320 after a 1280→320 resize, fixed by stacking the Design diagram ≤ 400 px (chips wrap, System below). Remaining sweep items are outside the section and pre-existing: `tap1` (lead-card checkbox), `h1` (hero 64 px ≤ 414), `ov2` at 320 (`.snav__meta` in the resized state). `audit-harness` (contrast / a11y) not re-run: no new colour pairs (door tiles reuse `--status-*-bg/-fg`, text on `--surface-subtle`/`--surface-card` tokens only).
- **Known / accepted:** `.fde-livedot` §1.8 W is a decorative dot, not a control. `.fde-tile__kick` keeps the mono-caps anatomy of `.home-step__kick` directly above for consistency, tracking cut to `.04em` (§6.4). `Magnetic` wrapper dropped from this section (banned §6.2; other page CTAs still use it — fix on next touch). **Copy to confirm with Ali:** "Join the AI Accelerator for free" mirrors the hero's free start; the pricing band below still says membership is $149/month.

## Pass 9 — 15 Oct 2026 (whole-project heuristic audit → CLAUDE.md §9 enforcement)

Scope: every live page (44) through `scraps/rwd-lint.html` (static), `scraps/audit-harness.html?run=all` (overflow · contrast both themes · light islands · a11y structure · perf, at 390/768/1280) and, for the accelerator, `rwd-sweep.html` (19 widths); fixes below; then the rules were made self-enforcing.

### Found → fixed
- **Hero entrances left content invisible under reduced motion / a throttled ticker** (verifier catch): `bf-hero` / `bg-hero` / `wp-hero` ran a masked-line slide + cascade unconditionally with no `clearProps` and no safety — with `prefers-reduced-motion: reduce` the h1 sat 115 % below its `overflow: hidden` mask and sub/card stayed at `opacity: 0` (WCAG 2.3.3, §6.2, §7.3.1). All four School heroes now share one treatment: skipped under reduced motion, one 0.5 s fade + 10 px rise with `clearProps`, a 2.6 s safety `gsap.set(clearProps)`, and the `.wp-line__mask` / `.home-hero__line` masks released.
- **Three School pages were blank behind the boot fallback** (`beginners-career-switchers`, `builders-founders`, `working-professionals` → `main0 h1x0`): the design-system compiler inlines every page App into `_ds_bundle.js`, whose copy mounted first with the bundle's own part copies (DS namespace not yet assigned → React #130) and then held the "mounted" flag so the real script never ran. Every page App now refuses to mount unless `typeof __ds_ns === 'undefined'` (i.e. it is the page's own script), `#root[data-page]` names its page, every part is registered and nothing has mounted. All four React pages: `main1 h1x1`, console clean.
- **Contrast (§2.2):** tagline "Colaberry" green-700 on white at 18 px bold = 4.26:1 on all four School pages → `--text-on-light-green`; UI-kit outline button on the red CTA band (ink on red-700, 2.5:1) → `--text-on-accent` text/border.
- **Heading order (§3.3):** dashboard panel `h3` under the view `h1` → `h2`; training `contact` / `events` card `h3` → `h2.h-card` (same size, right level).
- **Landmarks (§3.2):** dashboard had no `<main>` → the view container is `<main id="main">` (one view visible at a time; each view keeps its own `h1`, so the raw DOM count stays 7 — accepted, see below).
- **Duplicate id:** `student-projects.html` carried an older second `#spEmpty` → removed.
- **Touch targets ≥ 44 px (§3.8) at 390:** School audience pills (39), School footer links (38 wide), training header CTA (38) + footer links (36) + flagship nav logo (30) + "Classic home" (21), learner-app search field (26), avatar (36), segment buttons (40), "View all" (40), auth "Back" (42), "Forgot password?" (32), marketing footer links (36), UI-kit header/card buttons and footer links.
- Frontier section: `.fde-sys` squeeze at 320/1024–1180, hero `h1` 64 px ≤ 414, lead-card checkbox hit area (pass earlier today, logged above).

### Enforcement (new — CLAUDE.md §9)
- **`_lint.mjs`** runs the *same* rules as `scraps/rwd-lint.html` headlessly (the browser file is evaluated with fetch/document shims — one source of truth) over the lint's `FILES` **plus every live `.html` discovered on disk**, and exits 1 on any error outside its documented `ALLOW` map. **`deploy.yml` runs it before the build**, so a new page that breaks §1–§8 cannot ship even if nobody listed it. Verified against the browser lint on a sample (identical findings).
- Static lint result today: **0 unaccepted errors**, 834 warnings — all on files in the lint's `LEGACY` list (raw `#fff` on dark bands, mono-caps kickers, hover lifts > 4 px, images without dimensions), to be cleared page-by-page as each is next touched.

### Known / accepted (pass 9)
- `ads/Meta Ad *.html` (3) and `ui_kits/marketing-website/index.html`: in-browser Babel (§8.2) — animation exports / a design-kit demo, not deployed marketing pages; in `_lint.mjs` `ALLOW`. The ads' 16 px overflow at 390 is the fixed 9:16 artboard (§1.11).
- `index.html` dark mode: 2 "light islands" (`.tpl`, `.gcard`) — export-artifact previews, documented in pass 5.
- `Colaberry School/register.html`: harness `ERR` — a 0-delay forwarder to the JotForm (cross-origin after redirect); nothing to probe.
- `app/dashboard.html` `h1x7`: one `h1` per SPA view, only one view rendered at a time (`display:none` on the rest).
- `design-system.html` `touch26` at 390: specimen controls inside the component gallery (§7.1.8 says mocks are still targets) — next touch of the gallery.
- Lead-card consent checkbox reads 18 px to the probe; the 26 px hit area is a `::before` inset (same as the carousel dots).
- Legacy lint warnings (834) stay warnings until each file is next touched; `LEGACY` only shrinks.

## Note — 15 Oct 2026 (accelerator: Frontier section — heuristic pass + 19-width sweep)
- **Heuristic pass** (consistency with the rest of the page): the three tiles now share the `.home-step` card anatomy used directly above — numbered circle + mono kicker → black-weight `h3` with one toned word → muted paragraph → dashed divider → media. Headline-first order per tile (*Design it. Ship it. Keep it running.* / *Demand is outrunning supply* / *Start now. Graduate ready for the role*). Tile 02 is copy-left / chart-right between 640 and 1000 so the chart never balloons across a full-width card; tile 03 is copy + CTA | 2×2 stack cards (Models · Agents · Data · Deployment) + proof chips. The timeline variant was tried and reverted on review ("no strict path").
- **`rwd-sweep` `../Colaberry School/accelerator.html`, 19 widths 320→1920:** Frontier findings → **none**. Fixed on the way: `.fde-sys` ("System") squeezed to 12–31 px at 320 / 700 / 1024–1180 (grid track `minmax(64px,1fr)` + the console stacks its three stages between 1001–1280 where the 7-column tile is narrowest, and ≤ 760). Pre-existing page findings also fixed: hero `h1` 64 px at ≤ 414 (`clamp(33px, 11vw, 50px)` → ≤ 46 px), lead-card checkbox 18 px (now a 26 px `::before` hit area; the probe reads the box, so `tap1` at ≤ 480 is the same accepted case as the carousel dots).
- **Known / accepted:** `tap1` (lead-card checkbox, see above). `rwd-lint` / `audit-harness` (contrast, perf) not re-run this pass.

## Note — 15 Oct 2026 (console errors on every School page: `useTweaks is not a function` + React #130)
- **Cause:** the design-system compiler inlines every project `.js/.jsx` into `_ds_bundle.js` — including the four School page Apps (`<slug>.app.jsx` **and** `dist/<slug>.app.js`). Each copy self-mounted React into `#root` the moment the bundle loaded (before `tweaks-panel`, the parts, or even the right page), so every page threw 2 × `useTweaks…` + 4 × `#130` on load; the page still rendered because the real deferred App mounted last. The standalone showed them in the bundler's error pill.
- **Fix:** every page App mounts only when `#root[data-page]` names its own page, every part it renders is registered on `window`, and nothing has mounted yet (`window.__cbPageMounted`). `#root` carries `data-page="<slug>"` on the four live pages and the standalone src. Standalone also dropped in-browser Babel: parts ship precompiled (`dist/*-sa.js`, `dist/accelerator-sa.app.js` from `accelerator-sa.app.jsx`; `_build.mjs` `SCHOOL_PAGES` now includes `accelerator-standalone-src`), the unpack splash is blank white and the "Unpacking…" pill hidden (post-bundle patch — re-apply after any re-bundle).
- The errors clear once `_ds_bundle.js` is regenerated from the guarded sources (end of turn / next build); until then the stale bundle still carries the old self-mounting copies.

## Note — 15 Oct 2026 (accelerator: Frontier Deployed Engineer section)
- New section `#frontier` on `Colaberry School/accelerator.html` (+ the standalone bundle), placed after *How it works*: kicker `03` · h2 "Become the engineer every AI company is hiring for" · lead → illustrated bento — **01 What the role is** (dark deploy console, `data-theme="dark"` scoped so every colour is a token: design → ship → run, finite GSAP play-in + a live dot), **02 Why it matters now** (demand / supply gap, schematic, no numbers), **03 How Colaberry gets you there** (frontier stack: models · agents · data · deployment) + the one CTA "Join Colaberry". Copy is the ticket draft verbatim, distributed over the section pattern (overline · title · support line · content · action). *Graduate stories* kicker renumbered `03 → 04`.
- Files: `ai-home-frontier.jsx` → `dist/ai-home-frontier.js`, `frontier.css` (added to `SCHOOL_CSS` in `_build.mjs`, the lint `FILES`/`SCH` lists and the standalone src), `school.css` regenerated (`@build-hash` recomputed with the build's arithmetic; `?v=b6c26435` stamped on all School pages), `accelerator.app.jsx`/`dist` wired.
- Motion: markup carries the final state; GSAP `from()` tweens play it in once on scroll and are skipped under `prefers-reduced-motion` or without GSAP; the only infinite loop is `.fde-livedot` (allowed live dot); connector "packets" run 6 cycles then rest. No hover on the tiles (static cards); the CTA is the only control.
- **Harness not run this session** (quota) — the page is *out for review*, not shipped: run `scraps/rwd-lint.html?run`, `audit-harness.html?run=school` and `rwd-sweep.html?run=school` next pass; expected watch-points: `.fde-gap__tag` sits on the chart via a grid overlay (not absolute), the dark tile's `--text-muted`/`--status-*` pairs are the tuned dark tokens.

## Note — 15 Oct 2026 (fonts: no substitute needed)
- Checked whether Roboto Medium / Bold / Black were missing (every weight in `assets/fonts/fonts.css` points at the `roboto-400-*` files). They are not: those files are Google's **variable** builds (`fvar`/`gvar` tables, full 100–900 axis), so each `@font-face` pins the axis to its declared weight and Bold / Black are real cuts. Per-weight downloads are byte-identical — reverted; header comment in `fonts.css` now says so. `'Roboto Fallback'` (metric-matched Arial) is only ever visible while the woff2 is downloading or where the self-hosted files can't be reached.
- The user still saw the fallback in the browser preview, so every `@font-face` in `assets/fonts/fonts.css` now lists **two sources**: the local file first, Google's copy of the same face second. Browsers request the second only when the first *fails* (the normal path stays self-hosted with zero CDN requests; offline behaviour unchanged) — a broken local font path now renders real Roboto instead of Arial. Stand-in decision (user: "something similar is fine", decide-for-me): real Roboto from the CDN beats any look-alike, and the metric-matched Arial stays as the last resort for zero layout shift. `styles.css` / `components.css` regenerated with the build's hash (`623e4088`). Harness not re-run: the preview iframe would not load any page this session (not font-related — a bare page timed out too); re-run `?run=all` next pass.

## Pass 8 — 8 Oct 2026 (self-review of passes 6–7 + delivery performance → CLAUDE.md §8)

### Self-review — what I got wrong in passes 6–7 and fixed here
- **Cache-busting missed `app/*`**: the bump regex only matched hex, so `components.css?v=states2610` stayed stale on six pages. Fixed by the build's stamper semantics (any `?v=` value is replaced).
- **Lint §2.1 severity used the wrong match** (`/color\s*:/` could land on `background-color`) — a white-on-brand label could be reported as E instead of W, or vice versa. Fixed.
- **`components.css` imported `styles.css` with no version** — a stamped `components.css` could pull a cached old `styles.css`. Moot now: no imports remain.
- Everything else re-verified: `check_design_system` clean (fonts, tokens, 44 cards), harness `ct0 nt0` on the re-measured set, `index.html` sweep clean at 19 widths.

### What was slow (measured)
- **Four-level `@import` chain**: `components.css → styles.css → tokens/fonts.css → assets/fonts/{fonts,remixicon}.css → .woff2` — four serial round-trips before the first font byte; 10 CSS requests per page.
- **`remixicon.css` (145 KB) fetched twice on every page** — direct `<link>` *and* via the import chain (different URLs).
- **School lead-gen pages: ~4.3 MB of JavaScript before first paint** — `babel.min.js` (3 MB) transpiling 8–9 JSX files in the browser, Lucide 348 KB, `_ds_bundle.js` 699 KB (for Button/Input/Avatar), React, GSAP — all synchronous. `design-system.html` did the same with two JSX files.
- School pages: 4–7 render-blocking stylesheets each (13 section files, 190 KB total, re-fetched per page).
- Nav logo: **1658×390 PNG, 306 KB**, rendered at 28 px tall on every page; the one photo: **2.1 MB PNG**. No `width`/`height` on images; no font preload; no metric-matched fallback (text reflows — and can overflow — when Roboto lands).

### Fixed
- **Build step `_build.mjs`** (`npm run build`, run by `deploy.yml`): generates `styles.css` (flat: fonts + icons + tokens + base + motion + utilities, 226 KB raw ≈ 35 KB gzip, `@build-hash`), `components.css` (styles + `components.src.css`), `Colaberry School/school.css` (13 → 1), `Colaberry School/dist/*.js` + `guidelines/dist/*.js` (Babel `react` preset + `transform-block-scoping` — `const`→`var`, matching the old script-tag runner so classic scripts keep sharing one global scope), then the existing stamper. Sources stay editable: `tokens/*.css`, `components.src.css`, School `*.css`, `*.jsx` (page Apps now in `<slug>.app.jsx`).
- **Pages**: link `components.css` *or* `styles.css` (never both), no direct `remixicon.css` (−145 KB/page), School pages link `school.css` (6 → 1), every vendor/bundle/page script `defer`, Babel removed from five pages (−3 MB each), `<link rel="preload" as="font">` for `roboto-400-21.woff2` (+ `remixicon.woff2` where icons are above the fold) on index, docs and School pages, `landing.js` deferred, Lucide deferred on the docs page with `createIcons` moved to `DOMContentLoaded`.
- **Fonts** (`tokens/fonts.css`): `'Roboto Fallback'` / `'Roboto Mono Fallback'` — Arial / Courier New with `size-adjust` + ascent/descent overrides to Roboto's metrics, second in every stack, so the swap changes neither line breaks nor box height (the §1 text-overflow rule applied to the loading state).
- **Images**: `assets/logo/*.webp` (≤ 800 px; 306 KB → 29 KB, 9–19 KB for the rest) and `assets/photos/openhouse-cohort.webp` (2.1 MB → 117 KB); every `src`/`url()` reference (HTML, CSS, JSX, compiled dist, `site.js`) re-pointed; PNG masters kept for favicons / OG / downloads. `index.html` logos carry `width`/`height`, below-fold ones `loading="lazy" decoding="async"`, the nav mark `fetchpriority="high"`; the story photo has intrinsic size.
- Result (harness `perf:` line): `index.html` **9 requests** (was ~20+), `css2 imp0 babel0 headSync0 nodim0 lazyAbove0`; `design-system.html` 25 requests, no Babel; `accelerator.html` ~5.4 MB → ~2.2 MB uncompressed JS+CSS, 7 → 2 stylesheets, no Babel, renders (6 sections, 69 icons).

### Harness / lint changes
- `audit-harness.html`: `perf(fr)` probe at 1280 — request count, bytes by type (`transferSize`; shown as n/a on origins that hide resource sizes), `@import`ed sheets, blocking stylesheets, styles+components both linked, blocking head scripts (theme.js / motion.js exempt), Babel, images without dimensions, lazy images in the first screen, images > 200 KB, remote hosts, faces without `swap` (local fallbacks exempt), DOM size, DCL — summarised as `perf: …` with `!` on budget misses.
- `rwd-lint.html`: `checkPerfCSS()` / `checkPerfHTML()` (`§8.x`): **E** — stale generated file (recomputes the source hash), `@import` in a shipped stylesheet, styles + components both linked, direct remixicon link, `@import` in `<style>`, in-browser Babel on a live page; **W** — > 3 blocking stylesheets, three.js/Lenis, blocking head scripts, vendor scripts without `defer`, `<img>` without `width`+`height`, lazy image in the first screen, PNG logo/photo with a WebP sibling, no font preload, `font-display: auto|block`, PNG backgrounds. `§8` errors are never downgraded by `LEGACY`.
- Harness/lint/sweep `log()` mirror to the console.

### Known / accepted (pass 8)
- **React School pages still ship ~1.4 MB of vendor JS** (React + DOM 139 KB, GSAP 113 KB, Lucide 348 KB, `_ds_bundle.js` 699 KB) — all deferred, so the HTML/CSS first screen paints first. Next cut (§8.2.4): a `cb-core.js` with only Button/Input/Avatar instead of the 699 KB bundle, RemixIcon instead of Lucide.
- Three School page Apps (`beginners`, `builders`, `working-professionals`) lost their inline JSX in the first compile; their `.app.jsx` sources are the JSX-free (`React.createElement`) form — functionally identical, less pretty to edit.
- `design-system.html`: 20 `<img>` without dimensions (swatch/logo specimens), DOM 2142 — documentation page, accepted.
- `training-site/*`, School blog/story/events: remote `training.colaberry.com` images (§3.4 legacy) — each has an `onerror` fallback; self-host when the content is final.
- Resource byte sizes are not exposed on this preview origin; the `KB` budget is enforced on the deployed site (same-origin) and the Slow-3G walk-through (§8.5).
- `tokens/fonts.css` no longer `@import`s the font files — the build inlines them; a page that links `tokens/fonts.css` directly (none does) would get only the fallback faces.

## Pass 7 — 8 Oct 2026 (contrast: every token pair computed, every page measured → CLAUDE.md §2.6)

Scope: WCAG 2.2 AA contrast across the whole project — first the **token layer** (every text × surface pair, status / action / control / chart / focus pairs, both themes, computed from `tokens/colors.css` with `color-mix` resolved), then **every page** through the harness, whose contrast probe was upgraded so gradients and opacity are *measured* rather than skipped. Rules codified as **CLAUDE.md §2.2 additions + §2.6**, enforced by `tokens/colors.css` (new tokens), `scraps/rwd-lint.html` `§2.x` findings and `scraps/audit-harness.html` (`ct`, `nt`). New DS card `guidelines/cards/contrast-matrix.html` (group *Colors*) renders the live matrix with pass/fail colour.

### What was wrong — tokens (fails every page at once)
- **Form-control boundaries 1.4:1** (WCAG 1.4.11 needs 3:1): `.cb-input/.cb-select/.cb-ta` used `--border-default` (neutral-300 on white = 1.43; dark `rgba(255,255,255,.14)` = 1.53); checkbox / radio used `--border-strong` (2.07); the switch off-track `--control-track` neutral-300 (1.43; dark neutral-700 2.16). Checked checkbox / radio had the leaf fill as their only edge (2.34 on white).
- **Status / chart icon tones under 3:1 on light**: `--status-warning` = amber-500 (2.46 on white, 2.17 on sunken), `--chart-4` the same amber (2.46), `--status-success` = green-600 (3.02 on white but 2.84 on subtle, 2.67 on sunken).
- **Dark `--text-subtle`** (neutral-500) 4.2:1 on `--surface-hover` / `--surface-inverse` (placeholders in hovered rows, inverse panels). Dark `--border-focus` stayed blue-500 (2.9:1 on the inverse surface).
- **Deprecated `--action-green-*`**: white on green-600 3.0:1 light, white on green-500 2.3:1 dark.
- **`--text-muted` / `--text-link` / `--text-brand` on `--surface-hover-strong`**: 4.19 (light), 4.27 / 3.03 / 3.90 (dark) — a pressed/selected surface can only carry strong/body text.

### What was wrong — pages (found by the upgraded harness)
- `index.html`: 13 px white tag on a green-700→800 gradient (4.26); 12 px artboard labels at `opacity:.9` on red-600 (4.0).
- `design-system.html`: carousel demo slide — white 24 px on green-500 (2.34, under even the 3:1 large-text floor); page-local `.cb-input` on `--border-default`.
- `AI-Architect-Accelerator-Brochure.html`: cover labels at `opacity .7/.92/.95` (3.5–4.3) and a `.16` white radial highlight that lifted the badge corner to 4.4.
- `Colaberry Social Media Kit.html` (compiled from `templates/social-post/`): 22 alpha-muted 12–13 px labels (`.6–.9`), 18 `<h3>` with no explicit colour (base.css `--text-strong` → **near-black on blue-800, 1.8:1**), `rgba(255,255,255,.16)` chips lightening red under white text (4.18), green-400 label on blue-900 (3.98), green-500/600/700 gradient starts under white text.
- School: `.aw-final__h` (final CTA band) inherited `--text-strong` → **near-black on cherry, 2.7:1 at 72 px**; `.pg-cta__kick` `rgba(255,255,255,.85)` (3.9), `.pg-cta p` `.92` (4.45); contact-form controls on `--border-default`. App `register` selects and training `contact` select on `--border-default`.

### Fixed
- **tokens/colors.css**: new `--border-control` (neutral-500 both themes — 3.4:1 on white, 5.2:1 on the dark card); `--control-track` → neutral-500 both themes; new `--amber-600 #B86F08`, `--status-warning` and `--chart-4` → amber-600 (3.9:1 on white, 3.5:1 on sunken); `--status-success` → green-700 (4.3 / 3.8 on sunken); dark `--text-subtle` → neutral-400; dark `--border-focus` → blue-300; `--action-green-*` alias the confirm recipe (ink on leaf, 7.4:1); nested light scope mirrors all of it; comments carry the measured numbers. `tokens.json` mirrors the changes.
- **components.css + Input/Select/Textarea/Checkbox/Radio .jsx + _standalone.jsx**: control borders → `--border-control`; hover border steps *darker* (`--text-muted`) instead of lighter; checked / indeterminate checkbox and checked radio keep a green-700 edge (4.3 light / 4.5 dark) around the leaf fill; `cb-check:hover`/`cb-radio:hover` border green-700.
- `landing.css`: `.g-post--green` starts at green-800; `.tpl small` full-opacity. `guidelines/showcase.jsx`: carousel slides start at blue-600 / green-800 / red-600. `design-system.html` `.cb-input` → `--border-control`. `app/app.css` `.cb-select` → `--border-control`. `training-site/contact.html` select → `--border-control`.
- Brochure: all cover / founding-band labels full-opacity; highlight radial `.16 → .08`.
- `templates/social-post/SocialPost.dc.html` + `_kit-standalone.html`: 22 labels full-opacity, 18 artboard `<h3>` get `color:inherit`, 4 chips `rgba(0,0,0,.18)` (darken, never lighten, under white text), green gradient starts green-800→900, "Day in the life" label green-200; kit bundle recompiled.
- School: `.aw-final__h { color:#fff }`, `.pg-cta__kick` / `.pg-cta p` solid white, `.ct-input/.ct-select/.ct-ta` → `--border-control`; `aw.css` / `site-pages.css` cache-busters bumped. All pages re-pointed at `styles.css?v=b492c174` / `components.css?v=e9ba5151` so the token fixes actually load.

### Harness changes
- **`audit-harness.html` contrast probe**: (1) text-colour alpha **and** element/ancestor `opacity` are composited before measuring; (2) every CSS gradient layer of every ancestor is evaluated **where the text is** — five sample points of the text box along the gradient's real axis (linear angle incl. `to` keywords; radial centre / size / extent) and composited over the layers beneath, so a highlight blob in a far corner no longer fails text it never touches, while text that *does* sit on the light stop does; (3) new `nt` count — form-control boundaries (`input/select/textarea`, `.cb-check__box`, `.cb-radio__dot`, `.cb-switch__track`) under 3:1 against the surface around them; (4) only `url()` images remain in the by-eye `contrastImgSample` bucket (index.html went from `+10img` to `+0img`). `playbook.html` added to `DARK`.
- **`rwd-lint.html`** gains `checkColor()` / `checkColorHTML()` (`§2.x`): **E** — raw hex/rgb text colour, raw-ramp text (`--neutral-400/500`, `--red-500`, `--green-500/600/700`, `--amber-500`, `--blue-300/400`), white text on a red-500 / green / amber / chart fill or gradient start, `rgba(255,255,255,<.92)` text, muted/link/brand text on `--surface-hover-strong`; **W** — `opacity < 1` on a text rule, control borders on `--border-subtle|default|strong`, `--amber-500`/`--green-600` as icon/mark fills, inline equivalents. `LEGACY` now covers §2 as well (list only shrinks).
- Results after fixes: `index.html` `ct0 nt0 (+0img)` all widths + dark; `design-system`, `app/*`, `training-site/*`, `ui_kits` `ct0 nt0`; School pages `ct0 nt0` once the CSS cache-busters propagate (measured on blog / contact / podcasts / working-professionals); Brochure and Social Kit `ct0`. Token matrix: every allowed pair ≥ 4.5 (text) / ≥ 3 (icons, borders, ring, charts) in both themes; the only sub-4.5 cells are muted/link/brand on `--surface-hover-strong`, which §2.2 forbids as a pair.

### Known / accepted (pass 7)
- `--surface-hover-strong` × muted / link / brand text is *not a pair* (rule, not a token change) — the matrix card shows those cells amber (large-text only).
- `--chart-3` (3.02) and `--chart-6` (3.08) clear 3:1 on white only just; sequential / diverging scale steps are magnitude encodings read with a legend and are not individually held to 3:1.
- `--border-subtle|default|strong` stay decorative (1.3–2.1:1) — card edges and dividers of surfaces identified by their fill; outlines that *identify* a control use `--border-control`.
- `Colaberry School/register.html` is a redirect page and errors in the harness by design; School React pages need `runAll(PAGES.school, 9000)` to settle before their `ct` is meaningful.
- `design-system.html` `touch26` at 390 and `AI-Architect…` / `Social Media Kit` `main0` are pre-existing (§3 / §7 legacy), not contrast.

## Pass 6 — 8 Oct 2026 (cards · hover states · motion checkup → CLAUDE.md §7)

Scope: every animation, hover state and card layout on `index.html`, the DS card component, the motion layer and the School/training stylesheets, measured with the harness (not the clone screenshots) and codified as **CLAUDE.md §7 — Cards, hover states & motion**, enforced by `tokens/base.css` nets and `scraps/rwd-lint.html` `§7.x` findings. New DS card `guidelines/cards/card-anatomy.html` (group *Patterns*).

### What was wrong
- **Nav overflowed at 320–360 px** (`rwd-sweep` `ov4`): `.lg-d { display:none }` lost to `.lnav__logo img { display:block }` (higher specificity), so the white logo rendered invisibly next to the colour one — 237 px of logo for a 119 px mark — and pushed the theme/burger buttons 61 px past the viewport.
- **Touch targets under 44 px at 390** (`touch3`): specimen-card `.cb-btn--sm` (38 px), the mock sign-in input (42 px), footer links (39 px).
- **Three reveal engines, two class vocabularies**: `landing.css` armed on `html.js`/revealed on `.in`, `tokens/motion.css` on `html.cb-js`/`.is-in`, `aw-animate.css` on `html.aw-anim`/`.aw-in`. A page loading `motion.js` + `landing.js` would strand `[data-reveal]` content at `opacity:0`; `landing.js` had no safety timeout at all.
- **`.cb-card--hoverable`** (components.css, Card.jsx, _standalone.jsx) lifted on touch (no `(hover: hover)` gate), moved under reduced motion, and had no `:focus-visible` ring or keyboard path.
- **Hover lifts all over the map** in School CSS: −2 / −3 / −4 / −5 / −6 / −8 / −12 px, `.4s`/`.55s` durations, `transition: all`, `scale(1.03) rotate()` on certificates, none pointer-gated, several files with no reduced-motion block.
- `thank-you.css` phone icon buzzed forever (§6.2 E). `.cb-check__box svg` used `transition: all`.
- `.bstat dt` squeezed to 88 px at 320 (`sq1`).

### Fixed
- **landing.css / landing.js / index.html**: logo rule specificity (`.lnav__logo .lg-d`), 44 px floors on the specimen buttons, mock input and footer links (mobile), `.bstat dt` grows at ≤ 640, `.tile__link` arrow nudge inside `@media (hover: hover)` and `transform:none` under reduced motion, `:active` press (`--motion-press`) on `.btn/.icobtn/.tw-btn/.lr-sw/.prompt-card` gated on pointer + motion preference; `landing.js` reveals with `in` **and** `is-in` and adds the 2.6 s safety net. Cache-busters bumped (`v4`).
- **tokens/spacing.css**: `--motion-lift: 3px`, `--motion-press: .985` — the one lift and one press in the system.
- **tokens/base.css**: *card safety net* — `[class*="card"|"tile"|"panel"|"__item"]` and their children (and children of `[class*="grid"]`) get `min-width:0`; mono/file strings inside cards `overflow-wrap:anywhere`. *Reduced-motion net* — every transition/animation collapses to one frame; `spin/skel/loader/loading/pulse/.cb-bar` keep looping at 1.6 s.
- **tokens/motion.css**: `[data-reveal]` revealed by `.in` as well as `.is-in`/`.cb-in`; `.cb-hover-lift` uses `--motion-lift`; `.cb-hover-grow` 1.02; `.cb-press` uses `--motion-press`.
- **components.css + Card.jsx + _standalone.jsx**: `.cb-card { min-width:0 }`; hoverable → shadow/border change under `(hover: hover)`, lift + press only under `(prefers-reduced-motion: no-preference)`, `:focus-visible` ring stacked with the shadow; `Card hoverable` with `onClick` gets `role="button"`, `tabIndex=0`, Enter/Space. `Checkbox` transition names its properties.
- `thank-you.css` buzz rings 3× then rests.

### Harness changes
- `rwd-lint.html` gains `checkCards()` / `checkCardsHTML()` (`§7.x`): **E** — fixed `height` on a text card, hover lift > 4 px, two reveal engines (CSS or HTML), `<div onclick>` card, `role="button"` without `tabindex`, a control nested inside a link card; **W** — `overflow:hidden` on a text card, absolutely-positioned badge/label, `scale`/`rotate` hovers on cards, hover transform outside `@media (hover: hover)`, `transition: all`, > 400 ms card transitions, hovers that change layout, clickable card with no `:focus-visible`, hover transforms in a file with no reduced-motion block, inline card heights. `LEGACY6` → `LEGACY` (covers §6 **and** §7; the School/training/kit stylesheets are listed; the list only shrinks). `tokens/motion.css` added to `FILES`. Harness/sweep/lint `log()` mirror to `console` so results can be read without the page.
- Result on the touched set (`landing.css`, `index.html`, `components.css`, `tokens/*`, `playbook.*`, `card-anatomy.html`): **0 E**; W only pre-existing playbook §6.4 and the `.cb-nowrap` / `.cb-tip__pop` utilities. `audit-harness` `index.html`: `ov0 sp0 cl0 ct0 tiny0 touch0`, `dark: ct0 islands2` (accepted below), a11y all clean. `rwd-sweep` `index.html`: clean at all 19 widths.

### Known / accepted (pass 6)
- **Legacy §7 warnings** (fix on next touch): School `site-pages` / `podcasts` / `shorts` / `student-projects` / `wp` / `partner` / `register` / `nav` / `interest-modal`, `training-site/site.css` + `landing.css`, `app/app.css` — lifts of 5–12 px, un-gated hover transforms, `transition: all`, `overflow:hidden` on link cards (`.blog-card`, `.pod-card`, `.sp-card`, `.pcard` clip media corners; their text is not height-constrained), `partner.css` certificate tilt/scale showpiece, `.cbsite-floatchip` (decorative float, not over text). The base nets make all of these harmless under reduced motion; pointer-gating and lift sizes are corrected when each page is next edited.
- `.cb-nowrap` is a utility by definition; `.cb-tip__pop` moves on hover/focus-within because it *is* the hover affordance (tooltip).
- Dark-mode "islands" `.tpl--resume` and `.g-post--cream` are print/social export previews (pass 5).
- The reduced-motion net sets `animation-iteration-count: 1` globally; any new loader must carry `spin`/`skel`/`loader`/`loading`/`pulse` in its class to keep looping (documented in §7.3.2).

## Pass 5 — 8 Oct 2026 (landing redesign + §6 composition standard)

Scope: `index.html` above the fold and every section, judged against the project's own principles; the result codified as **CLAUDE.md §6** (composition · typography · iconography) and enforced by `scraps/rwd-lint.html` `§6.x` findings. Old version kept at `scraps/index-aw-v2.{html,css,js}`.

### What was wrong
- **Hero showed a toy, not the product**: a three.js particle field (so heavy the screenshot harness timed out on it), a 104px three-line headline whose line-mask clipped any wrapped word (at 904px it read "One / Every / experience"), a green→blue gradient word that breaks the brand's own "the cherry never changes", a scroll cue, a "move to gather the web" hint, and a stat line as decoration.
- **Pattern soup**: marquee, pinned horizontal scroll-jack, sticky card stack, parallax floaters, count-ups, magnetic buttons, Lenis smooth scroll — ~400 KB of motion JS fighting the reading order.
- **Typography**: Roboto Black at every size down to 15px; 23 mono-uppercase label styles; tile body copy at 13.5px.
- **Iconography**: seven icons on the whole page, raw-ramp fills (`--red-500`) behind white glyphs.
- **Content**: "245 tokens · 20 components · 26 templates" repeated three times (and stale — 289 / 26 / 29); "AA" listed as a school statistic.

### Fixed
- **Hero** → two columns: eyebrow, 5-word h1 (balanced, `ch`-capped, never masked), lead, primary + secondary CTA, "built for" row with icons; right: a **specimen board** — the same learner card rendered from the real components (`components.css`) in a pinned light pane and a pinned dark pane, with a toast under each. New nested **`[data-theme="light"]` scope** in `tokens/colors.css` (mirrors every token the dark theme overrides) so a light pane can sit inside a dark page.
- **Facts strip** (one place for the four numbers, icons + nouns) replaces the marquee.
- **What's inside**: nine tiles, each with a tonal icon tile; mono-caps keys → 13px sans labels; body 15px; "Theme" tile → **Voice** tile (bad vs good error copy); mini components are the real `.cb-*` classes.
- **How it works**: pinned scroll-jack → four static steps on a connector line.
- **Proof band / footer**: `data-theme="dark"` + tokens instead of `#141414` / `#111`; three school stats; no floaters, no count-up.
- **Principles**: sticky stack → numbered ledger rows (index · icon · title + text · wrapping tag).
- **Start here**: tonal icon tiles; Playbook link added to the designers' card.
- **JS**: GSAP / ScrollTrigger / Lenis / three removed; `landing.js` is 8 KB — nav, menu (Escape, focus return), ramps, copy with a visible failure message, type weights, CSS-driven motion replay, gallery, IntersectionObserver reveal gated on `html.js`; the hero entrance drops its own animation rules after 1.1 s so clones/screenshots never catch frame 0.
- **Nav**: five links; Playbook moved to the menu and footer.

### Harness changes
- `rwd-lint.html` gains `checkCompose()` / `checkComposeHTML()`: E — gradient text, infinite animation on content, marquee, split-text heading masks; W — sticky card stacks, tracked-out caps (≥ .1em), Black under 24px, body copy under 14px, > 10 uppercase rules per stylesheet, animation libraries on marketing pages, decorative `<canvas>`, h1 over 10 words, unwrapped icon glyphs, raw-ramp icon-tile fills. `LEGACY6` lists pre-§6 pages whose §6 errors report as `(legacy)` warnings until next touched.
- New DS card `guidelines/cards/page-composition.html` (group *Patterns*).

### Known / accepted (pass 5)
- **Legacy §6 findings** (fix on next touch, list only shrinks): School `aw.css` / `home.css` / `nav.css` (logo marquee, pulsing dots, dash illustration, sticky `.aw-pcard` stack, tracked kickers), `training-site/landing.css` + `index.html` (particle canvas, marquee, scroll cue, GSAP), `ui_kits/marketing-website/site.css` (`.cb-grad` gradient text), `playbook.css` tracked-out mono kickers, `design-system.html` 12.5px recipe copy.
- Gallery mock artifacts (`.tpl--resume`, `.g-print`, `.g-post--cream`) stay paper-white/cream in dark mode on purpose — they preview print/social exports; text contrasts on their own ground.
- The preview capture tool renders text wrapping in flex rows unreliably (buttons/labels wrap in the clone, not in the browser) — verify wrapping in a real browser, not from the harness thumbnail.

## Pass 4 — 8 Oct 2026 (state coverage: empty · loading · error · success · offline · no-JS)

Scope: every live page and component audited for the six states, with a static scan (remote images without fallback, forms without an inline error / busy / success path, `novalidate` with no custom validation, filter chips with no empty message, `#root` pages with no `<noscript>` / watchdog, `fetch` without `catch`, iframes without `title`, autoplay without `muted`, over-long nowrap badge labels, vague state copy). Rules codified as **CLAUDE.md §5**, enforced by `scraps/rwd-lint.html` (`§5.x` findings) and a new §4 step 5b walk-through.

### Already covered (verified, no change)
- Components: `Alert`, `EmptyState` (default / search / error / offline), `Spinner`, `Skeleton`, `Toast` (pause on hover, `role=status`), `Progress` (indeterminate), `Table` (loading rows / empty / error), `Button loading`, `Input`/`Select`/`Textarea`/`Checkbox`/`Radio` error + hint, `Avatar` image → initials fallback, `Popover`/`Drawer` hidden while closed.
- Learner app: `guard.js` global error net (toast or self-contained banner), inline validation (`aria-invalid` + `describedby`), busy submit, dashboard assignments empty / error in place, screen-level error card; login/register validate before "submitting".
- School: interest modal (validation · busy · fail + retry · done state with focus); `accelerator.html` `<noscript>` + `boot-fallback.js`; shorts filter empty + `aria-live`; student-projects live count; register redirect spinner; thank-you `role=status`; blog / story / events remote images fall back to `assets/img-fallback.svg`.
- Training site: remote hero/story images fall back; Course Report badges hide on error (accepted).

### Fixed
- **Forms that could not fail** — `Colaberry School/contact.html`, `training-site/contact.html`, `training-site/hire-our-grads.html` had `novalidate` + a submit handler that showed "Thanks!" for an empty form, with no busy, no failure path. New shared **`/forms.js`** (`<form data-cb-form>`): required / email / tel / minlength validation with inline `role=alert` messages, `aria-invalid` + `aria-describedby`, first bad field focused, errors clear on input, busy submit (`aria-busy`, "Sending…", repeat clicks blocked), success (`[data-cb-success]` `role=status` shown and focused, fields hidden), failure (`[data-cb-fail]` `role=alert` with mailto alternative, button → "Try again", focus returned). Transport hook: `window.cbSubmitLead(data, form)`. `name` + `autocomplete` added to the training fields; `.ct-field` error styles in `site-pages.css`; inline handlers removed.
- **Blog filter with no empty state** — `Colaberry School/blog.html` gets a live post count (`aria-live=polite`) and a `role=status` "No posts in this topic yet" block, toggled by `site-chrome.js`.
- **Shorts thumbnails** (`i.ytimg.com`) now fall back to `img-fallback.svg`.
- **Student projects** filter script referenced a `#spEmpty` element that did not exist (would throw on an empty category) → `role=status` empty block added, toggled with `hidden`.
- **Dashboard search did nothing** (a decorative `type=search`) → real search over courses, assignments, pages and jobs with a results listbox (arrow keys, Escape, 44 px rows) and a visible `role=status` "No matches for “x”…" state.
- **Three lead-gen React pages without a watchdog** — `beginners-career-switchers`, `builders-founders`, `working-professionals` had `<noscript>` but would stay blank if the bundle failed. `boot-fallback.js` now reads per-page copy from `data-fb-kicker/-title/-sub` on `#root`; all three load it (7 s grace, headline + Open House CTA + phone, hard-coded brand values so it survives a CSS failure). Fallback h1 gains `text-wrap: balance` + `overflow-wrap`.
- **No `<noscript>`** on `ui_kits/marketing-website/index.html` and the three `ads/` previews → added.
- **No offline state in the learner app** — `guard.js` adds a sticky `role=status` warning banner on `offline` (in flow, not a toast), removed on `online` with a "Back online" toast.

### Harness changes
- `rwd-lint.html`: new `checkStates()` — §5.1 filters/search without empty state, §5.2 forms without inline error path / `novalidate` without validation / `fetch` without `catch`, §5.3 no busy state, §5.4 no success confirmation (W; a redirect counts), §5.5 remote `<img>` without `onerror` + missing `alt`, §5.6 `#root` without `<noscript>` (E) / without watchdog (W, lead-gen only), §3.4 iframe without `title`, §3.8 autoplay without `muted`, §5.7 badge/chip labels > 25 chars (nowrap overflow; `data-wrap` opts a wrapping class out), §5.8 vague copy in state slots ("Error", "Oops", "Something went wrong"). FILES gains the School register page, the UI kit and the ads. Result after fixes: **0 E · 3 W** (the three `ads/` watchdog warnings, accepted below).
- New DS card `guidelines/cards/states-coverage.html` (group *Patterns*) — the six states with the component that owns each.

### Known / accepted (pass 4)
- Marketing forms resolve locally after 700 ms (no backend in this project); wire `window.cbSubmitLead` to the real endpoint at deploy. The failure path is reachable by returning a rejected promise from it.
- Static marketing pages have no offline banner by design — they are plain HTML and stay readable; images fall back.
- `ads/` previews and the UI kit have `<noscript>` but no boot watchdog (internal tools, not lead-gen) — lint reports this as `W`, accepted.
- Training `blog.html` cards still point at placeholder content (unchanged from pass 1).

## Pass 3 — 7 Oct 2026 (responsive sweep, 320 → 1920)

Scope: all 41 live pages through `scraps/rwd-sweep.html` at 19 widths (page scroll width, elements past the viewport, text spill/clip, vertical spill, overlapping text, squeezed columns < 90px, distorted images, hidden nav with no toggle, oversized sticky bars, mobile h1 > 52px) plus a new **static lint** (`scraps/rwd-lint.html`) that scans every stylesheet and page for the §1 anti-patterns before a browser is opened.

### Systemic
- **Base layer safety net** (`tokens/base.css`): `html, body { max-width:100%; overflow-x: clip }` — a stray wide element can no longer scroll the page sideways (the harness still sees it, so it still fails §4); `min-width:0` on children of `.cb-grid/.cb-cluster/.cb-row/.cb-stack`; `pre`/`table` scroll inside themselves; URLs/emails/code `overflow-wrap: anywhere`.
- **CLAUDE.md §1** rewritten: a viewport contract (§1.0 — exact meta, no zoom lock, `100%` not `100vw`, shared breakpoint stops), "every 2+-column grid needs a stacking breakpoint or `auto-fit`", "never position a chip/label absolutely over text", fixed-size artboards as the only pixel-width exception (§1.11). §4 gains the lint as step 2 and `?run=` one-URL runs for both harnesses.
- **Source-order trap**: `design-system.html` kept its ≤960/≤640 media block in the *middle* of the stylesheet, so every class defined after it (`.ds-gal`, `.ds-tile`, …) silently escaped the mobile layout → the component gallery stayed 2-column at 320. The block now sits last. Rule added to §1: responsive overrides go at the end of the file.

### Per page
- `index.html` / `playbook.css` — "Copy" chip was absolutely positioned over the prompt `<code>` (73% overlap at every width) → in flow via flex column; `.map__s small`, `.sc__head`, `.sc__lbl` 11–11.5px → 12px.
- `AI-Architect-Accelerator-Brochure.html` — `.dive__wk` week label floated over body copy ≥700 → flex header row; 60px page padding kept a 148px content column at 320 → 22px ≤640, tighter plan/enroll padding.
- `Colaberry School/faq.html` — question text was a bare text node in a flex `<button>` (anonymous items can't shrink) → wrapped in `.faq2__t` with `min-width:0`.
- `Colaberry School/shorts.css` — placeholder label `inset:0` overlapped the tag chip → bottom inset 96px.
- `training-site/site.css` — curriculum `<summary>` row (`ix · title · hrs · chev`, nowrap) spilled 12px at 320 → wraps ≤480, body list 1 column.
- `ui_kits/marketing-website/site.css` — enroll `.cbsite-choice` 2-col never stacked → ≤560 single column; section `h2`s in the social kit header rows get `flex-wrap` + `min-width:0`.
- `ads/ad-scenes.jsx` — review previews were sized from `window.innerWidth` at first render (400px cards at 320) → CSS-sized (`width:100%; max-width; aspect-ratio`) with a ResizeObserver driving the scene scale.
- `components/core/Avatar` — `--xs` 11px → 12px (all three copies).

### Harness changes
- `rwd-sweep.html`: skips sr-only text, `pointer-events:none` fixed layers (custom cursor), invisible scrims, collapsed `<details>` content (stale geometry), transformed images (rotated watermark ≠ distortion); `?run=<group|all>`; docs added to `SLOW`.
- `rwd-lint.html` (new): parses CSS (incl. `<style>` blocks and inline `style=""`) and flags fixed widths ≥360px on content containers, multi-column grids with no stacking media query, `nowrap` on long-label selectors without a mobile override, `100vw`, `overflow:hidden` on text sections, sub-12px type, sub-24px controls, bad viewport metas. E = must fix; W = fix or justify here.

### Known / accepted (pass 3)
- Fixed-size export artboards (`Colaberry Social Media Kit.html`, brochure pages, template sheets) scroll horizontally inside their own row ≤720 — by design (§1.11).
- Lint `W`s left as-is: `.g-stats` (2 stat chips inside a card, `minmax(0,1fr)`), `.snav__card--*` mega-panels (desktop-only ≥1121, hidden below), decorative absolutely-positioned glows/marks with pixel widths, `.ds-ramp`/`.ds-chart-row` swatch strips (1fr tracks of empty swatches), `.stats`/`.footer__grid` 2-col ≤760 (short labels; stack ≤400).
- Carousel dots read 22×8 to the probe; the 24px hit area comes from `::before { inset:-8px }`.

## Pass 2 — 7 Oct 2026 (full-project re-sweep)

Scope: all 44 live pages (root ×4, School ×14, training ×16, app ×6, UI kit, ads ×3) at 390/768/1280 + dark probe, via `scraps/audit-harness.html?run=all` (harness now uses a MessageChannel clock so it runs in a background tab, and `?run=` auto-start). Rules codified in `CLAUDE.md` §2–§4 so every new page inherits them.

### Systemic (tokens / base / theme)
- **Theme switching was three different systems** — landing + playbook used `cb-landing-theme`, the app `cb-theme`, the docs nothing (no persistence, no pre-paint, a new `MutationObserver` leaked per click). Replaced by one root `theme.js`: pre-paint attribute, one key (legacy key still read), `prefers-color-scheme` followed until the visitor picks, `color-scheme` set, `[data-theme-toggle]` / `[data-set-theme]` / `[data-theme-switch]` / `[data-theme-radio]` wired with ARIA state, `img[data-logo-swap]` handles plain → `-white` art, `cb-theme` event for charts. `app/theme.js` removed; landing/playbook/docs/app all load `/theme.js`.
- **`color-scheme` was never set** → native controls/scrollbars rendered light in dark mode. `html{color-scheme:light}` + `[data-theme=dark]{color-scheme:dark}` in `tokens/colors.css`.
- **Dark focus ring 2.5:1** (blue-300 @ 50%) → 90% (6.6:1 on page, 1.4.11).
- **Focus rings vanish in forced-colors** (every ring is `outline:none` + box-shadow) → base `@media (forced-colors: active)` outline fallback.
- **Links in prose relied on colour alone** (blue-600 vs body ink = 2.4:1, 1.4.1) → base underlines unclassed `p/td/dd/blockquote/figcaption a` and `.cb-prose a`.
- Base also gains `::placeholder{color:var(--text-subtle)}`, `[hidden]{display:none!important}`, reduced-motion `scroll-behavior:auto`.
- **Popover panel was focusable while closed** (opacity-only hide; dashboard notifications tabbable off-screen at 390) → `visibility:hidden` when closed in `components.css`, `Popover.jsx`, `_standalone.jsx`.

### Per page
- `Colaberry School/events.html` — remote HubSpot hero image (broken) → `assets/photos/openhouse-cohort.png`.
- `Colaberry School/faq.html` — `.faq2__q` 3px spill → `min-width:0` on button + children.
- `Colaberry School/register.html` — `meta refresh` 1s → 0s (WCAG F40).
- `training-site/pricing.html` — h1 → h3 skip; sr-only h2s added to the plan and bundle sections.
- `training-site/blog.html` — four `href="#"` cards → `<article>`s whose "Read on the Colaberry blog" link goes to training.colaberry.com/blog.
- `training-site/job-readiness.html`, `reviews.html` — Course Report badges are remote and hide on error (accepted; swap for self-hosted art when available).
- `app/index.html` — footer `h5` under `h2` → `h3.footer__h`.
- `app/dashboard.html` — panel heads h3 → h2 (were skipping from the view h1); 11px nav badge → 12px; search input gets `type=search` + `aria-label`, 44px row, `:focus-within` ring.
- `ui_kits/marketing-website/index.html` — avatar initials 2.3:1, photo tag 2.2:1, three `href="#"` legal links (see below).
- `ads/Meta Ad Intro/Outro.html` — format toggle white on red-500 (3.85:1) → red-600; toolbar controls 33px → 44px; `aria-pressed` on the format buttons.
- **Red gradients still starting at red-500 under white text** (36 instances: School final CTA band, brochure cover/founding panel, social-post / WhatsApp / brochure / one-pager / deck / program-page / standee / certificate / business-card / newsletter templates) → all start at `--red-600`; School CTA copy at 85–90% white → solid white. Bundled standalones (`Colaberry Social Media Kit.html`, `Colaberry Accelerator (standalone).html`) regenerated from their sources.
- `components/core/_standalone.jsx` Breadcrumb still emitted `href="#"` (the docs page uses this copy) → mirrors `Breadcrumb.jsx` (link only with `href`, `<button>` with `onClick`, otherwise `<span>`); `.cb-bc__btn` styles added to `components.css`.

### Harness changes
- `scraps/audit-harness.html`: MessageChannel clock (runs in a background tab), `?run=<group|all>` auto-start, offscreen skip links no longer count as overflow, visually-hidden (sr-only) text skipped, and the contrast probe now composites absolutely-positioned **sibling** layers (gradient plates behind artboard text) — the Social-kit "Colaberry" 1.06:1 hit was that false positive.

### Known / accepted (pass 2)
- Harness `contrastImgSample` on the audience pages lists the Anthropic certificate card (`.bg-certbig`, white→tint gradient): terracotta `#b0552f` 5.0:1, neutral-600 5.7:1, ink — all pass on the card's own ground; the probe only sees the dark band behind it.
- React School pages need ≥ 9 s settle in the harness (cold Babel compile); the first width probed may still report 0 text — re-run that page alone.
- `training-site` Course Report badges and hero photos are remote (training.colaberry.com) and fall back / hide on error — swap for self-hosted art when available.
- Footer "Events" links in the School microsite measure 38 px wide: inline text links in a wrapped row, 44 px tall — acceptable under 2.5.8.

## Pass 1 — Oct 2026

Scope: every live page (landing, docs, School microsite ×14, training site ×16, learner app ×6, UI kit, ads, brochure, social kit) probed at **390 / 768 / 1280 px** for horizontal overflow, clipped/spilling text, WCAG 2.2 contrast (text + placeholders), text < 12 px, tap targets, landmarks/headings/alt/labels/duplicate ids, dark-mode leaks (light islands, non-flipping tokens). Harness: `scraps/audit-harness.html` — `runAll(PAGES.school)` then `pick(page, ['contrast','overflow'])`.

## Systemic findings (fixed)

1. **White labels on brand cherry (`--red-500`, 3.85:1)** — every primary button/pill across landing, School nav + `.pgbtn`, training `.nav__cta`/`.btn-mag`, interest modal, templates (social post, one-pager, poster, intro/outro, Eventbrite, storyboard), brochure, ads. The tokens already said `--action-bg` (red-600, 4.75:1); the CSS bypassed them. All moved to `--action-bg/--action-fg/--action-bg-hover`. Red gradients that carry small white text now start at red-600.
2. **Green-600/700 as text or white-on-green fills (3.0–4.3:1)** — kickers, blog/project tags, build-path labels, thank-you chip, `.r-btn--green`, kit "Enroll" button. Now `--text-on-light-green` (green-800) or `--action-confirm-*` (ink on leaf).
3. **Headings inside dark/colored panels inheriting `--text-strong`** — `base.css` colors every h1–h6 ink, so headings on dark cards rendered near-invisible: events feature card (1.1:1), social-kit X board, landing gallery mocks. Explicit colors added.
4. **Avatar initials** — `.cb-avatar` ink on brand fills (1.1–4.1:1) in School heroes and training testimonials → white ink on AA-safe fills (green-700 → green-800).
5. **Sub-12 px text** — ~70 rules at 9.5–11.5 px (eyebrows, meta, chips, mono labels) raised to 12 px floor across landing, docs, School, kit, brochure.
6. **Docs page had no mobile layout** — fixed 264 px sidebar + fixed-column grids → 1035 px wide at 390. Added ≤960/≤640 breakpoints (top bar nav, single-column grids, scrollable table, wrapped type rows). Swatch labels now pick black/white by real luminance (recomputed on theme change) instead of a hard-coded list — every ramp/chart label clears 4.5:1 in both themes.
7. **Landing bento collapsed to 42 px tiles ≤640 px** — `.t-ramps` kept `span 2` in the single-column grid, creating an implicit track. Fixed; also added `<main>`, skip link, footer/band grey contrast, mock-heading colors.
8. **Training site** — off-canvas drawer now `visibility:hidden` when closed (+ `aria-expanded`/`aria-hidden`, focus move); footer muted copy 3.3 → 7:1; dead `href="#"` Privacy/Terms → `app/legal.html#…`; dead HubSpot logo URLs → self-hosted SVGs; 4-up grid and contact/pricing two-column layouts now stack; h2→h4/h5 skips normalised (72 headings); footer stacks at ≤560.
9. **Tap targets** — logo links, footer links, chips, icon buttons, switch tracks, component close buttons (20×23 → 32–36) and carousel dots (8 px → 24 px hit area) meet WCAG 2.2 24 px and the project's 44 px rule where layout allows.
10. **Dark mode** — hard-coded `green-50`/`red-50`/`blue-50` chips in docs → theme-aware surface tokens; a11y table pairs pinned to literal light-theme hex so dark mode doesn't misrepresent them; Breadcrumb no longer emits `href="#"`.

## Responsive sweep (19 widths, 320 → 1920)

Harness: `scraps/rwd-sweep.html` — loads a page once, scrolls it to trigger reveals, then resizes a live frame through 320/360/390/414/480/540/600/640/700/768/820/900/960/1024/1100/1180/1280/1440/1920 checking page scroll width, elements past the viewport, text spill/clip, squeezed columns (< 90 px text boxes), overlapping text, distorted images, hidden navs with no toggle, oversized sticky bars and oversized mobile h1s. `runAll(PAGES.training, SLOW)` then `worst(page)`.

Fixed:
- **Inline grids that ignored the breakpoints** — `repeat(4,1fr)` / `1fr 1fr` written as inline styles on training-site admissions steps, pricing, hire-our-grads, contact; docs example layouts in `showcase.jsx` → `repeat(auto-fit, minmax(min(100%, N), 1fr))`.
- **Landing bento** collapsed to 42 px tiles ≤ 640 (`.t-ramps` kept its 2-col span); template thumbnails and colour ramps go single-row / 5-up ≤ 360; Copy chip no longer sits over code.
- **Off-canvas menus** (`training-site/index.html` `.mmenu`, training drawer) hidden with `visibility` so they never widen the page or take focus.
- **Header logos squashed** on phones (training `.hd__logo` to 13 px wide, app `.brand`, UI-kit logo, docs hero/clear-space, School certificate, thank-you) — `flex: none` + `object-fit: contain`; secondary header actions hide ≤ 400–560 instead of crushing the mark.
- **Missing mobile navigation** — learner app and UI-kit headers hid their links ≤ 860/900 with no toggle; both now have a 44 px burger (`aria-expanded`/`aria-controls`) opening a stacked panel.
- **Squeezed rows**: School event cards (title column 38 px), stats grid ≤ 360, dashboard panel heads and search, docs state captions, footer grids ≤ 400.
- **Ad review gallery** previews capped to the viewport (were fixed 400 px → horizontal scroll ≤ 414).
- App "Most popular" badge no longer overlaps the "Accelerator" badge; brochure gets a screen-only ≤ 640 layer (print rules untouched); thank-you h1 capped at 12vw.

## Known/accepted

- Social-kit boards are fixed-size export artboards (rows scroll horizontally ≤ 720); hidden dropdowns/toasts/scrims and rotated watermarks trip the overlap/distortion heuristics but are invisible or decorative; glyph overshoot on tight-leading display type (`line-height < 1`) is cosmetic.
- Landing template thumbnails and the cream social-post mock stay light in dark mode on purpose (they preview artifacts); their text now contrasts against their own ground.
- Docs contrast table deliberately shows "AA Large" / "Body fail" pairs; samples render at 19 px bold so the page itself passes.
- `training-site/blog.html` cards and Course Report badges point at placeholder/remote content — needs real URLs/assets.
- `target="_blank"` links (School footer/social) have no "opens in new tab" hint — AAA-level, left as is.
- Dark-mode probe false positives: elements with `transition: color` read stale values in a throttled offscreen iframe; the harness now disables transitions before probing.
