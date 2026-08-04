import React from 'react';
import './Badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Rounded pill style */
  pill?: boolean;
  /** Show dot indicator */
  dot?: boolean;
  /** Dot color (overrides variant) */
  dotColor?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'running';
  /** Icon to display */
  icon?: React.ReactNode;
  /** Children */
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      pill = false,
      dot = false,
      dotColor,
      icon,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-badge',
      `ds-badge--${variant}`,
      `ds-badge--${size}`,
      pill && 'ds-badge--pill',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const dotClassName = [
      'ds-badge__dot',
      dotColor && `ds-badge__dot--${dotColor}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {dot && <span className={dotClassName} />}
        {icon && <span className="ds-badge__icon">{icon}</span>}
        <span className="ds-badge__text">{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
