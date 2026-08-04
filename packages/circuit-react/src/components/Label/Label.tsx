import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import './Label.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Additional class names */
  className?: string;
  /** Required indicator */
  required?: boolean;
  /** Optional indicator text */
  optional?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', required, optional, children, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={`ds-label ${className}`.trim()}
      {...props}
    >
      {children}
      {required && <span className="ds-label__required" aria-hidden="true">*</span>}
      {optional && <span className="ds-label__optional">(optional)</span>}
    </LabelPrimitive.Root>
  )
);

Label.displayName = 'Label';

export default Label;
