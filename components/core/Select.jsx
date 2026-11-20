import React from 'react';

const CSS = `
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

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-select-css')) return;
  const s = document.createElement('style'); s.id = 'cb-select-css'; s.textContent = CSS; document.head.appendChild(s);
}

let _sid = 0;

/**
 * Native <select> styled to match Input — same label / helper / error /
 * success anatomy. `options` = [{ value, label, disabled }] or plain strings.
 * Pass `placeholder` for an unselectable first row.
 */
export function Select({ label, required = false, size = 'md', error, success, helperText, placeholder, options = [], id, className = '', value, defaultValue, onChange, ...rest }) {
  inject();
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
