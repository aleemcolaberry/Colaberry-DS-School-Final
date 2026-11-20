import * as React from 'react';
/** Transient notification; fixed-bottom by default, or in-flow with `static`. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** danger/warning announce as role=alert. @default "neutral" */
  variant?: 'neutral' | 'success' | 'danger' | 'warning' | 'info';
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional inline action (e.g. an "Undo" link button). */
  action?: React.ReactNode;
  /** Shows the dismiss button and enables auto-dismiss. */
  onClose?: () => void;
  /** Auto-dismiss after this many ms (pauses on hover/focus). 0 = stay until dismissed. @default 4500 (7000 for danger) */
  duration?: number;
  static?: boolean;
}
export function Toast(props: ToastProps): JSX.Element | null;
