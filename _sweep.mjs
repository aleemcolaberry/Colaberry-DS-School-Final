/* _sweep.mjs — the responsive gate, headless:   node _sweep.mjs
   Loads every live page in Chromium at the 19 widths (320 → 1920) and runs the SAME probe as
   scraps/rwd-sweep.html (its probe/path/txt functions are lifted from that file — one source of truth):
   page wider than the viewport, elements past the edge, text spill/clip, vertical spill, overlapping
   text, squeezed columns, distorted images, sub-24px tap targets, hidden nav with no toggle, oversized
   sticky bars, oversized phone h1. Any finding outside ALLOW exits 1; deploy.yml runs it before the
   build, so a page that breaks at ANY width — new or old, listed or not — cannot ship.
   Needs Playwright (installed outside the repo so it never lands in the Pages artifact):
     mkdir -p /tmp/pw && (cd /tmp/pw && npm init -y >/dev/null && npm i playwright@1.47.2 >/dev/null && npx playwright install --with-deps chromium)
     PW_DIR=/tmp/pw node _sweep.mjs            (default PW_DIR: ./node_modules' parent, i.e. a local `npm i playwright`)
   Options:  node _sweep.mjs <page.html …>  — only these pages;  --widths=320,768,1280 — fewer stops */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { join, extname, resolve } from 'node:path';

const WIDTHS = (process.argv.find((a) => a.startsWith('--widths=')) || '').slice(9).split(',').filter(Boolean).map(Number);
const ALL_WIDTHS = WIDTHS.length ? WIDTHS : [320, 360, 390, 414, 480, 540, 600, 640, 700, 768, 820, 900, 960, 1024, 1100, 1180, 1280, 1440, 1920];
const CONCURRENCY = 4;

/* Known, documented exceptions (AUDIT.md › Known/accepted). kind = probe bucket; el = regex on the element path. */
const ALLOW = [
  { page: /Social Media Kit|Brochure|ads\//, kind: /^(scrollW|overflow|spill)$/, el: /./, why: '§1.11 fixed-size export artboards inside a horizontally scrolling row' },
  { page: /ads\//, kind: /^(touch|nav)$/, el: /./, why: 'animation previews — not a navigable page' },
  { page: /Colaberry School\//, kind: /^touch$/, el: /lead-card__optin>input/, why: '18 px checkbox with a 26 px ::before hit area; the probe reads the box' },
  { page: /design-system\.html/, kind: /^touch$/, el: /./, why: 'specimen controls inside the component gallery (pass 9)' },
];

/* --- lift the probe from the browser sweep (single source of truth) --- */
const sweepHtml = readFileSync('scraps/rwd-sweep.html', 'utf8');
const script = sweepHtml.slice(sweepHtml.indexOf('function path(el)'), sweepHtml.indexOf('\nfunction load('));
const PROBE_SRC = script + '\nreturn probe;';

/* --- live pages: the sweep's own PAGES list + everything discovered on disk --- */
const SKIP_DIR = /(^|\/)(scraps|templates|guidelines|brand-profile|uploads|node_modules|screenshots|components|tokens|assets|dist|\.github|\.bundles|\.git)(\/|$)/;
const SKIP_FILE = /-print[-\w]*\.html$|\(standalone\)\.html$|standalone-src\.html$|thumbnail\.html$|\.card\.html$|\.dc\.html$|register\.html$/; // register.html forwards to the form (0-delay redirect)
function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n).split('\\').join('/');
    if (statSync(p).isDirectory()) { if (!SKIP_DIR.test(p + '/')) walk(p, out); }
    else if (n.endsWith('.html') && !SKIP_FILE.test(p) && !SKIP_DIR.test(p)) out.push(p);
  }
  return out;
}
const listed = [...sweepHtml.matchAll(/'\.\.\/([^']+\.html)'/g)].map((m) => m[1]);
const argPages = process.argv.slice(2).filter((a) => !a.startsWith('--')).map((a) => a.replace(/^\.\//, ''));
const pages = argPages.length ? argPages : [...new Set([...listed, ...walk('.')])].filter((p) => existsSync(p) && !/register\.html$/.test(p));

/* --- tiny static server (the pages fetch fonts, CSS and dist/ scripts by relative URL) --- */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon', '.md': 'text/plain', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  const p = resolve('.', '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(resolve('.')) || !existsSync(p) || statSync(p).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(p).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(readFileSync(p));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const PW_DIR = process.env.PW_DIR || '.';
let chromium;
try { ({ chromium } = createRequire(join(resolve(PW_DIR), 'package.json')).require('playwright')); }
catch (e) { console.error('_sweep.mjs: playwright not found under ' + resolve(PW_DIR) + ' — see the header for the install one-liner (' + e.message + ')'); process.exit(2); }

const browser = await chromium.launch();
const slow = (p) => /accelerator|beginners|builders|working-professionals|ui_kits|design-system/.test(p) ? 7000 : 1500;
const KEYS = ['overflow', 'spill', 'clipped', 'vspill', 'overlap', 'squeezed', 'distorted', 'touch'];
const results = {};
async function sweep(page, p) {
  const out = { page: p, widths: {} };
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base + p.split('/').map(encodeURIComponent).join('/'), { waitUntil: 'load', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(slow(p));
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(300);
  for (const w of ALL_WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(w === ALL_WIDTHS[0] ? 900 : 500);
    try { out.widths[w] = await page.evaluate(({ src, w }) => new Function(src)()({ contentWindow: window, contentDocument: document, clientHeight: window.innerHeight }, w), { src: PROBE_SRC, w }); }
    catch (e) { out.widths[w] = { error: String(e) }; }
  }
  return out;
}
let i = 0;
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, pages.length) }, async () => {
  const ctx = await browser.newContext({ reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  while (i < pages.length) { const p = pages[i++]; try { results[p] = await sweep(page, p); } catch (e) { results[p] = { page: p, error: String(e), widths: {} }; } }
  await ctx.close();
}));
await browser.close(); server.close();

/* --- report --- */
let fatal = 0, accepted = 0;
const allowed = (p, kind, el) => ALLOW.find((a) => a.page.test(p) && a.kind.test(kind) && a.el.test(el || ''));
for (const p of pages) {
  const res = results[p]; const lines = [];
  if (!res || res.error) { lines.push('ERR ' + (res && res.error)); fatal++; }
  for (const w of ALL_WIDTHS) {
    const r = res && res.widths[w]; if (!r) continue;
    if (r.error) { lines.push(w + ': ERR ' + r.error); fatal++; continue; }
    const items = [];
    if (r.scrollW > w + 1) items.push(['scrollW', 'page ' + r.scrollW + 'px wide', '']);
    for (const k of KEYS) for (const it of r[k] || []) items.push([k, (it.el || it.a + ' + ' + it.b) + (it.txt ? ' «' + it.txt + '»' : ''), it.el || it.a || '']);
    if (r.nav) items.push(['nav', r.nav, '']);
    for (const s of r.sticky || []) items.push(['sticky', s.el + ' ' + s.h + 'px', s.el]);
    for (const h of r.bigH1 || []) items.push(['h1', h.el + ' ' + h.fs + 'px', h.el]);
    for (const [kind, desc, el] of items) { const a = allowed(p, kind, el); if (a) accepted++; else fatal++; lines.push(`${w}: ${a ? '○' : '✗'} ${kind} ${desc}`); }
  }
  if (lines.length) console.log('▶ ' + p + '\n   ' + lines.join('\n   ')); else console.log('✓ ' + p);
}
console.log(`\n_sweep.mjs: ${pages.length} pages × ${ALL_WIDTHS.length} widths · ${fatal} finding(s) · ${accepted} accepted`);
if (fatal) { console.log('\nThe gate is closed: fix the ✗ findings (CLAUDE.md §1 / §4 — clean at every width from 320 to 1920).'); process.exit(1); }
