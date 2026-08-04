import React, { forwardRef } from 'react';
import './StatusDot.css';

export type StatusDotStatus =
  | 'pending'
  | 'running'
  | 'success'
  | 'error'
  | 'warning'
  // Job lifecycle statuses — colored via the --ds-status-* tokens
  | 'draft'
  | 'queued'
  | 'merging'
  | 'completed'
  | 'failed'
  | 'cancelled';
export type StatusDotSize = 'sm' | 'md' | 'lg';

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Current status */
  status?: StatusDotStatus;
  /** Size of the dot */
  size?: StatusDotSize;
  /** Optional label text */
  label?: string;
  /** Show pulse animation for running status */
  pulse?: boolean;
}

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  (
    {
      status = 'pending',
      size = 'md',
      label,
      pulse = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const showPulse = pulse && status === 'running';

    return (
      <span
        ref={ref}
        className={`ds-status-dot ds-status-dot--${status} ds-status-dot--${size} ${className}`.trim()}
        data-status={status}
        role="status"
        aria-label={label || `Status: ${status}`}
        {...props}
      >
        <span className="ds-status-dot__dot">
          {showPulse && <span className="ds-status-dot__pulse" />}
        </span>
        {label && <span className="ds-status-dot__label">{label}</span>}
      </span>
    );
  }
);

StatusDot.displayName = 'StatusDot';
