Data table with a styled header and hover rows — engagements, outcomes, dashboards.

```jsx
<Table
  columns={[
    { key: 'name', header: 'Engagement' },
    { key: 'wk', header: 'Weeks', align: 'right' },
    { key: 'st', header: 'Status', render: (v) => <Badge tone="green">{v}</Badge> },
  ]}
  data={[{ name: 'Data Analytics', wk: 12, st: 'Open' }]}
/>
```

`columns` are `{ key, header, align?, render? }`; `render(value, row)` customizes a cell.
