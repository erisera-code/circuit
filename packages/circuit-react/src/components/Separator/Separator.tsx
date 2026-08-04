import React from 'react';
import './Separator.css';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical';
  /** Purely decorative (removes it from the accessibility tree) */
  decorative?: boolean;
  /** Additional class names */
  className?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { orientation = 'horizontal', decorative = true, className = '', ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      className={`ds-separator ds-separator--${orientation} ${className}`.trim()}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';

export default Separator;
