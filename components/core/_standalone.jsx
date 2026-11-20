/* Colaberry components — self-contained build for in-project previews.
   Auto-generated copy of every components/core/<Name>.jsx. Compiler ignores (underscore prefix). */

function cbTrapTab(e, root) {
  const f = root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');
  if (!f.length) { e.preventDefault(); root.focus(); return; }
  const first = f[0], last = f[f.length - 1], a = document.activeElement;
  if (e.shiftKey && (a === first || a === root)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && (a === last || !root.contains(a))) { e.preventDefault(); first.focus(); }
}


/* ===== Accordion ===== */
const CSS_Accordion = `
.cb-acc { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; background: var(--surface-card); }
.cb-acc__item + .cb-acc__item { border-top: 1px solid var(--border-subtle); }
.cb-acc__btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; background: none; border: none; cursor: pointer; font-family: var(--font-body); font-weight: var(--fw-bold); font-size: var(--fs-body); color: var(--text-strong); text-align: left; transition: background var(--dur-fast) var(--ease-out); }
.cb-acc__btn:hover { background: var(--surface-sunken); }
.cb-acc__btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.cb-acc__ic { flex: none; color: var(--brand-primary); transition: transform var(--dur-base) var(--ease-out); }
.cb-acc__item[data-open="true"] .cb-acc__ic { transform: rotate(180deg); }
.cb-acc__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-base) var(--ease-out); }
.cb-acc__item[data-open="true"] .cb-acc__panel { grid-template-rows: 1fr; }
.cb-acc__inner { overflow: hidden; }
.cb-acc__body { padding: 0 20px 18px; font-size: var(--fs-body-sm); color: var(--text-muted); line-height: 1.6; }
@media (prefers-reduced-motion: reduce){ .cb-acc__panel, .cb-acc__ic { transition-duration: .001ms; } }
`;

function injectAccordion() {
  if (typeof document === 'undefined' || document.getElementById('cb-acc-css')) return;
  const s = document.createElement('style'); s.id = 'cb-acc-css'; s.textContent = CSS_Accordion; document.head.appendChild(s);
}

/**
 * Vertically stacked, animated disclosure panels. Single-open by default;
 * pass `allowMultiple` to let several stay open. `defaultOpen` seeds indices.
 */
function Accordion({ items = [], allowMultiple = false, defaultOpen = [], className = '', ...rest }) {
  injectAccordion();
  const [open, setOpen] = React.useState(() => new Set(defaultOpen));
  const uid = React.useMemo(() => 'cb-acc-' + Math.random().toString(36).slice(2, 7), []); // unique per instance so ids never collide
  const toggle = (i) => setOpen(prev => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div className={'cb-acc ' + className} {...rest}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        const btnId = uid + '-b' + i, panelId = uid + '-p' + i;
        return (
          <div className="cb-acc__item" data-open={isOpen} key={i}>
            <button className="cb-acc__btn" id={btnId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(i)}>
              <span>{it.title}</span>
              <svg className="cb-acc__ic" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="cb-acc__panel" id={panelId} role="region" aria-labelledby={btnId}><div className="cb-acc__inner"><div className="cb-acc__body">{it.content}</div></div></div>
          </div>
        );
      })}
    </div>
  );
}


/* ===== Alert ===== */
const CSS_Alert = `
.cb-alert { --_c: var(--status-info); --_bg: var(--status-info-bg); --_fg: var(--status-info-fg); display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: var(--radius-lg); background: var(--_bg); color: var(--text-body); font-family: var(--font-body); font-size: var(--fs-body-sm); line-height: 1.5; border: 1px solid color-mix(in srgb, var(--_c) 28%, transparent); }
.cb-alert--success { --_c: var(--status-success); --_bg: var(--status-success-bg); --_fg: var(--status-success-fg); }
.cb-alert--warning { --_c: var(--status-warning); --_bg: var(--status-warning-bg); --_fg: var(--status-warning-fg); }
.cb-alert--danger  { --_c: var(--status-danger);  --_bg: var(--status-danger-bg);  --_fg: var(--status-danger-fg); }
.cb-alert--neutral { --_c: var(--neutral-500); --_bg: var(--surface-sunken); --_fg: var(--text-strong); }
.cb-alert--banner { border-radius: 0; border-left: none; border-right: none; }
.cb-alert__ic { flex: none; margin-top: 1px; color: var(--_fg); display: grid; place-items: center; }
.cb-alert__body { flex: 1; min-width: 0; }
.cb-alert__title { font-weight: var(--fw-bold); color: var(--_fg); margin: 0 0 2px; }
.cb-alert__msg { margin: 0; color: var(--text-body); }
.cb-alert__msg a { color: var(--_fg); font-weight: var(--fw-medium); text-decoration: underline; }
.cb-alert__actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.cb-alert__close { flex: none; background: none; border: none; cursor: pointer; color: var(--text-subtle); min-width: 32px; min-height: 32px; display: inline-grid; place-items: center; padding: 2px; margin: -6px -8px 0 0; border-radius: var(--radius-xs); transition: color var(--dur-fast) var(--ease-out); }
.cb-alert__close:hover { color: var(--text-strong); }
.cb-alert__close:focus-visible { outline: none; box-shadow: var(--focus-ring); }
`;

function injectAlert() {
  if (typeof document === 'undefined' || document.getElementById('cb-alert-css')) return;
  const s = document.createElement('style'); s.id = 'cb-alert-css'; s.textContent = CSS_Alert; document.head.appendChild(s);
}

const ICONS_Alert = {
  info: 'M12 16v-5M12 8v.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  neutral: 'M12 16v-5M12 8v.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  success: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM8 12l3 3 5-6',
  warning: 'M12 8v5M12 16.5v.5M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  danger: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v5M12 16.5v.5',
};

/**
 * Inline, persistent message — stays until the user acts or dismisses it.
 * Use for form-level errors, "cohort full", payment failures, maintenance
 * notices. For transient confirmations use Toast instead.
 */
function Alert({ variant = 'info', title, children, actions, onClose, banner = false, className = '', ...rest }) {
  injectAlert();
  const cls = ['cb-alert', 'cb-alert--' + variant];
  if (banner) cls.push('cb-alert--banner');
  if (className) cls.push(className);
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div className={cls.join(' ')} role={role} {...rest}>
      <span className="cb-alert__ic" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={ICONS_Alert[variant] || ICONS_Alert.info} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <div className="cb-alert__body">
        {title && <p className="cb-alert__title">{title}</p>}
        {children && <div className="cb-alert__msg">{children}</div>}
        {actions && <div className="cb-alert__actions">{actions}</div>}
      </div>
      {onClose && <button type="button" className="cb-alert__close" onClick={onClose} aria-label="Dismiss">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>}
    </div>
  );
}


/* ===== Avatar ===== */
const CSS_Avatar = `
.cb-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; overflow: hidden; flex: none;
  font-family: var(--font-body); font-weight: var(--fw-bold); color: var(--neutral-900);
  background: var(--green-500); user-select: none;
}
.cb-avatar { position: relative; }
.cb-avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: inherit; }
.cb-avatar__txt { line-height: 1; white-space: nowrap; }
.cb-avatar--xs { width: 28px; height: 28px; font-size: 12px; }
.cb-avatar--sm { width: 36px; height: 36px; font-size: 13px; }
.cb-avatar--md { width: 48px; height: 48px; font-size: 16px; }
.cb-avatar--lg { width: 64px; height: 64px; font-size: 22px; }
.cb-avatar--xl { width: 88px; height: 88px; font-size: 30px; }
.cb-avatar--ring { box-shadow: 0 0 0 3px var(--surface-card), 0 0 0 5px var(--brand-primary); }
.cb-avatar-group { display: inline-flex; }
.cb-avatar-group > .cb-avatar { box-shadow: 0 0 0 3px var(--surface-card); }
.cb-avatar-group > .cb-avatar + .cb-avatar { margin-left: -12px; }
`;

// Each tone pairs a fill with an ink that clears WCAG AA (≥4.5:1) for the initials.
const TONES = [
  { bg: 'var(--green-500)', fg: 'var(--neutral-900)' },
  { bg: 'var(--blue-500)',  fg: 'var(--neutral-0)' },
  { bg: 'var(--red-600)',   fg: 'var(--neutral-0)' },
  { bg: 'var(--green-600)', fg: 'var(--neutral-900)' },
  { bg: 'var(--blue-700)',  fg: 'var(--neutral-0)' },
];

function injectAvatar() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-avatar-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-avatar-css';
  s.textContent = CSS_Avatar;
  document.head.appendChild(s);
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

/**
 * Circular avatar. Shows a photo when `src` is given, with the person's
 * initials underneath as a graceful fallback (used while the image loads or
 * if it fails). Initials get a stable brand-tone background from the name.
 */
function Avatar({ src, name = '', size = 'md', ring = false, className = '', style, ...rest }) {
  injectAvatar();
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => { setFailed(false); }, [src]);
  const classes = ['cb-avatar', 'cb-avatar--' + size];
  if (ring) classes.push('cb-avatar--ring');
  if (className) classes.push(className);
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const tone = TONES[hash % TONES.length];
  const showImg = src && !failed;
  return (
    <span className={classes.join(' ')} style={{ background: tone.bg, color: tone.fg, ...style }} role="img" aria-label={name || undefined} {...rest}>
      <span className="cb-avatar__txt" aria-hidden="true">{initials(name)}</span>
      {showImg && <img src={src} alt="" onError={() => setFailed(true)} />}
    </span>
  );
}


/* ===== Badge ===== */
const CSS_Badge = `
.cb-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-body); font-weight: var(--fw-medium);
  font-size: var(--fs-caption); line-height: 1;
  padding: 5px 12px; border-radius: var(--radius-pill);
  background: var(--surface-sunken); color: var(--text-body);
  white-space: nowrap;
}
.cb-badge--solid { background: var(--action-bg); color: var(--action-fg); }
.cb-badge--neutral { background: var(--surface-sunken); color: var(--text-body); }
.cb-badge--red { background: var(--status-danger-bg); color: var(--status-danger-fg); }
.cb-badge--green { background: var(--status-success-bg); color: var(--status-success-fg); }
.cb-badge--blue { background: var(--status-info-bg); color: var(--status-info-fg); }
.cb-badge--warning { background: var(--status-warning-bg); color: var(--status-warning-fg); }
.cb-badge--outline { background: transparent; box-shadow: inset 0 0 0 1px var(--border-default); color: var(--text-body); }
.cb-badge__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
`;

function injectBadge() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-badge-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-badge-css';
  s.textContent = CSS_Badge;
  document.head.appendChild(s);
}

/**
 * Small status / category label. Soft tints by default; use `solid` for the
 * cherry-red emphasis pill and `dot` for a status indicator.
 */
function Badge({ tone = 'neutral', solid = false, outline = false, dot = false, className = '', children, ...rest }) {
  injectBadge();
  const classes = ['cb-badge'];
  if (solid) classes.push('cb-badge--solid');
  else if (outline) classes.push('cb-badge--outline');
  else classes.push('cb-badge--' + tone);
  if (className) classes.push(className);
  return (
    <span className={classes.join(' ')} {...rest}>
      {dot && <span className="cb-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}


/* ===== Breadcrumb ===== */
const CSS_Breadcrumb = `
.cb-bc { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font-family: var(--font-body); font-size: var(--fs-body-sm); }
.cb-bc a, .cb-bc span { color: var(--text-muted); text-decoration: none; }
.cb-bc a { transition: color var(--dur-fast) var(--ease-out); }
.cb-bc a:hover { color: var(--text-brand-hover); }
.cb-bc__btn { background: none; border: 0; padding: 0; font: inherit; color: var(--text-muted); cursor: pointer; transition: color var(--dur-fast) var(--ease-out); }
.cb-bc__btn:hover { color: var(--text-brand-hover); }
.cb-bc__sep { color: var(--border-strong); display: inline-flex; }
.cb-bc__cur { color: var(--text-strong); font-weight: var(--fw-medium); }
`;

function injectBreadcrumb() {
  if (typeof document === 'undefined' || document.getElementById('cb-bc-css')) return;
  const s = document.createElement('style'); s.id = 'cb-bc-css'; s.textContent = CSS_Breadcrumb; document.head.appendChild(s);
}

/**
 * Breadcrumb trail. The last item renders as the current page (non-link).
 */
function Breadcrumb({ items = [], className = '', ...rest }) {
  injectBreadcrumb();
  return (
    <nav className={'cb-bc ' + className} aria-label="Breadcrumb" {...rest}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last
              ? <span className="cb-bc__cur" aria-current="page">{it.label}</span>
              : it.href
                ? <a href={it.href} onClick={it.onClick}>{it.label}</a>
                : it.onClick
                  ? <button type="button" className="cb-bc__btn" onClick={it.onClick}>{it.label}</button>
                  : <span>{it.label}</span>}
            {!last && <span className="cb-bc__sep" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}


/* ===== Button ===== */
const CSS_Button = `
.cb-btn {
  --_bg: var(--action-bg);
  --_fg: var(--action-fg);
  --_bg-hover: var(--action-bg-hover);
  --_bg-press: var(--action-bg-press);
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-body); font-weight: var(--fw-bold);
  font-size: var(--fs-body-sm); line-height: 1.2; min-height: 48px;
  border: none; border-radius: var(--radius-pill); cursor: pointer;
  padding: 0 24px; text-decoration: none; white-space: nowrap;
  max-width: 100%;
  background: var(--_bg); color: var(--_fg);
  transition: background var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.cb-btn:hover { background: var(--_bg-hover); text-decoration: none; color: var(--_fg); }
.cb-btn:active { background: var(--_bg-press); transform: translateY(1px); }
.cb-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.cb-btn[disabled], .cb-btn[aria-disabled="true"] {
  opacity: .45; cursor: not-allowed; pointer-events: none;
}
.cb-btn--sm { font-size: var(--fs-caption); min-height: 38px; padding: 0 16px; gap: 6px; }
.cb-btn--lg { font-size: var(--fs-body); min-height: 56px; padding: 0 32px; }
.cb-btn--green, .cb-btn--confirm { --_bg: var(--action-confirm-bg); --_bg-hover: var(--action-confirm-bg-hover); --_bg-press: var(--action-confirm-bg-press); --_fg: var(--action-confirm-fg); }
.cb-btn--danger { --_bg: var(--action-danger-bg); --_bg-hover: var(--action-danger-bg-hover); --_bg-press: var(--action-danger-bg-press); --_fg: var(--action-danger-fg); }
.cb-btn--blue { --_bg: var(--blue-500); --_bg-hover: var(--blue-600); --_bg-press: var(--blue-700); --_fg: var(--neutral-0); }
.cb-btn--primary { box-shadow: var(--shadow-brand); }
.cb-btn--primary:hover { box-shadow: 0 12px 30px color-mix(in srgb, var(--red-500) 34%, transparent); }
.cb-btn--outline {
  background: transparent; color: var(--text-strong);
  box-shadow: inset 0 0 0 var(--border-2) var(--border-strong);
}
.cb-btn--outline:hover { background: var(--surface-sunken); color: var(--text-strong); box-shadow: inset 0 0 0 var(--border-2) var(--text-strong); }
.cb-btn--outline:active { background: var(--surface-sunken); }
.cb-btn--ghost { background: transparent; color: var(--text-strong); }
.cb-btn--ghost:hover { background: var(--surface-sunken); color: var(--text-strong); }
.cb-btn--ghost:active { background: var(--surface-sunken); }
.cb-btn--link { background: transparent; color: var(--text-link); border-radius: var(--radius-xs); padding: 4px 6px; min-height: 0; }
.cb-btn--link:hover { background: transparent; color: var(--text-link-hover); text-decoration: underline; }
.cb-btn--full { width: 100%; }
/* Loading: keep width, hide label, show ring; block repeat clicks but stay focusable so AT hears aria-busy. */
.cb-btn[aria-busy="true"] { position: relative; cursor: progress; pointer-events: none; }
.cb-btn[aria-busy="true"] > :not(.cb-btn__spin) { visibility: hidden; }
.cb-btn__spin { position: absolute; inset: 0; display: grid; place-items: center; }
.cb-btn__spin::after { content: ''; width: 18px; height: 18px; border-radius: 50%; border: 2.5px solid color-mix(in srgb, currentColor 25%, transparent); border-top-color: currentColor; animation: cb-btn-rot .8s linear infinite; }
.cb-btn--sm .cb-btn__spin::after { width: 14px; height: 14px; border-width: 2px; }
@keyframes cb-btn-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce){ .cb-btn__spin::after { animation-duration: 1.6s; } }
/* Responsive ground rule: on small screens a long label wraps inside the
   pill instead of pushing past the viewport. */
@media (max-width: 480px) {
  .cb-btn { white-space: normal; text-align: center; line-height: 1.25; padding-top: 10px; padding-bottom: 10px; }
}
`;

function injectButton() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-btn-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-btn-css';
  s.textContent = CSS_Button;
  document.head.appendChild(s);
}

/**
 * Colaberry primary button. Cherry-red by default; supports green/blue
 * brand tones, outline/ghost/link variants, three sizes, and icons.
 */
function Button({
  variant = 'primary',
  tone,
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingLabel = 'Loading',
  leadingIcon,
  trailingIcon,
  as,
  className = '',
  children,
  ...rest
}) {
  injectButton();
  const classes = ['cb-btn'];
  if (variant === 'primary') classes.push('cb-btn--primary');
  if (variant === 'outline') classes.push('cb-btn--outline');
  if (variant === 'ghost') classes.push('cb-btn--ghost');
  if (variant === 'link') classes.push('cb-btn--link');
  if (variant === 'confirm') classes.push('cb-btn--confirm');
  if (variant === 'danger') classes.push('cb-btn--danger');
  // tone overrides fill color for solid buttons
  if ((variant === 'primary' || variant === 'solid') && tone === 'green') classes.push('cb-btn--green');
  if ((variant === 'primary' || variant === 'solid') && tone === 'blue') classes.push('cb-btn--blue');
  if (size === 'sm') classes.push('cb-btn--sm');
  if (size === 'lg') classes.push('cb-btn--lg');
  if (fullWidth) classes.push('cb-btn--full');
  if (className) classes.push(className);

  // Only forward real DOM attributes to the host element (never component-only props).
  const dom = {};
  for (const k in rest) {
    if (k.startsWith('aria-') || k.startsWith('data-') || /^on[A-Z]/.test(k) ||
        ['href','target','rel','type','name','value','id','title','role','tabIndex','disabled','form','autoFocus'].includes(k)) {
      dom[k] = rest[k];
    }
  }
  const Tag = (rest.href || as === 'a') ? 'a' : (as || 'button');
  if (Tag === 'button' && dom.type === undefined) dom.type = 'button';
  if (loading) { dom['aria-busy'] = 'true'; dom['aria-disabled'] = 'true'; delete dom.disabled; if (dom.onClick) dom.onClick = (e) => e.preventDefault(); }

  return (
    <Tag className={classes.join(' ')} {...dom}>
      {leadingIcon}
      {children && <span>{children}</span>}
      {trailingIcon}
      {loading && <span className="cb-btn__spin" role="status" aria-label={loadingLabel} />}
    </Tag>
  );
}


/* ===== Card ===== */
const CSS_Card = `
.cb-card {
  display: flex; flex-direction: column; min-width: 0;
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.cb-card--pad { padding: var(--space-6); }
.cb-card--hoverable { cursor: pointer; }
.cb-card--hoverable:focus-visible { outline: none; box-shadow: var(--focus-ring), var(--shadow-md); }
@media (hover: hover) { .cb-card--hoverable:hover { box-shadow: var(--shadow-lg); border-color: var(--border-default); } }
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .cb-card--hoverable:hover { transform: translateY(calc(-1 * var(--motion-lift, 3px))); }
  .cb-card--hoverable:active { transform: scale(var(--motion-press, .985)); }
}
.cb-card--flat { box-shadow: none; }
.cb-card--elevated { box-shadow: var(--shadow-md); border-color: transparent; }
.cb-card--accent { border-top: 4px solid var(--brand-primary); }
.cb-card--accent-green { border-top: 4px solid var(--brand-secondary); }
.cb-card--accent-blue { border-top: 4px solid var(--brand-tertiary); }
.cb-card__media { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; background: var(--surface-sunken); }
.cb-card__media--fallback { display: grid; place-items: center; color: var(--text-subtle); background: repeating-linear-gradient(135deg, var(--surface-sunken) 0 12px, var(--surface-subtle) 12px 24px); }
.cb-card__media--fallback svg { width: 28px; height: 28px; }
.cb-card__body { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); }
`;

function injectCard() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-card-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-card-css';
  s.textContent = CSS_Card;
  document.head.appendChild(s);
}

/**
 * Surface container with rounded corners and a soft shadow. Optional media
 * header, body padding, hover lift, and a colored accent top-border.
 * A string `media` that fails to load falls back to a neutral placeholder
 * (or your `mediaFallback` node) so the card never shows a broken image.
 */
function Card({
  elevation = 'sm',
  accent,
  hoverable = false,
  padded = false,
  media,
  mediaAlt = '',
  mediaFallback,
  className = '',
  children,
  ...rest
}) {
  injectCard();
  const [broken, setBroken] = React.useState(false);
  React.useEffect(() => { setBroken(false); }, [media]);
  const classes = ['cb-card'];
  if (elevation === 'flat') classes.push('cb-card--flat');
  if (elevation === 'md') classes.push('cb-card--elevated');
  if (hoverable) classes.push('cb-card--hoverable');
  if (padded && !media) classes.push('cb-card--pad');
  if (accent === 'red') classes.push('cb-card--accent');
  if (accent === 'green') classes.push('cb-card--accent-green');
  if (accent === 'blue') classes.push('cb-card--accent-blue');
  if (className) classes.push(className);
  // A clickable card is reachable and operable from the keyboard (CLAUDE.md §7.2); consumers' own role/tabIndex/onKeyDown win via ...rest.
  const clickable = hoverable && typeof rest.onClick === 'function';
  const a11y = clickable ? { role: 'button', tabIndex: 0, onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rest.onClick(e); } } } : {};
  return (
    <div className={classes.join(' ')} {...a11y} {...rest}>
      {media && (typeof media === 'string'
        ? (broken
          ? <div className="cb-card__media cb-card__media--fallback" role="img" aria-label={mediaAlt || 'Image unavailable'}>{mediaFallback || <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 16l5-5 4 4 3-3 4 4M15 9h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
          : <img className="cb-card__media" src={media} alt={mediaAlt} loading="lazy" onError={() => setBroken(true)} />)
        : <div className="cb-card__media">{media}</div>)}
      {media ? <div className="cb-card__body">{children}</div> : children}
    </div>
  );
}


/* ===== Carousel ===== */
const CSS_Carousel = `
.cb-carousel { position: relative; border-radius: var(--radius-xl); overflow: hidden; background: var(--surface-sunken); }
.cb-carousel__viewport { overflow: hidden; }
.cb-carousel__track { display: flex; transition: transform var(--dur-slow) var(--ease-out); }
.cb-carousel__slide { flex: 0 0 100%; min-width: 0; }
.cb-carousel__nav { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--surface-card); color: var(--text-strong); box-shadow: var(--shadow-md); cursor: pointer; display: grid; place-items: center; transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.cb-carousel__nav:hover { background: var(--surface-hover); }
.cb-carousel__nav:active { transform: translateY(-50%) scale(.94); }
.cb-carousel__nav--prev { left: 14px; } .cb-carousel__nav--next { right: 14px; }
.cb-carousel__dots { position: absolute; left: 0; right: 0; bottom: 14px; display: flex; justify-content: center; gap: 8px; }
.cb-carousel__dot { position: relative; width: 8px; height: 8px; border-radius: 50%; border: none; background: color-mix(in srgb, var(--neutral-0) 55%, transparent); cursor: pointer; padding: 0; transition: width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out); }
.cb-carousel__dot.is-active { width: 22px; border-radius: var(--radius-pill); background: var(--neutral-0); }
.cb-carousel__dot::before { content: ""; position: absolute; inset: -8px; }
.cb-carousel__dots { gap: 10px; }
@media (prefers-reduced-motion: reduce){ .cb-carousel__track { transition-duration: .001ms; } }
`;

function injectCarousel() {
  if (typeof document === 'undefined' || document.getElementById('cb-carousel-css')) return;
  const s = document.createElement('style'); s.id = 'cb-carousel-css'; s.textContent = CSS_Carousel; document.head.appendChild(s);
}

/**
 * Sliding carousel with prev/next controls and dot indicators. `slides` is an
 * array of nodes. Set `loop` to wrap around at the ends.
 */
function Carousel({ slides = [], loop = true, className = '', ...rest }) {
  injectCarousel();
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = (to) => setI(loop ? (to + n) % n : Math.max(0, Math.min(n - 1, to)));
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
  };
  const Arrow = ({ d }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return (
    <div className={'cb-carousel ' + className} role="group" aria-roledescription="carousel" aria-label="Carousel" onKeyDown={onKey} {...rest}>
      <div className="cb-carousel__viewport">
        <div className="cb-carousel__track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, idx) => <div className="cb-carousel__slide" key={idx} aria-hidden={idx !== i} inert={idx !== i ? '' : undefined} role="group" aria-roledescription="slide" aria-label={(idx + 1) + ' of ' + n}>{s}</div>)}
        </div>
      </div>
      {n > 1 && <React.Fragment>
        <button className="cb-carousel__nav cb-carousel__nav--prev" onClick={() => go(i - 1)} disabled={!loop && i === 0} aria-label="Previous"><Arrow d="M15 6l-6 6 6 6" /></button>
        <button className="cb-carousel__nav cb-carousel__nav--next" onClick={() => go(i + 1)} disabled={!loop && i === n - 1} aria-label="Next"><Arrow d="M9 6l6 6-6 6" /></button>
        <div className="cb-carousel__dots">
          {slides.map((_, idx) => <button key={idx} className={'cb-carousel__dot' + (idx === i ? ' is-active' : '')} onClick={() => setI(idx)} aria-label={'Go to slide ' + (idx + 1)} aria-current={idx === i ? 'true' : undefined} />)}
        </div>
      </React.Fragment>}
    </div>
  );
}


/* ===== Checkbox ===== */
const CSS_Checkbox = `
.cb-check { display: inline-flex; align-items: flex-start; gap: 10px; font-family: var(--font-body); cursor: pointer; color: var(--text-body); font-size: var(--fs-body-sm); }
.cb-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.cb-check__box {
  width: 22px; height: 22px; flex: none; border-radius: var(--radius-sm);
  border: var(--border-2) solid var(--border-control); background: var(--surface-card);
  display: inline-flex; align-items: center; justify-content: center;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  margin-top: 1px;
}
.cb-check__box svg { width: 14px; height: 14px; opacity: 0; transform: scale(.6); transition: opacity var(--dur-fast) var(--ease-spring), transform var(--dur-fast) var(--ease-spring); }
.cb-check input:checked + .cb-check__box { background: var(--action-confirm-bg); border-color: var(--green-700); color: var(--action-confirm-fg); } /* green-700 edge keeps the 3:1 boundary (WCAG 1.4.11) — the leaf fill alone is 2.3:1 on white */
.cb-check input:checked + .cb-check__box svg { opacity: 1; transform: scale(1); }
.cb-check input:focus-visible + .cb-check__box { box-shadow: var(--focus-ring); }
.cb-check:hover .cb-check__box { border-color: var(--green-700); }
.cb-check input:disabled + .cb-check__box { opacity: .45; }
.cb-check--disabled { cursor: not-allowed; color: var(--text-subtle); }
.cb-check input:indeterminate + .cb-check__box { background: var(--action-confirm-bg); border-color: var(--green-700); color: var(--action-confirm-fg); }
.cb-check input:indeterminate + .cb-check__box svg { opacity: 1; transform: scale(1); }
.cb-check input:indeterminate + .cb-check__box .cb-check__tick { display: none; }
.cb-check input:not(:indeterminate) + .cb-check__box .cb-check__dash { display: none; }
.cb-check--error .cb-check__box { border-color: var(--status-danger); }
.cb-check__txt { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cb-check__hint { font-size: var(--fs-caption); color: var(--text-muted); }
.cb-check--error .cb-check__hint { color: var(--status-danger-fg); }
`;

function injectCheckbox() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-check-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-check-css';
  s.textContent = CSS_Checkbox;
  document.head.appendChild(s);
}

/**
 * Checkbox with a leaf-green checked state and a soft spring-in tick.
 * `indeterminate` shows a dash ("some selected" in select-all headers);
 * `error` marks a required consent box that was skipped.
 */
function Checkbox({ label, hint, error, indeterminate = false, disabled = false, className = '', children, ...rest }) {
  injectCheckbox();
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  const classes = ['cb-check'];
  if (disabled) classes.push('cb-check--disabled');
  if (error) classes.push('cb-check--error');
  if (className) classes.push(className);
  const text = label || children;
  const sub = error || hint;
  return (
    <label className={classes.join(' ')}>
      <input type="checkbox" ref={ref} disabled={disabled} aria-invalid={error ? true : undefined} {...rest} />
      <span className="cb-check__box" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><path className="cb-check__tick" d="M3 8.5l3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><path className="cb-check__dash" d="M3.5 8h9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>
      </span>
      {(text || sub) && <span className="cb-check__txt"><span>{text}</span>{sub && <span className="cb-check__hint" role={error ? 'alert' : undefined}>{sub}</span>}</span>}
    </label>
  );
}


/* ===== Dialog ===== */
const CSS_Dialog = `
.cb-dialog__scrim { position: fixed; inset: 0; z-index: var(--z-modal); background: var(--overlay-scrim); display: grid; place-items: center; padding: 24px; opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.cb-dialog__scrim.is-open { opacity: 1; }
.cb-dialog { width: min(520px, 100%); max-height: 90vh; overflow-y: auto; background: var(--surface-card); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); transform: translateY(10px) scale(.97); transition: transform var(--dur-base) var(--ease-spring); }
.cb-dialog__scrim.is-open .cb-dialog { transform: translateY(0) scale(1); }
.cb-dialog__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 22px 24px 0; }
.cb-dialog__title { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--fs-h4); color: var(--text-strong); margin: 0; }
.cb-dialog__close { flex: none; background: none; border: none; cursor: pointer; color: var(--text-subtle); min-width: 36px; min-height: 36px; display: inline-grid; place-items: center; padding: 4px; border-radius: var(--radius-sm); transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.cb-dialog__close:hover { background: var(--surface-sunken); color: var(--text-strong); }
.cb-dialog__body { padding: 12px 24px 8px; font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-body); line-height: 1.6; }
.cb-dialog__foot { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px 24px; flex-wrap: wrap; }
.cb-dialog--destructive .cb-dialog__title { display: flex; align-items: center; gap: 10px; }
.cb-dialog__warn { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--status-danger-bg); color: var(--status-danger-fg); flex: none; }
@media (prefers-reduced-motion: reduce){ .cb-dialog__scrim, .cb-dialog { transition-duration: .001ms; } }
`;


function injectDialog() {
  if (typeof document === 'undefined' || document.getElementById('cb-dialog-css')) return;
  const s = document.createElement('style'); s.id = 'cb-dialog-css'; s.textContent = CSS_Dialog; document.head.appendChild(s);
}

/**
 * Centered modal dialog with scrim. Controlled via `open`; closes on scrim
 * click or Esc. Provide `footer` for action buttons. `destructive` turns it
 * into an alertdialog (confirm-before-delete): warning glyph, body described
 * to AT, and scrim-click no longer closes it — the user must choose.
 */
function Dialog({ open = false, title, onClose, footer, destructive = false, children, className = '', ...rest }) {
  injectDialog();
  const [mounted, setMounted] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  const panelRef = React.useRef(null);
  const lastFocus = React.useRef(null);
  const titleId = React.useMemo(() => 'cb-dlg-' + Math.random().toString(36).slice(2, 8), []);
  React.useEffect(() => {
    let t;
    if (open) { setMounted(true); t = requestAnimationFrame(() => setShown(true)); }
    else { setShown(false); t = setTimeout(() => setMounted(false), 240); }
    return () => { cancelAnimationFrame(t); clearTimeout(t); };
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose && onClose(); return; }
      if (e.key === 'Tab' && panelRef.current) cbTrapTab(e, panelRef.current); // keep focus inside the modal
    };
    document.addEventListener('keydown', onKey);
    // body scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // focus management: remember, move focus in, restore on close
    lastFocus.current = document.activeElement;
    const f = requestAnimationFrame(() => { if (panelRef.current) panelRef.current.focus(); });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(f);
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [open, onClose]);
  if (!mounted) return null;
  return (
    <div className={'cb-dialog__scrim ' + (shown ? 'is-open' : '')} onMouseDown={(e) => { if (e.target === e.currentTarget && onClose && !destructive) onClose(); }}>
      <div className={'cb-dialog ' + (destructive ? 'cb-dialog--destructive ' : '') + className} role={destructive ? 'alertdialog' : 'dialog'} aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={destructive ? titleId + '-body' : undefined} tabIndex={-1} ref={panelRef} {...rest}>
        {(title || onClose) && (
          <div className="cb-dialog__head">
            {title && <h2 className="cb-dialog__title" id={titleId}>{destructive && <span className="cb-dialog__warn" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 8v5M12 16.5v.5M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}{title}</h2>}
            {onClose && <button className="cb-dialog__close" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>}
          </div>
        )}
        <div className="cb-dialog__body" id={destructive ? titleId + '-body' : undefined}>{children}</div>
        {footer && <div className="cb-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}


/* ===== Drawer ===== */
const CSS_Drawer = `
.cb-drawer__scrim { position: fixed; inset: 0; z-index: var(--z-modal); background: var(--overlay-scrim); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.cb-drawer__scrim.is-open { opacity: 1; }
.cb-drawer { position: fixed; z-index: var(--z-modal); top: 0; bottom: 0; width: min(380px, 88vw); background: var(--surface-card); box-shadow: var(--shadow-xl); display: flex; flex-direction: column; transition: transform var(--dur-base) var(--ease-out); }
.cb-drawer--right { right: 0; transform: translateX(100%); }
.cb-drawer--left { left: 0; transform: translateX(-100%); }
.cb-drawer.is-open { transform: translateX(0); }
.cb-drawer__head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 22px; border-bottom: 1px solid var(--border-subtle); }
.cb-drawer__title { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--fs-h4); color: var(--text-strong); margin: 0; }
.cb-drawer__close { background: none; border: none; cursor: pointer; color: var(--text-subtle); min-width: 36px; min-height: 36px; display: inline-grid; place-items: center; padding: 4px; border-radius: var(--radius-sm); transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.cb-drawer__close:hover { background: var(--surface-sunken); color: var(--text-strong); }
.cb-drawer__body { padding: 20px 22px; overflow-y: auto; font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-body); line-height: 1.6; flex: 1; }
@media (prefers-reduced-motion: reduce){ .cb-drawer__scrim, .cb-drawer { transition-duration: .001ms; } }
`;


function injectDrawer() {
  if (typeof document === 'undefined' || document.getElementById('cb-drawer-css')) return;
  const s = document.createElement('style'); s.id = 'cb-drawer-css'; s.textContent = CSS_Drawer; document.head.appendChild(s);
}

/**
 * Slide-in panel anchored to a screen edge. Controlled via `open`; `side` =
 * right|left. Closes on scrim click or Esc.
 */
function Drawer({ open = false, side = 'right', title, onClose, children, className = '', ...rest }) {
  injectDrawer();
  const [mounted, setMounted] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  const panelRef = React.useRef(null);
  const lastFocus = React.useRef(null);
  const titleId = React.useMemo(() => 'cb-drw-' + Math.random().toString(36).slice(2, 8), []);
  React.useEffect(() => {
    let t;
    if (open) { setMounted(true); t = requestAnimationFrame(() => setShown(true)); }
    else { setShown(false); t = setTimeout(() => setMounted(false), 240); }
    return () => { cancelAnimationFrame(t); clearTimeout(t); };
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose && onClose(); return; }
      if (e.key === 'Tab' && panelRef.current) cbTrapTab(e, panelRef.current); // keep focus inside the drawer
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lastFocus.current = document.activeElement;
    const f = requestAnimationFrame(() => { if (panelRef.current) panelRef.current.focus(); });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(f);
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [open, onClose]);
  if (!mounted) return null;
  return (
    <React.Fragment>
      <div className={'cb-drawer__scrim ' + (shown ? 'is-open' : '')} onMouseDown={() => onClose && onClose()} />
      <aside className={'cb-drawer cb-drawer--' + side + ' ' + (shown ? 'is-open ' : '') + className} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} tabIndex={-1} ref={panelRef} {...rest}>
        <div className="cb-drawer__head">
          {title && <h2 className="cb-drawer__title" id={titleId}>{title}</h2>}
          {onClose && <button className="cb-drawer__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>}
        </div>
        <div className="cb-drawer__body">{children}</div>
      </aside>
    </React.Fragment>
  );
}


/* ===== EmptyState ===== */
const CSS_EmptyState = `
.cb-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 6px; padding: 40px 24px; font-family: var(--font-body); color: var(--text-body); border: 1px dashed var(--border-default); border-radius: var(--radius-xl); background: var(--surface-card); }
.cb-empty--plain { border: none; background: transparent; }
.cb-empty--sm { padding: 24px 16px; gap: 4px; }
.cb-empty__ic { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: var(--surface-sunken); color: var(--text-muted); font-size: 26px; margin-bottom: 8px; }
.cb-empty--sm .cb-empty__ic { width: 40px; height: 40px; font-size: 18px; margin-bottom: 4px; }
.cb-empty--error .cb-empty__ic { background: var(--status-danger-bg); color: var(--status-danger-fg); }
.cb-empty--search .cb-empty__ic { background: var(--status-info-bg); color: var(--status-info-fg); }
.cb-empty__title { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--fs-h5); color: var(--text-strong); margin: 0; text-wrap: balance; }
.cb-empty--sm .cb-empty__title { font-size: var(--fs-body); }
.cb-empty__desc { font-size: var(--fs-body-sm); color: var(--text-muted); margin: 0; max-width: 42ch; line-height: 1.55; text-wrap: pretty; }
.cb-empty__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 14px; }
.cb-empty__actions:empty { display: none; }
`;

function injectEmptyState() {
  if (typeof document === 'undefined' || document.getElementById('cb-empty-css')) return;
  const s = document.createElement('style'); s.id = 'cb-empty-css'; s.textContent = CSS_EmptyState; document.head.appendChild(s);
}

const GLYPH_EmptyState = {
  default: 'M4 7a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  error: 'M12 8v5M12 16.5v.5M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  offline: 'M2 8.8A15 15 0 0 1 22 8.8M5 12.5a10 10 0 0 1 14 0M8.5 16.2a5 5 0 0 1 7 0M12 20h.01M3 3l18 18',
};

/**
 * Empty state — what the user sees when there's nothing (yet), nothing matched,
 * or something failed to load. Always pair a plain-language title with ONE clear
 * next step. `kind` sets the icon + tone: default | search | error | offline.
 */
function EmptyState({ kind = 'default', icon, title, description, action, secondaryAction, size = 'md', plain = false, className = '', children, ...rest }) {
  injectEmptyState();
  const cls = ['cb-empty', 'cb-empty--' + kind];
  if (size === 'sm') cls.push('cb-empty--sm');
  if (plain) cls.push('cb-empty--plain');
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')} role={kind === 'error' ? 'alert' : 'status'} {...rest}>
      <div className="cb-empty__ic" aria-hidden="true">
        {icon || <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d={GLYPH_EmptyState[kind] || GLYPH_EmptyState.default} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      {title && <h3 className="cb-empty__title">{title}</h3>}
      {description && <p className="cb-empty__desc">{description}</p>}
      {children}
      {(action || secondaryAction) && <div className="cb-empty__actions">{action}{secondaryAction}</div>}
    </div>
  );
}


/* ===== Input ===== */
const CSS_Input = `
.cb-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.cb-field__label { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
.cb-field__req { color: var(--status-danger); margin-left: 2px; }
.cb-input {
  font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-1) solid var(--border-control);
  border-radius: var(--radius-md);
  padding: 12px 14px; width: 100%;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.cb-input::placeholder { color: var(--text-subtle); }
.cb-input:hover { border-color: var(--text-muted); }
.cb-input:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.cb-input:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.cb-input--sm { padding: 8px 12px; font-size: var(--fs-body-sm); }
.cb-input--lg { padding: 15px 16px; font-size: var(--fs-body-lg); }
.cb-field--error .cb-input { border-color: var(--status-danger); }
.cb-field--error .cb-input:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--status-danger) 35%, transparent); }
.cb-field__msg { font-size: var(--fs-caption); color: var(--text-muted); }
.cb-field--error .cb-field__msg { color: var(--status-danger-fg); }
.cb-field--success .cb-input { border-color: var(--status-success); }
.cb-field--success .cb-input:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--status-success) 30%, transparent); }
.cb-field--success .cb-field__msg { color: var(--status-success-fg); }
.cb-field__msg--icon { display: inline-flex; align-items: center; gap: 5px; }
.cb-field__msg--icon svg { flex: none; }
.cb-field__hint { font-size: var(--fs-caption); color: var(--text-subtle); font-weight: var(--fw-regular); margin-left: 6px; }
`;

function injectInput() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-input-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-input-css';
  s.textContent = CSS_Input;
  document.head.appendChild(s);
}

let _id = 0;

/**
 * Text input with optional label, helper / error / success message, and sizes.
 * Pass `multiline` to render a textarea. `optional` appends "(optional)" to the
 * label — prefer marking the few optional fields over starring every required one.
 */
function Input({
  label,
  required = false,
  optional = false,
  size = 'md',
  error,
  success,
  helperText,
  multiline = false,
  id,
  className = '',
  ...rest
}) {
  injectInput();
  const fieldId = id || ('cb-input-' + (++_id));
  const inputClasses = ['cb-input'];
  if (size === 'sm') inputClasses.push('cb-input--sm');
  if (size === 'lg') inputClasses.push('cb-input--lg');
  if (className) inputClasses.push(className);
  const okMsg = typeof success === 'string' ? success : null;
  const msg = error || okMsg || helperText;
  const Control = multiline ? 'textarea' : 'input';
  const msgId = msg ? fieldId + '-msg' : undefined;
  const state = error ? ' cb-field--error' : (success ? ' cb-field--success' : '');
  const ICON = error
    ? 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v5M12 16.5v.5'
    : (okMsg ? 'M20 6L9 17l-5-5' : null);
  return (
    <div className={'cb-field' + state}>
      {label && (
        <label className="cb-field__label" htmlFor={fieldId}>
          {label}{required && <span className="cb-field__req" aria-hidden="true">*</span>}{optional && !required && <span className="cb-field__hint">(optional)</span>}
        </label>
      )}
      <Control id={fieldId} className={inputClasses.join(' ')} required={required || undefined} aria-invalid={!!error} aria-describedby={msgId} {...rest} />
      {msg && <span className={'cb-field__msg' + (ICON ? ' cb-field__msg--icon' : '')} id={msgId} role={error ? 'alert' : undefined}>
        {ICON && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={ICON} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {msg}
      </span>}
    </div>
  );
}


/* ===== Pagination ===== */
const CSS_Pagination = `
.cb-pag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-body); }
.cb-pag button { min-width: 38px; height: 38px; padding: 0 10px; border: 1px solid var(--border-default); background: var(--surface-card); color: var(--text-body); border-radius: var(--radius-md); cursor: pointer; font-family: var(--font-body); font-size: var(--fs-body-sm); font-weight: var(--fw-medium); display: inline-flex; align-items: center; justify-content: center; transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.cb-pag button:hover:not(:disabled):not(.is-current) { background: var(--surface-sunken); border-color: var(--border-strong); }
.cb-pag button:active:not(:disabled) { transform: translateY(1px); }
.cb-pag button:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.cb-pag button.is-current { background: var(--action-bg); border-color: var(--action-bg); color: var(--action-fg); }
.cb-pag button:disabled { opacity: .4; cursor: not-allowed; }
.cb-pag__ellipsis { min-width: 24px; text-align: center; color: var(--text-subtle); }
`;

function injectPagination() {
  if (typeof document === 'undefined' || document.getElementById('cb-pag-css')) return;
  const s = document.createElement('style'); s.id = 'cb-pag-css'; s.textContent = CSS_Pagination; document.head.appendChild(s);
}

function range(start, end) { const a = []; for (let i = start; i <= end; i++) a.push(i); return a; }

/**
 * Page navigation with prev/next and truncated number pills (current = cherry).
 */
function Pagination({ page = 1, total = 1, siblings = 1, onChange = () => {}, className = '', ...rest }) {
  injectPagination();
  const pages = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  pages.push(1);
  if (left > 2) pages.push('…l');
  pages.push(...range(left, right));
  if (right < total - 1) pages.push('…r');
  if (total > 1) pages.push(total);
  const go = (p) => p >= 1 && p <= total && p !== page && onChange(p);
  const Arrow = ({ d }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return (
    <nav className={'cb-pag ' + className} aria-label="Pagination" {...rest}>
      <button onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous"><Arrow d="M15 6l-6 6 6 6" /></button>
      {pages.map((p, i) => typeof p === 'string'
        ? <span className="cb-pag__ellipsis" key={p + i}>…</span>
        : <button key={p} className={p === page ? 'is-current' : ''} aria-current={p === page ? 'page' : undefined} onClick={() => go(p)}>{p}</button>)}
      <button onClick={() => go(page + 1)} disabled={page >= total} aria-label="Next"><Arrow d="M9 6l6 6-6 6" /></button>
    </nav>
  );
}


/* ===== Popover ===== */
const CSS_Popover = `
.cb-pop { position: relative; display: inline-flex; }
.cb-pop__panel { position: absolute; z-index: var(--z-overlay); min-width: 200px; background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 14px 16px; font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-body); opacity: 0; transform: translateY(6px) scale(.98); transform-origin: top center; transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), visibility 0s linear var(--dur-fast); pointer-events: none; visibility: hidden; }
.cb-pop__panel[data-p="top"] { bottom: calc(100% + 8px); left: 0; transform-origin: bottom center; }
.cb-pop__panel[data-p="bottom"] { top: calc(100% + 8px); left: 0; }
.cb-pop__panel[data-p="right"] { top: 0; left: calc(100% + 8px); }
.cb-pop.is-open .cb-pop__panel { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; visibility: visible; transition-delay: 0s; }
@media (prefers-reduced-motion: reduce){ .cb-pop__panel { transition-duration: .001ms; } }
`;

function injectPopover() {
  if (typeof document === 'undefined' || document.getElementById('cb-pop-css')) return;
  const s = document.createElement('style'); s.id = 'cb-pop-css'; s.textContent = CSS_Popover; document.head.appendChild(s);
}

/**
 * Click-triggered floating panel that closes on outside-click or Esc.
 * `trigger` is the clickable node; children are the panel content.
 */
function Popover({ trigger, placement = 'bottom', children, className = '', ...rest }) {
  injectPopover();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      const t = ref.current && ref.current.querySelector('[aria-haspopup]'); // return focus to the trigger
      if (t) t.focus();
    };
    document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  // Trigger should be a natively focusable element (e.g. Button) so Enter/Space toggle via its click event.
  const trig = React.isValidElement(trigger)
    ? React.cloneElement(trigger, { 'aria-haspopup': 'dialog', 'aria-expanded': open })
    : trigger;
  return (
    <span className={'cb-pop ' + (open ? 'is-open ' : '') + className} ref={ref} {...rest}>
      <span onClick={() => setOpen(o => !o)} style={{ display: 'inline-flex' }}>{trig}</span>
      <span className="cb-pop__panel" data-p={placement} role="dialog">{children}</span>
    </span>
  );
}


/* ===== Progress ===== */
const CSS_Progress = `
.cb-prog { width: 100%; }
.cb-prog__track { height: 10px; background: var(--surface-sunken); border-radius: var(--radius-pill); overflow: hidden; }
.cb-prog__bar { height: 100%; border-radius: var(--radius-pill); background: var(--brand-primary); width: 0; transition: width var(--dur-slow) var(--ease-out); }
.cb-prog__bar.green { background: var(--green-700); } .cb-prog__bar.blue { background: var(--blue-500); }
.cb-prog__bar.indet { width: 40% !important; animation: cb-indet 1.3s var(--ease-in-out) infinite; }
.cb-prog__head { display: flex; justify-content: space-between; margin-bottom: 8px; font-family: var(--font-body); font-size: var(--fs-caption); }
.cb-prog__label { color: var(--text-strong); font-weight: var(--fw-medium); }
.cb-prog__val { color: var(--text-muted); font-family: var(--font-mono); }
@keyframes cb-indet { 0% { margin-left: -40%; } 100% { margin-left: 100%; } }
@media (prefers-reduced-motion: reduce){ .cb-prog__bar { transition-duration: .001ms; } .cb-prog__bar.indet { animation: none; width: 100% !important; } }
`;

function injectProgress() {
  if (typeof document === 'undefined' || document.getElementById('cb-prog-css')) return;
  const s = document.createElement('style'); s.id = 'cb-prog-css'; s.textContent = CSS_Progress; document.head.appendChild(s);
}

/**
 * Progress bar with an animated fill. Pass `value`/`max` for determinate, or
 * `indeterminate` for an in-flight loop. `tone` = red|green|blue.
 */
function Progress({ value = 0, max = 100, tone = 'red', indeterminate = false, label, showValue = false, className = '', ...rest }) {
  injectProgress();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={'cb-prog ' + className} {...rest}>
      {(label || showValue) && (
        <div className="cb-prog__head">
          {label && <span className="cb-prog__label">{label}</span>}
          {showValue && !indeterminate && <span className="cb-prog__val">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="cb-prog__track" role="progressbar" aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className={'cb-prog__bar ' + (tone !== 'red' ? tone : '') + (indeterminate ? ' indet' : '')} style={indeterminate ? undefined : { width: pct + '%' }} />
      </div>
    </div>
  );
}


/* ===== Radio ===== */
const CSS_Radio = `
.cb-radio-group { display: flex; flex-direction: column; gap: 10px; border: none; margin: 0; padding: 0; min-width: 0; font-family: var(--font-body); }
.cb-radio-group--row { flex-direction: row; flex-wrap: wrap; gap: 10px 22px; }
.cb-radio-group__legend { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); padding: 0; margin-bottom: 2px; }
.cb-radio-group__msg { font-size: var(--fs-caption); color: var(--text-muted); }
.cb-radio-group--error .cb-radio-group__msg { color: var(--status-danger-fg); }
.cb-radio-group--error .cb-radio__dot { border-color: var(--status-danger); }
.cb-radio { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; color: var(--text-body); font-size: var(--fs-body-sm); line-height: 1.45; min-width: 0; }
.cb-radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.cb-radio__dot { width: 22px; height: 22px; flex: none; border-radius: 50%; border: var(--border-2) solid var(--border-control); background: var(--surface-card); display: grid; place-items: center; margin-top: 1px; transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out); }
.cb-radio__dot::after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--action-confirm-fg); transform: scale(0); transition: transform var(--dur-fast) var(--ease-spring); }
.cb-radio:hover .cb-radio__dot { border-color: var(--green-700); }
.cb-radio input:checked + .cb-radio__dot { background: var(--action-confirm-bg); border-color: var(--green-700); }
.cb-radio input:checked + .cb-radio__dot::after { transform: scale(1); }
.cb-radio input:focus-visible + .cb-radio__dot { box-shadow: var(--focus-ring); }
.cb-radio input:disabled + .cb-radio__dot { opacity: .45; }
.cb-radio--disabled { cursor: not-allowed; color: var(--text-subtle); }
.cb-radio__txt { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cb-radio__hint { font-size: var(--fs-caption); color: var(--text-muted); }
@media (prefers-reduced-motion: reduce){ .cb-radio__dot, .cb-radio__dot::after { transition-duration: .001ms; } }
`;

function injectRadio() {
  if (typeof document === 'undefined' || document.getElementById('cb-radio-css')) return;
  const s = document.createElement('style'); s.id = 'cb-radio-css'; s.textContent = CSS_Radio; document.head.appendChild(s);
}

let _rid = 0;

/**
 * Single radio button. Usually rendered via <RadioGroup>; use alone only
 * when you manage `name`/`checked` yourself.
 */
function Radio({ label, hint, disabled = false, className = '', children, ...rest }) {
  injectRadio();
  return (
    <label className={'cb-radio ' + (disabled ? 'cb-radio--disabled ' : '') + className}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="cb-radio__dot" aria-hidden="true" />
      {(label || children || hint) && <span className="cb-radio__txt"><span>{label || children}</span>{hint && <span className="cb-radio__hint">{hint}</span>}</span>}
    </label>
  );
}

/**
 * Accessible group of radios (a <fieldset> with legend, helper/error text).
 * `options` = [{ value, label, hint, disabled }]. Controlled via `value`/`onChange`
 * or uncontrolled via `defaultValue`.
 */
function RadioGroup({ label, name, options = [], value, defaultValue, onChange, required = false, error, helperText, direction = 'column', disabled = false, className = '', ...rest }) {
  injectRadio();
  const gname = React.useMemo(() => name || ('cb-radio-' + (++_rid)), [name]);
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== undefined ? value : inner;
  const msg = error || helperText;
  const msgId = msg ? gname + '-msg' : undefined;
  const cls = ['cb-radio-group'];
  if (direction === 'row') cls.push('cb-radio-group--row');
  if (error) cls.push('cb-radio-group--error');
  if (className) cls.push(className);
  return (
    <fieldset className={cls.join(' ')} aria-describedby={msgId} aria-invalid={!!error} aria-required={required || undefined} disabled={disabled} {...rest}>
      {label && <legend className="cb-radio-group__legend">{label}{required && <span className="cb-field__req" aria-hidden="true" style={{ color: 'var(--status-danger)', marginLeft: 2 }}>*</span>}</legend>}
      {options.map((o, i) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return <Radio key={i} name={gname} value={opt.value} label={opt.label} hint={opt.hint} disabled={disabled || opt.disabled}
          checked={cur === opt.value} onChange={(e) => { if (value === undefined) setInner(opt.value); onChange && onChange(opt.value, e); }} />;
      })}
      {msg && <span className="cb-radio-group__msg" id={msgId}>{msg}</span>}
    </fieldset>
  );
}


/* ===== Select ===== */
const CSS_Select = `
.cb-select-wrap { position: relative; display: flex; }
.cb-select { appearance: none; -webkit-appearance: none; font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-strong); background: var(--surface-card); border: var(--border-1) solid var(--border-control); border-radius: var(--radius-md); padding: 12px 42px 12px 14px; width: 100%; min-height: 48px; cursor: pointer; transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.cb-select:hover { border-color: var(--text-muted); }
.cb-select:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.cb-select:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.cb-select--placeholder { color: var(--text-subtle); }
.cb-select--sm { padding: 8px 38px 8px 12px; font-size: var(--fs-body-sm); min-height: 38px; }
.cb-select-wrap__chev { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); display: grid; place-items: center; }
.cb-select:disabled ~ .cb-select-wrap__chev { color: var(--text-subtle); }
.cb-field--error .cb-select { border-color: var(--status-danger); }
.cb-field--error .cb-select:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--status-danger) 35%, transparent); }
.cb-field--success .cb-select { border-color: var(--status-success); }
`;

function injectSelect() {
  if (typeof document === 'undefined' || document.getElementById('cb-select-css')) return;
  const s = document.createElement('style'); s.id = 'cb-select-css'; s.textContent = CSS_Select; document.head.appendChild(s);
}

let _sid = 0;

/**
 * Native <select> styled to match Input — same label / helper / error /
 * success anatomy. `options` = [{ value, label, disabled }] or plain strings.
 * Pass `placeholder` for an unselectable first row.
 */
function Select({ label, required = false, size = 'md', error, success, helperText, placeholder, options = [], id, className = '', value, defaultValue, onChange, ...rest }) {
  injectSelect();
  const fid = id || ('cb-select-' + (++_sid));
  const [inner, setInner] = React.useState(defaultValue ?? '');
  const cur = value !== undefined ? value : inner;
  const msg = error || helperText;
  const msgId = msg ? fid + '-msg' : undefined;
  const cls = ['cb-select'];
  if (size === 'sm') cls.push('cb-select--sm');
  if (placeholder && (cur === '' || cur === undefined)) cls.push('cb-select--placeholder');
  if (className) cls.push(className);
  const field = ['cb-field'];
  if (error) field.push('cb-field--error'); else if (success) field.push('cb-field--success');
  return (
    <div className={field.join(' ')}>
      {label && <label className="cb-field__label" htmlFor={fid}>{label}{required && <span className="cb-field__req" aria-hidden="true">*</span>}</label>}
      <div className="cb-select-wrap">
        <select id={fid} className={cls.join(' ')} required={required} aria-invalid={!!error} aria-describedby={msgId}
          value={cur} onChange={(e) => { if (value === undefined) setInner(e.target.value); onChange && onChange(e); }} {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o, i) => typeof o === 'string'
            ? <option key={i} value={o}>{o}</option>
            : <option key={i} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <span className="cb-select-wrap__chev" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
      </div>
      {msg && <span className="cb-field__msg" id={msgId}>{msg}</span>}
    </div>
  );
}


/* ===== Skeleton ===== */
const CSS_Skeleton = `
.cb-skel { display: block; background: var(--surface-sunken); border-radius: var(--radius-sm); position: relative; overflow: hidden; }
.cb-skel--text { height: 0.85em; border-radius: var(--radius-xs); margin: 0.2em 0; }
.cb-skel--circle { border-radius: 50%; }
.cb-skel::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--neutral-0) 60%, transparent), transparent); animation: cb-shimmer 1.4s var(--ease-in-out) infinite; }
[data-theme="dark"] .cb-skel::after { background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--neutral-0) 6%, transparent), transparent); }
@keyframes cb-shimmer { 100% { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce){ .cb-skel::after { animation: none; } }
`;

function injectSkeleton() {
  if (typeof document === 'undefined' || document.getElementById('cb-skel-css')) return;
  const s = document.createElement('style'); s.id = 'cb-skel-css'; s.textContent = CSS_Skeleton; document.head.appendChild(s);
}

/**
 * Loading placeholder with a soft shimmer. `variant` = rect|text|circle.
 * Size with `width`/`height` (numbers → px) or CSS.
 */
function Skeleton({ variant = 'rect', width, height, radius, className = '', style, ...rest }) {
  injectSkeleton();
  const dim = (v) => typeof v === 'number' ? v + 'px' : v;
  return (
    <span
      className={'cb-skel cb-skel--' + variant + ' ' + className}
      style={{ width: dim(width), height: dim(height), borderRadius: dim(radius), ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
}


/* ===== Spinner ===== */
const CSS_Spinner = `
.cb-spinner { display: inline-block; width: 20px; height: 20px; flex: none; border-radius: 50%; border: 2.5px solid color-mix(in srgb, currentColor 22%, transparent); border-top-color: currentColor; animation: cb-spinner-rot .8s linear infinite; vertical-align: middle; }
.cb-spinner--sm { width: 14px; height: 14px; border-width: 2px; }
.cb-spinner--lg { width: 32px; height: 32px; border-width: 3px; }
.cb-spinner--brand { color: var(--brand-primary); }
.cb-spinner--muted { color: var(--text-muted); }
.cb-spinner-block { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 32px 16px; font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-muted); }
@keyframes cb-spinner-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce){ .cb-spinner { animation-duration: 1.6s; } }
`;

function injectSpinner() {
  if (typeof document === 'undefined' || document.getElementById('cb-spinner-css')) return;
  const s = document.createElement('style'); s.id = 'cb-spinner-css'; s.textContent = CSS_Spinner; document.head.appendChild(s);
}

/**
 * Circular activity indicator for short, indeterminate waits (< ~5 s) —
 * inside buttons, next to a label, or as a centered block with `label`.
 * For content areas prefer Skeleton; for known durations prefer Progress.
 */
function Spinner({ size = 'md', tone = 'inherit', label, className = '', ...rest }) {
  injectSpinner();
  const cls = ['cb-spinner', 'cb-spinner--' + size];
  if (tone === 'brand') cls.push('cb-spinner--brand');
  if (tone === 'muted') cls.push('cb-spinner--muted');
  if (className && !label) cls.push(className);
  const ring = <span className={cls.join(' ')} aria-hidden={label ? 'true' : undefined} role={label ? undefined : 'status'} aria-label={label ? undefined : 'Loading'} {...(label ? {} : rest)} />;
  if (!label) return ring;
  return (
    <div className={'cb-spinner-block ' + className} role="status" aria-live="polite" {...rest}>
      {ring}
      <span>{label}</span>
    </div>
  );
}


/* ===== Switch ===== */
const CSS_Switch = `
.cb-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-body); }
.cb-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.cb-switch__track { width: 44px; height: 26px; border-radius: var(--radius-pill); background: var(--control-track); position: relative; flex: none; transition: background var(--dur-base) var(--ease-out); }
.cb-switch__knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--neutral-0); box-shadow: var(--shadow-sm); transition: transform var(--dur-base) var(--ease-spring); }
.cb-switch input:checked + .cb-switch__track { background: var(--control-checked); }
.cb-switch input:checked + .cb-switch__track .cb-switch__knob { transform: translateX(18px); }
.cb-switch input:focus-visible + .cb-switch__track { box-shadow: var(--focus-ring); }
.cb-switch:hover .cb-switch__track { filter: brightness(0.97); }
.cb-switch--disabled { opacity: .45; cursor: not-allowed; }
@media (prefers-reduced-motion: reduce){ .cb-switch__track, .cb-switch__knob { transition-duration: .001ms; } }
`;

function injectSwitch() {
  if (typeof document === 'undefined' || document.getElementById('cb-switch-css')) return;
  const s = document.createElement('style'); s.id = 'cb-switch-css'; s.textContent = CSS_Switch; document.head.appendChild(s);
}

/**
 * On/off toggle switch with a soft spring knob (leaf-green when on).
 */
function Switch({ label, disabled = false, className = '', children, ...rest }) {
  injectSwitch();
  return (
    <label className={'cb-switch ' + (disabled ? 'cb-switch--disabled ' : '') + className}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="cb-switch__track"><span className="cb-switch__knob" /></span>
      {(label || children) && <span>{label || children}</span>}
    </label>
  );
}


/* ===== Table ===== */
const CSS_Table = `
.cb-table-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--surface-card); }
.cb-table { width: 100%; border-collapse: collapse; font-family: var(--font-body); font-size: var(--fs-body-sm); }
.cb-table caption { text-align: left; padding: 12px 16px 4px; font-weight: var(--fw-bold); color: var(--text-strong); font-size: var(--fs-body); }
.cb-table caption.cb-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; padding: 0; }
.cb-table thead th { text-align: left; padding: 13px 16px; background: var(--surface-subtle); color: var(--text-muted); font-size: var(--fs-caption); font-weight: var(--fw-bold); text-transform: uppercase; letter-spacing: var(--ls-wide); white-space: nowrap; border-bottom: 1px solid var(--border-subtle); }
.cb-table tbody td { padding: 13px 16px; color: var(--text-body); border-bottom: 1px solid var(--border-subtle); }
.cb-table tbody tr:last-child td { border-bottom: none; }
.cb-table tbody tr { transition: background var(--dur-fast) var(--ease-out); }
.cb-table--hover tbody tr:hover { background: var(--surface-sunken); }
.cb-table--striped tbody tr:nth-child(even) { background: color-mix(in srgb, var(--surface-sunken) 55%, transparent); }
.cb-table td.num, .cb-table th.num { text-align: right; font-variant-numeric: tabular-nums; }
.cb-table__state td { padding: 0 !important; }
.cb-table__skel { display: block; height: 14px; border-radius: var(--radius-xs); background: var(--surface-sunken); position: relative; overflow: hidden; }
.cb-table__skel::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--neutral-0) 60%, transparent), transparent); animation: cb-table-shimmer 1.4s var(--ease-in-out) infinite; }
[data-theme="dark"] .cb-table__skel::after { background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--neutral-0) 6%, transparent), transparent); }
.cb-table__empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 36px 20px; color: var(--text-muted); }
.cb-table__empty-title { font-weight: var(--fw-bold); color: var(--text-strong); font-size: var(--fs-body); margin: 0; }
.cb-table__empty-desc { margin: 0; font-size: var(--fs-body-sm); max-width: 40ch; text-wrap: pretty; }
.cb-table__empty-act { margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.cb-table__empty--error .cb-table__empty-title { color: var(--status-danger-fg); }
@keyframes cb-table-shimmer { 100% { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce){ .cb-table__skel::after { animation: none; } }
`;

function injectTable() {
  if (typeof document === 'undefined' || document.getElementById('cb-table-css')) return;
  const s = document.createElement('style'); s.id = 'cb-table-css'; s.textContent = CSS_Table; document.head.appendChild(s);
}

/**
 * Data table. `columns` = [{ key, header, align, render }]; `data` = row objects.
 * `hover` highlights rows; `striped` zebra-stripes them.
 * States: `loading` (skeleton rows), empty `data` (built-in empty message or
 * your `emptyState` node), `error` (message + optional `onRetry`).
 */
function Table({ columns = [], data = [], hover = true, striped = false, caption, loading = false, loadingRows = 4, emptyState, emptyTitle = 'Nothing here yet', emptyDescription, error, onRetry, className = '', ...rest }) {
  injectTable();
  const cls = ['cb-table'];
  if (hover) cls.push('cb-table--hover');
  if (striped) cls.push('cb-table--striped');
  if (className) cls.push(className);
  const span = Math.max(1, columns.length);
  let body;
  if (loading) {
    body = Array.from({ length: loadingRows }).map((_, ri) => (
      <tr key={'s' + ri} aria-hidden="true">
        {columns.map((c, ci) => <td key={ci}><span className="cb-table__skel" style={{ width: (ci === 0 ? 70 : 45 + ((ri * 7 + ci * 13) % 30)) + '%' }} /></td>)}
      </tr>
    ));
  } else if (error) {
    body = (
      <tr className="cb-table__state"><td colSpan={span}>
        <div className="cb-table__empty cb-table__empty--error" role="alert">
          <p className="cb-table__empty-title">{typeof error === 'string' ? error : "Couldn't load this table"}</p>
          <p className="cb-table__empty-desc">Check your connection and try again.</p>
          {onRetry && <div className="cb-table__empty-act"><button type="button" className="cb-btn cb-btn--outline cb-btn--sm" onClick={onRetry}>Try again</button></div>}
        </div>
      </td></tr>
    );
  } else if (!data.length) {
    body = (
      <tr className="cb-table__state"><td colSpan={span}>
        {emptyState || (
          <div className="cb-table__empty" role="status">
            <p className="cb-table__empty-title">{emptyTitle}</p>
            {emptyDescription && <p className="cb-table__empty-desc">{emptyDescription}</p>}
          </div>
        )}
      </td></tr>
    );
  } else {
    body = data.map((row, ri) => (
      <tr key={ri}>
        {columns.map((c, ci) => (
          <td key={ci} className={c.align === 'right' ? 'num' : ''}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
        ))}
      </tr>
    ));
  }
  return (
    <div className="cb-table-wrap" aria-busy={loading || undefined}>
      <table className={cls.join(' ')} {...rest}>
        {caption && <caption className={typeof caption === 'object' && caption.visuallyHidden ? 'cb-sr' : ''}>{typeof caption === 'object' && caption.text ? caption.text : caption}</caption>}
        <thead><tr>{columns.map((c, i) => <th key={i} scope="col" className={c.align === 'right' ? 'num' : ''}>{c.header}</th>)}</tr></thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}


/* ===== Textarea ===== */
const CSS_Textarea = `
.cb-ta-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.cb-ta-field__label { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
.cb-ta-field__req { color: var(--status-danger); margin-left: 2px; }
.cb-ta { font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-strong); background: var(--surface-card); border: 1px solid var(--border-control); border-radius: var(--radius-md); padding: 12px 14px; width: 100%; resize: vertical; min-height: 96px; line-height: 1.5; transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.cb-ta::placeholder { color: var(--text-subtle); }
.cb-ta:hover { border-color: var(--text-muted); }
.cb-ta:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.cb-ta:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.cb-ta-field--error .cb-ta { border-color: var(--status-danger); }
.cb-ta-field__foot { display: flex; justify-content: space-between; font-size: var(--fs-caption); color: var(--text-muted); }
.cb-ta-field--error .cb-ta-field__msg { color: var(--status-danger-fg); }
.cb-ta-field__count { font-family: var(--font-mono); margin-left: auto; }
`;

function injectTextarea() {
  if (typeof document === 'undefined' || document.getElementById('cb-ta-css')) return;
  const s = document.createElement('style'); s.id = 'cb-ta-css'; s.textContent = CSS_Textarea; document.head.appendChild(s);
}

let _taid = 0;

/**
 * Multi-line text field with optional label, error/helper text, and a live
 * character counter when `maxLength` is set.
 */
function Textarea({ label, required = false, error, helperText, maxLength, id, value, defaultValue, onChange, className = '', ...rest }) {
  injectTextarea();
  const fid = id || ('cb-ta-' + (++_taid));
  const [len, setLen] = React.useState((value ?? defaultValue ?? '').length);
  const msg = error || helperText;
  const msgId = msg ? fid + '-msg' : undefined;
  return (
    <div className={'cb-ta-field' + (error ? ' cb-ta-field--error' : '')}>
      {label && <label className="cb-ta-field__label" htmlFor={fid}>{label}{required && <span className="cb-ta-field__req">*</span>}</label>}
      <textarea
        id={fid} className={'cb-ta ' + className} maxLength={maxLength} value={value} defaultValue={defaultValue}
        aria-invalid={!!error} aria-describedby={msgId}
        onChange={(e) => { setLen(e.target.value.length); onChange && onChange(e); }}
        {...rest}
      />
      {(msg || maxLength) && (
        <div className="cb-ta-field__foot">
          {msg && <span className="cb-ta-field__msg" id={msgId}>{msg}</span>}
          {maxLength && <span className="cb-ta-field__count">{len}/{maxLength}</span>}
        </div>
      )}
    </div>
  );
}


/* ===== Toast ===== */
const CSS_Toast = `
.cb-toast { display: flex; align-items: flex-start; gap: 12px; width: min(380px, calc(100vw - 32px)); background: var(--surface-card); border: 1px solid var(--border-subtle); border-left: 4px solid var(--neutral-400); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 14px 16px; font-family: var(--font-body); position: relative; overflow: hidden; }
.cb-toast--fixed { position: fixed; left: 50%; bottom: 24px; z-index: var(--z-toast); transform: translateX(-50%) translateY(16px); opacity: 0; transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring); pointer-events: none; }
.cb-toast--fixed.is-open { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
.cb-toast--success { border-left-color: var(--status-success); } .cb-toast--success .cb-toast__ic { color: var(--status-success); }
.cb-toast--danger { border-left-color: var(--status-danger); } .cb-toast--danger .cb-toast__ic { color: var(--status-danger); }
.cb-toast--warning { border-left-color: var(--status-warning); } .cb-toast--warning .cb-toast__ic { color: var(--status-warning); }
.cb-toast--info { border-left-color: var(--status-info); } .cb-toast--info .cb-toast__ic { color: var(--status-info); }
.cb-toast__ic { flex: none; margin-top: 1px; color: var(--text-muted); }
.cb-toast__body { flex: 1; min-width: 0; }
.cb-toast__title { font-weight: var(--fw-bold); font-size: var(--fs-body-sm); color: var(--text-strong); }
.cb-toast__msg { font-size: var(--fs-caption); color: var(--text-muted); margin-top: 2px; line-height: 1.45; }
.cb-toast__act { margin-top: 8px; }
.cb-toast__close { flex: none; background: none; border: none; cursor: pointer; color: var(--text-subtle); min-width: 32px; min-height: 32px; display: inline-grid; place-items: center; padding: 2px; margin: -6px -8px -6px 0; border-radius: var(--radius-xs); transition: color var(--dur-fast) var(--ease-out); }
.cb-toast__close:hover { color: var(--text-strong); }
.cb-toast__close:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.cb-toast__bar { position: absolute; left: 0; bottom: 0; height: 3px; background: color-mix(in srgb, currentColor 35%, transparent); color: var(--text-subtle); width: 100%; transform-origin: left; animation: cb-toast-drain linear forwards; }
.cb-toast--success .cb-toast__bar { color: var(--status-success); } .cb-toast--danger .cb-toast__bar { color: var(--status-danger); } .cb-toast--warning .cb-toast__bar { color: var(--status-warning); } .cb-toast--info .cb-toast__bar { color: var(--status-info); }
.cb-toast.is-paused .cb-toast__bar { animation-play-state: paused; }
@keyframes cb-toast-drain { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@media (prefers-reduced-motion: reduce){ .cb-toast--fixed { transition-duration: .001ms; } .cb-toast__bar { display: none; } }
`;

function injectToast() {
  if (typeof document === 'undefined' || document.getElementById('cb-toast-css')) return;
  const s = document.createElement('style'); s.id = 'cb-toast-css'; s.textContent = CSS_Toast; document.head.appendChild(s);
}

const ICONS_Toast = {
  success: 'M20 6L9 17l-5-5',
  danger: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v5M12 16.5v.5',
  warning: 'M12 8v5M12 16.5v.5M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 16v-5M12 8v.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  neutral: 'M12 16v-5M12 8v.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
};

/**
 * Transient notification. `variant` = neutral|success|danger|warning|info.
 * Fixed bottom-center by default; `static` places it in normal flow.
 * `duration` (ms) auto-dismisses via `onClose` — the timer pauses while
 * hovered or focused, and errors default to a longer window. Pass
 * `duration={0}` to keep it until dismissed. Danger/warning announce as
 * role=alert; others as role=status.
 */
function Toast({ open = true, variant = 'neutral', title, children, action, onClose, duration, static: inFlow = false, className = '', ...rest }) {
  injectToast();
  const ms = duration === undefined ? (onClose ? (variant === 'danger' ? 7000 : 4500) : 0) : duration;
  const [paused, setPaused] = React.useState(false);
  const remaining = React.useRef(ms);
  const started = React.useRef(0);
  const timer = React.useRef(null);
  React.useEffect(() => {
    if (!open || !ms || !onClose) return;
    remaining.current = ms;
    const run = () => { started.current = Date.now(); timer.current = setTimeout(() => onClose(), remaining.current); };
    if (!paused) run();
    return () => { clearTimeout(timer.current); if (!paused) remaining.current -= Date.now() - started.current; };
  }, [open, ms, onClose, paused]);
  const cls = ['cb-toast', 'cb-toast--' + variant];
  if (!inFlow) { cls.push('cb-toast--fixed'); if (open) cls.push('is-open'); }
  if (paused) cls.push('is-paused');
  if (className) cls.push(className);
  if (inFlow && !open) return null;
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div className={cls.join(' ')} role={role} aria-atomic="true"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }} {...rest}>
      <svg className="cb-toast__ic" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={ICONS_Toast[variant] || ICONS_Toast.neutral} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <div className="cb-toast__body">
        {title && <div className="cb-toast__title">{title}</div>}
        {children && <div className="cb-toast__msg">{children}</div>}
        {action && <div className="cb-toast__act">{action}</div>}
      </div>
      {onClose && <button type="button" className="cb-toast__close" onClick={onClose} aria-label="Dismiss">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>}
      {open && ms > 0 && onClose && <span className="cb-toast__bar" aria-hidden="true" style={{ animationDuration: ms + 'ms' }} />}
    </div>
  );
}


/* ===== Tooltip ===== */
const CSS_Tooltip = `
.cb-tip { position: relative; display: inline-flex; }
.cb-tip__pop { position: absolute; z-index: var(--z-overlay); pointer-events: none; background: var(--surface-inverse); color: var(--text-on-inverse); font-family: var(--font-body); font-size: var(--fs-caption); font-weight: var(--fw-medium); line-height: 1.3; padding: 7px 11px; border-radius: var(--radius-sm); white-space: nowrap; box-shadow: var(--shadow-md); opacity: 0; transform: translateY(4px); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.cb-tip:hover .cb-tip__pop, .cb-tip:focus-within .cb-tip__pop { opacity: 1; transform: translateY(0); }
.cb-tip.is-esc .cb-tip__pop { opacity: 0; }
.cb-tip__pop::after { content: ''; position: absolute; width: 8px; height: 8px; background: var(--surface-inverse); transform: rotate(45deg); }
.cb-tip__pop[data-p="top"] { bottom: calc(100% + 8px); left: 50%; translate: -50% 0; }
.cb-tip__pop[data-p="top"]::after { bottom: -4px; left: 50%; margin-left: -4px; }
.cb-tip__pop[data-p="bottom"] { top: calc(100% + 8px); left: 50%; translate: -50% 0; }
.cb-tip__pop[data-p="bottom"]::after { top: -4px; left: 50%; margin-left: -4px; }
.cb-tip__pop[data-p="left"] { right: calc(100% + 8px); top: 50%; translate: 0 -50%; }
.cb-tip__pop[data-p="left"]::after { right: -4px; top: 50%; margin-top: -4px; }
.cb-tip__pop[data-p="right"] { left: calc(100% + 8px); top: 50%; translate: 0 -50%; }
.cb-tip__pop[data-p="right"]::after { left: -4px; top: 50%; margin-top: -4px; }
@media (prefers-reduced-motion: reduce){ .cb-tip__pop { transition-duration: .001ms; } }
`;

function injectTooltip() {
  if (typeof document === 'undefined' || document.getElementById('cb-tip-css')) return;
  const s = document.createElement('style'); s.id = 'cb-tip-css'; s.textContent = CSS_Tooltip; document.head.appendChild(s);
}

/**
 * Hover/focus tooltip. Wraps a single trigger; `placement` = top|bottom|left|right.
 */
function Tooltip({ label, placement = 'top', children, className = '', ...rest }) {
  injectTooltip();
  const [esc, setEsc] = React.useState(false); // WCAG 1.4.13: Esc dismisses without moving focus
  const tipId = React.useMemo(() => 'cb-tip-' + Math.random().toString(36).slice(2, 8), []);
  return (
    <span className={'cb-tip ' + (esc ? 'is-esc ' : '') + className} tabIndex={0} aria-describedby={tipId}
      onKeyDown={(e) => { if (e.key === 'Escape') setEsc(true); }}
      onBlur={() => setEsc(false)} onMouseLeave={() => setEsc(false)} {...rest}>
      {children}
      <span className="cb-tip__pop" id={tipId} data-p={placement} role="tooltip">{label}</span>
    </span>
  );
}


window.ColaberryDesignSystem_098454 = Object.assign(window.ColaberryDesignSystem_098454 || {}, { Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Carousel, Checkbox, Dialog, Drawer, EmptyState, Input, Pagination, Popover, Progress, Radio, RadioGroup, Select, Skeleton, Spinner, Switch, Table, Textarea, Toast, Tooltip });
