import React from 'react';

const CSS = `
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

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-toast-css')) return;
  const s = document.createElement('style'); s.id = 'cb-toast-css'; s.textContent = CSS; document.head.appendChild(s);
}

const ICONS = {
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
export function Toast({ open = true, variant = 'neutral', title, children, action, onClose, duration, static: inFlow = false, className = '', ...rest }) {
  inject();
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
      <svg className="cb-toast__ic" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={ICONS[variant] || ICONS.neutral} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
