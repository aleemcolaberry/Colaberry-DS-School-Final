Rounded surface container for grouping content — service cards, stats, callouts.

```jsx
<Card hoverable media="/assets/service.jpg">
  <Badge tone="blue">Consulting</Badge>
  <h3>Consulting &amp; Staffing</h3>
  <p>Specialized data talent through expert recruitment.</p>
  <Button>Contact us</Button>
</Card>

<Card padded accent="green" elevation="md">…</Card>
```

`elevation`: flat / sm / md. `accent`: red / green / blue top border. Pass `media` (URL or node) for a 16:9 header — body padding is applied automatically. Use `padded` for a plain padded card, `hoverable` for clickable cards.
