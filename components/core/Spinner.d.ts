import * as React from 'react';

/** Circular activity indicator for short indeterminate waits. */
export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Color: inherits text color by default. @default "inherit" */
  tone?: 'inherit' | 'brand' | 'muted';
  /** When set, renders a centered block with the text under the ring and announces it politely. */
  label?: React.ReactNode;
}

export function Spinner(props: SpinnerProps): JSX.Element;
