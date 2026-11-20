import React from 'react';

const CSS = `
.cb-radio-group { display: flex; flex-direction: column; gap: 10px; border: none; margin: 0; padding: 0; min-width: 0; font-family: var(--font-body); }
.cb-radio-group--row { flex-direction: row; flex-wrap: wrap; gap: 10px 22px; }
.cb-radio-group__legend { font-size: var(--fs-body-sm); font-weight: var(--fw-medium); color: var(--text-strong); padding: 0; margin-bottom: 2px; }
.cb-radio-group__msg { font-size: var(--fs-caption); color: var(--text-muted); }
.cb-radio-group--error .cb-radio-group__msg { color: var(--status-danger-fg); }
.cb-radio-group--error .cb-radio__dot { border-color: var(--status-danger); }
.cb-radio { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; color: var(--text-body); font-size: var(--fs-body-sm); line-height: 1.45; min-width: 0; }
.cb-radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.cb-radio__dot { width: 22px; height: 22px; flex: none; border-radius: 50%; border: var(--border-2) solid var(--border-control); background: var(--surface-card); display: grid; place-items: center; margin-top: 1px; transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out); }
.cb-radio__dot::after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--action-confirm-fg); transform: scale(0); transition: transform var(--dur-fast) var(--ease-spring); }
.cb-radio:hover .cb-radio__dot { border-color: var(--green-700); }
.cb-radio input:checked + .cb-radio__dot { background: var(--action-confirm-bg); border-color: var(--green-700); }
.cb-radio input:checked + .cb-radio__dot::after { transform: scale(1); }
.cb-radio input:focus-visible + .cb-radio__dot { box-shadow: var(--focus-ring); }
.cb-radio input:disabled + .cb-radio__dot { opacity: .45; }
.cb-radio--disabled { cursor: not-allowed; color: var(--text-subtle); }
.cb-radio__txt { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cb-radio__hint { font-size: var(--fs-caption); color: var(--text-muted); }
@media (prefers-reduced-motion: reduce){ .cb-radio__dot, .cb-radio__dot::after { transition-duration: .001ms; } }
`;

function inject() {
  if (typeof document === 'undefined' || document.getElementById('cb-radio-css')) return;
  const s = document.createElement('style'); s.id = 'cb-radio-css'; s.textContent = CSS; document.head.appendChild(s);
}

let _rid = 0;

/**
 * Single radio button. Usually rendered via <RadioGroup>; use alone only
 * when you manage `name`/`checked` yourself.
 */
export function Radio({ label, hint, disabled = false, className = '', children, ...rest }) {
  inject();
  return (
    <label className={'cb-radio ' + (disabled ? 'cb-radio--disabled ' : '') + className}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="cb-radio__dot" aria-hidden="true" />
      {(label || children || hint) && <span className="cb-radio__txt"><span>{label || children}</span>{hint && <span className="cb-radio__hint">{hint}</span>}</span>}
    </label>
  );
}

/**
 * Accessible group of radios (a <fieldset> with legend, helper/error text).
 * `options` = [{ value, label, hint, disabled }]. Controlled via `value`/`onChange`
 * or uncontrolled via `defaultValue`.
 */
export function RadioGroup({ label, name, options = [], value, defaultValue, onChange, required = false, error, helperText, direction = 'column', disabled = false, className = '', ...rest }) {
  inject();
  const gname = React.useMemo(() => name || ('cb-radio-' + (++_rid)), [name]);
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value !== undefined ? value : inner;
  const msg = error || helperText;
  const msgId = msg ? gname + '-msg' : undefined;
  const cls = ['cb-radio-group'];
  if (direction === 'row') cls.push('cb-radio-group--row');
  if (error) cls.push('cb-radio-group--error');
  if (className) cls.push(className);
  return (
    <fieldset className={cls.join(' ')} aria-describedby={msgId} aria-invalid={!!error} aria-required={required || undefined} disabled={disabled} {...rest}>
      {label && <legend className="cb-radio-group__legend">{label}{required && <span className="cb-field__req" aria-hidden="true" style={{ color: 'var(--status-danger)', marginLeft: 2 }}>*</span>}</legend>}
      {options.map((o, i) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        return <Radio key={i} name={gname} value={opt.value} label={opt.label} hint={opt.hint} disabled={disabled || opt.disabled}
          checked={cur === opt.value} onChange={(e) => { if (value === undefined) setInner(opt.value); onChange && onChange(opt.value, e); }} />;
      })}
      {msg && <span className="cb-radio-group__msg" id={msgId}>{msg}</span>}
    </fieldset>
  );
}
