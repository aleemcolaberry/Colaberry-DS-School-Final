import React from 'react';

const CSS = `
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

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-alert-css')) return;
  const s = document.createElement('style'); s.id = 'cb-alert-css'; s.textContent = CSS; document.head.appendChild(s);
}

const ICONS = {
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
export function Alert({ variant = 'info', title, children, actions, onClose, banner = false, className = '', ...rest }) {
  inject();
  const cls = ['cb-alert', 'cb-alert--' + variant];
  if (banner) cls.push('cb-alert--banner');
  if (className) cls.push(className);
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status';
  return (
    <div className={cls.join(' ')} role={role} {...rest}>
      <span className="cb-alert__ic" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={ICONS[variant] || ICONS.info} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
