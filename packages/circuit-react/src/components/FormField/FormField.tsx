import React from 'react';
import { Label } from '../Label';
import './FormField.css';

export interface FormFieldProps {
  /** Field label */
  label?: React.ReactNode;
  /** Field description/helper text */
  description?: React.ReactNode;
  /** Error message */
  error?: React.ReactNode;
  /** Required indicator */
  required?: boolean;
  /** Optional indicator */
  optional?: boolean;
  /** ID for the input (for label association) */
  htmlFor?: string;
  /** Additional class names */
  className?: string;
  /** Children (the form control) */
  children: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      error,
      required,
      optional,
      htmlFor,
      className = '',
      children,
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div
        ref={ref}
        className={`ds-form-field ${hasError ? 'ds-form-field--error' : ''} ${className}`.trim()}
      >
        {label && (
          <Label htmlFor={htmlFor} required={required} optional={optional}>
            {label}
          </Label>
        )}
        {description && (
          <p className="ds-form-field__description">{description}</p>
        )}
        <div className="ds-form-field__control">{children}</div>
        {error && <p className="ds-form-field__error">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

/* ============================================
   Inline FormField (for checkbox/radio layouts)
   ============================================ */

export interface FormFieldInlineProps {
  /** Error message */
  error?: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Children (the form controls) */
  children: React.ReactNode;
}

export const FormFieldInline = React.forwardRef<HTMLDivElement, FormFieldInlineProps>(
  ({ error, className = '', children }, ref) => {
    const hasError = Boolean(error);

    return (
      <div
        ref={ref}
        className={`ds-form-field-inline ${hasError ? 'ds-form-field-inline--error' : ''} ${className}`.trim()}
      >
        <div className="ds-form-field-inline__controls">{children}</div>
        {error && <p className="ds-form-field__error">{error}</p>}
      </div>
    );
  }
);

FormFieldInline.displayName = 'FormFieldInline';

export default FormField;
