import React, { forwardRef } from 'react';
import './BackgroundPattern.css';

export type BackgroundPatternVariant = 'grid' | 'dots' | 'none';

export interface BackgroundPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pattern type */
  variant?: BackgroundPatternVariant;
  /** Pattern opacity (0-1) */
  opacity?: number;
  /** Grid/dot size in pixels */
  size?: number;
  /** Whether to position absolutely within parent */
  absolute?: boolean;
  /** Children to render on top of the pattern */
  children?: React.ReactNode;
}

export const BackgroundPattern = forwardRef<HTMLDivElement, BackgroundPatternProps>(
  (
    {
      variant = 'grid',
      opacity = 0.08,
      size = 24,
      absolute = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const patternStyle: React.CSSProperties = {
      '--ds-pattern-opacity': opacity,
      '--ds-pattern-size': `${size}px`,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`ds-background-pattern ds-background-pattern--${variant} ${absolute ? 'ds-background-pattern--absolute' : ''} ${className}`.trim()}
        style={patternStyle}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  }
);

BackgroundPattern.displayName = 'BackgroundPattern';

// ============================================
// Glow - Decorative blur effect
// ============================================

export type GlowColor = 'primary' | 'success' | 'warning' | 'error' | 'custom';

export interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glow color */
  color?: GlowColor;
  /** Custom color (hex or hsl) */
  customColor?: string;
  /** Size in rem */
  size?: number;
  /** Blur amount in pixels */
  blur?: number;
  /** Opacity (0-1) */
  opacity?: number;
  /** Position - top offset */
  top?: string | number;
  /** Position - left offset */
  left?: string | number;
  /** Position - right offset */
  right?: string | number;
  /** Position - bottom offset */
  bottom?: string | number;
}

export const Glow = forwardRef<HTMLDivElement, GlowProps>(
  (
    {
      color = 'primary',
      customColor,
      size = 20,
      blur = 60,
      opacity = 0.15,
      top,
      left,
      right,
      bottom,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const glowStyle: React.CSSProperties = {
      '--ds-glow-size': `${size}rem`,
      '--ds-glow-blur': `${blur}px`,
      '--ds-glow-opacity': opacity,
      ...(customColor && { '--ds-glow-color': customColor }),
      ...(top !== undefined && { top }),
      ...(left !== undefined && { left }),
      ...(right !== undefined && { right }),
      ...(bottom !== undefined && { bottom }),
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`ds-glow ds-glow--${color} ${className}`.trim()}
        style={glowStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Glow.displayName = 'Glow';
