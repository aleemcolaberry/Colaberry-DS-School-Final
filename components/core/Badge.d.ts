import * as React from 'react';

/** Small status / category label. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Soft-tint color. @default "neutral" */
  tone?: 'neutral' | 'red' | 'green' | 'blue' | 'cyan' | 'warning';
  /** Solid teal brand emphasis pill. @default false */
  solid?: boolean;
  /** Outlined style. @default false */
  outline?: boolean;
  /** Leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
