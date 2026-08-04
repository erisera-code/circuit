import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  /** Size variant ('icon' is a square icon-only button) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon to display before text */
  iconLeft?: React.ReactNode;
  /** Icon to display after text */
  iconRight?: React.ReactNode;
  /** Render as a different element (e.g., 'a' for links) */
  as?: 'button' | 'a';
  /** Href for link buttons */
  href?: string;
  /** Children */
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      iconLeft,
      iconRight,
      as = 'button',
      href,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-button',
      `ds-button--${variant}`,
      `ds-button--${size}`,
      fullWidth && 'ds-button--full-width',
      loading && 'ds-button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading && (
          <span className="ds-button__spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          </span>
        )}
        {iconLeft && !loading && <span className="ds-button__icon ds-button__icon--left">{iconLeft}</span>}
        <span className="ds-button__text">{children}</span>
        {iconRight && <span className="ds-button__icon ds-button__icon--right">{iconRight}</span>}
      </>
    );

    if (as === 'a' && href) {
      return (
        <a href={href} className={classNames} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
