import * as React from 'react';
export interface Column { key: string; header: React.ReactNode; align?: 'left' | 'right'; render?: (value: any, row: any) => React.ReactNode; }
/** Data table with hover, zebra striping, and built-in loading / empty / error states. */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: Column[];
  data: any[];
  hover?: boolean;
  striped?: boolean;
  /** Visible caption, or `{ text, visuallyHidden: true }` for screen readers only. Always give the table a name. */
  caption?: React.ReactNode | { text: React.ReactNode; visuallyHidden?: boolean };
  /** Show shimmering skeleton rows (sets aria-busy). */
  loading?: boolean;
  /** @default 4 */
  loadingRows?: number;
  /** Custom node for the empty body (e.g. an <EmptyState plain />). */
  emptyState?: React.ReactNode;
  /** @default "Nothing here yet" */
  emptyTitle?: React.ReactNode;
  emptyDescription?: React.ReactNode;
  /** Failed-load state. `true` uses the default message; a string replaces it. */
  error?: boolean | string;
  /** Shows a "Try again" button in the error state. */
  onRetry?: () => void;
}
export function Table(props: TableProps): JSX.Element;
