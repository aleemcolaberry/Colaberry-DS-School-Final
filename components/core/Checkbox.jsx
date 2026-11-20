import React from 'react';

const CSS = `
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

function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cb-check-css')) return;
  const s = document.createElement('style');
  s.id = 'cb-check-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Checkbox with a leaf-green checked state and a soft spring-in tick.
 * `indeterminate` shows a dash ("some selected" in select-all headers);
 * `error` marks a required consent box that was skipped.
 */
export function Checkbox({ label, hint, error, indeterminate = false, disabled = false, className = '', children, ...rest }) {
  inject();
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
