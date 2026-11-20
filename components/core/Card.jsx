import React from 'react';

const CSS = `
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
 * A string `media` that fails to load falls back to a neutral placeholder
 * (or your `mediaFallback` node) so the card never shows a broken image.
 */
export function Card({
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
  inject();
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
