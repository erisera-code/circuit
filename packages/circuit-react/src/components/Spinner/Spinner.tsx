import React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white';
  /** Accessible label */
  label?: string;
  /** Additional class name */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  label = 'Loading...',
  className = '',
}) => {
  const classNames = [
    'ds-spinner',
    `ds-spinner--${size}`,
    `ds-spinner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="status" aria-label={label}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          className="ds-spinner__track"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="2"
        />
        <path
          className="ds-spinner__indicator"
          d="M12 2a10 10 0 0 1 10 10"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="ds-sr-only">{label}</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
