# Developer handoff — Colaberry DS School Final

Start here if you are picking this repo up. Product and brand context is in
[`README.md`](README.md); the rules every page must pass are in
[`CLAUDE.md`](CLAUDE.md). This file covers where things live, how to run and
ship them, and what is intentional.

## Source of truth

The design is authored in **Claude Design** (project *Colaberry DS School
Final*) and synced into this repo. Treat this repo as the code of record for
deploys; when the design changes, re-sync and open a PR rather than editing
both sides independently. The last sync was 2026-11-20.

## Run it

Static site, Node 20+ only for tooling.

```bash
npm start              # serve the repo at http://localhost:3000
npm run build          # node _build.mjs: regenerate styles.css, components.css,
                       # Colaberry School/school.css, dist/*.js, ?v= stamps
node _lint.mjs --all   # static quality gate (same rules as CI, warnings too)
```

CI runs the lint **before** the build, so commit generated files fully built.
After editing a source, run `npm run build` until `git status` shows no new
changes. The stamping step rewrites `components.src.css`, so the first pass
can leave `components.css` one step behind; the second pass settles it.

Responsive gate (needs Playwright, installed outside the repo):

```bash
mkdir -p /tmp/pw && (cd /tmp/pw && npm i playwright@1.47.2 && npx playwright install chromium)
PW_DIR=/tmp/pw node _sweep.mjs                       # every live page, 19 widths
PW_DIR=/tmp/pw node _sweep.mjs "Colaberry School/blog.html"   # one page
```

## Ship it

Pushing to `main` runs `.github/workflows/deploy.yml`: lint gate, then
responsive gate, then build, then deploy to GitHub Pages. Any gate error stops
the deploy. Work on a branch and merge through a PR.

## Layout

| Path | What it is | Edit? |
|---|---|---|
| `tokens/*.css`, `tokens.json` | Design tokens (colour, type, spacing, motion) | Yes, the source |
| `components.src.css` | Component styles source | Yes |
| `styles.css`, `components.css`, `Colaberry School/school.css` | Built from the sources above | No, run `npm run build` |
| `components/core/*.jsx` | Component sources + `.d.ts` types + preview cards | Yes |
| `_ds_bundle.js`, `_ds_manifest.json` | Generated component bundle and manifest | No |
| `index.html`, `landing.*`, `design-system.html`, `playbook.*` | Landing page, living docs, playbook | Yes |
| `Colaberry School/` | AI Accelerator microsite; pages are `*.html` + `*.app.jsx` | Edit `.jsx`, never `dist/` |
| `Colaberry School/dist/` | Compiled page scripts | No, built from `.jsx` |
| `training-site/`, `app/`, `ui_kits/`, `ads/` | Training site, learner-portal prototype, UI kit, ad creatives | Yes |
| `templates/<name>/` | Self-contained Claude Design templates (`*.dc.html`) | Yes |
| `guidelines/cards/` | Foundation specimen cards (incl. live contrast matrix) | Yes |
| `assets/` | Logos (+ `export/` favicon/OG set), fonts, photos, vendor JS | Add, don't rename |
| `brand-profile/` | Brand profile JSON + email/theme payload previews | Yes |
| `scraps/` | **Only the four QA tools are tracked**: `rwd-lint`, `rwd-sweep`, `rwd-harness`, `audit-harness`. Everything else there is local scratch | Tools: yes |
| `AUDIT.md` | QA log + *Known/accepted* exceptions | Append on every change |

Not in git on purpose (see `.gitignore`): `uploads/`, `screenshots/`, the rest
of `scraps/`, `.bundles/`, print intermediates (`*-print-*.html`),
standalone exports (`*-standalone.html`, `_kit-standalone.html`,
`Colaberry Social Media Kit.html`,
`Colaberry School/Colaberry Accelerator (offline bundle).html`), and
`Colaberry School/Colaberry Accelerator (standalone).html`, which is a
byte-identical copy of `accelerator-standalone-src.html`. The exports are
single-file bundles for sharing. They fail the page lint by design, and
Claude Design regenerates them.

## Intentional duplicates (do not dedupe)

- **`templates/*/support.js` and `templates/*/ds-base.js`.** Each `.dc.html`
  loads `./support.js` from its own folder; this is the Claude Design
  component runtime and the tool writes one per folder. There are several
  versions across templates, so do not collapse them into one shared file.
- **`animations.jsx`** in `ads/` and three video templates: each template is
  self-contained so it can be forked on its own.
- **`assets/logo/colaberry-cherry.png` = `colaberry-mark.png`** and
  **`colaberry-app-icon.png` = `export/icon-512.png`**: both names are
  referenced (pages, `BRAND.md`, templates, the favicon export set).

## Known follow-ups

- `app/community-profile.html` (member profile, leaderboard and level-badge
  proposal) was removed from the tree. It is not in the Claude Design source
  and fails the lint gate (11px text, raw colours). It is still in history;
  restore it with `git checkout cb43315 -- app/community-profile.html`, then
  fix it to CLAUDE.md §1.8 / §2.1 before it ships.
- The responsive gate (`_sweep.mjs`) runs in CI but was not run locally for
  this sync. Watch the first deploy run.

- `package.json` `repository` / `homepage` still point at
  `colaberry/colaberry-design-system`; update them if this repo becomes the
  published package.
- The Design System artifact copy of this system also has a later change
  that is not yet in this repo: `Colaberry School/site-flags.js`, a single
  switch for the Anthropic partner claims, and its notes in `MESSAGING.md`.
  Port it before announcing the partnership pages.
