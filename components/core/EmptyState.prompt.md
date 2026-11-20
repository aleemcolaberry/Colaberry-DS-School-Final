Empty state — show whenever a list, table, search, or dashboard panel has nothing to render. Never leave a blank area.

```jsx
<EmptyState title="No assignments yet" description="Your mentor posts the first one after orientation." action={<Button size="sm">View schedule</Button>} />
<EmptyState kind="search" title="No matches for “dbt”" description="Try a shorter keyword or clear the filters." action={<Button size="sm" variant="outline">Clear filters</Button>} />
<EmptyState kind="error" title="Couldn't load your projects" description="Check your connection and try again." action={<Button size="sm">Retry</Button>} />
<EmptyState kind="offline" size="sm" plain title="You're offline" description="We'll sync when you're back." />
```

Kinds: `default` (first-run / nothing yet), `search` (no results), `error` (failed load — announces as alert), `offline`.
Rules: title says what's missing in the user's words; description is one sentence; `action` is ONE clear next step (`secondaryAction` optional). Use `plain` inside a Card/Table; `size="sm"` for sidebars and small panels.
