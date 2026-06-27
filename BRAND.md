# Colaberry — Brand Guide

The short, practical guide to using the Colaberry brand. For the full interactive reference,
open **`design-system.html`**.

---

## The brand in one line
Colaberry is a **data consultancy & talent solutions provider** — consulting, staffing, managed data services, and training that help organizations and individuals unlock the power of data. Shaping the future of work.

## Design principles
Five beliefs that break ties when a decision is ambiguous:
1. **Inclusive by default** — accessibility, plain language, and generous touch targets are requirements, not extras.
2. **Warm, not loud** — soft shapes, gentle motion, friendly copy; confidence without hype.
3. **Clarity over decoration** — we work in data, so content and numbers lead; ornament earns its place.
4. **One system, many makers** — semantic tokens + reusable components let a marketer, a developer, and Claude produce the same brand.
5. **Consistent & constant** — the teal primary never changes; foreground inverts with the background.

---

# Generating with Claude — how to prompt

This whole project is a **design system Claude can read**. When you start a chat with this project
attached (or invoke the `colaberry-design` skill), Claude already knows the colors, fonts, logo, voice,
components, and rules below — you don't have to re-explain them. You just describe what you want.

There are two kinds of people who use this, and the way you prompt is a little different for each.

## 👋 If you're on the Marketing team (non-technical)

You can ask in **plain English**. Claude will hand you a finished **HTML file you can preview and download** —
a social post, an event flyer, an email header, a one-pager, a slide, an ad. You never touch code.

**The recipe — answer these four things in your message:**
1. **What** you want (e.g. "an Instagram post", "a webinar flyer", "an email banner").
2. **Size** if it matters (e.g. "square 1080×1080", "story 1080×1920", "letter portrait", "16:9 slide").
3. **The words** — the headline, any subtext, the call-to-action.
4. **The vibe / which service** (e.g. "for our consulting services", "a data training workshop", "professional and credible").

**Generic starter template** (fill in the brackets):

> *"Using the Colaberry design system, create a **[social post / flyer / email header / slide]** at
> **[size]** for **[topic]**. Headline: **[your headline]**. Add a **[call-to-action]** button and the
> logo. Keep it clean and on-brand, no emoji — and give me **3 options**."*

**More worked examples**

> *"Using the Colaberry design system, make a **square LinkedIn post (1080×1080)** for our
> **consulting & staffing services**. Headline: 'Shaping the future of work.' Add a small
> 'Contact us' button and the logo. Keep it clean and on-brand."*

> *"Make an **event flyer (letter, portrait)** for a free **Build a Data-Driven Organization webinar**,
> Thursday 11:00am CST. Include the date/time, 'Register free', and the Colaberry logo. Give me
> **3 layout options** to choose from."*

> *"Design an **email header banner (1200×400)** announcing our managed data services. Big text:
> 'Turn data into an asset.' Use the cyan accent. No emoji."*

**Tips that make the result great**
- Ask for **options**: "give me 3 versions" — then tell Claude which one to refine.
- Name the **brand color** you want to lead with: teal (primary, trust) and cyan (energy, accent).
- Keep the **voice**: clear, credible, professional; speak to "you" / "your team", **no emoji**, lead with proof (Inc. 5000, Microsoft Partner, 5,000+ data careers since 2012).
- Want to tweak it? Just say so in plain words: "make the headline bigger", "use the green instead",
  "swap in this photo" (drag a photo in).
- To download what Claude made, use the **download / export** option on the file it gives you.

> 💡 You don't need to know hex codes, fonts, or "tokens." Claude pulls all of that from this system
> automatically. Your job is the **message and the format**.

## 🛠️ If you're a Developer

Claude can scaffold **production-ready, on-brand UI** because the tokens and components are machine-readable.

**Hand Claude the contract in your prompt:**
- "**Link `styles.css`**" — it imports all tokens (color, type, spacing) + fonts.
- "**Use the design-system components**" — `Button, Badge, Card, Input, Checkbox, Avatar`, loaded from
  `_ds_bundle.js` and read off `window.ColaberryDesignSystem_098454`.
- "**Reference semantic tokens**, never raw hex" — `--surface-page`, `--text-strong`, `--brand-accent`, etc.
- "**Honor the accessibility rules** in BRAND.md" (blue-600+/neutral-800 for body text, visible focus rings).

**Generic starter template** (fill in the brackets):

> *"Using the Colaberry design system, build **[a page / a section / a component]** — **[describe what
> it does]**. Use the `Button`, `Card`, `Badge`, `Input` components and semantic tokens, link
> `styles.css`, and support dark mode (`data-theme="dark"`)."*

**More worked examples**

> *"Using the Colaberry design system, build a **services section** for our consulting offering.
> Three cards using the `Card` and `Button` components, teal primary CTA, link `styles.css`,
> use semantic tokens, support `data-theme="dark"`."*

> *"Recreate the **contact form** as a React component using `Input`, `Checkbox`, and `Button`
> from `window.ColaberryDesignSystem_098454`. Follow the form patterns in
> `ui_kits/marketing-website/`."*

> *"Give me a **starter HTML page** wired to this design system (fonts, tokens, dark-mode toggle)
> that I can drop a new feature into."*

**What to reuse**
- Foundations: `styles.css` → `tokens/*.css`. Components: `components/core/*` (props in each `.d.ts`,
  usage in each `.prompt.md`). Full screens to copy from: `ui_kits/marketing-website/`.
- Open `design-system.html` for the live token reference, WCAG audit, and the dev hand-off checklist.

## 📦 Hand-off cheat-sheet — what to give each person

| Hand this to… | What they need | Where they start |
|---|---|---|
| **Marketing / non-technical** | This project link (or the `colaberry-design` skill) + the prompt recipe above | Just describe the artifact — Claude returns a downloadable HTML file |
| **A designer** | `design-system.html` (the living guide) + `assets/logo/` | Skim the guide; reuse logos, colors, type |
| **A developer** | This whole project: `styles.css`, `components/core/`, `ui_kits/`, `BRAND.md` | Link `styles.css`, import the components, follow the rules here |
| **Anyone, anywhere** | `BRAND.md` (this file) — it's self-contained | Read the one-liner, voice, color, and logo rules |

**The golden rule for any prompt:** start with *"Using the Colaberry design system, …"* and describe the
outcome. The system supplies the rest.

---

## Logo

The mark is **a pair of wheels forming the "C"** of Colaberry — momentum, motion, forward progress.
The wordmark is supplied as a single vector lockup in teal.

**Files** (`assets/logo/`): `colaberry-mark.png`, `colaberry-horizontal.png`, `colaberry-app-icon.png`,
each with `-white` / `-black` mono variants, plus a full `export/` set (favicons, app icons, OG cards).

**Inversion rule:** *foreground inverts with the background; the teal mark stays constant.*
- Light background → full-color or black mark.
- Dark / photo / teal background → **white** mark.
- Never recolor the mark, add gradients/shadows to it, or re-set the wordmark in another font.

**Clear space:** keep space equal to the mark height on all sides.
**Minimum size:** 120px wide (horizontal lockup), 24px (mark alone).

## Color

| Role | Token | Hex | Notes |
|---|---|---|---|
| Primary | `--blue-500` | `#357895` | Teal. The constant. Buttons, links, large text; use `--blue-600/700` for body text. |
| Accent | `--cyan-500` | `#00C4CC` | Cyan. Energy / highlight. Fill, focus, dataviz; white text only on `--cyan-600+`. |
| Danger | `--red-500` | `#F0323C` | Functional — errors only, not a brand color. |
| Success | `--green-500` | `#2FA452` | Functional — status only, not a brand color. |
| Neutrals | `--neutral-0…1000` | `#FFF…#000` | Cool slate: `#CBD3D7`, `#404B51`, black. |

Always use **semantic tokens** (`--surface-page`, `--text-strong`, `--brand-accent`, `--border-default`)
rather than raw ramp values. Dark mode: set `data-theme="dark"` on `<html>`.

### Data visualization
For charts, use the dedicated palette — **never** raw brand ramps for series:
- **Categorical:** `--chart-1…8` in order (tuned for adjacent separation + color-blind safety).
- **Sequential:** `--seq-1…6` (single-hue teal, low→high).
- **Diverging:** `--div-neg-2 … --div-mid … --div-pos-2` (magenta ↔ teal).
Both adapt in dark mode (brighter series). See the Color section of `design-system.html`.

## Typography

- **Plus Jakarta Sans** — display (Bold) + body (Regular). H1 48 / H2 36 / H3 28 / H4 22 / body 18 / caption 14.
- **JetBrains Mono** — code, metrics, tabular data.
- The **logo** is a vector lockup — never re-set the wordmark in a font.

## Iconography
The brand's standard icon set is **RemixIcon** (Apache-2.0, ~3,000 icons) — loaded automatically via
`styles.css` (no script needed). Prefer the **`-line`** style to match the soft 2px brand look; use
**`-fill`** for emphasis. Never use emoji.

Always wrap an icon in the **`.cb-i`** primitive — it guarantees a centered 1em box with no baseline
gap (color via `currentColor`, size via `font-size`):
```html
<span class="cb-i"><i class="ri-rocket-line"></i></span>
```
For a colored container, use **`.cb-icon-tile`** (resize with `--tile`) — never hand-roll
`place-items`/sizing, which is how alignment mistakes creep in:
```html
<span class="cb-icon-tile" style="background:var(--red-500)"><span class="cb-i"><i class="ri-award-line"></i></span></span>
```
Both utilities live in the base layer, so correct icon alignment is automatic everywhere. SVG sets
(e.g. Lucide) also work inside `.cb-i` if a project needs them. Browse icons at remixicon.com.

## Shape, space & motion
- 4px spacing grid. Rounded radii: 4 / 8 / 12 / 16 / 24 / 32 / pill.
- Pill buttons & badges. Cards: `--radius-xl`, soft shadow, optional colored top accent.
- Motion: `--ease-out` ~220ms; gentle, never showy.

## Motion
Motion is **functional, not decorative** — it confirms an action, guides the eye, or softens a change.
Principles: **purposeful · quick (140–360ms) · gentle (ease-out) · accessible**.

**Easing tokens** — `--ease-out` (default: enter, hover, expand) · `--ease-emphasized` (hero reveals,
big moments) · `--ease-spring` (confirmations only: a check, a toggle) · `--ease-in` (exits — accelerate
away) · `--ease-in-out` (things that move and return) · `--ease-standard` (Material-style neutral).
Never `linear` or hard bounces.

**Duration tokens** — `--dur-instant` 90ms (tick, ripple) · `--dur-fast` 140ms (hovers, toggles) ·
`--dur-base` 220ms (most transitions) · `--dur-slow` 360ms (entrances, overlays) · `--dur-slower` 560ms
(hero choreography). Duration scales with travel distance.

**Choreography tokens** — `--motion-rise` 14px / `--motion-rise-lg` 28px (fade-up travel) ·
`--stagger` 70ms / `--stagger-tight` 45ms (delay between sequenced items).

**Motion recipes** (reusable patterns — see the live Motion section):
- **Enter** — fade & rise: opacity 0→1 + translateY `--motion-rise`→0, `--dur-slow`, ease-out.
- **Sequence** — stagger children `--stagger` apart (lists, grids, hero lines).
- **Overlay** — scrim fades + panel scales 0.96→1, `--dur-slow`, emphasized.
- **Confirm** — spring pop: scale 0.6→1 with `--ease-spring` (checkmarks, toggles only).
- **Loading** — shimmer sweep (~1.4s loop) — the one allowed continuous motion.
- **Exit** — fade & fall: opacity 1→0 + slight translateY, `--dur-fast`, ease-in.

**Standard interactions**

| Interaction | What changes | Token |
|---|---|---|
| Hover — solid button | Fill steps one shade darker (red-500 → 600) | 140ms · ease-out |
| Hover — ghost / outline | Soft sunken background fills in | 140ms · ease-out |
| Hover — card (clickable) | Lifts 6px, shadow deepens (sm → lg) | 220ms · ease-out |
| Hover — link | Underline wipes in from the left | 220ms · ease-out |
| Press — button | Fill darkens again + `translateY(1px)` | 140ms · ease-out |
| Focus — any control | 3px cyan focus ring appears | instant |
| Enter — content / overlay | Fade up 12–14px, stagger ~70ms | 360ms · ease-out |

**Always** wrap non-essential motion so it collapses under `@media (prefers-reduced-motion: reduce)`.
No infinite/looping animation on real content. See the live **Motion** section of `design-system.html`.

## Voice
Clear + credible, professional. Sentence case. Speak to **"you" / "your team."** Lead with proof
(Inc. 5000, Microsoft Partner, 5,000+ data careers since 2012). Action CTAs ("Contact us",
"What we do"). **No emoji** in product/web. Emphasize partnership, capability, and outcomes —
turning data from an obstacle into an asset.

## Accessibility (WCAG 2.2)
- Body text on white: `--neutral-800` (13.6:1) or `--text-muted` (5.3:1).
- Links: `--blue-600` (6.0:1). Green (success) text: `--green-700+`.
- Cyan is an **accent / large-text** color — don't use raw cyan-500 for small body text.
- White button text passes on teal `--blue-500` (5.0:1) at normal sizes; cyan-600 (3.0:1) at large/bold.
- Focus: visible 3px cyan ring on every interactive element.

## Don'ts
- No emoji in the system. · No bluish-purple gradients. · No recoloring the mark. · No Inter/Arial substitutes
  for Plus Jakarta Sans in final work. · No small body text in raw cyan.

## Fonts & licensing
Plus Jakarta Sans, JetBrains Mono — SIL OFL-1.1. Currently loaded via Google Fonts CDN;
self-host for production (see `assets/fonts/LICENSES.md`).
