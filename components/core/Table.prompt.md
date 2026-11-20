Data table with a styled header and hover rows — cohorts, outcomes, dashboards. Handles its own loading, empty and error states.

```jsx
<Table
  caption={{ text: 'Open cohorts', visuallyHidden: true }}
  columns={[
    { key: 'name', header: 'Cohort' },
    { key: 'wk', header: 'Weeks', align: 'right' },
    { key: 'st', header: 'Status', render: (v) => <Badge tone="green">{v}</Badge> },
  ]}
  data={rows}
  loading={isLoading}
  emptyTitle="No cohorts match"
  emptyDescription="Clear the filters to see every start date."
  error={failed && "Couldn't load cohorts"}
  onRetry={refetch}
/>
```

`columns` are `{ key, header, align?, render? }`; `render(value, row)` customizes a cell.
States: `loading` → shimmering skeleton rows (`loadingRows`, default 4) and `aria-busy`; `data=[]` → built-in empty message (`emptyTitle` / `emptyDescription`) or your own `emptyState` node (e.g. `<EmptyState plain size="sm" />`); `error` → red message with optional `onRetry` button. Always pass a `caption` so the table has a name.
