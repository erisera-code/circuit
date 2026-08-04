import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import './Switch.css';

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
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

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
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
    const switchId = id || React.useId();

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        disabled={disabled}
        className={`ds-switch ds-switch--${size} ${className}`.trim()}
        {...props}
      >
        <SwitchPrimitive.Thumb className="ds-switch__thumb" />
      </SwitchPrimitive.Root>
    );

    if (label) {
      return (
        <div className="ds-switch-wrapper">
          <div className="ds-switch-row">
            {switchElement}
            <label
              htmlFor={switchId}
              className={`ds-switch-label ${disabled ? 'ds-switch-label--disabled' : ''}`}
            >
              {label}
            </label>
          </div>
          {description && (
            <p className="ds-switch-description">{description}</p>
          )}
        </div>
      );
    }

    return switchElement;
  }
);

Switch.displayName = 'Switch';

export default Switch;
