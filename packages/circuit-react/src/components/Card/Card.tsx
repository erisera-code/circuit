import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Enable hover effect */
  hoverable?: boolean;
  /** Make card clickable */
  clickable?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-card',
      `ds-card--${variant}`,
      `ds-card--padding-${padding}`,
      hoverable && 'ds-card--hoverable',
      clickable && 'ds-card--clickable',
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

Card.displayName = 'Card';

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title */
  title?: React.ReactNode;
  /** Header subtitle */
  subtitle?: React.ReactNode;
  /** Action element (button, menu, etc.) */
  action?: React.ReactNode;
  /** Children (overrides title/subtitle) */
  children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className = '', ...props }, ref) => {
    const classNames = ['ds-card__header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children || (
          <>
            <div className="ds-card__header-content">
              {title && <h3 className="ds-card__title">{title}</h3>}
              {subtitle && <p className="ds-card__subtitle">{subtitle}</p>}
            </div>
            {action && <div className="ds-card__header-action">{action}</div>}
          </>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Children */
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    const classNames = ['ds-card__body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Align content */
  align?: 'left' | 'center' | 'right' | 'between';
  /** Children */
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'right', children, className = '', ...props }, ref) => {
    const classNames = ['ds-card__footer', `ds-card__footer--${align}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
