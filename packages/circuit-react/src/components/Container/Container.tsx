import React from 'react';
import './Container.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Center content horizontally */
  center?: boolean;
  /** Add horizontal padding */
  padded?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'lg',
      center = true,
      padded = true,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-container',
      `ds-container--${size}`,
      center && 'ds-container--center',
      padded && 'ds-container--padded',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
