import * as React from 'react';
/** Centered modal dialog with scrim. Controlled via `open`. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: React.ReactNode;
  /** Called on Esc, close button, and (non-destructive only) scrim click. */
  onClose?: () => void;
  /** Action row. For destructive dialogs: Cancel (ghost/outline) + one danger Button. */
  footer?: React.ReactNode;
  /** Confirm-before-delete mode: role=alertdialog, warning glyph, scrim click does not dismiss. @default false */
  destructive?: boolean;
  children?: React.ReactNode;
}
export function Dialog(props: DialogProps): JSX.Element | null;
