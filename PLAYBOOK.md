# Colaberry Build & Critique Playbook

For Colaberry developers working in **Claude Code** with the design system at
<https://github.com/aleemcolaberry/Colaberry-DS-School-Final>. Live version with copy buttons: `playbook.html`.

## How to use this playbook

Two tracks. The **Build track** (Steps 0–4) takes a brief to a working product that is on the system from the first commit. The **Critique track** (Steps 5–8) scores any project — yours or a teammate's — against the Colaberry Scorecard, fixes what you approve, verifies independently and ships.

You never edit the prompts. Everything project-specific lives in one file, `docs/PROJECT_BRIEF.md`, which you fill in at Step 0. Every prompt reads it.

### Golden rules

1. One step per session. Run `/clear` before each new step; `CLAUDE.md` and `docs/PROGRESS.md` carry the context forward.
2. Start each step in plan mode (Shift+Tab) so Claude Code shows its plan before editing.
3. After every step, run the **Gap Check** prompt. Move on only when it reports zero open items.
4. If a step stops partway, use the **Resume** prompt, not the original prompt again.
5. Review the report and the diff before you approve. Rejecting early is cheaper than fixing later.
6. Steps 3 and 5 need your decisions in a file before the next step runs. Don't skip them.

### The map

| Step | Track | Name | Main output | Your action before the next step |
| --- | --- | --- | --- | --- |
| 0 | Build | Project brief | `docs/PROJECT_BRIEF.md` | Fill it in |
| 1 | Build | Install the system and set the rules | `CLAUDE.md`, `docs/PROGRESS.md`, `colaberry/` runtime, baseline commit | Read `CLAUDE.md` |
| 2 | Build | Map the system to the brief | `docs/SYSTEM_MAP.md` | Read the requirement map |
| 3 | Build | Plan | `docs/IMPLEMENTATION_PLAN.md` | Approve the path, template picks and build order |
| 4 | Build | Build one feature (repeat) | One F / C ID per run | Gap Check after each |
| 5 | Critique | Audit against the Scorecard | `docs/AUDIT_FINDINGS.md` + Scorecard | Mark every finding Approved or Rejected |
| 6 | Critique | Fix approved findings | Fixed findings, `/_states` gallery, updated Scorecard | Review changed screens |
| 7 | Critique | Independent verification | `docs/VERIFICATION_REPORT.md` | Do the manual checklist on your own devices |
| 8 | Critique | Hand-off and ship | `docs/HANDOFF.md`, deployment | Ship |

---

## Build track

### Step 0: Project brief (you fill this in)

Create `docs/PROJECT_BRIEF.md` in your project and fill in this template. Give every must-have an ID (F1, F2 … or C1, C2 … for components the system doesn't have yet). Leave a line blank rather than guessing; Claude Code will ask.

```markdown
# Project brief

## Basics
- Project name:
- Type: Marketing page | Learner-facing app | Internal tool | Template / asset kit
- One-line purpose:
- Owner (name, team, contact):
- Audience segment: prospective learners | enrolled learners | employers and partners | staff

## Users
- Primary users and their top 3 tasks:
- Secondary users:
- Devices that matter most: phone-first | desktop-first | both

## Must-haves (each gets an ID)
- F1:
- F2:
- F3:
(Components the system doesn't ship yet: C1, C2 … — each needs designer approval)

## Nice-to-haves
- N1:

## Out of scope
-

## Stack and constraints
- Path: A — plain HTML + components.css (no build) | B — React / Vite / Next + components/core | recommend
- Hosting: GitHub Pages | Netlify | Vercel | Cloudflare Pages | internal
- Content source: hard-coded | CMS | API (name it)
- Integrations: forms, analytics, auth (name them; none are added without approval)

## Content
- Real content available now:
- Content that must stay [PLACEHOLDER: ...]:

## Success criteria
- Every Scorecard row Pass at ship (PLAYBOOK.md)
- (product-specific, e.g. the enrollment form completes on a 390px phone in under 60 seconds)
```

### Step 1: Install the system and set the rules

Acceptance: `CLAUDE.md` and `docs/PROGRESS.md` exist, the runtime files are copied untouched, every brief item has a row.

```markdown
Step 1: Project setup. Do not change any design or code of mine.

1. Read docs/PROJECT_BRIEF.md completely. List anything unclear or missing and ask me before continuing.
2. Initialize git if needed. Commit the folder untouched: "baseline: before Colaberry DS".
3. Install the Colaberry design system:
   - Clone the system next to this project as a read-only reference:
     git clone https://github.com/aleemcolaberry/Colaberry-DS-School-Final.git ../colaberry-ds
   - Follow ../colaberry-ds/IMPLEMENTATION.md section 2 for the path chosen in the brief:
     Path A (plain HTML): copy styles.css, components.css, motion.js, tokens/, assets/ and _ds_bundle.js into ./colaberry/
     Path B (React): copy styles.css, tokens/, assets/ and components/core/ into ./src/colaberry/
   - Do not modify any copied file. Record the system version (git rev-parse HEAD in ../colaberry-ds) in CLAUDE.md.
4. Create CLAUDE.md at the project root with exactly the content below.
5. Create docs/PROGRESS.md: one row per brief item (every F, C, N ID) with columns ID | Requirement | Step | Status (Not started / In progress / Done / Blocked) | Evidence.
6. Show me both files and STOP.

---

# CLAUDE.md

## 0. Start of every session
1. Read docs/PROJECT_BRIEF.md and docs/PROGRESS.md before doing anything.
2. The Colaberry design system is the source of truth. It lives in ../colaberry-ds — read BRAND.md and IMPLEMENTATION.md there at the start of every session, and CLAUDE.md there for the ten responsive ground rules.
3. Work only on the current step. If it is too big for one session, finish a coherent part, record the rest in PROGRESS.md as In progress, and tell me. Never skip items to finish.

## 1. System lock
- Colors, type, spacing, radii, shadows, motion and voice come from the Colaberry design system. No new tokens, fonts, icon sets or component styles without my approval.
- Every value is a semantic token: var(--surface-card), var(--text-body), var(--brand-accent), var(--space-6), var(--radius-xl), var(--dur-fast). Raw hex, rgb() or off-grid pixel values in project code are defects.
- UI is composed from the system's components: components/core/* (React) or the cb-* classes in components.css (HTML). Never re-implement Button, Input, Card, Badge, Dialog, Table, Toast or any primitive the system already ships. Use their built-in states (Button loading, Table loading/empty/error, Input error/success, EmptyState kinds, Alert variants).
- Type: Roboto for display and body, Roboto Mono for numbers and code. Quicksand only inside the logo. Icons: RemixIcon -line style inside .cb-i.
- Logo and favicons come from colaberry/assets/logo/. Never recolor, stretch or redraw the mark. Minimum 120px wide (lockup), 24px (mark).
- Dark mode is free: data-theme="dark" on the html element. Every screen must look right in both themes.
- Never invent content: no fake metrics, names, quotes or outcomes. Real proof points only (5,000+ careers, since 2012, 49 countries) and [PLACEHOLDER: ...] for the rest.
- Ask before adding any framework, CMS, hosting, analytics, form service or paid service.

## 2. Quality standards: the Colaberry Scorecard
Every screen, component and state, in both themes, at 390 / 768 / 1280 px, must Pass every row.

### 2.1 Tokens
No raw colors, font sizes, radii, shadows or durations in project code; only var(--...) from the system. Spacing on the 4px grid via --space-*.

### 2.2 Components
No re-invented primitives. Props and class names used as documented in IMPLEMENTATION.md sections 3 to 5 and components/core/*.d.ts. New components need approval first and ship with every state.

### 2.3 Accessibility (WCAG 2.2 AA)
Body text --neutral-800 or --text-muted; links --blue-600; green text --green-800 or darker (green-700 is large-text only); cherry and leaf never carry small text. Normal text 4.5:1 or better, large text and UI boundaries 3:1 or better. Visible --focus-ring on every interactive element. Semantic landmarks, one h1, no skipped heading levels. Touch targets 44px or larger with 8px spacing. Icon-only controls have accessible names. Red is never the only signal: icon + text accompany every error, and errors announce via role="alert".

### 2.4 Responsive (the ten ground rules in ../colaberry-ds/CLAUDE.md)
Clean at 390, 768 and 1280 and every width between: no horizontal scroll, no clipped text. No nowrap on sentence-length labels. Flex rows of chips, links and buttons wrap with a row gap. Grid columns use minmax(0, ...) or auto-fit; text children get min-width: 0 (cb-min0). No fixed pixel widths on content containers; clamp() for type. Two-column sections stack under about 900px. overflow: hidden is never used to hide a layout bug. Marquees and drawers are clipped by a parent. Probe with ../colaberry-ds/scraps/rwd-harness.html (loadBoth, then probe) after every layout change: zero offenders at 390 and 768.

### 2.5 States
Every data-driven or interactive element defines default, loading, empty, error, success and disabled where relevant, using Skeleton, Spinner, EmptyState, Alert, Toast and the components' built-in state props. Loading matches final dimensions (zero layout shift). Empty says why and offers a next action. Errors say what happened and how to recover. Forms: idle, inline validation on blur, error summary, submitting, success, failure that keeps input.

### 2.6 Voice and copy
Warm and credible. Sentence case. Speak to "you". Lead with proof. Friendly action CTAs ("Apply now", "Enroll today", "Request info"). No emoji. No hype. Public name: Colaberry School of Data and AI; legal entity: Colaberry Inc. Footers and enrollment pages carry verbatim: "Colaberry School of Data and AI is operated by Colaberry Inc."

### 2.7 Motion
Functional, not decorative: 140 to 360ms, --ease-out in, spring only to confirm. Use the system layer (data-reveal via motion.js, cb-stagger, cb-anim), never hand-rolled entrances. Animate transform and opacity only; hover never shifts layout; no looping motion on content (spinners and skeletons excepted). prefers-reduced-motion respected everywhere.

### 2.8 Brand and theme
Logo, lockup, clear space and minimum sizes per BRAND.md. Roboto and Roboto Mono only; RemixIcon only. Both themes checked for every screen, state, logo and image. Cherry #FB2832 stays constant across themes.

## 3. Evidence rule
Never write "done", "fixed" or "no issues" without evidence: a measured value, a passing probe, a screenshot path, a file:line. Say explicitly what was not verified.

## 4. Step finish routine
1. Lint, type check (Path B) and production build: zero errors.
2. Responsive probe at 390 and 768 via rwd-harness: zero offenders.
3. Both themes checked on every changed screen.
4. Update docs/PROGRESS.md with status and evidence for every item touched.
5. Commit on the step's branch.
6. Report: what changed, evidence, what is NOT done and why, what I should review, what's next. Then STOP.
```

### Step 2: Map the system to the brief (read-only)

Acceptance: every system file read; every brief ID mapped to Covered / Compose / New.

```markdown
Step 2: Map the system to the brief. READ-ONLY. Do not modify any project file.

1. Read, in ../colaberry-ds: README.md, BRAND.md, IMPLEMENTATION.md, CLAUDE.md, SKILL.md, tokens/*.css, tokens.json, components.css, every components/core/*.d.ts and *.prompt.md, and the folder names under templates/ and ui_kits/. Confirm at the end how many files you read.
2. Serve ../colaberry-ds with any static server and view design-system.html at #colors, #components, #states, #a11y and #handoff in both themes.
3. Write docs/SYSTEM_MAP.md:
   - Token cheat-sheet for this project: the 20 to 30 semantic tokens we will actually use, grouped by surface / text / border / action / status / space / radius / motion, with light and dark values.
   - Component inventory: every system component with the props or cb-* classes we will use, and the built-in states we must rely on instead of writing our own.
   - Template fit: for every page in the brief, the closest starting point under templates/ or ui_kits/marketing-website/, and what would need to change.
   - Requirement map: every F / C / N ID -> Covered by the system / Compose from existing components / Genuinely new (needs designer approval).
4. List the top 5 risks where the brief pulls against the system (a pattern the system doesn't have, a color the brief wants, a layout that will break at 390px).
5. Update PROGRESS.md with the map status per ID. Summarize and STOP.
```

### Step 3: Plan (no code)

Acceptance: a path decision, every page tied to a template and components, every ID assigned to a Step 4 run.

```markdown
Step 3: Implementation plan. No code changes.

Using docs/PROJECT_BRIEF.md and docs/SYSTEM_MAP.md, write docs/IMPLEMENTATION_PLAN.md:

1. Path decision, honoring the brief: A (plain HTML + components.css, no build) or B (React with components/core via Vite or Next). Compare on hosting cost, editing ease for a marketer, the state handling the project needs, and whether a build step is justified. If the brief says "recommend", recommend one and say why in 5 lines.
2. Page and route list. For each: the template or ui_kit page it forks from, the system components it is composed of, the data it shows, and which Scorecard 2.5 states apply.
3. Folder structure: colaberry/ (or src/colaberry/) untouched; project code in src/ or at the root; one shared shell (header, footer with the legal line, theme toggle, skip link).
4. Shared shell spec: navigation from the brief, one primary CTA, accessible mobile menu (focus trap, Esc closes, aria-expanded, scroll lock), theme applied before first paint, a 404 page in the system.
5. Ordered build list for Step 4: every F and C ID, one per run, dependencies first, each with its branch name feat/F__.
6. Anything marked Genuinely new in SYSTEM_MAP.md: the proposal (anatomy, tokens it will use, states) that I must approve before it is built.
7. Risks and open questions.

Update PROGRESS.md with the planned step for every ID. Then STOP for my approval.
```

### Step 4: Build one feature (repeat per ID)

Run once per F or C ID, in the order from the plan. Replace only `F__`. Run the Gap Check after each.

```markdown
Step 4: Build F__ from docs/PROJECT_BRIEF.md. Branch feat/F__.

1. Read the F__ requirement, its row in PROGRESS.md, its section in IMPLEMENTATION_PLAN.md and the matching starting point in ../colaberry-ds/templates/ or ui_kits/. If anything is ambiguous, ask me one focused question before building.
2. Write docs/features/F__.md: user goal, screens, content fields, every Scorecard 2.5 state that applies, copy in brand voice (2.6), acceptance criteria. Show it to me and wait for OK.
3. Build it from system tokens and components only (CLAUDE.md section 1). Fork the template rather than starting blank. If you need something the system doesn't have, stop and propose it.
4. Wire both themes and the shared shell. Content stays visible without JavaScript.
5. Verify before reporting:
   - Scorecard Pass per row with evidence: grep for raw hex = 0 hits outside colaberry/; probe at 390 and 768 = 0 offenders; measured contrast of every new text/background pair; keyboard walkthrough.
   - Both themes, screenshots saved under docs/evidence/F__/.
   - Every state in docs/features/F__.md shown, with a screenshot each.
6. Check every acceptance criterion as Pass / Fail with evidence.

Follow the Step finish routine in CLAUDE.md.
```

---

## The Colaberry Scorecard

Both critique prompts score against these eight rows. Each row is **Pass**, **Partial** or **Fail** with evidence. Ship gate: eight Pass. Partial ships only with a named owner and a date in `PROGRESS.md`. Fail never ships.

| Row | Pass means | Measure it | Source in the repo |
| --- | --- | --- | --- |
| 2.1 Tokens | Only `var(--…)` from the system in project code; spacing on the 4px grid | grep for `#hex`, `rgb(`, `hsl(`, raw `font-size`, `border-radius`, `box-shadow`, `ms` outside `colaberry/` → 0 hits | `IMPLEMENTATION.md` §6 · `tokens/*.css` · `tokens.json` |
| 2.2 Components | Every primitive is a system component or `cb-*` class; states via built-in props | Inventory buttons, inputs, cards, badges, dialogs, tables, toasts; list strays with file:line | `IMPLEMENTATION.md` §3–5 · `components/core/*.d.ts` |
| 2.3 Accessibility | axe WCAG 2.2 AA clean; text ≥ 4.5:1, large and UI ≥ 3:1; `--focus-ring` everywhere; 44px targets; red never alone | axe per route; measured ratio per pair; keyboard walkthrough; target sizes at 390 | `BRAND.md` Accessibility · `design-system.html#a11y` |
| 2.4 Responsive | Zero probe offenders at 390 and 768; no horizontal scroll through 1280+ | `scraps/rwd-harness.html` → `loadBoth`, `probe` | `CLAUDE.md` rules 1–10 |
| 2.5 States | Default, loading, empty, error, success, disabled designed wherever data or input exists; zero layout shift | Per-element state matrix; `/_states` gallery | `BRAND.md` Writing states · `design-system.html#states` |
| 2.6 Voice | Sentence case, "you", proof-led, friendly CTAs, no emoji or hype; correct brand name and legal line | Copy read-through with quoted violations | `BRAND.md` Voice · Brand name usage |
| 2.7 Motion | 140–360ms ease-out, transform/opacity only, system layer, reduced-motion honored, no loops on content | Animation inventory (element, trigger, property, duration, easing, file:line); reduced-motion run | `BRAND.md` Motion · `tokens/motion.css` · `motion.js` |
| 2.8 Brand and theme | Logo from `assets/logo/` at ≥ 120 / 24px with clear space; Roboto, Roboto Mono and RemixIcon only; every screen right in both themes | Asset and font audit; dual-theme screenshots per screen | `BRAND.md` Logo, Typography, Iconography · `IMPLEMENTATION.md` §7 |

---

## Critique track

### Step 5: Audit against the Scorecard (read-only)

Works on any project, including one that never ran the Build track. Acceptance: every finding has measured evidence and a Scorecard row. After it runs, you fill the Decision column.

```markdown
Step 5: Critique against the Colaberry Scorecard. READ-ONLY. Do not fix anything.

The project under review is at [path or URL]. The design system is at ../colaberry-ds (clone it from https://github.com/aleemcolaberry/Colaberry-DS-School-Final if it is missing). Read BRAND.md, IMPLEMENTATION.md and CLAUDE.md there before you start. Audit tools (axe, Lighthouse, Playwright) may run from a temp folder; do not modify project files.

Audit every screen and state, in both themes, at 390, 768 and 1280 px:

1. Scorecard rows 2.1 to 2.8 (CLAUDE.md section 2, or PLAYBOOK.md in ../colaberry-ds if this project has no CLAUDE.md). Measure, don't guess:
   - 2.1 Tokens: grep the project (excluding colaberry/) for #[0-9a-fA-F]{3,8}, rgb(, hsl(, font-size with a raw px value, border-radius with a raw value, box-shadow with raw values, and raw ms durations. List every hit with file:line.
   - 2.2 Components: find every button, input, card, badge, dialog, table and toast that is not a system component or cb-* class. List file:line and the system component that should replace it.
   - 2.3 Accessibility: axe WCAG 2.2 AA on every route; the contrast ratio of every text/background pair (report the number); focus visibility on every interactive element; heading outline; touch-target sizes at 390.
   - 2.4 Responsive: run ../colaberry-ds/scraps/rwd-harness.html on every page at 390 and 768 and paste the probe output; list any horizontal scroll, clipped text, nowrap in flexible containers, bare 1fr grids and fixed widths.
   - 2.5 States: for every data-driven or interactive element list which of default / loading / empty / error / success / disabled exist and which are missing.
   - 2.6 Voice: flag title case, emoji, hype, second-person misses, wrong brand name and a missing legal line; quote the line.
   - 2.7 Motion: list every animation (element, trigger, property, duration, easing, file:line); flag layout-affecting properties, anything over 360ms, loops on content, hand-rolled reveals and missing reduced-motion handling.
   - 2.8 Brand: logo source, size and clear space; fonts and icon sets loaded; both-theme check per screen.
2. Usability pass: Nielsen's 10 heuristics screen by screen, plus a 5-second first-impression test as the primary user from PROJECT_BRIEF.md (or the obvious primary user if there is no brief).
3. Write docs/AUDIT_FINDINGS.md:
   - The Scorecard: one row per 2.1 to 2.8 with Pass / Partial / Fail, the headline evidence and the finding IDs behind it.
   - The findings table: ID | Screen | Issue | Scorecard row | Evidence (file:line, ratio, width, screenshot) | Severity (Critical / High / Medium / Low) | Type (Defect / Enhancement) | Proposed fix (the exact token, component or rule) | Visual impact (None / Minimal / Noticeable) | Decision
   Leave Decision empty. Put Enhancements in their own section with before/after descriptions.
4. Add each finding ID to PROGRESS.md (create it if missing). Summarize by severity, show the Scorecard, and STOP.
```

**Your action:** open `docs/AUDIT_FINDINGS.md` and type Approved or Rejected in every Decision cell.

### Step 6: Fix approved findings

Acceptance: every Approved finding is Fixed with evidence; the Scorecard is re-measured on changed screens.

```markdown
Step 6: Fix approved findings. Branch fix/audit-findings.

1. Fix ONLY items marked Approved in docs/AUDIT_FINDINGS.md, Critical first.
2. Smallest change per defect. Token fixes replace the raw value with the right semantic token, never a new token. Contrast fixes move to the next step of the same ramp (red-500 -> red-600, green-700 -> green-800) and report before/after ratios. Component fixes swap the hand-rolled element for the system component or cb-* class with the same behavior.
3. Implement approved Enhancements exactly as described, nothing more.
4. Build the states gallery: a dev-only /_states page (excluded from production) showing every component the project uses in every Scorecard 2.5 state, both themes, with the stress content: a 120-character title, an unbroken 60-character string, a one-word title, all optional fields missing, 8 or more tags.
5. Re-run the Scorecard measurements from Step 5 on the changed screens and update the Scorecard table in AUDIT_FINDINGS.md.
6. Set Decision to "Fixed" with evidence, and update PROGRESS.md.

If the list is too long for one session, fix by severity, record the rest as In progress, and stop cleanly.

Follow the Step finish routine in CLAUDE.md.
```

### Step 7: Independent verification (always after `/clear`)

A fresh session has no stake in the earlier work.

```markdown
Step 7: Independent verification. Branch qa/verification.

You did not build this project. Act as an independent senior reviewer whose job is to find problems, not confirm success. Trust no earlier report; verify everything yourself against ../colaberry-ds.

1. Re-run every Scorecard measurement from Step 5 yourself. Report raw results and a fresh Scorecard.
2. Requirement audit: for every row in PROGRESS.md marked Done, open the actual screen and confirm it meets the brief. Mark anything that doesn't as Reopened.
3. Manual checks on every screen:
   - Keyboard-only walkthrough: everything reachable, focus visible, order logical, menu and dialogs trap and release focus correctly
   - Screen reader pass (VoiceOver or NVDA): landmarks, headings, names, errors, live regions
   - 200% zoom and a text-spacing override
   - Reduced motion on and off; JavaScript disabled
   - Theme switch on every screen, including hover and focus states and the /_states gallery
   - 5-second first-impression test as the primary user from the brief
4. Spot-check at least 10 claims from earlier reports and AUDIT_FINDINGS.md.
5. Drift check: any value in project code not from the system's tokens, any component not from the system, any font or icon set not from the system.

Write docs/VERIFICATION_REPORT.md: each check, result, evidence, and what you could NOT verify. Fix only clear defects with no visual impact; list everything else for my decision. End with a checklist for me to test on my own phone and laptop.

Follow the Step finish routine in CLAUDE.md.
```

### Step 8: Hand-off and ship

```markdown
Step 8: Hand-off. Branch docs/handoff.

1. Update CLAUDE.md with the final stack, commands and folder structure. Keep sections 0 to 4 unchanged.
2. Write docs/HANDOFF.md for the next person, a marketer or a developer who has never seen this repo: what the project is, how to run it, how to edit copy and images, how to add a page using Step 4, how to update the design system (pull ../colaberry-ds, re-copy per IMPLEMENTATION.md section 2, re-run Step 5), and the Scorecard as a pre-merge checklist.
3. Release per ../colaberry-ds/DEPLOY.md for the host in the brief (GitHub Pages workflow, Netlify, Vercel or Cloudflare Pages). Preview deploys per branch where the host supports it. Ask me before adding analytics.
4. Final PROGRESS.md: every ID Done with evidence, or listed with the reason it isn't.

Follow the Step finish routine in CLAUDE.md, then give me a one-page summary of the whole project with the final Scorecard.
```

---

## Utility prompts

Use these between steps, as often as needed.

### Gap Check (after every step)

```markdown
Gap Check for Step __. Do not build anything new yet.

1. Re-read the Step __ prompt from this session's history (or I will paste it again), PROJECT_BRIEF.md, PROGRESS.md and any spec files for this step.
2. Make a checklist of EVERY instruction and acceptance criterion in that step, one line each.
3. For each line, check the actual code, screens or files (not your earlier report) and mark Done (with evidence), Partial or Missing.
4. Run the build and the responsive probe at 390 and 768.
5. Show me the checklist with only Partial and Missing items at the top.
6. Ask whether to complete them now. When I say yes, complete them, then repeat this check until nothing is Partial or Missing.
```

### Resume (when a step stopped partway)

```markdown
Resume Step __.

1. Read CLAUDE.md, PROGRESS.md and git log / git status on the current branch.
2. Tell me in 5 lines or fewer: what is finished, what is half-done, what hasn't started.
3. Continue from the first unfinished item. Do not redo finished work or restart the step.
4. Follow the Step finish routine when done.
```

### Fix one issue

```markdown
Fix this specific issue: [what you see, where, at what width and theme; attach a screenshot if you can].

1. Reproduce it first and show me the evidence (screenshot or measured value).
2. Find the root cause. If the same cause affects other screens or components, list them.
3. Fix the cause, not the symptom, with the smallest change, using only system tokens and components. If the fix needs a value or component the system doesn't have, stop and propose it.
4. Name the Scorecard row that would have caught it and add the check to the Step finish routine if it isn't there.
5. Follow the Step finish routine in CLAUDE.md.
```

### Quick critique (one screen, no files changed)

```markdown
Quick critique: [screen, URL, file or screenshot] at [width] in [theme].

Score it against the Colaberry Scorecard (CLAUDE.md section 2, or ../colaberry-ds/PLAYBOOK.md if this project has no CLAUDE.md). For each of the eight rows give Pass / Partial / Fail with one line of evidence (file:line, ratio, width or quote). Then list the three changes that would move the most rows to Pass, each with the exact system token, component or rule to use. Do not change any file.
```

### Add a page or component later

```markdown
Add [new page / new component]: [one-line description].

Treat it as a new brief item: add it to PROJECT_BRIEF.md with the next ID and to PROGRESS.md, then follow Step 4 exactly: fork the closest template in ../colaberry-ds/templates/, compose from system components, design every Scorecard 2.5 state, check both themes, probe at 390 and 768. Run the Gap Check at the end.
```

### Update the design system

```markdown
Update the design system. Branch chore/ds-update.

1. In ../colaberry-ds run git pull and record the old and new commit. Read the diff of BRAND.md, IMPLEMENTATION.md, CLAUDE.md, tokens/ and components.css.
2. Re-copy the runtime files per IMPLEMENTATION.md section 2. Do not touch project code yet.
3. Run the build, the probe at 390 and 768, and screenshots of every screen in both themes; compare with docs/evidence/. List every visual change with its cause (token change, component change).
4. For breaking changes (renamed token, changed prop), propose the smallest project edit and wait for my OK.
5. Update the system version in CLAUDE.md and PROGRESS.md.
```
