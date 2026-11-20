import React from 'react';

const CSS = `
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
 * Text input with optional label, helper / error / success message, and sizes.
 * Pass `multiline` to render a textarea. `optional` appends "(optional)" to the
 * label — prefer marking the few optional fields over starring every required one.
 */
export function Input({
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
  inject();
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
