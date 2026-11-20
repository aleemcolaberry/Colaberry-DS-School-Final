/* _build.mjs — the one build step (CLAUDE.md §8). Run before every deploy:  node _build.mjs
   1. styles.css      ← flattened from tokens/* + assets/fonts/*.css (no @import chain: one request, fonts
                         discovered from the first stylesheet, not four round-trips later)
   2. components.css  ← styles.css + components.src.css (one-link superset for no-build pages)
   3. Colaberry School/dist/*.js ← every <script type="text/babel"> precompiled with the vendored Babel,
                         so live pages never ship babel.min.js (3 MB) or transpile in the browser
   4. node _stamp-versions.mjs  (cache-busting ?v= on every local reference)
   Idempotent. Sources stay editable: tokens/*.css, components.src.css, Colaberry School/*.jsx.
   The lint (scraps/rwd-lint.html §8.1) fails when a generated file is older than its sources. */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const read = (p) => readFileSync(p, 'utf8');
function h32(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(16).padStart(8, '0'); }
/* Rewrite url(...) inside a CSS file so it still resolves when the text moves to the project root. */
const rebase = (css, fromDir) => css.replace(/url\((['"]?)(?!data:|https?:|\/)([^'")]+)\1\)/g, (_, q, u) => `url('${fromDir}/${u}')`);

/* ---- 1. styles.css ---- */
export const STYLE_SOURCES = [
  ['assets/fonts/fonts.css', 'assets/fonts'],
  ['assets/fonts/remixicon.css', 'assets/fonts'],
  ['tokens/fonts.css', null],
  ['tokens/colors.css', null],
  ['tokens/typography.css', null],
  ['tokens/spacing.css', null],
  ['tokens/base.css', null],
  ['tokens/motion.css', null],
  ['tokens/utilities.css', null],
];
export function buildStyles(readFn = read) {
  const parts = STYLE_SOURCES.map(([p, dir]) => {
    let css = readFn(p).replace(/^\s*@import[^;]+;\s*$/gm, ''); // sources may keep imports for reading; the build inlines
    if (dir) css = rebase(css, dir);
    return `/* ==== ${p} ==== */\n${css.trim()}\n`;
  });
  const body = parts.join('\n');
  const hash = h32(STYLE_SOURCES.map(([p]) => readFn(p)).join('\n'));
  return `/* ============================================================
   Colaberry Design System — styles.css  (GENERATED — do not edit)
   Built by _build.mjs from tokens/*.css + assets/fonts/*.css into ONE
   file: fonts, icons, color/type/spacing tokens, base, motion, utilities.
   Edit the sources, then run:  node _build.mjs
   @build-hash ${hash}
   ============================================================ */
${body}`;
}
/* ---- 2. components.css ---- */
export function buildComponents(styles, readFn = read) {
  const src = readFn('components.src.css');
  const hash = h32(styles + src);
  return `/* ============================================================
   Colaberry — components.css  (GENERATED — do not edit)
   ONE-LINK entry for no-build pages: the full foundation (styles.css,
   inlined) + every CSS-only component (components.src.css).
   Link THIS file alone — never together with styles.css (duplicate CSS).
   React/bundler apps link styles.css instead. Edit the sources, then
   run:  node _build.mjs
   @build-hash ${hash}
   ============================================================ */
${styles.replace(/^\/\*[\s\S]*?\*\/\n/, '')}
/* ==== components.src.css ==== */
${src.replace(/^\s*@import[^;]+;\s*$/gm, '').trim()}
`;
}

/* ---- 2b. School: one site stylesheet ---- */
export const SCHOOL_CSS = ['aw', 'partner', 'home', 'home-bento', 'frontier', 'wp', 'site-pages', 'podcasts', 'shorts', 'student-projects', 'register', 'thank-you', 'nav', 'interest-modal'];
export function buildSchoolCss(readFn = read) {
  const body = SCHOOL_CSS.map((c) => `/* ==== ${c}.css ==== */\n${readFn(`Colaberry School/${c}.css`).replace(/^\s*@import[^;]+;\s*$/gm, '').trim()}\n`).join('\n');
  return `/* ============================================================
   Colaberry School — school.css  (GENERATED — do not edit)
   Every School page CSS file concatenated in cascade order by _build.mjs,
   so a page loads ONE site stylesheet (cached across all School pages)
   instead of 4–7. Edit the per-section sources (${SCHOOL_CSS.join(', ')}),
   then run:  node _build.mjs
   @build-hash ${h32(body)}
   ============================================================ */
${body}`;
}

/* ---- 3. School pages: precompile JSX ----
   Every `<script src="dist/<name>.js" defer>` in a School page is compiled from `Colaberry School/<name>.jsx`
   (the page App lives in `<slug>.app.jsx`). const/let are lowered to var on purpose: the files are classic
   scripts sharing one global scope and reference each other's top-level declarations — Babel's old
   in-browser script-tag runner (es2015 preset) did exactly this. */
export const SCHOOL_PAGES = ['accelerator', 'accelerator-standalone-src', 'beginners-career-switchers', 'builders-founders', 'working-professionals'];
export const BABEL_OPTS = { presets: ['react'], plugins: ['transform-block-scoping'] };
export function distTargets(html) {
  return [...html.matchAll(/<script src="dist\/([^"?]+)\.js(?:\?[^"]*)?" defer><\/script>/g)].map((m) => m[1]);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const styles = buildStyles();
  writeFileSync('styles.css', styles);
  writeFileSync('components.css', buildComponents(styles));
  writeFileSync('Colaberry School/school.css', buildSchoolCss());
  const require = createRequire(import.meta.url);
  const Babel = require('./assets/vendor/babel.min.js');
  const transform = (code, filename) => `/* GENERATED by _build.mjs from ${filename} — edit the .jsx, not this file. const/let are lowered to var: classic scripts share one global scope and the pages rely on it. */\n` + (filename.endsWith('.app.jsx') ? 'if (window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); }\n' : '') + Babel.transform(code, { ...BABEL_OPTS, filename }).code;
  mkdirSync('Colaberry School/dist', { recursive: true });
  const done = new Set();
  for (const slug of SCHOOL_PAGES) {
    const p = `Colaberry School/${slug}.html`;
    if (!existsSync(p)) continue;
    for (const name of distTargets(read(p))) {
      if (done.has(name)) continue; done.add(name);
      const src = `Colaberry School/${name}.jsx`;
      if (!existsSync(src)) { console.warn(`build: ${src} missing for dist/${name}.js`); continue; }
      writeFileSync(`Colaberry School/dist/${name}.js`, transform(read(src), `${name}.jsx`));
    }
  }
  // design-system.html: the live component gallery
  mkdirSync('guidelines/dist', { recursive: true });
  writeFileSync('guidelines/dist/standalone.js', transform(read('components/core/_standalone.jsx'), 'components/core/_standalone.jsx'));
  writeFileSync('guidelines/dist/showcase.js', transform(read('guidelines/showcase.jsx'), 'guidelines/showcase.jsx'));
  execFileSync('node', ['_stamp-versions.mjs'], { stdio: 'inherit' });
  console.log('build: styles.css, components.css, School dist/ written.');
}
