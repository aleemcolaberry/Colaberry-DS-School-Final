Centered modal dialog with scrim — confirmations, short forms, destructive confirms. Locks scroll, traps and restores focus, closes on Esc.

```jsx
const [open, setOpen] = React.useState(false);
<Dialog open={open} title="Confirm enrollment" onClose={() => setOpen(false)}
  footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={confirm}>Confirm</Button></>}>
  Ready to start the Data Analytics program?
</Dialog>

<Dialog open={del} destructive title="Delete this draft?" onClose={() => setDel(false)}
  footer={<><Button variant="outline" onClick={() => setDel(false)}>Keep draft</Button><Button variant="danger" loading={deleting} onClick={remove}>Delete</Button></>}>
  “Capstone outline” will be removed for everyone in your team. This can't be undone.
</Dialog>
```

Controlled via `open`; title is announced via `aria-labelledby`. `destructive` = `alertdialog` with a warning glyph and no scrim-click dismiss — pair a specific cancel label ("Keep draft") with one `variant="danger"` button that names the action ("Delete"), never "OK".
