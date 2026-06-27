Centered modal dialog with scrim — confirmations, forms. Locks scroll, manages focus, closes on scrim-click or Esc.

```jsx
const [open, setOpen] = React.useState(false);
<Dialog open={open} title="Confirm request" onClose={() => setOpen(false)}
  footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={confirm}>Confirm</Button></>}>
  Ready to start your data engagement?
</Dialog>
```

Controlled via `open`. Provide `footer` for action buttons; the title is announced via `aria-labelledby`.
