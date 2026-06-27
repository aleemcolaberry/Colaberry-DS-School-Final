---
name: colaberry-design
description: Use this skill to generate well-branded interfaces and assets for Colaberry (a data consultancy & talent solutions provider — consulting, staffing, managed data services, and training), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (`BRAND.md`,
`IMPLEMENTATION.md`, `design-system.html`, `tokens/`, `components/core/`, `assets/logo/`, `ui_kits/`).

**For developers installing/implementing the system in a real project, follow `IMPLEMENTATION.md`** —
it's the step-by-step install guide (plain HTML, React/Vite/Next, tokens, dark mode, fonts, checklist).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create
static HTML files for the user to view — link `styles.css` for tokens/fonts, reference the logo SVGs
from `assets/logo/`, and mirror the component styles. If working on production code, copy assets and
read the rules here to become an expert in designing with this brand (load `styles.css` and the
`_ds_bundle.js` React components via `window.ColaberryDesignSystem_098454`).

Brand essentials: teal `#357895` (primary, constant), cyan `#00C4CC` (accent / energy); red & green
are functional status hues only. Plus Jakarta Sans + JetBrains Mono type; the logo is a vector lockup;
rounded/pill shapes; clear, inclusive, emoji-free voice; RemixIcon icons. Use blue-600+/neutral-800 for
body text (see the accessibility audit in `design-system.html`).

If the user invokes this skill without any other guidance, ask them what they want to build or design,
ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code,
depending on the need.
