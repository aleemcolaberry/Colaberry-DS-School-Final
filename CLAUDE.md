# Colaberry DS — project instructions

These rules apply to EVERY page, component, card and template in this project
— existing or new. A page is not done until §4 passes.

## 1. Responsive ground rules

Every live page must be clean at **every width from 320px to 1920px** — no
horizontal scrollbar, no clipped or overlapping text, no squeezed column,
at any width in between. The harness checks 19 widths; the design must not
depend on any one of them.

0. **Viewport contract.** Every page: `<meta name="viewport"
   content="width=device-width, initial-scale=1">` — exactly that, no
   `maximum-scale`, no `user-scalable=no`, no fixed `width=`. The base layer
   sets `html, body { max-width:100%; overflow-x: clip }` so a stray wide
   element can never scroll the page sideways — but `clip` only hides the
   symptom; the harness still sees the element past the viewport and the
   page still fails §4. Use `100%`, never `100vw` (it includes the scrollbar).
   Layout breakpoints are **content-driven**, written as `max-width` queries
   at the width where the layout actually breaks; the shared stops are
   1280 · 1120 · 960 · 900 · 768 · 640 · 560 · 480 · 400 · 360. Type is
   fluid (`clamp()`), so headings never need a breakpoint of their own; cap
   mobile `h1` at 12vw. **Media-query overrides go at the END of the
   stylesheet** (or carry higher specificity) — a class declared after the
   `@media` block silently escapes it; this is how the docs gallery stayed
   two-column on phones.

1. **Never let `white-space: nowrap` meet a flexible container.** Nowrap is
   only for short mono chips/dates/nav links that are hidden or wrapped on
   mobile. Any button/pill with sentence-length labels must wrap on small
   screens (`.pgbtn` and `.cb-btn` already do this ≤640px/≤480px — keep it).
2. **Flex rows of links/chips/buttons always get `flex-wrap: wrap`** plus a
   row gap (e.g. `gap: 8px 22px`). The footer `.aw-footer__links` bug was
   exactly this.
3. **Grid columns use `minmax(0, …)` or `auto-fit/minmax()`**, never bare
   `1fr 1fr` with unshrinkable content. Add `min-width: 0` to flex/grid
   children that contain text (`.cb-min0` utility exists; base does this
   for `.cb-grid/.cb-cluster/.cb-row/.cb-stack` children). **Every grid with
   2+ columns needs a stacking breakpoint** or `repeat(auto-fit,
   minmax(min(100%, N), 1fr))` — the one form that needs no media query.
   Inline-style grids must carry a class so a media query can reach them.
4. **No fixed pixel widths on content containers.** Use `max-width` +
   `width: 100%`, and `clamp()` for type (already the norm: headings use
   `clamp(min, vw, max)`).
5. **Two-column heroes/sections must stack** under ~900px with a media query;
   side cards become full-width (`minmax(320px, 420px)` columns need a
   stacking breakpoint).
6. **`overflow: hidden` on a section hides bugs, it doesn't fix them.**
   Before shipping, probe for children whose rect extends past the viewport
   (see §4). **Never position a label/chip absolutely over text** (floats
   and `position:absolute` badges overlap at some width) — put it in flow
   with flex + `gap`, or reserve its space with padding on *every* line.
7. **Base layer (tokens/base.css) is the safety net** — media, iframes and
   form controls are capped at `max-width: 100%`, body has
   `overflow-wrap: break-word`, headings `overflow-wrap: break-word`,
   `[hidden]` always hides. Don't undo these; don't rely on them either.
8. **Touch targets ≥ 44px** on mobile (never below the WCAG 2.5.8 24px
   floor, including icon-only buttons and carousel dots — use a `::before`
   inset to grow the hit area when the visual must stay small); body text
   ≥ 14px, fine print ≥ 12px — there is no 11px anywhere.
9. **Marquees and off-canvas drawers** must be clipped by an
   `overflow: hidden` parent (marquee) or `visibility: hidden` +
   transform (drawer) so they never create horizontal scroll or take focus
   while closed.
10. **Logos never squash**: `flex: none` + `object-fit: contain`; hide
    secondary header actions on phones instead of crushing the mark.
11. **Fixed-size artboards** (social posts, print pages, slides, ads) are
    the only fixed-pixel layouts allowed. They live inside a wrapper that
    scrolls horizontally (`overflow-x:auto`) or scales (`transform` /
    `zoom`) on narrow screens, and are listed under *Known/accepted* in
    `AUDIT.md`. Nothing else in the project gets a pixel `width`.

## 2. Colour, contrast & theming

1. **Semantic tokens only.** `var(--text-*)`, `var(--surface-*)`,
   `var(--action-*)`, `var(--status-*-fg/-bg)`. Never raw hex, never raw
   ramps (`--red-500`) for text or fills that carry text. The tokens are
   already AA-tuned in BOTH themes; bypassing them is how every past
   contrast bug happened.
2. **Contrast minimums (WCAG 2.2 AA):** 4.5:1 for text, 3:1 for text ≥ 24px
   or ≥ 18.66px bold, 3:1 for icons, borders of inputs, focus rings and
   chart marks (1.4.11). Specifically:
   - White text goes on `--action-bg` / `--surface-brand` (red-600), **never
     on `--red-500`** (3.85:1). Red gradients that carry white text start at
     red-600.
   - Green text on light = `--text-on-light-green` (green-800); green fills
     with a label = `--action-confirm-*` (ink on leaf). Green-500/600/700 are
     never text and never carry white text.
   - Grey text is `--text-muted`/`--text-subtle` (neutral-600+). Neutral-500
     is 3.4:1 on white — not for text, not even captions; de-emphasise with
     size/weight.
   - Text over photos/gradients sits on a scrim or a solid plate — never
     assume the image is dark enough.
   - Placeholders use `--text-subtle` (base `::placeholder` already does).
   - **Full-opacity ink, always.** No `opacity` below 1 on an element that
     holds text (a 12 px white label at `.9` on red-600 is 4.0:1), no
     `rgba(255,255,255,.7)` captions, no `color-mix(… transparent)` text.
     De-emphasise with the muted token, size or weight.
   - **Gradient floors.** A gradient that carries white text has every stop
     at or past red-600 / green-800 / blue-500 / neutral-800 — the harness
     checks text against the *lightest* stop. green-700 (4.3:1) and
     red-500 (3.9:1) are not floors.
   - **Form-control boundaries are `--border-control`** (neutral-500, 3.4:1
     on white, 5.2:1 on the dark card): inputs, selects, textareas,
     checkbox / radio / switch tracks. `--border-subtle|default|strong`
     (1.3–2.1:1) are for card edges and dividers — surfaces identified by
     their fill, where WCAG does not require an outline.
   - **Icons and chart marks use the icon tone**: `--status-*` (not the
     `-bg`/`-fg` chip pair) and `--chart-N` are tuned to ≥ 3:1 on page,
     subtle *and* sunken surfaces in both themes; never a raw ramp
     (`--amber-500` is 2.5:1 on white, `--green-600` 2.7:1 on sunken).
   - **`--surface-hover-strong` carries `--text-strong` / `--text-body`
     only** — it is a pressed/selected surface; muted, link and brand text
     fall under 4.5:1 on it in both themes.
3. **Headings inside dark or coloured panels get an explicit colour**
   (`color: var(--text-on-inverse)` / `--text-on-accent`). `base.css`
   colours every h1–h6 `--text-strong`, which is near-invisible on dark.
4. **Colour is never the only signal.** Links in running text are underlined
   (base does this for unclassed `p a`, `td a`, `dd a`…); status gets an icon
   or label beside the colour; required fields get text, not just red.
5. **Dark mode is owned by `theme.js` + `tokens/colors.css`.**
   - Every themed page loads `/theme.js` (or `../theme.js`) **synchronously in
     `<head>` right after the stylesheet** — never a page-local inline theme
     script, never a second localStorage key. It persists one choice
     (`cb-theme`), follows `prefers-color-scheme` until the visitor picks,
     sets `color-scheme`, swaps `img[data-logo-swap]`, and wires
     `[data-theme-toggle]`, `[data-set-theme]`, `[data-theme-switch]`,
     `input[data-theme-radio]` with the right ARIA state. Don't add click
     handlers to those — it's delegated and would double-flip.
   - Pages that are deliberately light-only (School microsite, training site,
     print artboards) pin `<html data-theme="light">` and don't load it;
     `html { color-scheme: light }` keeps native controls consistent there.
   - **No light islands:** nothing in a themed page may hard-code a white or
     cream background unless it previews an export artifact — then its text
     must contrast against *its own* ground, and it must be documented in
     `AUDIT.md › Known/accepted`.
   - Dark-mode logo = `-white` art via `data-logo-swap`, never a CSS filter.
   - Anything that tints at runtime (swatch labels, canvases, charts) listens
     to the `cb-theme` document event or a `data-theme` MutationObserver.
6. **Contrast is measured, not assumed — the contract.** Every text/surface
   token pair the system allows is listed, live-computed and pass/fail
   coloured in `guidelines/cards/contrast-matrix.html` (both themes); the
   same arithmetic runs in `scraps/audit-harness.html`, which now
   composites text-colour alpha **and** element/ancestor `opacity`, checks
   text against the worst stop of any CSS gradient beneath it, measures
   placeholders, and reports form-control boundaries under 3:1 as `nt`.
   Only `url()` images stay in the by-eye bucket (`contrastImgSample`).
   `scraps/rwd-lint.html` catches the static half as `§2.x` findings: raw
   hex / rgb text colours, `opacity` on text, alpha-white text, raw-ramp
   text (`--neutral-400/500`, `--red-500`, `--green-500/600/700`,
   `--amber-500`), white text on a red-500 / green fill or a gradient
   starting under the floor, control borders on a decorative border token,
   muted text on `--surface-hover-strong`. **A new page ships with `ct0
   nt0` at every width and in both themes, zero `§2` E, and every
   `contrastImgSample` entry either on a scrim or listed in `AUDIT.md`.**
   When a pair is missing, add a *token* (as `--border-control`,
   `--amber-600` were added) — never a page-local hex.

## 3. Accessibility (WCAG 2.2 AA) — structural rules

1. **Document:** `<html lang="en">`, a unique `<title>`, `<meta name="viewport"
   content="width=device-width, initial-scale=1">` with **no
   `user-scalable=no` / `maximum-scale`**.
2. **Landmarks:** exactly one `<main id="main">`, a skip link as the first
   focusable element (`.cb-skip-link` or page equivalent), `<nav aria-label>`
   for each nav, `<footer>`. Decks/print artboards may skip the skip link.
3. **Headings:** exactly one `<h1>` per page; no level skips (h2 → h4);
   visual size comes from a class, not from picking a smaller tag.
4. **Images:** every `<img>` has `alt` — descriptive for content, `alt=""`
   for decorative. Icon fonts/SVGs inside a button or link are
   `aria-hidden="true"` and the control has a text or `aria-label` name.
   No remote image URLs — self-host under `assets/`.
5. **Controls:** buttons are `<button>`, links are `<a href>` with a real
   destination — never `href="#"` (use a `<button>` or a real anchor). Every
   icon-only control has `aria-label`; toggles expose `aria-pressed` /
   `aria-expanded` / `aria-checked`; off-canvas menus `aria-controls` +
   `aria-hidden` while closed; `role="switch"` for switches.
6. **Forms:** every input has a visible `<label for>` (or `aria-label` for
   search boxes); errors are text next to the field with `aria-invalid` +
   `aria-describedby`; required is said in words; autocomplete attributes on
   identity fields.
7. **Focus:** never remove focus indication. Use `:focus-visible` with
   `box-shadow: var(--focus-ring)` (3:1 in both themes); base adds a
   forced-colors outline fallback. Focus order follows reading order — no
   positive `tabindex`. Dialogs/drawers trap focus, close on Escape, and
   return focus to the trigger.
8. **Motion:** everything non-essential collapses under
   `prefers-reduced-motion: reduce` (use the `cb-anim` / `data-reveal`
   layer, or add the media query to page CSS). No infinite animation on
   reading content; marquees pause on hover and stop under reduced motion.
   Autoplaying video is muted and has controls or a pause button.
9. **Timing:** no `meta refresh` with a non-zero delay; auto-dismissing
   toasts pause on hover/focus and are announced via `role="status"`.
10. **New-tab links** carry `rel="noopener"`; secondary content in a new tab
    is acceptable, but the primary CTA opens in the same tab.
11. **Text:** `text-wrap: balance` on short headings, `pretty` on body,
    `overflow-wrap: anywhere` on user-supplied strings/URLs/emails; truncate
    only with `.cb-truncate` / `.cb-clamp-*` (never a bare `overflow:hidden`
    on text).

## 4. Definition of done — the quality gate (run it, every time)

**Before any page, card or template ships (new or edited), run the harness
and record the result.** Zero tolerance for: horizontal scroll, text
spill/clip, contrast fails, text < 12px, missing landmarks/alt/labels,
duplicate ids, `href="#"`, broken images, **or a missing state (§5) — a
form that can't fail, a list that can't be empty, a page that goes blank
without JS.**

1. Add the page to `window.PAGES` in `scraps/audit-harness.html` **and**
   `scraps/rwd-sweep.html` (same group as its siblings), and its CSS/HTML to
   `FILES` in `scraps/rwd-lint.html`. Themed pages also go in the harness
   `DARK` set.
2. **Static lint first** — open `scraps/rwd-lint.html?run` (or
   `lint(['../page.html','../page.css'])`). Zero `E` findings. Every `W` is
   either fixed or has a one-line reason in `AUDIT.md`. This catches bare
   multi-column grids with no breakpoint, fixed widths, `nowrap` on long
   labels, `100vw`, sub-12px type and bad viewport metas before a browser
   is even opened — and the §5 state rules: forms with no inline error /
   busy / success path, `novalidate` with no custom validation, remote
   images with no `onerror`, `#root` pages with no `<noscript>` or
   watchdog, filter chips with no empty message, `fetch()` with no
   `catch`, over-long nowrap badge labels, vague state copy — and the §6
   composition rules: gradient text, marquees, infinite animation on
   content, sticky card stacks, split-text masks, decorative canvases,
   animation libraries on marketing pages, tracked-out caps, Black weight
   under 24px, body copy under 14px, raw-ramp icon fills, unwrapped icon
   glyphs, h1 over 8 words — and the §7 card / hover / motion rules:
   fixed heights and `overflow: hidden` on text cards, absolute badges,
   lifts over 4px, `scale`/`rotate` hovers, `transition: all`, hover
   transforms outside `@media (hover: hover)`, slow card transitions,
   hovers that change layout, clickable cards with no focus ring, two
   reveal engines on one page, `<div onclick>` cards — and the §8 delivery
   rules: a stale generated stylesheet, `@import` in shipped CSS, a page
   linking both styles.css and components.css or remixicon.css directly,
   in-browser Babel, blocking scripts, images without dimensions, lazy
   images in the first screen, PNG logos/photos, no font preload. Pages in the
   lint's `LEGACY` list report §2/§6/§7 errors as warnings until they are
   next touched (§8 errors are never downgraded); that list only shrinks.
3. Open `scraps/audit-harness.html?run=<group>` (or `?run=all`). React /
   Babel pages need a longer settle: `runAll(PAGES.school, 9000)`.
   Each page must report `ov0 sp0 cl0 ct0 nt0 tiny0`, `dark: ct0 islands0`,
   `a11y: lang✓ main1 h1x1 skips0 noalt0 unnamed0 unlabeled0 dupId0 href#0
   broken0`, and a `perf:` line with no `!` (§8.5). Inspect `pick(page, ['contrast','nonText','overflow','spill','clipped',
   'touch'])` for anything non-zero; `contrastImgSample` lists text over
   photos (url() images — gradients and opacity are now computed, not
   sampled) that must be checked by eye against §2.2.
4. Open `scraps/rwd-sweep.html?run=<group>` (or `runAll([page], SLOW)`)
   → `worst(page)` must be empty across all 19 widths (320 → 1920):
   no `SW` (page wider than viewport), `ov`, `sp`, `cl`, `vs`, `lap`
   (overlapping text), `sq` (text box < 90px), `img` (distorted), `tap`,
   `NAV` (links hidden with no toggle), `sticky`, or `h1`. Don't trust the
   first width of a React page — re-run the page alone if 320 alone fails.
5. Check both themes by eye at 390 and 1280 (themed pages), keyboard-tab the
   page once (visible ring on every stop, Escape closes overlays), and run
   with reduced motion on.
5b. **State walk-through (§5), at 320 and 1280:** submit every form empty,
   then with a bad email — inline message under the field, focus moves to
   it, button shows busy then success (or the failure message with a
   retry); filter/search to an empty set — the empty message appears and
   is announced; block `training.colaberry.com` / `i.ytimg.com` in DevTools
   — every image shows the fallback, nothing collapses; DevTools → Offline
   — the page says so (app) or still reads (static); disable JavaScript —
   `<noscript>` copy is useful, not "enable JS". Paste a 60-character word
   into a text field and a 3-line message into any error slot — nothing
   clips or scrolls sideways.
6. Append the result to `AUDIT.md` (date, page, what was fixed, anything
   accepted and why). A finding that is accepted must be listed under
   *Known/accepted* — silence is not acceptance.

If the harness can't be run (no browser), the page is **not** shippable —
say so rather than ship unverified.

## 5. State coverage — every page handles every state

A screen is not designed until its empty, loading, error, success, offline
and no-JS states are designed. These rules are **mandatory for every new or
edited page**, enforced by `scraps/rwd-lint.html` (`§5.x` findings) and by
the §4 walk-through. The parts already exist — use them, don't re-invent:

| Need | Use |
|---|---|
| Nothing yet / no results / failed to load (in-place) | `EmptyState` (`kind="default\|search\|error\|offline"`), `.cb-empty` in plain HTML, `.cb-table__empty` inside tables |
| Persistent, actionable problem or warning | `Alert` / `.cb-alert--danger\|warning` with an action — never a toast alone |
| Transient confirmation | `Toast` / `cbToast` (auto-dismiss, pauses on hover, `role="status"`) |
| Waiting for content | `Skeleton` / `.cb-skel` in the content's own shape; `Table loading`; `Spinner` only for < 1 s or inside a button |
| Submitting | `<Button loading>` / `.cb-btn[aria-busy]` / `cbSetBusy` — label swaps, width keeps, repeat clicks blocked |
| Field errors | `Input/Select/Textarea error=` or `.cb-field--error` + `.cb-field__msg--err` with `aria-invalid` + `aria-describedby` |
| Any plain-HTML form | `<form data-cb-form novalidate>` + `/forms.js` — validation, busy, `[data-cb-success]`, `[data-cb-fail]` for free |
| Learner app pages | `app/guard.js` — global error net, `cbSetFieldError`, `cbSetBusy`, `cbConfirm`, offline banner |
| React/Babel marketing pages | `<noscript>` with the real headline + CTA **and** `boot-fallback.js` (copy via `data-fb-*` on `#root`) |
| Images that can fail | `onerror="this.onerror=null;this.src='…/assets/img-fallback.svg'"` (content) or hide (decorative badges); `Avatar` already falls back to initials |

1. **Lists, grids, filters, search, tables.** Anything that renders N items
   must render N = 0: a visible `role="status"` message ("No posts in this
   topic yet" + one next step), toggled with `hidden`, and a live count or
   `aria-live="polite"` region so the change is announced. Zero items is
   never a blank gap, never a layout collapse (the grid keeps its
   min-height or the empty block takes its place).
2. **Errors are inline, specific and actionable.** The message lives where
   the problem is — under the field, in place of the table, in the card
   that failed — and says *what happened* and *what to do* ("We couldn't
   send that. Check your connection and try again — or email …"), never
   "Error", "Oops", "Something went wrong" alone. Every `fetch`/promise has
   a `catch` that reaches the UI; every `novalidate` form validates itself;
   `required` is said in words. Error states offer **Retry** (or an
   alternative channel) and move focus to the message or the first bad
   field. Field errors clear as the visitor fixes them.
3. **Loading never looks broken or blank.** Content that takes > 300 ms
   gets a skeleton in its own shape (not a centred spinner); a submit
   button goes `aria-busy` with a verb label ("Sending…") and blocks
   repeat clicks but stays focusable; nothing shifts layout when real
   content lands (reserve height/aspect-ratio). JS-rendered pages have a
   watchdog so a failed bundle still shows headline + CTA + phone, not a
   white page.
4. **Success is confirmed where the action happened** (`role="status"`,
   focus moves to it) or by a thank-you page — and tells the visitor what
   happens next ("within one business day"). The form fields are hidden,
   not left looking unsubmitted.
5. **Media always has a fallback.** Remote images carry `onerror`; content
   images have real `alt`; `<iframe>` has `title`; autoplaying video is
   `muted` with controls or a pause button; icon fonts that fail still
   leave a readable label (never icon-only without `aria-label`).
6. **No-JS and no-network are states too.** Every `#root` page has a
   `<noscript>` that carries the real headline, price and a working CTA link
   — not "please enable JavaScript". Lead-gen pages add `boot-fallback.js`.
   App pages show a persistent offline banner (guard.js) and keep what is
   already loaded on screen; marketing pages stay readable offline because
   they are static HTML.
7. **State copy is wrap-safe (no text overflow, at any width).** Every
   state slot obeys §1: `min-width: 0` on the flex child that holds the
   text, `overflow-wrap: anywhere` on anything that can contain a URL,
   email or user string, `text-wrap: pretty`, **no `white-space: nowrap`**
   on anything longer than a chip. `.cb-badge` is nowrap by design — so
   badge/tag/chip labels stay ≤ 25 characters (1–3 words); longer status
   text goes in an Alert or a wrapping `<span>`. Design every message with
   its longest realistic version (an error with a mailto link, a 3-line
   validation hint, a 40-character file name) and check it at 320 px.
   Toasts cap at `min(380px, 100% - 32px)`; dialogs/drawers scroll inside
   themselves rather than growing past the viewport.
8. **Tone.** Plain language, second person, one sentence of what happened
   + one of what to do. No blame ("Invalid input" → "Enter a valid email
   like you@domain.com"), no jargon, no exclamation marks in errors.
   Success copy is specific ("Application sent — we'll be in touch within a
   day"), never just "Success!".
9. **Destructive and irreversible actions confirm first** (`cbConfirm` /
   `Dialog` with `role="alertdialog"`, the safe action focused), and
   long-running work can be cancelled or at least shows progress
   (`Progress`, determinate when the total is known).
10. **Both themes, reduced motion, 320 px.** Every state above is checked in
    light and dark (status tokens only: `--status-*-fg/-bg`), with
    `prefers-reduced-motion` (skeleton shimmer and spinners slow or stop,
    toast drain bar hides), and at 320 px (§4 step 5b).

## 6. Page composition, typography & iconography — the design standard

Every new or redesigned page follows this standard; `scraps/rwd-lint.html`
enforces the mechanical parts as `§6.x` findings. `index.html` +
`landing.css` are the reference implementation.

1. **Above the fold shows the product, not a show.** The first screen
   contains: one eyebrow, one `h1` (≤ 8 words, ≤ 3 lines at 1280, ≤ 4 at
   360), one lead (≤ 52ch), one primary CTA + at most one secondary, and
   a **real artifact** — live components, a template, a photo of the school
   — never a particle field, WebGL canvas, abstract blob, scroll cue or
   interaction hint. It renders without JavaScript, settles (nothing still
   moving) within 1 s, and the headline can never clip: no
   `overflow: hidden` masks on text, no split-line reveals; `text-wrap:
   balance`, `overflow-wrap: break-word`, `max-width` in `ch`.
2. **Banned patterns** (unless the user asks for one by name): marquee /
   ticker, pinned or horizontal scroll-jacking, sticky card stacks,
   parallax floaters, count-up numbers, magnetic buttons, gradient text
   (`background-clip: text`), WebGL / three.js decoration, smooth-scroll
   libraries, split-text masks, infinite animation on anything that is
   not a spinner / skeleton / progress / live-dot. **Allowed motion:** one
   entrance (≤ 600 ms) that removes itself when done, reveal-on-scroll fade
   + rise ≤ 16 px, hover 140 ms, a confirm spring — all CSS, gated behind
   `html.js` so a failed script never hides content, all off under
   `prefers-reduced-motion`. No GSAP / Lenis / three on marketing pages.
3. **Section rhythm.** Every section = kicker (mono index + sans label) →
   `h2` (≤ 22ch, balanced) → lead (≤ 58ch) → one idea of content. Max two
   ground colours per page (`--surface-page`, `--surface-subtle`) plus one
   inverse band and one brand CTA. Dark bands and footers use
   `data-theme="dark"` + tokens, never hard-coded `#111`. Vertical padding
   `clamp(72px, 10vh, 128px)`. Every grid stacks (§1.3). Stats appear once
   per page, each with a noun; never repeated as decoration.
4. **One type scale per page.**
   - Display `h1`: Roboto 900 · `clamp(36px, 5.2vw, 66px)` · lh 1.02 · ls −.02em
   - `h2`: 900 · `clamp(28px, 3.8vw, 46px)` · lh 1.06 · ls −.02em
   - Card `h3`: **700** · 18–24px · lh 1.2 · ls −.01em (900 is never used
     below 24px — it muddies)
   - Lead: 16–19px · lh 1.6 · `--text-muted`
   - Body: **15px minimum on marketing pages, 14px in the app** · lh 1.5–1.65
   - Labels / eyebrows / captions: 13–14px sans **medium**, `--text-muted`.
     **No mono-caps labels.** Mono is for code, numbers, hex, file names
     and the section index only; `letter-spacing` never above .04em;
     `text-transform: uppercase` is the exception, not a label style.
   - Measure 45–75ch; `text-wrap: balance` on headings up to 3 lines,
     `pretty` on paragraphs; `white-space: nowrap` only on ≤ 25-character
     chips / buttons, released at ≤ 400 px.
5. **Iconography.** RemixIcon *line* set, self-hosted
   (`assets/fonts/remixicon.css`), always as
   `<span class="cb-i"><i class="ri-…-line"></i></span>` (the wrapper
   centres the 1em box and hides it from AT), always beside a text label —
   icon-only controls carry `aria-label`. Sizes 16 / 18 / 20 / 24. Icon
   tiles (`.ico`, `.cb-icon-tile`) use **tonal semantic pairs** —
   `--status-*-bg` + `--status-*-fg`, or `--surface-sunken` +
   `--text-strong` — never a raw ramp (`--red-500`) under a white glyph.
   One icon per card header; none inside running copy. No emoji, no
   hand-drawn SVG illustration — use a placeholder and ask for real art.
6. **Content.** Copy follows §5.8 tone. CTA labels are verbs ("Explore the
   system", not "Learn more"). No filler sections, no stat soup; if a
   number is on the page it has a unit and a noun and appears once.
7. **Definition of done for a new page:** §1 responsive → §2 colour → §3
   a11y → §5 states → §6 composition → §7 cards · hover · motion → §8
   delivery, then the §4 harness. A page that needs a WebGL hero, a marquee or a scroll-jack
   to feel designed is not designed yet — fix the content and the type
   instead.

## 7. Cards, hover states & motion — the interaction contract

Every card-like surface (any element whose class contains `card`, `tile`,
`panel`, `step`, `pane` or `__item`) and every hover/animation on every page
follows this contract — existing pages and every page created from now on.
`tokens/base.css` nets the mechanical parts (card children may shrink, all
motion collapses under reduced motion); `scraps/rwd-lint.html` reports the
rest as `§7.x` findings; `components.css` `.cb-card` / `.cb-card--hoverable`
and `index.html` `.tile` / `.go-card` / `.step` are the reference
implementations. A net is a backstop, not a licence — write the rule in the
page CSS too.

### 7.1 Card anatomy — a layout that cannot overflow

1. **Shape.** A card is a flex column (or grid) with `gap`, padding
   `clamp(20px, 2.4vw, 28px)` (`--space-5`…`--space-7`), `min-width: 0`,
   and `min-width: 0` on every direct child (base does this for
   `[class*="card"]`, `[class*="tile"]`, `[class*="panel"]`, `[class*="__item"]`
   and children of `[class*="grid"]`). **Text decides a card's height** —
   never a pixel `height`; use `min-height`, or `aspect-ratio` on the
   *media* element. The only fixed-height cards are artboard previews
   (§1.11: `.gcard`, `.tpl`) whose copy is ≤ 6 words and listed in
   `AUDIT.md › Known/accepted`.
2. **Header row** = `display: flex; align-items: flex-start; gap: 12px`;
   icon tile `flex: none` (40 px, tonal pair, §6.5); the text wrapper
   `min-width: 0`. Title is an `h3` at **700 · 18–24px · lh 1.2 ·
   `text-wrap: balance`**; the label above it 13 px sans medium muted;
   body 15 px · lh 1.55 · `text-wrap: pretty` · `--text-muted`; the
   footer link/CTA carries `margin-top: auto` so cards in a row align
   their bottoms. One icon per card header, one CTA per card.
3. **Badges, tags and labels sit in flow** (flex + `gap`, `align-self:
   flex-start`) — never `position: absolute` over text (§1.6). Decorative
   absolute art (a seal, mini bars) is `aria-hidden`, lives in a corner the
   text can never reach, and reserves that corner with padding.
4. **`overflow: hidden` on a card only to clip media corners** — never on
   a card that also has a fixed or aspect-ratio height and wrapping text;
   put the radius + `overflow: clip` on the media element instead. Text is
   never truncated with a bare `overflow: hidden` — only `.cb-truncate` /
   `.cb-clamp-2|3`, and only on list-row titles, never on body copy.
5. **Card grids** use `repeat(auto-fit, minmax(min(100%, N), 1fr))`
   (N = 240–340 px) or explicit `minmax(0, 1fr)` tracks with a stacking
   breakpoint (§1.3); `align-items: stretch` so a row's cards share
   height; `gap` 16–24 px. Bento spans (`grid-column: span N`) collapse
   to `span 1` / `auto` rows at the stacking breakpoint. Horizontal card
   rails (`.gal`) are the only `overflow-x: auto` card containers and
   carry `scroll-snap`, keyboard arrows and a progress indicator.
6. **Strings.** Mono strings (hex, file names, tokens, URLs, emails)
   carry `overflow-wrap: anywhere` (base does it for `code`, `[class*="mono"]`,
   `[class*="file"]` inside cards); user-supplied strings get `.cb-break`;
   `white-space: nowrap` inside a card only on ≤ 25-character chips.
7. **Content ceiling.** Title ≤ 6 words (≤ 2 lines at 320 px), label
   ≤ 3 words, body ≤ 2 sentences / 40 words, one list ≤ 4 items. Longer
   content is a section, not a card. Design every card with its **longest
   realistic copy** (a 40-character file name, a 3-line title in German)
   and check it at 320 and 1920.
8. **Nothing inside a card is sized by the viewport** (`vw`/`vh`) except
   fluid type via `clamp()`; mock components inside a card (`.spec`,
   `.cmp-live`) are the real `.cb-*` classes, and any focusable mock
   (`input`, `button`) still meets the 44 px target on mobile — a mock
   is still a tap target.

### 7.2 Hover, focus and press — only on things you can act on

1. **A card has a hover state only if it is one `<a href>` or one
   `<button>`** (the whole card is the control — never `<div onclick>`,
   never two nested controls). Static cards (tiles, steps, stats, ledger
   rows) have **no hover**; the hover lives on the link inside them.
   `Card hoverable` adds `role="button"` + `tabIndex` + Enter/Space when
   it is given `onClick`.
2. **The hover recipe — and the only one:** `transform:
   translateY(calc(-1 * var(--motion-lift)))` (3 px; **never more than
   4 px**), one shadow step up (`--shadow-sm → --shadow-md`,
   `--shadow-md → --shadow-lg`) and/or `border-color: var(--border-default|strong)`.
   Timing `--dur-fast` (140 ms) to `--dur-base` (220 ms), `--ease-out`;
   `transition` **names its properties** (`transform, box-shadow,
   border-color`) — never `transition: all`, never > 400 ms on a hover.
   No `scale()` / `rotate()` / glow / gradient sweep on cards; `scale()`
   ≤ 1.02 is for icons and thumbnails only. The lift is wrapped in
   `@media (hover: hover)` so it never sticks on touch; the *movement*
   is also wrapped in `(prefers-reduced-motion: no-preference)` — the
   shadow/colour change stays, the motion goes. `.cb-card--hoverable`
   and `.cb-hover-lift` are the implementations; use them before
   writing a new one.
3. **Press:** every button and clickable card has `:active { transform:
   scale(var(--motion-press)) }` (.985), same gating as the lift.
4. **Focus:** an interactive card shows `box-shadow: var(--focus-ring)`
   (stacked with its own shadow) on `:focus-visible`; `outline: none`
   only together with the ring. Hover never removes or recolours the
   ring; focus order is reading order.
5. **Text links inside cards** change colour (`--text-brand →
   --text-brand-hover`) and underline on hover; a trailing arrow icon
   nudges ≤ 4 px. Nav, menu, tab and toolbar items hover with
   `background: var(--surface-hover)` + `color: var(--text-strong)` —
   no movement. Swatches brighten (`filter`), never grow.
6. **Hover never changes layout**: no font-weight / font-size / padding /
   border-width change, nothing that shifts a sibling (use
   `box-shadow: inset 0 0 0 1px` or a pre-reserved transparent border).
7. **Disabled** looks disabled (`--text-subtle`, no shadow,
   `cursor: not-allowed`) and has no hover; `aria-busy` controls keep
   their size and block repeat clicks (§5.3).

### 7.3 Motion — one engine per page, always fail-safe

1. **Reveal-on-scroll uses `data-reveal` only** (never a second
   attribute like `data-rv`) and **one** script per page — `motion.js`
   (arms `html.cb-js`, reveals with `.is-in`) or a page script that arms
   `html.js` and reveals with `.in` (`landing.js`). `tokens/motion.css`
   accepts `.in` / `.is-in` / `.cb-in`, so the two engines never strand
   each other. The hidden state exists **only** under the arm class
   (content is visible with JS off), the reveal uses
   IntersectionObserver **and** a ≤ 2.6 s safety timeout that reveals
   everything, and the page's `prefers-reduced-motion` block sets the
   reveal back to `opacity: 1; transform: none`.
2. **Allowed motion** (§6.2): one entrance ≤ 600 ms that removes its own
   rules when done (`html.hero-done`), reveal fade + rise ≤ 16 px
   (`--motion-rise`) with 45–70 ms stagger (`--stagger`), hover 140 ms,
   a confirm spring (`--ease-spring`). Keyframes on content are finite
   with `animation-fill-mode: both`; **infinite only on spinners,
   skeletons, progress bars and live dots**, which must carry a class
   containing `spin`, `skel`, `loader`, `loading`, `pulse` or
   `dot`/`live` so the base net keeps them looping (slower) under
   reduced motion while everything else stops.
3. **Every stylesheet that animates owns a reduce block** for its own
   rules (reveals → visible, hovers → no transform, loops → none). The
   base net (`tokens/base.css`: every transition/animation collapses to
   one frame) is the backstop that makes a forgotten rule harmless, not
   a reason to skip the block.
4. **Hover on touch**: anything that moves on `:hover` sits inside
   `@media (hover: hover)`; touch devices get the colour/shadow change
   only. `cursor: pointer` only on real controls.
5. `will-change` only on an element that will animate within the next
   second, removed after; never on cards at rest. Animate `transform`
   and `opacity` only — never `height`, `top`, `margin` or `box-shadow`
   alone on more than a handful of elements.
6. **Replay controls** (motion demos) are real `<button>`s and re-trigger
   CSS keyframes by toggling a class; they do nothing under reduced motion.

### 7.4 Definition of done — what §4 adds for cards and motion

- `rwd-lint.html`: zero `§7.x` **E**; every `§7.x` **W** fixed or
  reasoned in `AUDIT.md`.
- `audit-harness.html`: `touch0` at 390 (every focusable inside a card,
  including mocks, ≥ 44 px); `rwd-sweep.html`: no `ov`/`sp`/`cl`/`lap`
  at any width — card text wraps, never spills or overlaps.
- **Hover walk-through** (desktop + touch emulation): hover every card —
  only links/buttons move, by ≤ 4 px, nothing shifts a sibling; tap on
  touch — no stuck hover. Tab through — a ring on every interactive card
  and on nothing static. Reduced motion on — pages settle instantly, no
  element is left at `opacity: 0`, spinners still turn.

## 8. Performance & delivery — the loading contract

The site is static files on GitHub Pages (gzip, HTTP/2, 10-minute
cache). Speed therefore comes from **how few round-trips stand between
the first byte and a painted page**, not from a server. These rules are
mandatory for every page — existing and new; `_build.mjs` produces the
artifacts, `scraps/rwd-lint.html` reports the static half as `§8.x`,
and `scraps/audit-harness.html` prints a measured `perf:` line per page.

### 8.1 One stylesheet, no chains

1. **`styles.css` and `components.css` are GENERATED** by `node _build.mjs`
   (`npm run build`) from `tokens/*.css`, `assets/fonts/*.css` and
   `components.src.css`. Edit the sources, run the build, commit all three.
   Each generated file carries `@build-hash`; the lint fails (`STALE`)
   when a source changed after the last build. The deploy workflow runs
   the build too, so a forgotten build never ships — but never edit the
   generated files by hand.
2. **No `@import` in anything a page links.** The old chain
   (`components.css → styles.css → tokens/fonts.css → assets/fonts/*.css
   → .woff2`) was four serial round-trips before the first font byte;
   the flat file puts every `@font-face` in the first stylesheet.
3. **A page links `styles.css` *or* `components.css`, never both**
   (`components.css` contains `styles.css`), **never `remixicon.css`
   directly** (it is inside both — the direct link fetched 145 KB twice
   on every page). Budget: **≤ 3 render-blocking stylesheets** — system
   + one site stylesheet + at most one page file. Multi-page sites bundle
   their section CSS into one generated file the build produces
   (`Colaberry School/school.css` from 13 sources — cached once, reused
   on every page of the site); page CSS stays in its own file per site
   (`landing.css`, `site.css`…); no `<style>` blocks over ~2 KB in HTML,
   no `@import` in `<style>`.
4. Cache-busting is `?v=<content-hash>` written by the build
   (`_stamp-versions.mjs`); a hand-written `?v=` is fine during a
   session but the build overwrites it. Vendor files and font binaries
   are immutable by name and are not stamped.

### 8.2 JavaScript never blocks the first paint

1. **No in-browser Babel on a live page — ever.** `<script
   type="text/babel">` + `babel.min.js` cost 3 MB and 1–3 s of
   transpiling before anything renders. School pages keep their `.jsx`
   sources (`Colaberry School/*.jsx`, the page App in `<slug>.app.jsx`)
   and ship `dist/<name>.js`, compiled by the build (`react` preset +
   `transform-block-scoping` — the files are classic scripts sharing one
   global scope, so `const`/`let` are lowered to `var` exactly as Babel's
   script-tag runner used to). Editing a `.jsx` without rebuilding
   changes nothing on the page — that is the lint's `§8.2` E.
2. **Every `<script src>` is `defer`** (order preserved, runs after
   parse, before `DOMContentLoaded`) — vendors, bundle, page scripts.
   Two exceptions, both ≤ 3 KB and needed *before* first paint:
   `theme.js` (sets the theme attribute — no light flash) and `motion.js`
   (sets `html.cb-js` — no visible-then-hidden flash of reveal content).
   Inline scripts that call into a deferred library wait for
   `DOMContentLoaded`.
3. **The HTML paints without JavaScript**: `<noscript>` + `boot-fallback.js`
   watchdog (§5.6) are not optional on `#root` pages, and the hero's
   first screen is in CSS/HTML, not rendered by JS, wherever the page is
   static.
4. Budgets per live page (uncompressed): marketing/static ≤ 60 KB JS
   total; React pages ≤ 1.4 MB JS (React + ReactDOM + GSAP + Lucide +
   `_ds_bundle.js` + `dist/` — already at the ceiling: the next cut is a
   `cb-core.js` with only Button/Input/Avatar instead of the 699 KB
   bundle, and RemixIcon instead of Lucide's 348 KB). No GSAP / Lenis /
   three.js on new pages (§6.2).

### 8.3 Fonts: preloaded, swapped, metric-matched — no reflow, no overflow

1. **`font-display: swap`** on every face (the Google extraction already
   has it; the lint flags `auto`/`block`).
2. **Preload the two fonts the first screen needs** in `<head>` right after
   the viewport meta: `roboto-400-21.woff2` (latin Roboto) and
   `remixicon.woff2` when icons are above the fold — `<link rel="preload"
   as="font" type="font/woff2" crossorigin>`. Nothing else is preloaded
   (preloading everything is the same as preloading nothing).
3. **Metric-matched fallbacks** (`tokens/fonts.css`): `'Roboto Fallback'`
   and `'Roboto Mono Fallback'` are Arial / Courier New with
   `size-adjust`, `ascent-override`, `descent-override` tuned to Roboto's
   metrics, and sit second in every font stack. While Roboto downloads,
   the fallback occupies the *same* width and height, so headlines keep
   their line breaks and nothing jumps or overflows when the real font
   lands. **This is the §1 text-overflow rule applied to the loading
   state**: a layout that only fits once the web font arrives is broken
   on a slow connection.
4. Font files are the Google subsets (latin / latin-ext / … with
   `unicode-range`), so a page downloads only the scripts it uses — do
   not merge them, do not add weights without adding the file.

### 8.4 Images: right format, right size, right priority

1. **WebP (or AVIF) for every photo and logo**; PNG only for favicons,
   OG/social images and downloadable brand assets. `assets/logo/*.webp`
   and `assets/photos/*.webp` exist beside the PNG masters — pages
   reference the `.webp`. Logos are exported at ≤ 800 px wide (a 1658 px
   PNG rendered at 28 px tall was 306 KB on every page).
2. **Every `<img>` has `width` and `height`** (intrinsic pixels; CSS still
   sizes it) or a CSS `aspect-ratio`, so the box is reserved before the
   bytes arrive (no layout shift, no text jumping under an image).
3. **Lazy only below the fold.** `loading="lazy" decoding="async"` on
   anything past the first screen; the LCP image (hero photo, first
   logo) is eager with `fetchpriority="high"`. A lazy image in the first
   screen is a bug the harness reports (`lazyAbove`).
4. ≤ 200 KB per image, ≤ 1 MB images per page; `<picture>` with a
   `media` source when the mobile crop differs; remote images never
   (§3.4) — they add a DNS + TLS round-trip and can fail.

### 8.5 Definition of done — what §4 adds for delivery

- `rwd-lint.html`: zero `§8.x` **E** (stale build, `@import` in shipped
  CSS, styles + components both linked, direct remixicon link, Babel on a
  live page); every **W** fixed or reasoned in `AUDIT.md`.
- `audit-harness.html` `perf:` line with no `!`: `req ≤ 40`, `≤ 1500 KB`
  uncompressed on static pages, `css ≤ 3 (imp0)`, `babel0 headSync0`,
  `nodim0 lazyAbove0 big0`, `noSwap0`, `remote0`, `dom ≤ 1500`. React
  pages may exceed the KB budget only by the vendors listed in 8.2.4.
- Open the page with DevTools → Network → "Slow 3G" once: text is
  readable in the fallback font within the first second, nothing
  reflows when Roboto lands, no image pops in above the fold.

## 9. Enforcement — the rules run themselves

Every rule above is checked by code, and the check runs **before every
deploy**; nothing here depends on someone remembering.

1. **`node _lint.mjs` is the static gate.** It evaluates the *same* rules as
   `scraps/rwd-lint.html` (one source of truth) over the lint's `FILES`
   **plus every live `.html` it discovers on disk** — a new page is covered
   the moment it exists, listed or not. Any `E` exits 1 and `deploy.yml`
   stops before the build. Documented exceptions live in the `ALLOW` map
   in `_lint.mjs` with a one-line reason mirrored in `AUDIT.md ›
   Known/accepted`; that map only shrinks. Run it locally before you push
   (`node _lint.mjs --all` prints the warnings too).
1b. **`node _sweep.mjs` is the responsive gate.** Headless Chromium loads
   every live page (discovered the same way) at **all 19 widths, 320 →
   1920**, and runs the *same* probe as `scraps/rwd-sweep.html`: page wider
   than the viewport, elements past the edge, text spill / clip / overlap,
   squeezed columns, distorted images, tap targets under 24 px, nav hidden
   with no toggle, oversized sticky bars, phone `h1` over 52 px. Any
   finding outside its `ALLOW` list exits 1 — `deploy.yml` runs it right
   after the lint. Locally: install Playwright once outside the repo (the
   one-liner is in the file header) and run `PW_DIR=/tmp/pw node _sweep.mjs
   "Colaberry School/new-page.html"` for a single page.
2. **New page checklist (what the gate cannot see — do by hand, §4):** link
   `../styles.css` (or `components.css`) first so `tokens/base.css`'s nets
   apply (`overflow-x: clip`, media `max-width: 100%`, card children
   `min-width: 0`, reduced-motion collapse); add the page to
   `scraps/audit-harness.html` + `rwd-sweep.html` `PAGES` (and `DARK` if
   themed); run both; append the result to `AUDIT.md`.
3. **Text can never overflow — three mechanical guarantees** every page
   gets for free and must not undo: `html, body { max-width: 100%;
   overflow-x: clip }`, `overflow-wrap: break-word` on body and headings,
   `min-width: 0` on grid/flex/card children — plus the authoring rules the
   lint enforces: no `white-space: nowrap` beyond a chip, no fixed pixel
   widths on content, every 2+-column grid stacks or uses
   `auto-fit/minmax()`, fluid type via `clamp()`.
4. **Colour can never fail contrast** as long as text uses `--text-*` /
   `--status-*-fg` / `--text-on-accent` on the surfaces they are tuned for
   (`guidelines/cards/contrast-matrix.html` is the live proof in both
   themes); the lint reports raw colours, raw ramps, alpha text and white on
   `--red-500` / green fills as errors on every new file.
5. **Both themes** come from `theme.js` + tokens only; a hard-coded light
   panel inside a themed page is a finding unless it previews an export
   artifact and is listed in `AUDIT.md`.
