import * as React from 'react';

/**
 * Empty state for lists, tables, searches, dashboards and failed loads.
 * One title, one sentence, one primary next step.
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon + tone. "search" = no results, "error" = failed to load (role=alert), "offline" = no connection. @default "default" */
  kind?: 'default' | 'search' | 'error' | 'offline';
  /** Custom icon node (overrides the built-in glyph). */
  icon?: React.ReactNode;
  /** Plain-language headline, e.g. "No assignments yet". */
  title?: React.ReactNode;
  /** One sentence: why it's empty and/or what happens next. */
  description?: React.ReactNode;
  /** Primary next step — usually a <Button>. */
  action?: React.ReactNode;
  /** Optional secondary step — usually a ghost/link <Button>. */
  secondaryAction?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Drop the dashed container (when it already sits inside a Card or table). @default false */
  plain?: boolean;
  children?: React.ReactNode;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
