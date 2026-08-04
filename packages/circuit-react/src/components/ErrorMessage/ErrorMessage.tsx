import React from 'react';
import './ErrorMessage.css';

export interface ErrorMessageProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message: string;
  /** Variant style */
  variant?: 'inline' | 'banner' | 'card';
  /** Show icon */
  showIcon?: boolean;
  /** Action to retry */
  onRetry?: () => void;
  /** Custom retry text */
  retryText?: string;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Additional class name */
  className?: string;
}

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  variant = 'inline',
  showIcon = true,
  onRetry,
  retryText = 'Try again',
  onDismiss,
  className = '',
}) => {
  const classNames = ['ds-error', `ds-error--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert">
      {showIcon && (
        <span className="ds-error__icon">
          <ErrorIcon />
        </span>
      )}
      <div className="ds-error__content">
        {title && <h4 className="ds-error__title">{title}</h4>}
        <p className="ds-error__message">{message}</p>
        {onRetry && (
          <button type="button" className="ds-error__retry" onClick={onRetry}>
            {retryText}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="ds-error__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
