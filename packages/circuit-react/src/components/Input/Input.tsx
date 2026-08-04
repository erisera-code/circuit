import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (shows error state) */
  error?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Icon to show on the left */
  iconLeft?: React.ReactNode;
  /** Icon to show on the right */
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      iconLeft,
      iconRight,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const hasError = Boolean(error);

    const wrapperClassNames = [
      'ds-input-wrapper',
      fullWidth && 'ds-input-wrapper--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputContainerClassNames = [
      'ds-input-container',
      `ds-input-container--${size}`,
      hasError && 'ds-input-container--error',
      disabled && 'ds-input-container--disabled',
      iconLeft && 'ds-input-container--has-icon-left',
      iconRight && 'ds-input-container--has-icon-right',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {label && (
          <label htmlFor={inputId} className="ds-input__label">
            {label}
          </label>
        )}
        <div className={inputContainerClassNames}>
          {iconLeft && <span className="ds-input__icon ds-input__icon--left">{iconLeft}</span>}
          <input
            ref={ref}
            id={inputId}
            className="ds-input"
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {iconRight && <span className="ds-input__icon ds-input__icon--right">{iconRight}</span>}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="ds-input__error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="ds-input__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
