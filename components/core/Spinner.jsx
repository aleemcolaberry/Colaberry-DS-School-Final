import React from 'react';

const CSS = `
.cb-spinner { display: inline-block; width: 20px; height: 20px; flex: none; border-radius: 50%; border: 2.5px solid color-mix(in srgb, currentColor 22%, transparent); border-top-color: currentColor; animation: cb-spinner-rot .8s linear infinite; vertical-align: middle; }
.cb-spinner--sm { width: 14px; height: 14px; border-width: 2px; }
.cb-spinner--lg { width: 32px; height: 32px; border-width: 3px; }
.cb-spinner--brand { color: var(--brand-primary); }
.cb-spinner--muted { color: var(--text-muted); }
.cb-spinner-block { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 32px 16px; font-family: var(--font-body); font-size: var(--fs-body-sm); color: var(--text-muted); }
@keyframes cb-spinner-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce){ .cb-spinner { animation-duration: 1.6s; } }
`;

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-spinner-css')) return;
  const s = document.createElement('style'); s.id = 'cb-spinner-css'; s.textContent = CSS; document.head.appendChild(s);
}

/**
 * Circular activity indicator for short, indeterminate waits (< ~5 s) —
 * inside buttons, next to a label, or as a centered block with `label`.
 * For content areas prefer Skeleton; for known durations prefer Progress.
 */
export function Spinner({ size = 'md', tone = 'inherit', label, className = '', ...rest }) {
  inject();
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
