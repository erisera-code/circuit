import React, { forwardRef } from 'react';
import './IconButton.css';

export type IconButtonVariant = 'default' | 'ghost' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon to display */
  icon: React.ReactNode;
  /** Visual style variant */
  variant?: IconButtonVariant;
  /** Size of the button */
  size?: IconButtonSize;
  /** Accessible label (required for icon-only buttons) */
  'aria-label': string;
  /** Render as a different element (e.g., 'a' for links) */
  as?: 'button' | 'a';
  /** URL if rendered as a link */
  href?: string;
  /** Link target */
  target?: string;
  /** Link rel attribute */
  rel?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'default',
      size = 'md',
      className = '',
      as = 'button',
      href,
      target,
      rel,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = `ds-icon-button ds-icon-button--${variant} ds-icon-button--${size} ${className}`.trim();

    if (as === 'a' && href) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anchorRef = ref as any;
      return (
        <a
          ref={anchorRef}
          href={href}
          target={target}
          rel={rel}
          className={classes}
          aria-disabled={disabled}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {icon}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
