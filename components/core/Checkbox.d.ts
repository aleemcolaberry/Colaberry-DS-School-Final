import * as React from 'react';

/** Checkbox with a leaf-green checked state. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text beside the box (or pass children). */
  label?: React.ReactNode;
  /** Secondary line under the label. */
  hint?: React.ReactNode;
  /** Error message (replaces hint, red border, aria-invalid) — e.g. a skipped consent box. */
  error?: React.ReactNode;
  /** "Some selected" dash state for select-all headers. @default false */
  indeterminate?: boolean;
  disabled?: boolean;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
