import React, { forwardRef } from 'react';
import './LinkButton.css';

export type LinkButtonVariant = 'default' | 'muted' | 'primary';
export type LinkButtonSize = 'sm' | 'md' | 'lg';
export type LinkButtonArrow = 'right' | 'down' | 'external' | 'none';

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual style variant */
  variant?: LinkButtonVariant;
  /** Size of the link */
  size?: LinkButtonSize;
  /** Arrow indicator direction */
  arrow?: LinkButtonArrow;
  /** Icon to show before the text */
  iconLeft?: React.ReactNode;
  /** Custom arrow/icon to show after text */
  iconRight?: React.ReactNode;
}

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const getArrowIcon = (arrow: LinkButtonArrow) => {
  switch (arrow) {
    case 'right':
      return <ArrowRight />;
    case 'down':
      return <ArrowDown />;
    case 'external':
      return <ExternalIcon />;
    default:
      return null;
  }
};

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      arrow = 'right',
      iconLeft,
      iconRight,
      className = '',
      ...props
    },
    ref
  ) => {
    const arrowIcon = iconRight || getArrowIcon(arrow);

    return (
      <a
        ref={ref}
        className={`ds-link-button ds-link-button--${variant} ds-link-button--${size} ${className}`.trim()}
        {...props}
      >
        {iconLeft && <span className="ds-link-button__icon-left">{iconLeft}</span>}
        <span className="ds-link-button__text">{children}</span>
        {arrowIcon && <span className="ds-link-button__icon-right">{arrowIcon}</span>}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
