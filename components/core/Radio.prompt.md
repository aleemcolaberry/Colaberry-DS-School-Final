Radio group — for picking ONE of 2–4 visible options (format, payment plan, schedule). For 5+ options use Select; for independent yes/no items use Checkbox.

```jsx
<RadioGroup label="How will you attend?" defaultValue="live" options={[
  { value: 'live', label: 'Live online', hint: 'Tue & Thu evenings, CT' },
  { value: 'campus', label: 'On campus — Plano, TX' },
  { value: 'self', label: 'Self-paced', hint: 'Start any Monday' },
]} />
<RadioGroup label="Payment plan" direction="row" required error="Choose a plan to continue." options={['Pay upfront', 'Monthly', 'Income share']} />
```

`RadioGroup` renders a `<fieldset>` + `<legend>`; arrow keys move between options natively. Props: `label`, `options`, `value`/`onChange(value)` or `defaultValue`, `required`, `helperText`, `error`, `direction` (`column` | `row`), `disabled`. `<Radio>` is also exported for custom layouts.
