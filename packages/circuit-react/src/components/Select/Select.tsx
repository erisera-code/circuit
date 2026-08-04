import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import './Select.css';

/* ============================================
   Select Root
   ============================================ */

export interface SelectProps {
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Required state */
  required?: boolean;
  /** Name for form submission */
  name?: string;
  /** Children */
  children: React.ReactNode;
}

export const Select = ({ children, ...props }: SelectProps) => (
  <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
);

/* ============================================
   Select Trigger
   ============================================ */

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional class names */
  className?: string;
  /** Placeholder when no value is selected */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Children (use SelectValue inside) */
  children?: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      className = '',
      placeholder,
      size = 'md',
      error,
      fullWidth,
      children,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={[
        'ds-select-trigger',
        `ds-select-trigger--${size}`,
        error && 'ds-select-trigger--error',
        fullWidth && 'ds-select-trigger--full-width',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children || <SelectPrimitive.Value placeholder={placeholder} />}
      <SelectPrimitive.Icon className="ds-select-icon">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = 'SelectTrigger';

/* ============================================
   Select Value
   ============================================ */

export const SelectValue = SelectPrimitive.Value;

/* ============================================
   Select Content
   ============================================ */

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Position relative to trigger */
  position?: 'item-aligned' | 'popper';
  /** Side when using popper position */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Side offset */
  sideOffset?: number;
  /** Children */
  children: React.ReactNode;
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      className = '',
      position = 'popper',
      sideOffset = 4,
      children,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={`ds-select-content ${className}`.trim()}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="ds-select-scroll-button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 7.5L6 4.5L3 7.5" />
          </svg>
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="ds-select-viewport">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="ds-select-scroll-button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = 'SelectContent';

/* ============================================
   Select Group
   ============================================ */

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className = '', ...props }, ref) => (
    <SelectPrimitive.Group
      ref={ref}
      className={`ds-select-group ${className}`.trim()}
      {...props}
    />
  )
);
SelectGroup.displayName = 'SelectGroup';

/* ============================================
   Select Label
   ============================================ */

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className = '', ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={`ds-select-label ${className}`.trim()}
      {...props}
    />
  )
);
SelectLabel.displayName = 'SelectLabel';

/* ============================================
   Select Item
   ============================================ */

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value for this item */
  value: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className = '', children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={`ds-select-item ${className}`.trim()}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="ds-select-item-indicator">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 6l3 3 5-6" />
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = 'SelectItem';

/* ============================================
   Select Separator
   ============================================ */

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
}

export const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className = '', ...props }, ref) => (
    <SelectPrimitive.Separator
      ref={ref}
      className={`ds-select-separator ${className}`.trim()}
      {...props}
    />
  )
);
SelectSeparator.displayName = 'SelectSeparator';

export default Select;
