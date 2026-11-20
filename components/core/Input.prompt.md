Labelled text input for forms — enrollment, contact, search.

```jsx
<Input label="Full name" placeholder="Ada Lovelace" required autoComplete="name" />
<Input label="Email" type="email" inputMode="email" autoComplete="email" helperText="We'll send your catalog here." />
<Input label="Phone" type="tel" inputMode="tel" optional />
<Input label="Why data?" multiline rows={3} />
<Input label="Phone" error="Enter a 10-digit number, like 972 555 0144." defaultValue="123" />
<Input label="Username" success="Available" defaultValue="ada.l" />
```

Sizes `sm` / `md` / `lg`. States: `helperText` (neutral guidance), `error` (red + icon + announced; say how to fix, not "invalid"), `success` (`true` = border only, string = confirmation line — use after async checks, not on every keystroke), `disabled` (greyed, not-allowed cursor). `optional` adds "(optional)" — mark the few optional fields rather than starring all required ones. Always pass `type`, `inputMode` and `autoComplete` so mobile keyboards and autofill behave.
