/* @ds-bundle: {"format":3,"namespace":"ColaberryDesignSystem_098454","components":[{"name":"Accordion","sourcePath":"components/core/Accordion.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Breadcrumb","sourcePath":"components/core/Breadcrumb.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Carousel","sourcePath":"components/core/Carousel.jsx"},{"name":"Checkbox","sourcePath":"components/core/Checkbox.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"Drawer","sourcePath":"components/core/Drawer.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Pagination","sourcePath":"components/core/Pagination.jsx"},{"name":"Popover","sourcePath":"components/core/Popover.jsx"},{"name":"Progress","sourcePath":"components/core/Progress.jsx"},{"name":"Skeleton","sourcePath":"components/core/Skeleton.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"Table","sourcePath":"components/core/Table.jsx"},{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"},{"name":"Toast","sourcePath":"components/core/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/core/Tooltip.jsx"}],"sourceHashes":{"components/core/Accordion.jsx":"6b18a0af102c","components/core/Avatar.jsx":"3586b651d930","components/core/Badge.jsx":"ec6b5c6b3886","components/core/Breadcrumb.jsx":"d9c83e69a820","components/core/Button.jsx":"a5df305e19c8","components/core/Card.jsx":"16a29c2f30bd","components/core/Carousel.jsx":"32d39a3c7b97","components/core/Checkbox.jsx":"32ad9f64ef53","components/core/Dialog.jsx":"5546d1732c00","components/core/Drawer.jsx":"002789c5e7f2","components/core/Input.jsx":"b17416006ccf","components/core/Pagination.jsx":"a8adf0d7abf4","components/core/Popover.jsx":"be044b8cad02","components/core/Progress.jsx":"b8f2e45d800b","components/core/Skeleton.jsx":"a00339768789","components/core/Switch.jsx":"5bd304d89705","components/core/Table.jsx":"34bcefbe3e5d","components/core/Textarea.jsx":"53c7e464d1d5","components/core/Toast.jsx":"36e8321d1a9b","components/core/Tooltip.jsx":"98775fb02133","guidelines/showcase.jsx":"59f691ec1eaa","landing.js":"719adf286139","ui_kits/marketing-website/home.jsx":"8214c22e8cdb","ui_kits/marketing-website/parts.jsx":"e22b4336bbe4","ui_kits/marketing-website/program-enroll.jsx":"b5f7abc1308a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ColaberryDesignSystem_098454 = window.ColaberryDesignSystem_098454 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
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
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-acc-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-acc-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Vertically stacked, animated disclosure panels. Single-open by default;
 * pass `allowMultiple` to let several stay open. `defaultOpen` seeds indices.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className = '',
  ...rest
}) {
  inject();
  const [open, setOpen] = React.useState(() => new Set(defaultOpen));
  const toggle = i => setOpen(prev => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i);else next.add(i);
    return next;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'cb-acc ' + className
  }, rest), items.map((it, i) => {
    const isOpen = open.has(i);
    const btnId = 'cb-acc-b' + i,
      panelId = 'cb-acc-p' + i;
    return /*#__PURE__*/React.createElement("div", {
      className: "cb-acc__item",
      "data-open": isOpen,
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      className: "cb-acc__btn",
      id: btnId,
      "aria-expanded": isOpen,
      "aria-controls": panelId,
      onClick: () => toggle(i)
    }, /*#__PURE__*/React.createElement("span", null, it.title), /*#__PURE__*/React.createElement("svg", {
      className: "cb-acc__ic",
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 9l6 6 6-6",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "cb-acc__panel",
      id: panelId,
      role: "region",
      "aria-labelledby": btnId
    }, /*#__PURE__*/React.createElement("div", {
      className: "cb-acc__inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cb-acc__body"
    }, it.content))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; overflow: hidden; flex: none;
  font-family: var(--font-body); font-weight: var(--fw-bold); color: #fff;
  background: var(--blue-500); user-select: none;
}
.cb-avatar { position: relative; }
.cb-avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: inherit; }
.cb-avatar__txt { line-height: 1; white-space: nowrap; }
.cb-avatar--xs { width: 28px; height: 28px; font-size: 11px; }
.cb-avatar--sm { width: 36px; height: 36px; font-size: 13px; }
.cb-avatar--md { width: 48px; height: 48px; font-size: 16px; }
.cb-avatar--lg { width: 64px; height: 64px; font-size: 22px; }
.cb-avatar--xl { width: 88px; height: 88px; font-size: 30px; }
.cb-avatar--ring { box-shadow: 0 0 0 3px var(--surface-card), 0 0 0 5px var(--brand-primary); }
.cb-avatar-group { display: inline-flex; }
.cb-avatar-group > .cb-avatar { box-shadow: 0 0 0 3px var(--surface-card); }
.cb-avatar-group > .cb-avatar + .cb-avatar { margin-left: -12px; }
`;
const TONES = ['var(--blue-500)', 'var(--cyan-600)', 'var(--blue-700)', 'var(--blue-600)', 'var(--cyan-700)'];
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-avatar-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-avatar-css';
  s.textContent = CSS;
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
function Avatar({
  src,
  name = '',
  size = 'md',
  ring = false,
  className = '',
  style,
  ...rest
}) {
  inject();
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    setFailed(false);
  }, [src]);
  const classes = ['cb-avatar', 'cb-avatar--' + size];
  if (ring) classes.push('cb-avatar--ring');
  if (className) classes.push(className);
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = TONES[hash % TONES.length];
  const showImg = src && !failed;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes.join(' '),
    style: {
      background: bg,
      ...style
    },
    role: "img",
    "aria-label": name || undefined
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "cb-avatar__txt",
    "aria-hidden": "true"
  }, initials(name)), showImg && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    onError: () => setFailed(true)
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-body); font-weight: var(--fw-medium);
  font-size: var(--fs-caption); line-height: 1;
  padding: 5px 12px; border-radius: var(--radius-pill);
  background: var(--surface-sunken); color: var(--text-body);
  white-space: nowrap;
}
.cb-badge--solid { background: var(--brand-primary); color: #fff; }
.cb-badge--neutral { background: var(--surface-sunken); color: var(--text-body); }
.cb-badge--red { background: var(--status-danger-bg); color: var(--red-700); }
.cb-badge--green { background: var(--status-success-bg); color: var(--green-700); }
.cb-badge--blue { background: var(--status-info-bg); color: var(--blue-700); }
.cb-badge--cyan { background: var(--surface-accent-subtle); color: var(--cyan-800); }
.cb-badge--warning { background: var(--status-warning-bg); color: var(--amber-500); }
.cb-badge--outline { background: transparent; box-shadow: inset 0 0 0 1px var(--border-default); color: var(--text-body); }
.cb-badge__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-badge-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-badge-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Small status / category label. Soft tints by default; use `solid` for the
 * teal brand emphasis pill and `dot` for a status indicator.
 */
function Badge({
  tone = 'neutral',
  solid = false,
  outline = false,
  dot = false,
  className = '',
  children,
  ...rest
}) {
  inject();
  const classes = ['cb-badge'];
  if (solid) classes.push('cb-badge--solid');else if (outline) classes.push('cb-badge--outline');else classes.push('cb-badge--' + tone);
  if (className) classes.push(className);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes.join(' ')
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "cb-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-bc { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font-family: var(--font-body); font-size: var(--fs-body-sm); }
.cb-bc a, .cb-bc span { color: var(--text-muted); text-decoration: none; }
.cb-bc a { transition: color var(--dur-fast) var(--ease-out); }
.cb-bc a:hover { color: var(--brand-primary); }
.cb-bc__sep { color: var(--border-strong); display: inline-flex; }
.cb-bc__cur { color: var(--text-strong); font-weight: var(--fw-medium); }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-bc-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-bc-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Breadcrumb trail. The last item renders as the current page (non-link).
 */
function Breadcrumb({
  items = [],
  className = '',
  ...rest
}) {
  inject();
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: 'cb-bc ' + className,
    "aria-label": "Breadcrumb"
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      className: "cb-bc__cur",
      "aria-current": "page"
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || '#',
      onClick: it.onClick
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      className: "cb-bc__sep",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
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
.cb-btn--green { --_bg: var(--action-green-bg); --_bg-hover: var(--action-green-bg-hover); --_bg-press: var(--cyan-800); --_fg: #fff; }
.cb-btn--blue { --_bg: var(--blue-500); --_bg-hover: var(--blue-600); --_bg-press: var(--blue-700); --_fg: #fff; }
.cb-btn--primary { box-shadow: var(--shadow-brand); }
.cb-btn--primary:hover { box-shadow: 0 12px 30px color-mix(in srgb, var(--blue-500) 34%, transparent); }
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
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-btn-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-btn-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Colaberry primary button. Teal by default; supports accent (cyan) /
 * blue brand tones, outline/ghost/link variants, three sizes, and icons.
 */
function Button({
  variant = 'primary',
  tone,
  size = 'md',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  as,
  className = '',
  children,
  ...rest
}) {
  inject();
  const classes = ['cb-btn'];
  if (variant === 'primary') classes.push('cb-btn--primary');
  if (variant === 'outline') classes.push('cb-btn--outline');
  if (variant === 'ghost') classes.push('cb-btn--ghost');
  if (variant === 'link') classes.push('cb-btn--link');
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
    if (k.startsWith('aria-') || k.startsWith('data-') || /^on[A-Z]/.test(k) || ['href', 'target', 'rel', 'type', 'name', 'value', 'id', 'title', 'role', 'tabIndex', 'disabled', 'form', 'autoFocus'].includes(k)) {
      dom[k] = rest[k];
    }
  }
  const Tag = rest.href || as === 'a' ? 'a' : as || 'button';
  if (Tag === 'button' && dom.type === undefined) dom.type = 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: classes.join(' ')
  }, dom), leadingIcon, children && /*#__PURE__*/React.createElement("span", null, children), trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-card {
  display: flex; flex-direction: column;
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
}
.cb-card--pad { padding: var(--space-6); }
.cb-card--hoverable { cursor: pointer; }
.cb-card--hoverable:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.cb-card--flat { box-shadow: none; }
.cb-card--elevated { box-shadow: var(--shadow-md); border-color: transparent; }
.cb-card--accent { border-top: 4px solid var(--brand-primary); }
.cb-card--accent-green { border-top: 4px solid var(--cyan-500); }
.cb-card--accent-blue { border-top: 4px solid var(--blue-500); }
.cb-card__media { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; background: var(--surface-sunken); }
.cb-card__body { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-card-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-card-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Surface container with rounded corners and a soft shadow. Optional media
 * header, body padding, hover lift, and a colored accent top-border.
 */
function Card({
  elevation = 'sm',
  accent,
  hoverable = false,
  padded = false,
  media,
  className = '',
  children,
  ...rest
}) {
  inject();
  const classes = ['cb-card'];
  if (elevation === 'flat') classes.push('cb-card--flat');
  if (elevation === 'md') classes.push('cb-card--elevated');
  if (hoverable) classes.push('cb-card--hoverable');
  if (padded && !media) classes.push('cb-card--pad');
  if (accent === 'red') classes.push('cb-card--accent');
  if (accent === 'green') classes.push('cb-card--accent-green');
  if (accent === 'blue') classes.push('cb-card--accent-blue');
  if (className) classes.push(className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes.join(' ')
  }, rest), media && (typeof media === 'string' ? /*#__PURE__*/React.createElement("img", {
    className: "cb-card__media",
    src: media,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "cb-card__media"
  }, media)), media ? /*#__PURE__*/React.createElement("div", {
    className: "cb-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Carousel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-carousel { position: relative; border-radius: var(--radius-xl); overflow: hidden; background: var(--surface-sunken); }
.cb-carousel__viewport { overflow: hidden; }
.cb-carousel__track { display: flex; transition: transform var(--dur-slow) var(--ease-out); }
.cb-carousel__slide { flex: 0 0 100%; min-width: 0; }
.cb-carousel__nav { position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--surface-card); color: var(--text-strong); box-shadow: var(--shadow-md); cursor: pointer; display: grid; place-items: center; transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.cb-carousel__nav:hover { background: var(--surface-page); }
.cb-carousel__nav:active { transform: translateY(-50%) scale(.94); }
.cb-carousel__nav--prev { left: 14px; } .cb-carousel__nav--next { right: 14px; }
.cb-carousel__dots { position: absolute; left: 0; right: 0; bottom: 14px; display: flex; justify-content: center; gap: 8px; }
.cb-carousel__dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,.55); cursor: pointer; padding: 0; transition: width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out); }
.cb-carousel__dot.is-active { width: 22px; border-radius: var(--radius-pill); background: #fff; }
@media (prefers-reduced-motion: reduce){ .cb-carousel__track { transition-duration: .001ms; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-carousel-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-carousel-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Sliding carousel with prev/next controls and dot indicators. `slides` is an
 * array of nodes. Set `loop` to wrap around at the ends.
 */
function Carousel({
  slides = [],
  loop = true,
  className = '',
  ...rest
}) {
  inject();
  const [i, setI] = React.useState(0);
  const n = slides.length;
  const go = to => setI(loop ? (to + n) % n : Math.max(0, Math.min(n - 1, to)));
  const Arrow = ({
    d
  }) => /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'cb-carousel ' + className
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cb-carousel__viewport"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-carousel__track",
    style: {
      transform: `translateX(-${i * 100}%)`
    }
  }, slides.map((s, idx) => /*#__PURE__*/React.createElement("div", {
    className: "cb-carousel__slide",
    key: idx,
    "aria-hidden": idx !== i
  }, s)))), n > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "cb-carousel__nav cb-carousel__nav--prev",
    onClick: () => go(i - 1),
    disabled: !loop && i === 0,
    "aria-label": "Previous"
  }, /*#__PURE__*/React.createElement(Arrow, {
    d: "M15 6l-6 6 6 6"
  })), /*#__PURE__*/React.createElement("button", {
    className: "cb-carousel__nav cb-carousel__nav--next",
    onClick: () => go(i + 1),
    disabled: !loop && i === n - 1,
    "aria-label": "Next"
  }, /*#__PURE__*/React.createElement(Arrow, {
    d: "M9 6l6 6-6 6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cb-carousel__dots"
  }, slides.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    className: 'cb-carousel__dot' + (idx === i ? ' is-active' : ''),
    onClick: () => setI(idx),
    "aria-label": 'Go to slide ' + (idx + 1)
  })))));
}
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-check { display: inline-flex; align-items: flex-start; gap: 10px; font-family: var(--font-body); cursor: pointer; color: var(--text-body); font-size: var(--fs-body-sm); }
.cb-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.cb-check__box {
  width: 22px; height: 22px; flex: none; border-radius: var(--radius-sm);
  border: var(--border-2) solid var(--border-strong); background: var(--surface-card);
  display: inline-flex; align-items: center; justify-content: center;
  transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  margin-top: 1px;
}
.cb-check__box svg { width: 14px; height: 14px; opacity: 0; transform: scale(.6); transition: all var(--dur-fast) var(--ease-spring); }
.cb-check input:checked + .cb-check__box { background: var(--brand-primary); border-color: var(--brand-primary); }
.cb-check input:checked + .cb-check__box svg { opacity: 1; transform: scale(1); }
.cb-check input:focus-visible + .cb-check__box { box-shadow: var(--focus-ring); }
.cb-check:hover .cb-check__box { border-color: var(--brand-primary); }
.cb-check input:disabled + .cb-check__box { opacity: .45; }
.cb-check--disabled { cursor: not-allowed; color: var(--text-subtle); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-check-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-check-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Checkbox with a teal checked state and a soft spring-in tick.
 */
function Checkbox({
  label,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  inject();
  const classes = ['cb-check'];
  if (disabled) classes.push('cb-check--disabled');
  if (className) classes.push(className);
  return /*#__PURE__*/React.createElement("label", {
    className: classes.join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cb-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 8.5l3.2 3.2L13 4.5",
    stroke: "#fff",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), (label || children) && /*#__PURE__*/React.createElement("span", null, label || children));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-dialog__scrim { position: fixed; inset: 0; z-index: var(--z-modal); background: rgba(15,15,15,0.5); display: grid; place-items: center; padding: 24px; opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.cb-dialog__scrim.is-open { opacity: 1; }
.cb-dialog { width: min(520px, 100%); max-height: 90vh; overflow-y: auto; background: var(--surface-card); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); transform: translateY(10px) scale(.97); transition: transform var(--dur-base) var(--ease-spring); }
.cb-dialog__scrim.is-open .cb-dialog { transform: translateY(0) scale(1); }
.cb-dialog__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 22px 24px 0; }
.cb-dialog__title { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--fs-h4); color: var(--text-strong); margin: 0; }
.cb-dialog__close { flex: none; background: none; border: none; cursor: pointer; color: var(--text-subtle); padding: 4px; border-radius: var(--radius-sm); transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.cb-dialog__close:hover { background: var(--surface-sunken); color: var(--text-strong); }
.cb-dialog__body { padding: 12px 24px 8px; font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-body); line-height: 1.6; }
.cb-dialog__foot { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px 24px; }
@media (prefers-reduced-motion: reduce){ .cb-dialog__scrim, .cb-dialog { transition-duration: .001ms; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-dialog-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-dialog-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Centered modal dialog with scrim. Controlled via `open`; closes on scrim
 * click or Esc. Provide `footer` for action buttons.
 */
function Dialog({
  open = false,
  title,
  onClose,
  footer,
  children,
  className = '',
  ...rest
}) {
  inject();
  const [mounted, setMounted] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  const panelRef = React.useRef(null);
  const lastFocus = React.useRef(null);
  const titleId = React.useMemo(() => 'cb-dlg-' + Math.random().toString(36).slice(2, 8), []);
  React.useEffect(() => {
    let t;
    if (open) {
      setMounted(true);
      t = requestAnimationFrame(() => setShown(true));
    } else {
      setShown(false);
      t = setTimeout(() => setMounted(false), 240);
    }
    return () => {
      cancelAnimationFrame(t);
      clearTimeout(t);
    };
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose && onClose();
    document.addEventListener('keydown', onKey);
    // body scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // focus management: remember, move focus in, restore on close
    lastFocus.current = document.activeElement;
    const f = requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.focus();
    });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(f);
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [open, onClose]);
  if (!mounted) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: 'cb-dialog__scrim ' + (shown ? 'is-open' : ''),
    onMouseDown: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: 'cb-dialog ' + className,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": title ? titleId : undefined,
    tabIndex: -1,
    ref: panelRef
  }, rest), (title || onClose) && /*#__PURE__*/React.createElement("div", {
    className: "cb-dialog__head"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "cb-dialog__title",
    id: titleId
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    className: "cb-dialog__close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cb-dialog__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "cb-dialog__foot"
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/Drawer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-drawer__scrim { position: fixed; inset: 0; z-index: var(--z-modal); background: rgba(15,15,15,0.5); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.cb-drawer__scrim.is-open { opacity: 1; }
.cb-drawer { position: fixed; z-index: var(--z-modal); top: 0; bottom: 0; width: min(380px, 88vw); background: var(--surface-card); box-shadow: var(--shadow-xl); display: flex; flex-direction: column; transition: transform var(--dur-base) var(--ease-out); }
.cb-drawer--right { right: 0; transform: translateX(100%); }
.cb-drawer--left { left: 0; transform: translateX(-100%); }
.cb-drawer.is-open { transform: translateX(0); }
.cb-drawer__head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 22px; border-bottom: 1px solid var(--border-subtle); }
.cb-drawer__title { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--fs-h4); color: var(--text-strong); margin: 0; }
.cb-drawer__close { background: none; border: none; cursor: pointer; color: var(--text-subtle); padding: 4px; border-radius: var(--radius-sm); transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.cb-drawer__close:hover { background: var(--surface-sunken); color: var(--text-strong); }
.cb-drawer__body { padding: 20px 22px; overflow-y: auto; font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-body); line-height: 1.6; flex: 1; }
@media (prefers-reduced-motion: reduce){ .cb-drawer__scrim, .cb-drawer { transition-duration: .001ms; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-drawer-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-drawer-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Slide-in panel anchored to a screen edge. Controlled via `open`; `side` =
 * right|left. Closes on scrim click or Esc.
 */
function Drawer({
  open = false,
  side = 'right',
  title,
  onClose,
  children,
  className = '',
  ...rest
}) {
  inject();
  const [mounted, setMounted] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  const panelRef = React.useRef(null);
  const lastFocus = React.useRef(null);
  const titleId = React.useMemo(() => 'cb-drw-' + Math.random().toString(36).slice(2, 8), []);
  React.useEffect(() => {
    let t;
    if (open) {
      setMounted(true);
      t = requestAnimationFrame(() => setShown(true));
    } else {
      setShown(false);
      t = setTimeout(() => setMounted(false), 240);
    }
    return () => {
      cancelAnimationFrame(t);
      clearTimeout(t);
    };
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lastFocus.current = document.activeElement;
    const f = requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.focus();
    });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(f);
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [open, onClose]);
  if (!mounted) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: 'cb-drawer__scrim ' + (shown ? 'is-open' : ''),
    onMouseDown: () => onClose && onClose()
  }), /*#__PURE__*/React.createElement("aside", _extends({
    className: 'cb-drawer cb-drawer--' + side + ' ' + (shown ? 'is-open ' : '') + className,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": title ? titleId : undefined,
    tabIndex: -1,
    ref: panelRef
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cb-drawer__head"
  }, title && /*#__PURE__*/React.createElement("h2", {
    className: "cb-drawer__title",
    id: titleId
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    className: "cb-drawer__close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cb-drawer__body"
  }, children)));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.cb-field__label { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
.cb-field__req { color: var(--red-500); margin-left: 2px; }
.cb-input {
  font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-strong);
  background: var(--surface-card);
  border: var(--border-1) solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 12px 14px; width: 100%;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.cb-input::placeholder { color: var(--text-subtle); }
.cb-input:hover { border-color: var(--border-strong); }
.cb-input:focus { outline: none; border-color: var(--blue-500); box-shadow: var(--focus-ring); }
.cb-input:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.cb-input--sm { padding: 8px 12px; font-size: var(--fs-body-sm); }
.cb-input--lg { padding: 15px 16px; font-size: var(--fs-body-lg); }
.cb-field--error .cb-input { border-color: var(--red-500); }
.cb-field--error .cb-input:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--red-500) 35%, transparent); }
.cb-field__msg { font-size: var(--fs-caption); color: var(--text-muted); }
.cb-field--error .cb-field__msg { color: var(--red-600); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-input-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-input-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
let _id = 0;

/**
 * Text input with optional label, helper / error message, and sizes.
 * Pass `multiline` to render a textarea.
 */
function Input({
  label,
  required = false,
  size = 'md',
  error,
  helperText,
  multiline = false,
  id,
  className = '',
  ...rest
}) {
  inject();
  const fieldId = id || 'cb-input-' + ++_id;
  const inputClasses = ['cb-input'];
  if (size === 'sm') inputClasses.push('cb-input--sm');
  if (size === 'lg') inputClasses.push('cb-input--lg');
  if (className) inputClasses.push(className);
  const msg = error || helperText;
  const Control = multiline ? 'textarea' : 'input';
  const msgId = msg ? fieldId + '-msg' : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: 'cb-field' + (error ? ' cb-field--error' : '')
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cb-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "cb-field__req",
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement(Control, _extends({
    id: fieldId,
    className: inputClasses.join(' '),
    "aria-invalid": !!error,
    "aria-describedby": msgId
  }, rest)), msg && /*#__PURE__*/React.createElement("span", {
    className: "cb-field__msg",
    id: msgId
  }, msg));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-pag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-body); }
.cb-pag button { min-width: 38px; height: 38px; padding: 0 10px; border: 1px solid var(--border-default); background: var(--surface-card); color: var(--text-body); border-radius: var(--radius-md); cursor: pointer; font-family: var(--font-body); font-size: var(--fs-body-sm); font-weight: var(--fw-medium); display: inline-flex; align-items: center; justify-content: center; transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.cb-pag button:hover:not(:disabled):not(.is-current) { background: var(--surface-sunken); border-color: var(--border-strong); }
.cb-pag button:active:not(:disabled) { transform: translateY(1px); }
.cb-pag button:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.cb-pag button.is-current { background: var(--brand-primary); border-color: var(--brand-primary); color: #fff; }
.cb-pag button:disabled { opacity: .4; cursor: not-allowed; }
.cb-pag__ellipsis { min-width: 24px; text-align: center; color: var(--text-subtle); }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-pag-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-pag-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function range(start, end) {
  const a = [];
  for (let i = start; i <= end; i++) a.push(i);
  return a;
}

/**
 * Page navigation with prev/next and truncated number pills (current = teal).
 */
function Pagination({
  page = 1,
  total = 1,
  siblings = 1,
  onChange = () => {},
  className = '',
  ...rest
}) {
  inject();
  const pages = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  pages.push(1);
  if (left > 2) pages.push('…l');
  pages.push(...range(left, right));
  if (right < total - 1) pages.push('…r');
  if (total > 1) pages.push(total);
  const go = p => p >= 1 && p <= total && p !== page && onChange(p);
  const Arrow = ({
    d
  }) => /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: 'cb-pag ' + className,
    "aria-label": "Pagination"
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => go(page - 1),
    disabled: page <= 1,
    "aria-label": "Previous"
  }, /*#__PURE__*/React.createElement(Arrow, {
    d: "M15 6l-6 6 6 6"
  })), pages.map((p, i) => typeof p === 'string' ? /*#__PURE__*/React.createElement("span", {
    className: "cb-pag__ellipsis",
    key: p + i
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    className: p === page ? 'is-current' : '',
    "aria-current": p === page ? 'page' : undefined,
    onClick: () => go(p)
  }, p)), /*#__PURE__*/React.createElement("button", {
    onClick: () => go(page + 1),
    disabled: page >= total,
    "aria-label": "Next"
  }, /*#__PURE__*/React.createElement(Arrow, {
    d: "M9 6l6 6-6 6"
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/core/Popover.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-pop { position: relative; display: inline-flex; }
.cb-pop__panel { position: absolute; z-index: var(--z-overlay); min-width: 200px; background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 14px 16px; font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-body); opacity: 0; transform: translateY(6px) scale(.98); transform-origin: top center; transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); pointer-events: none; }
.cb-pop__panel[data-p="top"] { bottom: calc(100% + 8px); left: 0; transform-origin: bottom center; }
.cb-pop__panel[data-p="bottom"] { top: calc(100% + 8px); left: 0; }
.cb-pop__panel[data-p="right"] { top: 0; left: calc(100% + 8px); }
.cb-pop.is-open .cb-pop__panel { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
@media (prefers-reduced-motion: reduce){ .cb-pop__panel { transition-duration: .001ms; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-pop-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-pop-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Click-triggered floating panel that closes on outside-click or Esc.
 * `trigger` is the clickable node; children are the panel content.
 */
function Popover({
  trigger,
  placement = 'bottom',
  children,
  className = '',
  ...rest
}) {
  inject();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'cb-pop ' + (open ? 'is-open ' : '') + className,
    ref: ref
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex'
    }
  }, trigger), /*#__PURE__*/React.createElement("span", {
    className: "cb-pop__panel",
    "data-p": placement,
    role: "dialog"
  }, children));
}
Object.assign(__ds_scope, { Popover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Popover.jsx", error: String((e && e.message) || e) }); }

// components/core/Progress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-prog { width: 100%; }
.cb-prog__track { height: 10px; background: var(--surface-sunken); border-radius: var(--radius-pill); overflow: hidden; }
.cb-prog__bar { height: 100%; border-radius: var(--radius-pill); background: var(--brand-primary); width: 0; transition: width var(--dur-slow) var(--ease-out); }
.cb-prog__bar.green { background: var(--cyan-600); } .cb-prog__bar.blue { background: var(--blue-500); }
.cb-prog__bar.indet { width: 40% !important; animation: cb-indet 1.3s var(--ease-in-out) infinite; }
.cb-prog__head { display: flex; justify-content: space-between; margin-bottom: 8px; font-family: var(--font-body); font-size: var(--fs-caption); }
.cb-prog__label { color: var(--text-strong); font-weight: var(--fw-medium); }
.cb-prog__val { color: var(--text-muted); font-family: var(--font-mono); }
@keyframes cb-indet { 0% { margin-left: -40%; } 100% { margin-left: 100%; } }
@media (prefers-reduced-motion: reduce){ .cb-prog__bar { transition-duration: .001ms; } .cb-prog__bar.indet { animation: none; width: 100% !important; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-prog-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-prog-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Progress bar with an animated fill. Pass `value`/`max` for determinate, or
 * `indeterminate` for an in-flight loop. `tone` = red|green|blue.
 */
function Progress({
  value = 0,
  max = 100,
  tone = 'red',
  indeterminate = false,
  label,
  showValue = false,
  className = '',
  ...rest
}) {
  inject();
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'cb-prog ' + className
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "cb-prog__head"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "cb-prog__label"
  }, label), showValue && !indeterminate && /*#__PURE__*/React.createElement("span", {
    className: "cb-prog__val"
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    className: "cb-prog__track",
    role: "progressbar",
    "aria-valuenow": indeterminate ? undefined : Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("div", {
    className: 'cb-prog__bar ' + (tone !== 'red' ? tone : '') + (indeterminate ? ' indet' : ''),
    style: indeterminate ? undefined : {
      width: pct + '%'
    }
  })));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Progress.jsx", error: String((e && e.message) || e) }); }

// components/core/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-skel { display: block; background: var(--surface-sunken); border-radius: var(--radius-sm); position: relative; overflow: hidden; }
.cb-skel--text { height: 0.85em; border-radius: var(--radius-xs); margin: 0.2em 0; }
.cb-skel--circle { border-radius: 50%; }
.cb-skel::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--neutral-0) 60%, transparent), transparent); animation: cb-shimmer 1.4s var(--ease-in-out) infinite; }
[data-theme="dark"] .cb-skel::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); }
@keyframes cb-shimmer { 100% { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce){ .cb-skel::after { animation: none; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-skel-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-skel-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Loading placeholder with a soft shimmer. `variant` = rect|text|circle.
 * Size with `width`/`height` (numbers → px) or CSS.
 */
function Skeleton({
  variant = 'rect',
  width,
  height,
  radius,
  className = '',
  style,
  ...rest
}) {
  inject();
  const dim = v => typeof v === 'number' ? v + 'px' : v;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'cb-skel cb-skel--' + variant + ' ' + className,
    style: {
      width: dim(width),
      height: dim(height),
      borderRadius: dim(radius),
      ...style
    },
    "aria-hidden": "true"
  }, rest));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-body); }
.cb-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.cb-switch__track { width: 44px; height: 26px; border-radius: var(--radius-pill); background: var(--neutral-300); position: relative; flex: none; transition: background var(--dur-base) var(--ease-out); }
.cb-switch__knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: var(--shadow-sm); transition: transform var(--dur-base) var(--ease-spring); }
.cb-switch input:checked + .cb-switch__track { background: var(--brand-primary); }
.cb-switch input:checked + .cb-switch__track .cb-switch__knob { transform: translateX(18px); }
.cb-switch input:focus-visible + .cb-switch__track { box-shadow: var(--focus-ring); }
.cb-switch:hover .cb-switch__track { filter: brightness(0.97); }
.cb-switch--disabled { opacity: .45; cursor: not-allowed; }
@media (prefers-reduced-motion: reduce){ .cb-switch__track, .cb-switch__knob { transition-duration: .001ms; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-switch-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-switch-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * On/off toggle switch with a soft spring knob (teal when on).
 */
function Switch({
  label,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  inject();
  return /*#__PURE__*/React.createElement("label", {
    className: 'cb-switch ' + (disabled ? 'cb-switch--disabled ' : '') + className
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cb-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cb-switch__knob"
  })), (label || children) && /*#__PURE__*/React.createElement("span", null, label || children));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-table-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); }
.cb-table { width: 100%; border-collapse: collapse; font-family: var(--font-body); font-size: var(--fs-body-sm); }
.cb-table thead th { text-align: left; padding: 13px 16px; background: var(--surface-subtle); color: var(--text-muted); font-size: var(--fs-caption); font-weight: var(--fw-bold); text-transform: uppercase; letter-spacing: var(--ls-wide); white-space: nowrap; border-bottom: 1px solid var(--border-subtle); }
.cb-table tbody td { padding: 13px 16px; color: var(--text-body); border-bottom: 1px solid var(--border-subtle); }
.cb-table tbody tr:last-child td { border-bottom: none; }
.cb-table tbody tr { transition: background var(--dur-fast) var(--ease-out); }
.cb-table--hover tbody tr:hover { background: var(--surface-sunken); }
.cb-table--striped tbody tr:nth-child(even) { background: color-mix(in srgb, var(--surface-sunken) 55%, transparent); }
.cb-table td.num, .cb-table th.num { text-align: right; font-variant-numeric: tabular-nums; }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-table-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-table-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Data table. `columns` = [{ key, header, align, render }]; `data` = row objects.
 * `hover` highlights rows; `striped` zebra-stripes them.
 */
function Table({
  columns = [],
  data = [],
  hover = true,
  striped = false,
  className = '',
  ...rest
}) {
  inject();
  const cls = ['cb-table'];
  if (hover) cls.push('cb-table--hover');
  if (striped) cls.push('cb-table--striped');
  if (className) cls.push(className);
  return /*#__PURE__*/React.createElement("div", {
    className: "cb-table-wrap"
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: cls.join(' ')
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    className: c.align === 'right' ? 'num' : ''
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, data.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    className: c.align === 'right' ? 'num' : ''
  }, c.render ? c.render(row[c.key], row) : row[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Table.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-ta-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.cb-ta-field__label { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
.cb-ta-field__req { color: var(--red-500); margin-left: 2px; }
.cb-ta { font-family: var(--font-body); font-size: var(--fs-body); color: var(--text-strong); background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 12px 14px; width: 100%; resize: vertical; min-height: 96px; line-height: 1.5; transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.cb-ta::placeholder { color: var(--text-subtle); }
.cb-ta:hover { border-color: var(--border-strong); }
.cb-ta:focus { outline: none; border-color: var(--blue-500); box-shadow: var(--focus-ring); }
.cb-ta:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.cb-ta-field--error .cb-ta { border-color: var(--red-500); }
.cb-ta-field__foot { display: flex; justify-content: space-between; font-size: var(--fs-caption); color: var(--text-muted); }
.cb-ta-field--error .cb-ta-field__msg { color: var(--red-600); }
.cb-ta-field__count { font-family: var(--font-mono); margin-left: auto; }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-ta-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-ta-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
let _taid = 0;

/**
 * Multi-line text field with optional label, error/helper text, and a live
 * character counter when `maxLength` is set.
 */
function Textarea({
  label,
  required = false,
  error,
  helperText,
  maxLength,
  id,
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}) {
  inject();
  const fid = id || 'cb-ta-' + ++_taid;
  const [len, setLen] = React.useState((value ?? defaultValue ?? '').length);
  const msg = error || helperText;
  const msgId = msg ? fid + '-msg' : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: 'cb-ta-field' + (error ? ' cb-ta-field--error' : '')
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cb-ta-field__label",
    htmlFor: fid
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "cb-ta-field__req"
  }, "*")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    className: 'cb-ta ' + className,
    maxLength: maxLength,
    value: value,
    defaultValue: defaultValue,
    "aria-invalid": !!error,
    "aria-describedby": msgId,
    onChange: e => {
      setLen(e.target.value.length);
      onChange && onChange(e);
    }
  }, rest)), (msg || maxLength) && /*#__PURE__*/React.createElement("div", {
    className: "cb-ta-field__foot"
  }, msg && /*#__PURE__*/React.createElement("span", {
    className: "cb-ta-field__msg",
    id: msgId
  }, msg), maxLength && /*#__PURE__*/React.createElement("span", {
    className: "cb-ta-field__count"
  }, len, "/", maxLength)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-toast { display: flex; align-items: flex-start; gap: 12px; width: min(380px, calc(100vw - 32px)); background: var(--surface-card); border: 1px solid var(--border-subtle); border-left: 4px solid var(--neutral-400); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); padding: 14px 16px; font-family: var(--font-body); }
.cb-toast--fixed { position: fixed; left: 50%; bottom: 24px; z-index: var(--z-toast); transform: translateX(-50%) translateY(16px); opacity: 0; transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring); pointer-events: none; }
.cb-toast--fixed.is-open { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
.cb-toast--success { border-left-color: var(--green-600); } .cb-toast--success .cb-toast__ic { color: var(--green-600); }
.cb-toast--danger { border-left-color: var(--red-500); } .cb-toast--danger .cb-toast__ic { color: var(--red-500); }
.cb-toast--info { border-left-color: var(--blue-500); } .cb-toast--info .cb-toast__ic { color: var(--blue-500); }
.cb-toast__ic { flex: none; margin-top: 1px; color: var(--text-muted); }
.cb-toast__body { flex: 1; min-width: 0; }
.cb-toast__title { font-weight: var(--fw-bold); font-size: var(--fs-body-sm); color: var(--text-strong); }
.cb-toast__msg { font-size: var(--fs-caption); color: var(--text-muted); margin-top: 2px; line-height: 1.45; }
.cb-toast__close { flex: none; background: none; border: none; cursor: pointer; color: var(--text-subtle); padding: 2px; border-radius: var(--radius-xs); transition: color var(--dur-fast) var(--ease-out); }
.cb-toast__close:hover { color: var(--text-strong); }
@media (prefers-reduced-motion: reduce){ .cb-toast--fixed { transition-duration: .001ms; } }
`;
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-toast-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-toast-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const ICONS = {
  success: 'M20 6L9 17l-5-5',
  danger: 'M12 8v5M12 16.5v.5M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 16v-5M12 8v.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  neutral: 'M12 16v-5M12 8v.5M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'
};

/**
 * Notification toast. `variant` = neutral|success|danger|info. Renders
 * fixed-bottom-center by default; pass `static` to place it in normal flow.
 */
function Toast({
  open = true,
  variant = 'neutral',
  title,
  children,
  onClose,
  static: inFlow = false,
  className = '',
  ...rest
}) {
  inject();
  const cls = ['cb-toast', 'cb-toast--' + variant];
  if (!inFlow) {
    cls.push('cb-toast--fixed');
    if (open) cls.push('is-open');
  }
  if (className) cls.push(className);
  if (inFlow && !open) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls.join(' '),
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("svg", {
    className: "cb-toast__ic",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: ICONS[variant],
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cb-toast__body"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "cb-toast__title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "cb-toast__msg"
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    className: "cb-toast__close",
    onClick: onClose,
    "aria-label": "Dismiss"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

// components/core/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cb-tip { position: relative; display: inline-flex; }
.cb-tip__pop { position: absolute; z-index: var(--z-overlay); pointer-events: none; background: var(--neutral-900); color: #fff; font-family: var(--font-body); font-size: var(--fs-caption); font-weight: var(--fw-medium); line-height: 1.3; padding: 7px 11px; border-radius: var(--radius-sm); white-space: nowrap; box-shadow: var(--shadow-md); opacity: 0; transform: translateY(4px); transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out); }
.cb-tip:hover .cb-tip__pop, .cb-tip:focus-within .cb-tip__pop { opacity: 1; transform: translateY(0); }
.cb-tip__pop::after { content: ''; position: absolute; width: 8px; height: 8px; background: var(--neutral-900); transform: rotate(45deg); }
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
function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-tip-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-tip-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Hover/focus tooltip. Wraps a single trigger; `placement` = top|bottom|left|right.
 */
function Tooltip({
  label,
  placement = 'top',
  children,
  className = '',
  ...rest
}) {
  inject();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'cb-tip ' + className,
    tabIndex: 0
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "cb-tip__pop",
    "data-p": placement,
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tooltip.jsx", error: String((e && e.message) || e) }); }

// guidelines/showcase.jsx
try { (() => {
/* Live component gallery + example layouts for design-system.html.
   Reads the components off the standalone build's window namespace. */
const C = window.ColaberryDesignSystem_098454 || {};
const {
  Button,
  Badge,
  Card,
  Avatar,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Accordion,
  Breadcrumb,
  Pagination,
  Tooltip,
  Popover,
  Progress,
  Skeleton,
  Toast,
  Table,
  Dialog,
  Drawer,
  Carousel
} = C;
function Tile({
  name,
  wide,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'ds-tile' + (wide ? ' ds-tile--wide' : '')
  }, /*#__PURE__*/React.createElement("p", {
    className: "ds-tile__name"
  }, name), children);
}
function OverlayDemo() {
  const [dlg, setDlg] = React.useState(false);
  const [drw, setDrw] = React.useState(false);
  const [tst, setTst] = React.useState(false);
  React.useEffect(() => {
    if (!tst) return;
    const t = setTimeout(() => setTst(false), 3200);
    return () => clearTimeout(t);
  }, [tst]);
  return /*#__PURE__*/React.createElement(Tile, {
    name: "Dialog \xB7 Drawer \xB7 Toast",
    wide: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setDlg(true)
  }, "Open dialog"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => setDrw(true)
  }, "Open drawer"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    onClick: () => setTst(true)
  }, "Show toast")), /*#__PURE__*/React.createElement(Dialog, {
    open: dlg,
    title: "Confirm request",
    onClose: () => setDlg(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setDlg(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setDlg(false)
    }, "Confirm"))
  }, "Ready to start your data engagement? Our team will reach out to scope the work."), /*#__PURE__*/React.createElement(Drawer, {
    open: drw,
    title: "Filters",
    onClose: () => setDrw(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Remote",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Onsite"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Open roles only"
  }))), /*#__PURE__*/React.createElement(Toast, {
    open: tst,
    variant: "success",
    title: "Message sent",
    onClose: () => setTst(false)
  }, "We'll be in touch within a day."));
}
function Gallery() {
  const [page, setPage] = React.useState(3);
  const slide = (label, a, b) => /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 24,
      background: `linear-gradient(135deg, var(--${a}), var(--${b}))`
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-gal"
  }, /*#__PURE__*/React.createElement(Tile, {
    name: "Button"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Button, null, "Contact us"), /*#__PURE__*/React.createElement(Button, {
    tone: "green"
  }, "Get started"), /*#__PURE__*/React.createElement(Button, {
    tone: "blue"
  }, "Book a call")), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Outline"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Ghost"), /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "Link")), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "Large"), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "Small"), /*#__PURE__*/React.createElement(Button, {
    disabled: true
  }, "Disabled"))), /*#__PURE__*/React.createElement(Tile, {
    name: "Badge \xB7 Avatar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    dot: true
  }, "Hiring"), /*#__PURE__*/React.createElement(Badge, {
    tone: "blue"
  }, "Consulting"), /*#__PURE__*/React.createElement(Badge, {
    tone: "red",
    dot: true
  }, "Urgent"), /*#__PURE__*/React.createElement(Badge, {
    solid: true
  }, "New"), /*#__PURE__*/React.createElement(Badge, {
    outline: true
  }, "Remote")), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: "assets/avatars/person-1.png",
    name: "Mika Rivera",
    size: "lg",
    ring: true
  }), /*#__PURE__*/React.createElement(Avatar, {
    src: "assets/avatars/person-2.png",
    name: "Owen Brooks",
    size: "lg"
  }), /*#__PURE__*/React.createElement(Avatar, {
    src: "assets/avatars/person-3.png",
    name: "Sam Okafor",
    size: "lg"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Ada Lovelace",
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cb-avatar-group"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: "assets/avatars/person-2.png",
    name: "Owen Brooks"
  }), /*#__PURE__*/React.createElement(Avatar, {
    src: "assets/avatars/person-1.png",
    name: "Mika Rivera"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Ada Lovelace"
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Lee Park"
  })))), /*#__PURE__*/React.createElement(Tile, {
    name: "Input \xB7 Textarea"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "ada@email.com"
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "How can we help?",
    placeholder: "A sentence or two\u2026",
    maxLength: 120
  }))), /*#__PURE__*/React.createElement(Tile, {
    name: "Checkbox \xB7 Switch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Email me Colaberry insights",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I agree to the terms"
  }), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Notifications",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "SMS"
  })))), /*#__PURE__*/React.createElement(Tile, {
    name: "Accordion"
  }, /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: [0],
    items: [{
      title: 'What does an engagement include?',
      content: 'Discovery, a data roadmap, specialized talent, and managed delivery — scoped to your goals.'
    }, {
      title: 'How do you staff teams?',
      content: 'We match vetted data specialists to your roles — contingent or contract-to-hire — with expert recruitment.'
    }]
  })), /*#__PURE__*/React.createElement(Tile, {
    name: "Breadcrumb \xB7 Pagination"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'Home'
    }, {
      label: 'What We Do'
    }, {
      label: 'Consulting & Staffing'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    total: 9,
    onChange: setPage
  }))), /*#__PURE__*/React.createElement(Tile, {
    name: "Tooltip \xB7 Popover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "Closes the menu"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "Hover me")), /*#__PURE__*/React.createElement(Popover, {
    placement: "bottom",
    trigger: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Open popover")
  }, /*#__PURE__*/React.createElement("strong", null, "Need help?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      color: 'var(--text-muted)',
      fontSize: 13
    }
  }, "Talk to our team \u2014 no pressure.")))), /*#__PURE__*/React.createElement(Tile, {
    name: "Progress \xB7 Skeleton"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement(Progress, {
    label: "Delivery progress",
    value: 68,
    showValue: true
  }), /*#__PURE__*/React.createElement(Progress, {
    tone: "blue",
    indeterminate: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "circle",
    width: 42,
    height: 42
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "text",
    width: "80%"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    variant: "text",
    width: "55%"
  }))))), /*#__PURE__*/React.createElement(Tile, {
    name: "Table",
    wide: true
  }, /*#__PURE__*/React.createElement(Table, {
    columns: [{
      key: 'name',
      header: 'Engagement'
    }, {
      key: 'start',
      header: 'Starts'
    }, {
      key: 'wk',
      header: 'Weeks',
      align: 'right'
    }, {
      key: 'st',
      header: 'Status',
      render: v => /*#__PURE__*/React.createElement(Badge, {
        tone: v === 'Open' ? 'green' : 'neutral',
        dot: v === 'Open'
      }, v)
    }],
    data: [{
      name: 'Analytics consulting',
      start: 'Apr 8',
      wk: 12,
      st: 'Open'
    }, {
      name: 'Data engineering',
      start: 'May 6',
      wk: 24,
      st: 'Open'
    }, {
      name: 'Discovery sprint',
      start: 'Mar 18',
      wk: 2,
      st: 'Closed'
    }]
  })), /*#__PURE__*/React.createElement(OverlayDemo, null), /*#__PURE__*/React.createElement(Tile, {
    name: "Carousel",
    wide: true
  }, /*#__PURE__*/React.createElement(Carousel, {
    slides: [slide('Consulting', 'blue-500', 'blue-700'), slide('Staffing', 'cyan-500', 'cyan-700'), slide('Training', 'blue-400', 'blue-600')]
  })));
}

/* ---------------- Example layouts ---------------- */

function Frame({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-ex__frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-ex__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-ex__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-ex__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-ex__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-ex__title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "ds-ex__body"
  }, children));
}
function SignIn() {
  return /*#__PURE__*/React.createElement(Frame, {
    title: "sign-in.html"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 380,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo/colaberry-horizontal.png",
    alt: "Colaberry",
    style: {
      height: 34,
      display: 'block',
      margin: '0 auto 22px'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'center',
      fontSize: 26,
      margin: '0 0 6px'
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--text-muted)',
      margin: '0 0 24px'
    }
  }, "Sign in to your client workspace."), /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "ada@email.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Remember me",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 14
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true
  }, "Sign in")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 20
    }
  }, "New here? ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Contact us"))));
}
function Pricing() {
  const plans = [{
    tone: 'blue',
    tag: 'Talent',
    name: 'Consulting & Staffing',
    price: 'Flexible',
    feats: ['Vetted specialists', 'Role-matched', 'Contingent or managed'],
    cta: 'blue'
  }, {
    tone: 'red',
    tag: 'Most popular',
    name: 'Data Fabric Services',
    price: 'Custom',
    feats: ['Architecture & roadmap', 'Integration', 'Governance'],
    featured: true,
    cta: 'red'
  }, {
    tone: 'green',
    tag: 'Operations',
    name: 'Managed Data Services',
    price: 'Scoped',
    feats: ['Reliable pipelines', 'Monitoring', 'Ongoing support'],
    cta: 'green'
  }];
  return /*#__PURE__*/React.createElement(Frame, {
    title: "pricing.html"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18
    }
  }, plans.map((p, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padded: true,
    elevation: p.featured ? 'md' : 'sm',
    accent: p.featured ? 'red' : undefined,
    style: p.featured ? {
      outline: '2px solid var(--blue-500)'
    } : undefined
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: p.tone,
    solid: p.featured
  }, p.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '4px 0 0',
      fontSize: 20
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 34,
      color: 'var(--text-strong)'
    }
  }, p.price), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 9,
      margin: '4px 0 8px'
    }
  }, p.feats.map((f, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5",
    stroke: "var(--cyan-600)",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), f))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    tone: p.cta,
    variant: p.featured ? 'primary' : 'outline'
  }, "Learn more")))));
}
function Dashboard() {
  const stats = [['68%', 'Delivered'], ['12', 'Tasks left'], ['4.9', 'CSAT'], ['Apr 30', 'Milestone']];
  return /*#__PURE__*/React.createElement(Frame, {
    title: "dashboard.html"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      marginBottom: 22
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padded: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 28,
      color: 'var(--blue-500)'
    }
  }, s[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, s[1])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 18,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padded: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18
    }
  }, "Active engagements"), /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    dot: true
  }, "Live")), /*#__PURE__*/React.createElement(Table, {
    columns: [{
      key: 'name',
      header: 'Client'
    }, {
      key: 'wk',
      header: 'Weeks',
      align: 'right'
    }, {
      key: 'st',
      header: 'Status',
      render: v => /*#__PURE__*/React.createElement(Badge, {
        tone: v === 'Open' ? 'green' : 'neutral'
      }, v)
    }],
    data: [{
      name: 'Northwind Financial',
      wk: 12,
      st: 'Open'
    }, {
      name: 'Acme Retail',
      wk: 24,
      st: 'Open'
    }, {
      name: 'Discovery sprint',
      wk: 2,
      st: 'Closed'
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    padded: true
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 16px',
      fontSize: 18
    }
  }, "This week"), /*#__PURE__*/React.createElement("div", {
    className: "stack"
  }, /*#__PURE__*/React.createElement(Progress, {
    label: "Pipeline build",
    value: 90,
    showValue: true,
    tone: "green"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Reporting",
    value: 55,
    showValue: true
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Handover",
    value: 20,
    showValue: true,
    tone: "blue"
  })))));
}
function Examples() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-ex"
  }, /*#__PURE__*/React.createElement(SignIn, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(Dashboard, null));
}
if (C.Button) {
  const cmp = document.getElementById('cmp-root');
  const lay = document.getElementById('lay-root');
  cmp.classList.remove('ds-loading');
  lay.classList.remove('ds-loading');
  ReactDOM.createRoot(cmp).render(/*#__PURE__*/React.createElement(Gallery, null));
  ReactDOM.createRoot(lay).render(/*#__PURE__*/React.createElement(Examples, null));
} else {
  document.getElementById('cmp-root').textContent = 'Component bundle failed to load.';
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/showcase.jsx", error: String((e && e.message) || e) }); }

// landing.js
try { (() => {
/* Colaberry DS landing — interactive hero + GSAP choreography.
   Motion tiers:
   - FULL  (motion OK, rAF alive): masked headline, parallax, scrubs, counters, pin.
   - LITE  (reduced motion, rAF alive): opacity-only fades — reduce, don't remove.
   - STATIC (rAF unavailable, e.g. hidden iframe): final states, zero tweens. */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById('ltoast');
  var toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 1500);
  }

  /* ---------- Nav scrolled state ---------- */
  var nav = document.querySelector('.lnav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  onScroll();

  /* ---------- Color ramps (generated) ---------- */
  var RAMPS = [{
    name: 'Teal',
    base: '#357895',
    hex: ['#EAF3F6', '#D2E4EB', '#A9CAD8', '#79A9BF', '#4E8AA6', '#357895', '#2C6981', '#25566B', '#1F4556', '#193646']
  }, {
    name: 'Cyan',
    base: '#00C4CC',
    hex: ['#DFFAFB', '#B3F2F4', '#7FE7EB', '#45D8DE', '#16CBD2', '#00C4CC', '#00A6AD', '#00858B', '#0A696E', '#0E5256']
  }, {
    name: 'Slate',
    base: '#404B51',
    hex: ['#F5F7F8', '#ECEFF1', '#DDE3E6', '#CBD3D7', '#A7B2B8', '#7E8B92', '#5E6B72', '#404B51', '#283034', '#161C1F']
  }];
  var rampsRoot = document.getElementById('ramps');
  if (rampsRoot) {
    RAMPS.forEach(function (r) {
      var block = document.createElement('div');
      block.className = 'lr-block';
      var name = document.createElement('div');
      name.className = 'lr-name';
      name.innerHTML = '<b>' + r.name + '</b><code>' + r.base + '</code>';
      var ramp = document.createElement('div');
      ramp.className = 'lr-ramp';
      r.hex.forEach(function (h) {
        var b = document.createElement('button');
        b.className = 'lr-sw';
        b.style.background = h;
        b.setAttribute('aria-label', 'Copy ' + h);
        b.dataset.hex = h;
        ramp.appendChild(b);
      });
      block.appendChild(name);
      block.appendChild(ramp);
      rampsRoot.appendChild(block);
    });
    rampsRoot.addEventListener('click', function (e) {
      var sw = e.target.closest('.lr-sw');
      if (!sw) return;
      if (navigator.clipboard) navigator.clipboard.writeText(sw.dataset.hex);
      toast('Copied ' + sw.dataset.hex);
    });
  }

  /* ---------- Copy snippets ---------- */
  var SNIPS = {
    prompt: 'Using the Colaberry design system, create a [social post / flyer / email header / slide] at [size] for [topic]. Headline: [your headline]. Add a [call-to-action] button and the logo. Keep it clean and on-brand, no emoji — and give me 3 options.',
    install: '<link rel="stylesheet" href="colaberry/styles.css">\n<scr' + 'ipt src="colaberry/_ds_bundle.js"></scr' + 'ipt>\n/* var(--brand-accent) · window.ColaberryDesignSystem_098454 */'
  };
  document.querySelectorAll('[data-snip]').forEach(function (el) {
    el.addEventListener('click', function () {
      var t = SNIPS[el.dataset.snip] || '';
      if (navigator.clipboard) navigator.clipboard.writeText(t);
      toast('Copied to clipboard');
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  /* ---------- Switch demo ---------- */
  document.querySelectorAll('.r-switch').forEach(function (s) {
    s.addEventListener('click', function () {
      s.setAttribute('aria-checked', s.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
  });

  /* ---------- Card tilt (fine pointers, motion OK) ---------- */
  if (!RM && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.cmp-card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        c.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-3px)';
      });
      c.addEventListener('pointerleave', function () {
        c.style.transform = '';
      });
    });
  }

  /* ---------- Interactive data constellation (canvas 2D) ---------- */
  function initHeroFx() {
    var canvas = document.getElementById('hero-fx');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var hero = document.querySelector('.hero');

    // Brand palette (teal + cyan + slate), weighted toward teal
    var PAL = ['#357895', '#357895', '#00C4CC', '#357895', '#16CBD2', '#45D8DE', '#5E6B72'];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0,
      H = 0;
    var nodes = [];
    var ripples = [];
    var pointer = {
      x: -9999,
      y: -9999,
      active: false
    };
    function rgba(hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
    }
    function build() {
      var r = canvas.getBoundingClientRect();
      W = r.width || canvas.clientWidth || (hero ? hero.clientWidth : 0) || window.innerWidth;
      H = r.height || canvas.clientHeight || (hero ? hero.clientHeight : 0) || window.innerHeight;
      if (!W || !H) return false;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density scales with area, capped for performance
      var count = Math.max(28, Math.min(110, Math.round(W * H / 15000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 1.6 + Math.random() * 2.6,
          c: PAL[Math.random() * PAL.length | 0],
          tw: Math.random() * Math.PI * 2 // twinkle phase
        });
      }
      return true;
    }
    var LINK = 132; // node-to-node link distance
    var MOUSE = 188; // cursor influence radius

    function draw(t) {
      if (!W || !H || !nodes.length) return;
      ctx.clearRect(0, 0, W, H);

      // update + integrate ripple forces
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        // gentle wrap
        if (n.x < -20) n.x = W + 20;else if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;else if (n.y > H + 20) n.y = -20;

        // cursor: soft attraction so the web gathers toward the pointer
        if (pointer.active) {
          var dx = pointer.x - n.x,
            dy = pointer.y - n.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < MOUSE * MOUSE) {
            var d = Math.sqrt(d2) || 1;
            var f = (1 - d / MOUSE) * 0.45;
            n.vx += dx / d * f * 0.06;
            n.vy += dy / d * f * 0.06;
          }
        }
        // ripple push
        for (var k = 0; k < ripples.length; k++) {
          var rp = ripples[k];
          var rdx = n.x - rp.x,
            rdy = n.y - rp.y;
          var rd = Math.sqrt(rdx * rdx + rdy * rdy) || 1;
          var band = Math.abs(rd - rp.rad);
          if (band < 46) {
            var push = (1 - band / 46) * rp.power;
            n.vx += rdx / rd * push;
            n.vy += rdy / rd * push;
          }
        }
        // friction + speed clamp
        n.vx *= 0.985;
        n.vy *= 0.985;
        var sp = Math.hypot(n.vx, n.vy);
        if (sp > 1.7) {
          n.vx = n.vx / sp * 1.7;
          n.vy = n.vy / sp * 1.7;
        }
      }

      // links between nearby nodes
      for (var a = 0; a < nodes.length; a++) {
        var na = nodes[a];
        for (var b = a + 1; b < nodes.length; b++) {
          var nb = nodes[b];
          var lx = na.x - nb.x,
            ly = na.y - nb.y;
          var ld = Math.sqrt(lx * lx + ly * ly);
          if (ld < LINK) {
            var al = (1 - ld / LINK) * 0.20;
            ctx.strokeStyle = rgba('#367895', al);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
          }
        }
      }

      // cursor "lens": bright cherry links from pointer to nearby nodes
      if (pointer.active) {
        for (var c = 0; c < nodes.length; c++) {
          var nc = nodes[c];
          var mdx = pointer.x - nc.x,
            mdy = pointer.y - nc.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < MOUSE) {
            var ma = (1 - md / MOUSE) * 0.55;
            ctx.strokeStyle = rgba('#00C4CC', ma);
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(nc.x, nc.y);
            ctx.stroke();
          }
        }
      }

      // nodes (with subtle twinkle + glow near cursor)
      for (var p = 0; p < nodes.length; p++) {
        var nn = nodes[p];
        var tw = 0.7 + Math.sin(t * 0.002 + nn.tw) * 0.3;
        var near = 0;
        if (pointer.active) {
          var ex = pointer.x - nn.x,
            ey = pointer.y - nn.y;
          var ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < MOUSE) near = 1 - ed / MOUSE;
        }
        var rad = nn.r * (1 + near * 0.9);
        if (near > 0.15) {
          ctx.fillStyle = rgba(nn.c, 0.16 * near);
          ctx.beginPath();
          ctx.arc(nn.x, nn.y, rad * 3.4, 0, 6.2832);
          ctx.fill();
        }
        ctx.fillStyle = rgba(nn.c, (0.5 + near * 0.5) * tw);
        ctx.beginPath();
        ctx.arc(nn.x, nn.y, rad, 0, 6.2832);
        ctx.fill();
      }

      // ripple rings
      for (var q = ripples.length - 1; q >= 0; q--) {
        var r2 = ripples[q];
        r2.rad += 7;
        r2.power *= 0.94;
        r2.alpha *= 0.95;
        ctx.strokeStyle = rgba('#00C4CC', r2.alpha);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r2.x, r2.y, r2.rad, 0, 6.2832);
        ctx.stroke();
        if (r2.rad > Math.max(W, H) || r2.alpha < 0.02) ripples.splice(q, 1);
      }
    }

    // Build once layout exists; retry across frames until the canvas has real size.
    var built = build();
    if (built) draw(0); // static first frame (visible under reduced motion / no rAF)

    function ensureBuilt() {
      if (built) return;
      if (build()) {
        built = true;
        draw(0);
      }
    }
    // Repair paths: rAF (next frame), window load, and a ResizeObserver — covers
    // first-paint-before-layout AND the reduced-motion path that has no render loop.
    if (!built) {
      requestAnimationFrame(ensureBuilt);
      window.addEventListener('load', ensureBuilt);
      setTimeout(ensureBuilt, 120);
      setTimeout(ensureBuilt, 400);
    }
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (build()) {
          built = true;
          draw(0);
        }
      });
      ro.observe(canvas);
    }
    window.addEventListener('resize', function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (build()) {
        built = true;
        draw(0);
      }
    });

    // Pointer interaction (always on — user-initiated)
    function toLocal(e) {
      var r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    }
    window.addEventListener('pointermove', toLocal, {
      passive: true
    });
    window.addEventListener('pointerleave', function () {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    });
    if (hero) hero.addEventListener('pointerdown', function (e) {
      toLocal(e);
      ripples.push({
        x: pointer.x,
        y: pointer.y,
        rad: 6,
        power: 0.9,
        alpha: 0.5
      });
    });

    // Continuous ambient animation — runs for everyone so the field is always alive.
    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
      }).observe(canvas);
    }
    heroFxLoop = function tick(ts) {
      requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (!built) ensureBuilt();
      draw(ts || 0);
    };
    heroFxLoop(0);
    window.__heroFx = {
      nodes: function () {
        return nodes.length;
      },
      sized: function () {
        return W + 'x' + H + ' buf ' + canvas.width + 'x' + canvas.height;
      }
    };
  }
  var heroFxLoop = null;
  initHeroFx();

  /* ---------- Final-state fallback (no animation possible) ---------- */
  function staticFinalize() {
    document.querySelectorAll('.r-prog i').forEach(function (bar) {
      bar.style.width = (bar.dataset.val || 70) + '%';
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = Math.round(parseFloat(el.dataset.count)) + (el.dataset.suffix || '');
    });
  }

  /* ---------- FULL motion choreography ---------- */
  function startFull() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance: masked line reveal — uses the brand "emphasized" curve.
    var EMPH = '0.16,1,0.3,1';
    var tl = gsap.timeline({
      defaults: {
        ease: 'cubic-bezier(' + EMPH + ')'
      }
    });
    tl.from('.hero__pill', {
      y: 22,
      opacity: 0,
      duration: 0.6
    }, 0.05).from('.hl__i', {
      yPercent: 115,
      duration: 1.1,
      stagger: 0.1,
      ease: 'cubic-bezier(' + EMPH + ')'
    }, 0.18).from('.hero__sub', {
      y: 22,
      opacity: 0,
      duration: 0.7
    }, '-=0.55').from('.hero__cta', {
      y: 22,
      opacity: 0,
      duration: 0.7
    }, '-=0.5').from('.hero__meta', {
      y: 18,
      opacity: 0,
      duration: 0.7
    }, '-=0.5').from('.hero__fxhint', {
      opacity: 0,
      duration: 0.6
    }, '-=0.4');

    // Cursor glow follows pointer in the hero (fine pointers)
    if (window.matchMedia('(pointer: fine)').matches) {
      var glow = document.getElementById('heroGlow');
      var hero = document.querySelector('.hero');
      if (glow && hero) {
        var qx = gsap.quickTo(glow, 'left', {
          duration: 0.7,
          ease: 'power3'
        });
        var qy = gsap.quickTo(glow, 'top', {
          duration: 0.7,
          ease: 'power3'
        });
        hero.addEventListener('pointermove', function (e) {
          qx(e.clientX);
          qy(e.clientY);
        }, {
          passive: true
        });
      }
    }

    // Hero constellation fades + drifts as you scroll away
    gsap.to('#hero-fx', {
      yPercent: 12,
      opacity: 0.32,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'bottom 92%',
        end: 'bottom 30%',
        scrub: true
      }
    });

    // Generic reveals
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%'
        }
      });
    });
    document.querySelectorAll('[data-reveal-group]').forEach(function (g) {
      gsap.from(g.children, {
        y: 48,
        opacity: 0,
        scale: 0.97,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: g,
          start: 'top 85%'
        }
      });
    });

    // Ramps grow in
    document.querySelectorAll('.lr-ramp').forEach(function (r) {
      gsap.from(r.children, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.045,
        scrollTrigger: {
          trigger: r,
          start: 'top 88%'
        }
      });
    });

    // Big type drifts sideways on scrub
    gsap.fromTo('.type-aa', {
      xPercent: -5
    }, {
      xPercent: 3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.bt--type',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Counters
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var end = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var obj = {
        v: 0
      };
      gsap.to(obj, {
        v: end,
        duration: 1.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%'
        },
        onUpdate: function () {
          el.textContent = Math.round(obj.v) + suffix;
        }
      });
    });

    // Progress bars
    document.querySelectorAll('.r-prog i').forEach(function (bar) {
      gsap.to(bar, {
        width: (bar.dataset.val || 70) + '%',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 92%'
        }
      });
    });

    // Example groups reveal as you scroll (decks / social / web)
    gsap.utils.toArray('.ex-group').forEach(function (g) {
      gsap.from(g.querySelectorAll('.ex-gh, .ex-row > *'), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: g,
          start: 'top 80%'
        }
      });
    });

    // CTA band scales in
    gsap.from('.cta__in', {
      scale: 0.94,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 82%'
      }
    });
  }

  /* ---------- LITE motion (reduced motion: opacity-only) ---------- */
  function startLite() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero__in > *', {
      opacity: 0,
      duration: 0.7,
      stagger: 0.08
    });
    document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(function (el) {
      gsap.from(el, {
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%'
        }
      });
    });
    staticFinalize();
  }

  /* ---------- Boot: probe rAF, then pick a tier ---------- */
  var rafOk = false;
  requestAnimationFrame(function () {
    rafOk = true;
  });
  setTimeout(function () {
    if (window.gsap && rafOk) {
      if (RM) startLite();else startFull();
    } else {
      staticFinalize();
    }
  }, 300);

  /* ---------- Footer year ---------- */
  var y = document.getElementById('yr');
  if (y) y.textContent = String(new Date().getFullYear());
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "landing.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing-website/home.jsx
try { (() => {
/* Colaberry — Home view (Data Consultancy & Talent Solutions Provider) */
const {
  Button: HButton,
  Card: HCard,
  Badge: HBadge
} = window.ColaberryDesignSystem_098454;
function HomeView({
  go
}) {
  const services = [{
    icon: 'users',
    cyan: false,
    title: 'Consulting & Staff Augmentation',
    desc: 'Get specialized Data Science, analytics, and engineering talent for your business to succeed and thrive with our expert recruitment solutions.'
  }, {
    icon: 'share-2',
    cyan: true,
    title: 'Data Fabric Services',
    desc: 'Partner with us for a customized digital transformation journey that positions you as a data-driven leader in your industry.'
  }, {
    icon: 'graduation-cap',
    cyan: false,
    title: 'Training & Development',
    desc: 'Texas Workforce Commission approved training and upskilling solutions to bridge the skills gap for existing and emerging roles at scale.'
  }];
  const expertise = [{
    icon: 'flask-conical',
    label: 'Data Science'
  }, {
    icon: 'bar-chart-3',
    label: 'Data Analytics'
  }, {
    icon: 'database',
    label: 'Data Engineering'
  }, {
    icon: 'git-merge',
    label: 'Machine Learning'
  }, {
    icon: 'code-2',
    label: 'Software Engineering'
  }, {
    icon: 'line-chart',
    label: 'Business Intelligence'
  }];
  const help = [{
    icon: 'server',
    title: 'Build a Data-Enabled Infrastructure',
    points: ['Data architecture roadmap', 'Data Lake vs. Data Warehouse', 'Flexible, reliable data pipelines', 'Automate data collection']
  }, {
    icon: 'layers',
    title: 'Adopt & Implement Data Solutions',
    points: ['Increase org-wide data literacy', 'Build a data-driven culture', 'Custom integration & compliance']
  }, {
    icon: 'git-fork',
    title: 'Develop Robust Talent Pipelines',
    points: ['Build high-performing data teams', 'Ongoing reskilling & upskilling', 'Sustained delivery capability']
  }];
  const industries = [['Energy & Utilities', 'zap'], ['Agriculture', 'sprout'], ['Healthcare', 'heart-pulse'], ['Financial Services', 'landmark'], ['Biotech', 'microscope'], ['Hospitality', 'hotel'], ['Insurance', 'shield'], ['Technology', 'cpu'], ['Pharmaceuticals', 'pill'], ['Retail', 'shopping-bag'], ['Government', 'building-2'], ['Education', 'book-open']];
  const cases = {
    'All': [['Zendesk Ticketing System', 'Analyzing support-ticket data end to end — from creation to resolution — to improve response time and service quality.', 'Operations'], ['Colaberry Event Dashboard', 'Evaluating the events platform and attendee data across public, student, and alumni programs to sharpen engagement.', 'Analytics'], ['DISC Dashboard & Tools', 'Behavioral analytics on DISC assessment data — Dominance, Influence, Steadiness, Compliance — for team insight.', 'Data Science']],
    'Operations': [['Zendesk Ticketing System', 'Analyzing support-ticket data end to end — from creation to resolution — to improve response time and service quality.', 'Operations'], ['Managed Data Services', 'Standing up reliable pipelines and monitoring so client data teams ship with confidence.', 'Operations']],
    'Analytics': [['Colaberry Event Dashboard', 'Evaluating the events platform and attendee data across public, student, and alumni programs to sharpen engagement.', 'Analytics'], ['Retail Demand Signals', 'Forecasting and reporting that turns transaction data into merchandising decisions.', 'Analytics']],
    'Data Science': [['DISC Dashboard & Tools', 'Behavioral analytics on DISC assessment data — Dominance, Influence, Steadiness, Compliance — for team insight.', 'Data Science'], ['Healthcare Risk Models', 'Predictive modeling on clinical data to flag risk earlier and route care efficiently.', 'Data Science']]
  };
  const caseTabs = Object.keys(cases);
  const [caseTab, setCaseTab] = React.useState('All');
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "cbsite-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-hero__copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-eyebrow"
  }, "Data Consultancy & Talent Solutions"), /*#__PURE__*/React.createElement("h1", null, "We are Colaberry. ", /*#__PURE__*/React.createElement("span", {
    className: "cbsite-rotate"
  }, "Shaping the future of work.")), /*#__PURE__*/React.createElement("p", null, "Colaberry transforms data from an obstacle into an asset \u2014 so individuals and organizations reach their full potential and thrive in today's technology-powered world."), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-hero__cta"
  }, /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    onClick: () => go('enroll')
  }, "Contact Us"), /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    variant: "outline",
    onClick: () => go('program'),
    trailingIcon: /*#__PURE__*/React.createElement(I, {
      n: "arrow-right"
    })
  }, "What we do")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-catlinks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-catlinks__label"
  }, "Trusted across industries \xB7 recognized for excellence:"), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-chip"
  }, /*#__PURE__*/React.createElement(I, {
    n: "award",
    s: 15
  }), "Inc. 5000"), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-chip"
  }, /*#__PURE__*/React.createElement(I, {
    n: "shield-check",
    s: 15
  }), "Microsoft Partner"), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-chip"
  }, /*#__PURE__*/React.createElement(I, {
    n: "graduation-cap",
    s: 15
  }), "TWC Approved")))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-hero__media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__big"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__n"
  }, "5,000+"), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__lbl"
  }, "Data careers launched & teams empowered")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__cell"
  }, /*#__PURE__*/React.createElement(I, {
    n: "briefcase"
  }), /*#__PURE__*/React.createElement("strong", null, "Staffing"), /*#__PURE__*/React.createElement("span", null, "Specialized data talent")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__cell"
  }, /*#__PURE__*/React.createElement(I, {
    n: "share-2"
  }), /*#__PURE__*/React.createElement("strong", null, "Fabric"), /*#__PURE__*/React.createElement("span", null, "Digital transformation")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__cell"
  }, /*#__PURE__*/React.createElement(I, {
    n: "database"
  }), /*#__PURE__*/React.createElement("strong", null, "Managed"), /*#__PURE__*/React.createElement("span", null, "Reliable data services")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-statpanel__cell"
  }, /*#__PURE__*/React.createElement(I, {
    n: "graduation-cap"
  }), /*#__PURE__*/React.createElement("strong", null, "Training"), /*#__PURE__*/React.createElement("span", null, "TWC-approved upskilling")))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head"
  }, /*#__PURE__*/React.createElement(HBadge, {
    tone: "blue"
  }, "What we do"), /*#__PURE__*/React.createElement("h2", null, "Data solutions & talent for tomorrow's workplace"), /*#__PURE__*/React.createElement("p", null, "We support organizations and individuals with consulting, staffing, managed data services, and training & development \u2014 end-to-end solutions that turn organizations into agile, data-powered industry leaders.")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cards"
  }, services.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "cbsite-card",
    onClick: () => go('program')
  }, /*#__PURE__*/React.createElement("div", {
    className: 'cbsite-card__ic' + (s.cyan ? ' cbsite-card__ic--cyan' : '')
  }, /*#__PURE__*/React.createElement(I, {
    n: s.icon
  })), /*#__PURE__*/React.createElement("h3", null, s.title), /*#__PURE__*/React.createElement("p", null, s.desc), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-card__more"
  }, "Learn more ", /*#__PURE__*/React.createElement(I, {
    n: "arrow-right",
    s: 15
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section cbsite-section--subtle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head"
  }, /*#__PURE__*/React.createElement(HBadge, {
    tone: "cyan"
  }, "Areas of expertise"), /*#__PURE__*/React.createElement("h2", null, "Deep capability across the data stack"), /*#__PURE__*/React.createElement("p", null, "From strategy to delivery, our specialists cover the disciplines that move data-driven organizations forward.")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-integrations"
  }, expertise.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cbsite-int"
  }, /*#__PURE__*/React.createElement(I, {
    n: e.icon
  }), /*#__PURE__*/React.createElement("span", null, e.label))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head"
  }, /*#__PURE__*/React.createElement(HBadge, {
    tone: "blue"
  }, "We can help you"), /*#__PURE__*/React.createElement("h2", null, "From infrastructure to people"), /*#__PURE__*/React.createElement("p", null, "Three ways we partner with organizations to build lasting data capability.")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cards"
  }, help.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cbsite-card cbsite-card--static"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-card__ic"
  }, /*#__PURE__*/React.createElement(I, {
    n: h.icon
  })), /*#__PURE__*/React.createElement("h3", null, h.title), /*#__PURE__*/React.createElement("ul", {
    className: "cbsite-checklist"
  }, h.points.map((p, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, /*#__PURE__*/React.createElement(I, {
    n: "check",
    s: 15
  }), p))))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section cbsite-section--subtle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head"
  }, /*#__PURE__*/React.createElement(HBadge, {
    tone: "blue"
  }, "Industries we serve"), /*#__PURE__*/React.createElement("h2", null, "Domain expertise where it counts"), /*#__PURE__*/React.createElement("p", null, "We bring data solutions to the sectors building the future.")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-industries"
  }, industries.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cbsite-industry"
  }, /*#__PURE__*/React.createElement(I, {
    n: it[1]
  }), it[0])))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head"
  }, /*#__PURE__*/React.createElement(HBadge, {
    tone: "cyan"
  }, "Client success"), /*#__PURE__*/React.createElement("h2", null, "Real outcomes from real data work"), /*#__PURE__*/React.createElement("p", null, "A selection of projects delivered with our consulting and analytics teams.")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-tabs"
  }, caseTabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: 'cbsite-tab' + (caseTab === t ? ' is-active' : ''),
    onClick: () => setCaseTab(t)
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cards"
  }, cases[caseTab].map((c, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "cbsite-card",
    onClick: () => go('program')
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-card__count"
  }, c[2]), /*#__PURE__*/React.createElement("h3", null, c[0]), /*#__PURE__*/React.createElement("p", null, c[1]), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-card__more"
  }, "View case study ", /*#__PURE__*/React.createElement(I, {
    n: "arrow-right",
    s: 15
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cta__inner"
  }, /*#__PURE__*/React.createElement("h2", null, "We'd love to talk"), /*#__PURE__*/React.createElement("p", null, "Whether you need consulting, staffing, managed data services, or training, Colaberry is here to help you reach the highest levels of your organizational and individual potential."), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cta__btns"
  }, /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    tone: "green",
    onClick: () => go('enroll')
  }, "Contact Us"), /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    variant: "outline",
    onClick: () => go('program')
  }, "Explore services")))));
}
Object.assign(window, {
  HomeView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-website/home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-website/parts.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Colaberry — shared parts: Logo, Header, Footer, helpers.
   Data Consultancy & Talent Solutions Provider. Exposes to window. */
const {
  Button: CBButton,
  Badge: CBBadge
} = window.ColaberryDesignSystem_098454;

/* React-safe Lucide icon. React owns the <span>; Lucide mutates only the
   inner <i>→<svg>, so re-renders never touch the swapped node. */
function I({
  n,
  s,
  c,
  className = '',
  style
}) {
  const st = {
    fontSize: s ? s + 'px' : undefined,
    color: c,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", {
    className: 'cb-i ' + className,
    style: st,
    dangerouslySetInnerHTML: {
      __html: `<i data-lucide="${n}"></i>`
    }
  });
}
function Icon({
  name,
  size,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(I, _extends({
    n: name,
    s: size,
    style: style
  }, rest));
}
function Logo({
  height = 30,
  variant = 'default'
}) {
  const src = variant === 'white' ? '../../assets/logo/colaberry-horizontal-white.png?v=3' : '../../assets/logo/colaberry-horizontal.png?v=3';
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "Colaberry",
    style: {
      height,
      display: 'block'
    }
  });
}
const WHATWEDO = [{
  label: 'Consulting & Staffing',
  icon: 'users',
  view: 'program'
}, {
  label: 'Data Fabric Services',
  icon: 'share-2',
  view: 'program'
}, {
  label: 'Managed Data Services',
  icon: 'database',
  view: 'program'
}, {
  label: 'Enterprise Training',
  icon: 'graduation-cap',
  view: 'program'
}];
const RESOURCES = [{
  label: 'Case Studies',
  icon: 'folder-open',
  view: 'home'
}, {
  label: 'White Papers',
  icon: 'file-text',
  view: 'home'
}, {
  label: 'Events',
  icon: 'calendar',
  view: 'home'
}];
function Header({
  go
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('.cbsite-scroll');
    const onScroll = () => setScrolled((el ? el.scrollTop : window.scrollY) > 8);
    const target = el || window;
    target.addEventListener('scroll', onScroll);
    return () => target.removeEventListener('scroll', onScroll);
  }, []);
  const toggleMode = () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "cbsite-header",
    "data-scrolled": scrolled
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cbsite-logo",
    onClick: () => go('home')
  }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("nav", {
    className: "cbsite-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-nav__item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cbsite-nav__link",
    onClick: () => go('program')
  }, "What We Do ", /*#__PURE__*/React.createElement(I, {
    n: "chevron-down",
    s: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-menu"
  }, WHATWEDO.map((m, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    onClick: () => go(m.view)
  }, /*#__PURE__*/React.createElement(I, {
    n: m.icon,
    s: 16
  }), m.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-nav__item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cbsite-nav__link",
    onClick: () => go('home')
  }, "Industries")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-nav__item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cbsite-nav__link",
    onClick: () => go('home')
  }, "Resources ", /*#__PURE__*/React.createElement(I, {
    n: "chevron-down",
    s: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-menu"
  }, RESOURCES.map((m, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    onClick: () => go(m.view)
  }, /*#__PURE__*/React.createElement(I, {
    n: m.icon,
    s: 16
  }), m.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-nav__item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cbsite-nav__link",
    onClick: () => go('home')
  }, "About"))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-header__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cbsite-modetoggle",
    onClick: toggleMode,
    "aria-label": "Toggle color mode"
  }, /*#__PURE__*/React.createElement(I, {
    n: "sun-moon",
    s: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "cbsite-phone",
    href: "tel:+19729921024"
  }, /*#__PURE__*/React.createElement(I, {
    n: "phone",
    s: 15
  }), "(972) 992-1024"), /*#__PURE__*/React.createElement(CBButton, {
    size: "sm",
    onClick: () => go('enroll')
  }, "Contact Us"))));
}
function Footer({
  go
}) {
  const cols = [{
    h: 'What We Do',
    items: ['Consulting & Staffing', 'Data Fabric Services', 'Managed Data Services', 'Enterprise Training', 'Career Training']
  }, {
    h: 'Resources',
    items: ['Case Studies', 'White Papers', 'Projects', 'Events', 'Careers']
  }, {
    h: 'Company',
    items: ['About Us', 'Awards & Recognition', 'Blog', 'Contact Us']
  }];
  const social = ['linkedin', 'instagram', 'youtube', 'twitter', 'facebook'];
  return /*#__PURE__*/React.createElement("footer", {
    className: "cbsite-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-footer__brand"
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    height: 30
  }), /*#__PURE__*/React.createElement("p", null, "Colaberry empowers individuals and organizations to reach their full potential by unlocking the power of data \u2014 turning data from an obstacle into an asset in today's technology-powered world."), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-footer__badges"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-footer__badge"
  }, /*#__PURE__*/React.createElement(I, {
    n: "award",
    s: 15
  }), "Inc. 5000"), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-footer__badge"
  }, /*#__PURE__*/React.createElement(I, {
    n: "shield-check",
    s: 15
  }), "Microsoft Partner")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-footer__social"
  }, social.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    "aria-label": s
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s,
    size: 16
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-footer__cols"
  }, cols.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cbsite-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, c.h), c.items.map((it, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    onClick: () => go('home')
  }, it)))))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-footer__bar"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Colaberry, Inc. \xB7 All rights reserved. \xB7 Plano, TX"), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-footer__legal"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('home')
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('home')
  }, "Terms"))));
}
Object.assign(window, {
  Icon,
  I,
  Logo,
  Header,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-website/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-website/program-enroll.jsx
try { (() => {
/* Colaberry — Service detail + Contact views */
const {
  Button: PButton,
  Card: PCard,
  Badge: PBadge,
  Input: PInput,
  Checkbox: PCheckbox
} = window.ColaberryDesignSystem_098454;
function ProgramView({
  go
}) {
  const [open, setOpen] = React.useState(0);
  const modules = [{
    h: 'Discovery & data strategy',
    d: 'We assess your data maturity, goals, and gaps — then build a roadmap that ties data investment to business outcomes.',
    wk: 'Engage'
  }, {
    h: 'Specialized talent & teams',
    d: 'Get vetted data scientists, analysts, and engineers — contingent staffing or fully managed teams, ramped to your needs.',
    wk: 'Staff'
  }, {
    h: 'Delivery & managed services',
    d: 'Reliable pipelines, governance, and monitoring so your data work ships on time and stays healthy in production.',
    wk: 'Deliver'
  }, {
    h: 'Training & enablement',
    d: 'TWC-approved training and ongoing upskilling that raises data literacy and builds a durable, data-driven culture.',
    wk: 'Enable'
  }];
  const faqs = [{
    q: 'How does staff augmentation work?',
    a: 'We match specialized Data Science, analytics, and engineering talent to your roles — contingent or contract-to-hire — with expert recruitment and a fast, quality-first process.'
  }, {
    q: 'What are Data Fabric Services?',
    a: 'A customized digital transformation journey: data architecture, integration, and governance that positions you as a data-driven leader in your industry.'
  }, {
    q: 'Do you offer managed data services?',
    a: 'Yes. We run reliable pipelines, data quality, and monitoring as a managed service so your teams can focus on outcomes, not maintenance.'
  }, {
    q: 'Is your training accredited?',
    a: 'Our training & development programs are Texas Workforce Commission approved and designed to bridge the skills gap for existing and emerging roles at scale.'
  }];
  const tools = ['Consulting', 'Staffing', 'Data Fabric', 'Managed Services', 'Training', 'Governance'];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-prog-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-prog-hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-bc"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('home')
  }, "What We Do"), " ", /*#__PURE__*/React.createElement(I, {
    n: "chevron-right",
    s: 14
  }), " ", /*#__PURE__*/React.createElement("span", null, "Consulting & Staff Augmentation")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-prog-hero__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PBadge, {
    tone: "blue",
    dot: true
  }, "Consulting & Staffing"), /*#__PURE__*/React.createElement("h1", null, "Specialized data talent, ready when you are"), /*#__PURE__*/React.createElement("p", null, "Get the Data Science, analytics, and engineering talent your business needs to succeed and thrive \u2014 through expert recruitment and consulting solutions tailored to your goals."), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(I, {
    n: "users",
    s: 16
  }), " Contingent & managed teams"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(I, {
    n: "shield-check",
    s: 16
  }), " Microsoft Partner"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(I, {
    n: "award",
    s: 16
  }), " Inc. 5000"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(I, {
    n: "map-pin",
    s: 16
  }), " Plano, TX")), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-prog-hero__cta"
  }, /*#__PURE__*/React.createElement(PButton, {
    size: "lg",
    onClick: () => go('enroll')
  }, "Contact Us"), /*#__PURE__*/React.createElement(PButton, {
    size: "lg",
    variant: "ghost",
    onClick: () => go('home'),
    leadingIcon: /*#__PURE__*/React.createElement(I, {
      n: "folder-open"
    })
  }, "View case studies"))), /*#__PURE__*/React.createElement(PCard, {
    elevation: "md",
    padded: true,
    className: "cbsite-pricecard"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-pricecard__label"
  }, "Engagement models"), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-pricecard__price"
  }, "4", /*#__PURE__*/React.createElement("small", null, "core services")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "check"
  }), /*#__PURE__*/React.createElement("span", null, "Consulting & staff augmentation")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "check"
  }), /*#__PURE__*/React.createElement("span", null, "Data Fabric Services")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "check"
  }), /*#__PURE__*/React.createElement("span", null, "Managed Data Services")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "check"
  }), /*#__PURE__*/React.createElement("span", null, "Training & development"))), /*#__PURE__*/React.createElement(PButton, {
    fullWidth: true,
    onClick: () => go('enroll')
  }, "Talk to our team"), /*#__PURE__*/React.createElement("span", {
    className: "cbsite-pricecard__note"
  }, "Flexible to your size & stage"))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head cbsite-section__head--row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PBadge, {
    tone: "cyan"
  }, "How we engage"), /*#__PURE__*/React.createElement("h2", null, "From strategy to delivery"))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-modules"
  }, modules.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'cbsite-module' + (open === i ? ' is-open' : ''),
    onClick: () => setOpen(open === i ? -1 : i)
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-module__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-module__wk"
  }, m.wk), /*#__PURE__*/React.createElement("h3", null, m.h), /*#__PURE__*/React.createElement(I, {
    n: open === i ? 'minus' : 'plus'
  })), open === i && /*#__PURE__*/React.createElement("p", null, m.d)))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-tools"
  }, /*#__PURE__*/React.createElement("span", null, "Services & capabilities"), /*#__PURE__*/React.createElement("div", null, tools.map((t, i) => /*#__PURE__*/React.createElement(PBadge, {
    key: i,
    outline: true
  }, t))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-section cbsite-section--subtle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-section__head cbsite-section__head--row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PBadge, {
    tone: "blue"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", null, "Questions, answered"))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-faq"
  }, faqs.map((f, i) => /*#__PURE__*/React.createElement("details", {
    key: i,
    className: "cbsite-faqitem"
  }, /*#__PURE__*/React.createElement("summary", null, f.q, /*#__PURE__*/React.createElement(I, {
    n: "plus"
  })), /*#__PURE__*/React.createElement("p", null, f.a))))), /*#__PURE__*/React.createElement("section", {
    className: "cbsite-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cta__inner"
  }, /*#__PURE__*/React.createElement("h2", null, "Let's build your data advantage"), /*#__PURE__*/React.createElement("p", null, "Tell us about your goals and our team will map the right mix of consulting, staffing, managed services, and training."), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-cta__btns"
  }, /*#__PURE__*/React.createElement(PButton, {
    size: "lg",
    tone: "green",
    onClick: () => go('enroll')
  }, "Contact Us")))));
}
function EnrollView({
  go
}) {
  const [interest, setInterest] = React.useState('consulting');
  const [done, setDone] = React.useState(false);
  const opts = {
    consulting: {
      name: 'Consulting & Staffing',
      desc: 'Specialized data talent',
      tone: 'blue'
    },
    fabric: {
      name: 'Data Fabric Services',
      desc: 'Digital transformation',
      tone: 'cyan'
    },
    managed: {
      name: 'Managed Data Services',
      desc: 'Reliable data operations',
      tone: 'blue'
    },
    training: {
      name: 'Training & Development',
      desc: 'Upskill your team',
      tone: 'cyan'
    }
  };
  const sel = opts[interest];
  if (done) {
    return /*#__PURE__*/React.createElement("main", {
      className: "cbsite-enroll"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cbsite-success"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cbsite-success__icon"
    }, /*#__PURE__*/React.createElement(I, {
      n: "check"
    })), /*#__PURE__*/React.createElement("h1", null, "Thanks \u2014 we'll be in touch!"), /*#__PURE__*/React.createElement("p", null, "Thanks for your interest in ", /*#__PURE__*/React.createElement("strong", null, sel.name), ". A member of our team will reach out within one business day. Prefer to talk now? Call (972) 992-1024."), /*#__PURE__*/React.createElement("div", {
      className: "cbsite-success__btns"
    }, /*#__PURE__*/React.createElement(PButton, {
      onClick: () => {
        setDone(false);
        go('home');
      }
    }, "Back to home"), /*#__PURE__*/React.createElement(PButton, {
      variant: "outline",
      onClick: () => go('program')
    }, "Explore services"))));
  }
  return /*#__PURE__*/React.createElement("main", {
    className: "cbsite-enroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cbsite-enroll__grid"
  }, /*#__PURE__*/React.createElement("form", {
    className: "cbsite-form",
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    }
  }, /*#__PURE__*/React.createElement("h1", null, "Contact us"), /*#__PURE__*/React.createElement("p", {
    className: "cbsite-form__sub"
  }, "Tell us about your goals and we'll map the right solution. Takes about 2 minutes."), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-form__choice"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-form__legend"
  }, "What can we help with?"), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-choice"
  }, Object.entries(opts).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: k,
    className: 'cbsite-choice__opt' + (interest === k ? ' is-sel' : ''),
    onClick: () => setInterest(k)
  }, /*#__PURE__*/React.createElement("span", {
    className: "cbsite-choice__check"
  }, /*#__PURE__*/React.createElement(I, {
    n: "check"
  })), /*#__PURE__*/React.createElement("strong", null, v.name), /*#__PURE__*/React.createElement("span", null, v.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-form__row"
  }, /*#__PURE__*/React.createElement(PInput, {
    label: "First name",
    placeholder: "Ada",
    required: true
  }), /*#__PURE__*/React.createElement(PInput, {
    label: "Last name",
    placeholder: "Lovelace",
    required: true
  })), /*#__PURE__*/React.createElement(PInput, {
    label: "Work email",
    type: "email",
    placeholder: "ada@company.com",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-form__row"
  }, /*#__PURE__*/React.createElement(PInput, {
    label: "Company",
    placeholder: "Acme Inc.",
    required: true
  }), /*#__PURE__*/React.createElement(PInput, {
    label: "Phone",
    placeholder: "(972) 992-1024"
  })), /*#__PURE__*/React.createElement(PInput, {
    label: "How can we help?",
    multiline: true,
    rows: 3,
    placeholder: "Tell us about your data goals, team, and timeline\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-form__checks"
  }, /*#__PURE__*/React.createElement(PCheckbox, {
    label: "Send me Colaberry insights \u2014 data strategy, talent & training",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(PCheckbox, {
    label: "I agree to be contacted by Colaberry about my request",
    required: true
  })), /*#__PURE__*/React.createElement(PButton, {
    type: "submit",
    size: "lg",
    fullWidth: true
  }, "Send message")), /*#__PURE__*/React.createElement("aside", {
    className: "cbsite-summary"
  }, /*#__PURE__*/React.createElement(PCard, {
    elevation: "md",
    padded: true
  }, /*#__PURE__*/React.createElement(PBadge, {
    tone: sel.tone,
    dot: true
  }, "Your interest"), /*#__PURE__*/React.createElement("h3", null, sel.name), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "users"
  }), /*#__PURE__*/React.createElement("span", null, "Specialized data talent & teams")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "share-2"
  }), /*#__PURE__*/React.createElement("span", null, "Digital transformation & data fabric")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "database"
  }), /*#__PURE__*/React.createElement("span", null, "Managed, reliable data operations")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(I, {
    n: "graduation-cap"
  }), /*#__PURE__*/React.createElement("span", null, "TWC-approved training & upskilling")))), /*#__PURE__*/React.createElement("div", {
    className: "cbsite-summary__trust"
  }, /*#__PURE__*/React.createElement(I, {
    n: "phone"
  }), /*#__PURE__*/React.createElement("p", null, "Prefer to talk? Call ", /*#__PURE__*/React.createElement("b", null, "(972) 992-1024"), " or email hello@colaberry.com \u2014 we'd love to talk.")))));
}
Object.assign(window, {
  ProgramView,
  EnrollView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-website/program-enroll.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
