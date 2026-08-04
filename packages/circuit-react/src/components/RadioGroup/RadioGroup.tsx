import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import './RadioGroup.css';

/* ============================================
   RadioGroup Root
   ============================================ */

export interface RadioGroupProps {
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Required state */
  required?: boolean;
  /** Name for form submission */
  name?: string;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = '', orientation = 'vertical', children, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={`ds-radio-group ds-radio-group--${orientation} ${className}`.trim()}
      orientation={orientation}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  )
);
RadioGroup.displayName = 'RadioGroup';

/* ============================================
   RadioGroup Item
   ============================================ */

export interface RadioGroupItemProps {
  /** Value for this radio item */
  value: string;
  /** Disabled state */
  disabled?: boolean;
  /** ID for label association */
  id?: string;
  /** Additional class names */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Label text (renders inline label) */
  label?: React.ReactNode;
  /** Description text below label */
  description?: React.ReactNode;
}

export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  (
    {
      className = '',
      size = 'md',
      label,
      description,
      disabled,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const radioId = id || React.useId();

    const radio = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={radioId}
        value={value}
        disabled={disabled}
        className={`ds-radio ds-radio--${size} ${className}`.trim()}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="ds-radio__indicator" />
      </RadioGroupPrimitive.Item>
    );

    if (label) {
      return (
        <div className="ds-radio-wrapper">
          <div className="ds-radio-row">
            {radio}
            <label
              htmlFor={radioId}
              className={`ds-radio-label ${disabled ? 'ds-radio-label--disabled' : ''}`}
            >
              {label}
            </label>
          </div>
          {description && (
            <p className="ds-radio-description">{description}</p>
          )}
        </div>
      );
    }

    return radio;
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export default RadioGroup;
