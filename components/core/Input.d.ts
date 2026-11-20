import * as React from 'react';

/** Labelled text input / textarea with helper, error and success states. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Show a red required asterisk and set the native required attribute. @default false */
  required?: boolean;
  /** Append "(optional)" to the label. @default false */
  optional?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Error message — red border, icon, aria-invalid, announced as alert. Tell the user how to fix it. */
  error?: React.ReactNode;
  /** `true` = green border only; a string = green border + confirmation message ("Email is available"). */
  success?: boolean | string;
  /** Helper text shown below when there is no error/success message. */
  helperText?: React.ReactNode;
  /** Render a multi-line textarea. @default false */
  multiline?: boolean;
}

export function Input(props: InputProps): JSX.Element;
