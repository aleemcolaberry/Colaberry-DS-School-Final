Select — a native dropdown that matches Input. Use for 5–15 fixed choices; for 2–4 use Radio; for free text use Input.

```jsx
<Select label="Program" placeholder="Choose a program" required options={['Data Analytics', 'Data Science', 'AI Architect Accelerator']} />
<Select label="Start date" options={[{ value: 'jul', label: 'Jul 13, 2026' }, { value: 'sep', label: 'Sep 14, 2026' }, { value: 'wait', label: 'Waitlist (full)', disabled: true }]} helperText="You can switch cohorts until week 1." />
<Select label="State" error="Pick the state you'll study from." options={states} />
```

Props mirror Input: `label`, `required`, `helperText`, `error`, `success`, `size` (`sm` | `md`). Works controlled (`value`/`onChange`) or uncontrolled (`defaultValue`).
