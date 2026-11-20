Toast — a transient notification that slides in bottom-center. For confirmations and brief status; anything the user must read or act on belongs in an inline `Alert` instead.

```jsx
const [open, setOpen] = React.useState(false);
<Toast open={open} variant="success" title="Application sent" onClose={() => setOpen(false)}>
  We'll be in touch within a day.
</Toast>
<Toast open={gone} variant="neutral" title="Draft deleted" action={<Button size="sm" variant="link" onClick={undo}>Undo</Button>} onClose={() => setGone(false)} />
<Toast open={err} variant="danger" title="Couldn't save" duration={0} onClose={() => setErr(false)}>Check your connection and try again.</Toast>
```

`variant`: neutral (default), success, danger, warning, info — danger/warning announce as `role=alert`. Controlled via `open`. Auto-dismisses after `duration` ms (default 4.5 s, 7 s for danger; pauses on hover/focus; `0` = sticky). `action` renders an inline button (Undo, View). Pass `static` to render in normal flow.
Rules: one toast at a time; never put the only path to recovery in a toast — it disappears.
