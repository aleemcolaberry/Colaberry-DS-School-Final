Checkbox for forms, filters, and consent — leaf-green when checked.

```jsx
<Checkbox label="Email me about new cohorts" defaultChecked />
<Checkbox label="I agree to the enrollment terms" required error="Tick this box to continue." />
<Checkbox label="Select all" indeterminate />
<Checkbox label="Text me reminders" hint="Standard rates apply. Reply STOP to opt out." />
<Checkbox label="Unavailable" disabled />
```

Pass `label` (or children) for the text, `hint` for a second line. States: `indeterminate` (dash — some children selected), `error` (red border + message, for a skipped required box), `disabled`. All native checkbox props (`checked`, `defaultChecked`, `onChange`, `required`) pass through.
