import * as React from 'react';

/** Inline, persistent status message (not a toast). */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** danger/warning announce as role=alert; others as role=status. @default "info" */
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  title?: React.ReactNode;
  /** Message body. Keep to 1–2 sentences; say what happened and what to do. */
  children?: React.ReactNode;
  /** Buttons rendered under the message (e.g. Retry · Contact support). */
  actions?: React.ReactNode;
  /** Shows a dismiss (×) button. */
  onClose?: () => void;
  /** Full-width edge-to-edge strip (page-top notices). @default false */
  banner?: boolean;
}

export function Alert(props: AlertProps): JSX.Element;
