import React from 'react';

const CSS = `
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

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-empty-css')) return;
  const s = document.createElement('style'); s.id = 'cb-empty-css'; s.textContent = CSS; document.head.appendChild(s);
}

const GLYPH = {
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
export function EmptyState({ kind = 'default', icon, title, description, action, secondaryAction, size = 'md', plain = false, className = '', children, ...rest }) {
  inject();
  const cls = ['cb-empty', 'cb-empty--' + kind];
  if (size === 'sm') cls.push('cb-empty--sm');
  if (plain) cls.push('cb-empty--plain');
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')} role={kind === 'error' ? 'alert' : 'status'} {...rest}>
      <div className="cb-empty__ic" aria-hidden="true">
        {icon || <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d={GLYPH[kind] || GLYPH.default} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      {title && <h3 className="cb-empty__title">{title}</h3>}
      {description && <p className="cb-empty__desc">{description}</p>}
      {children}
      {(action || secondaryAction) && <div className="cb-empty__actions">{action}{secondaryAction}</div>}
    </div>
  );
}
