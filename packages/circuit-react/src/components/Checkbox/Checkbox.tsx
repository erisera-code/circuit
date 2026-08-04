import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import './Checkbox.css';

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean | 'indeterminate';
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  /** Disabled state */
  disabled?: boolean;
  /** Required state */
  required?: boolean;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
  /** Additional class names */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** ID for label association */
  id?: string;
  /** Label text (renders inline label) */
  label?: React.ReactNode;
  /** Description text below label */
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className = '',
      size = 'md',
      label,
      description,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || React.useId();

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        disabled={disabled}
        className={`ds-checkbox ds-checkbox--${size} ${className}`.trim()}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="ds-checkbox__indicator">
          <svg
            className="ds-checkbox__icon ds-checkbox__icon--check"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6l3 3 5-6" />
          </svg>
          <svg
            className="ds-checkbox__icon ds-checkbox__icon--indeterminate"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 6h8" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (label) {
      return (
        <div className="ds-checkbox-wrapper">
          <div className="ds-checkbox-row">
            {checkbox}
            <label
              htmlFor={checkboxId}
              className={`ds-checkbox-label ${disabled ? 'ds-checkbox-label--disabled' : ''}`}
            >
              {label}
            </label>
          </div>
          {description && (
            <p className="ds-checkbox-description">{description}</p>
          )}
        </div>
      );
    }

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
