import * as React from 'react';

/**
 * Colaberry button. Cherry-red primary by default.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. "confirm" = positive/submit (leaf green), "danger" = destructive (cherry), "primary" = brand CTA. @default "primary" */
  variant?: 'primary' | 'confirm' | 'danger' | 'solid' | 'outline' | 'ghost' | 'link';
  /** Brand fill tone for solid/primary buttons. @default cherry red */
  tone?: 'red' | 'green' | 'blue';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  /** In-flight state: keeps width, swaps label for a ring, sets aria-busy and blocks repeat clicks. @default false */
  loading?: boolean;
  /** Screen-reader text while loading. @default "Loading" */
  loadingLabel?: string;
  /** Icon node rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon node rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Render as a different element (e.g. 'a'). Auto-detects 'a' when href is set. */
  as?: any;
  /** When set (or as='a'), renders an anchor. */
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
