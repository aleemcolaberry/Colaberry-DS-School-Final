import * as React from 'react';

export interface SelectOption { value: string; label: React.ReactNode; disabled?: boolean; }

/** Native select with the Input field anatomy (label · helper · error · success). */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: React.ReactNode;
  required?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Error message — turns the border red and wires aria-invalid/aria-describedby. */
  error?: React.ReactNode;
  /** Green border once the value is confirmed valid (use sparingly, after server/async checks). */
  success?: boolean;
  helperText?: React.ReactNode;
  /** Unselectable first row shown while nothing is chosen. */
  placeholder?: string;
  /** Option list — objects or plain strings. */
  options?: Array<SelectOption | string>;
}

export function Select(props: SelectProps): JSX.Element;
