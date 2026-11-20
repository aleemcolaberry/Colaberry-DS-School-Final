Inline alert — a persistent message that stays in the layout until resolved. Toast is for transient confirmations; Alert is for anything the user must read or act on.

```jsx
<Alert variant="danger" title="Payment didn't go through" actions={<><Button size="sm">Retry payment</Button><Button size="sm" variant="ghost">Use another card</Button></>}>Your bank declined the card ending in 4421. No charge was made.</Alert>
<Alert variant="warning" title="Cohort is almost full">3 seats left for the Jul 13 start. Applications close Friday.</Alert>
<Alert variant="success" onClose={() => {}}>Your syllabus is on its way — check your inbox.</Alert>
<Alert variant="info" banner>Scheduled maintenance Sat 2–3 AM CT. Saved work is safe.</Alert>
```

Variants: `info`, `success`, `warning`, `danger`, `neutral`. `banner` = edge-to-edge page strip. `onClose` adds a dismiss button — only for messages that are safe to dismiss.
Copy: first line says what happened in the user's words; body says what to do next. Never blame the user ("Invalid input") — describe the fix ("Enter a 10-digit phone number").
