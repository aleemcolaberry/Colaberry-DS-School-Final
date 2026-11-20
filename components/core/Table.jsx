import React from 'react';

const CSS = `
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

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-table-css')) return;
  const s = document.createElement('style'); s.id = 'cb-table-css'; s.textContent = CSS; document.head.appendChild(s);
}

/**
 * Data table. `columns` = [{ key, header, align, render }]; `data` = row objects.
 * `hover` highlights rows; `striped` zebra-stripes them.
 * States: `loading` (skeleton rows), empty `data` (built-in empty message or
 * your `emptyState` node), `error` (message + optional `onRetry`).
 */
export function Table({ columns = [], data = [], hover = true, striped = false, caption, loading = false, loadingRows = 4, emptyState, emptyTitle = 'Nothing here yet', emptyDescription, error, onRetry, className = '', ...rest }) {
  inject();
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
