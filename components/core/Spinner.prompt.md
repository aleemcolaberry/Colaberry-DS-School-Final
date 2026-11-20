Spinner — for short, indeterminate waits only (a button submitting, a panel refreshing).

```jsx
<Spinner />                                   {/* inherits text color */}
<Spinner size="sm" />                         {/* inside a small button or chip */}
<Spinner tone="brand" size="lg" label="Loading your dashboard…" />  {/* centered block */}
```

Loading hierarchy: **Skeleton** for content areas that will fill in (lists, cards, tables) · **Spinner** for actions and small regions · **Progress** when the duration or step count is known. Never stack two indicators for the same wait. If a wait may exceed ~5 s, add copy ("This can take a minute") or switch to Progress.
