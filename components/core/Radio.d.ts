import * as React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  /** Secondary line under the label. */
  hint?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}
export function Radio(props: RadioProps): JSX.Element;

export interface RadioOption { value: string; label: React.ReactNode; hint?: React.ReactNode; disabled?: boolean; }

/** Fieldset of radios with legend, helper/error text and keyboard-native behavior. */
export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Legend / question. */
  label?: React.ReactNode;
  /** Shared input name. Auto-generated when omitted. */
  name?: string;
  options: Array<RadioOption | string>;
  value?: string;
  defaultValue?: string;
  /** Called with the chosen value (and the change event). */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  /** Error message — red dots + red text, wired via aria-describedby. */
  error?: React.ReactNode;
  helperText?: React.ReactNode;
  /** @default "column" */
  direction?: 'column' | 'row';
  disabled?: boolean;
}
export function RadioGroup(props: RadioGroupProps): JSX.Element;
