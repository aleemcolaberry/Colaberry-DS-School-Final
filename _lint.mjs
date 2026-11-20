/* _lint.mjs — the quality gate, on the command line and in CI:   node _lint.mjs
   One source of truth: this evaluates the SAME rules as scraps/rwd-lint.html (fetch/document shimmed),
   over its FILES list PLUS every live page it discovers on disk, and exits 1 on any error that is not
   in the documented ALLOW list. deploy.yml runs it BEFORE the build, so a page that breaks CLAUDE.md
   §1–§8 (viewport/zoom lock, fixed widths, nowrap on long labels, bare multi-column grids, sub-12px type,
   raw colours on text, white on red-500, missing states, Babel on a live page, stale generated CSS …)
   cannot ship — including pages nobody remembered to add to the lint's list.
   Options:  node _lint.mjs --all     also print every warning
             node _lint.mjs <file…>   lint only these (paths relative to the project root)            */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import vm from 'node:vm';

/* Known, documented exceptions (AUDIT.md › Known/accepted). Reported, never fatal. */
const ALLOW = {
  '../ads/Meta Ad Intro.html': '§8.2 animation export — the timeline engine runs on in-browser Babel by design; not a site page',
  '../ads/Meta Ad Outro.html': '§8.2 animation export — see above',
  '../ads/Meta Ads Review.html': '§8.2 animation export — see above',
  '../ui_kits/marketing-website/index.html': '§8.2 design-kit demo (not deployed as a marketing page); precompile pending',
};
/* Live pages are discovered here; everything else (cards, templates, print copies, bundles, scratch) is not a page. */
const SKIP_DIR = /(^|\/)(scraps|templates|guidelines|brand-profile|uploads|node_modules|screenshots|components|tokens|assets|dist|\.github|\.bundles|\.git)(\/|$)/;
const SKIP_FILE = /-print[-\w]*\.html$|\(standalone\)\.html$|standalone-src\.html$|thumbnail\.html$|\.card\.html$|\.dc\.html$/;
function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n).split('\\').join('/');
    if (statSync(p).isDirectory()) { if (!SKIP_DIR.test(p + '/')) walk(p, out); }
    else if (n.endsWith('.html') && !SKIP_FILE.test(p) && !SKIP_DIR.test(p)) out.push(p);
  }
  return out;
}

const page = readFileSync('scraps/rwd-lint.html', 'utf8');
const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const src = scripts[scripts.length - 1];
const lines = [];
const ctx = {
  console: { log: (s) => lines.push(String(s).replace(/^\[lint\] /, '')), warn() {}, error() {} },
  document: { getElementById: () => ({ appendChild() {}, textContent: '', innerHTML: '' }), createElement: () => ({ className: '', textContent: '' }) },
  location: { search: '' }, addEventListener() {}, URLSearchParams, setTimeout, clearTimeout,
  fetch: async (url) => { const p = resolve('scraps', String(url).split('?')[0]); return existsSync(p) ? { ok: true, text: async () => readFileSync(p, 'utf8') } : { ok: false, text: async () => '' }; },
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
try { vm.runInContext(src, ctx, { filename: 'scraps/rwd-lint.html' }); }
catch (e) { console.error('_lint.mjs: could not evaluate scraps/rwd-lint.html — ' + e.message); process.exit(2); }

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const showAll = process.argv.includes('--all');
const files = args.length ? args.map((a) => '../' + a.replace(/^\.\//, '')) : [...new Set([...ctx.FILES, ...walk('.').map((p) => '../' + p)])];

const { E, W } = await ctx.lint(files);
/* attribute every logged finding to its file */
let cur = null; const errs = []; const warns = [];
for (const l of lines) {
  const f = l.match(/^(?:▶|✓) (\.\.\/\S.*?)(?:\s{2}|$)/); if (f) { cur = f[1].trim(); continue; }
  if (/^\s+E\s/.test(l)) errs.push([cur, l.trim()]); else if (/^\s+W\s/.test(l)) warns.push([cur, l.trim()]);
}
const fatal = errs.filter(([f]) => !ALLOW[f]); const accepted = errs.filter(([f]) => ALLOW[f]);
for (const [f, l] of fatal) console.log('✗ ' + f + '\n    ' + l);
for (const [f, l] of accepted) console.log('○ ' + f + ' (accepted: ' + ALLOW[f] + ')\n    ' + l);
if (showAll) for (const [f, l] of warns) console.log('· ' + f + '\n    ' + l);
console.log(`\n_lint.mjs: ${files.length} files · ${fatal.length} error(s) · ${accepted.length} accepted · ${W} warning(s)` + (showAll ? '' : '  (--all prints warnings)'));
if (fatal.length) { console.log('\nThe gate is closed: fix the errors above (CLAUDE.md §4 — zero E before a page ships).'); process.exit(1); }
