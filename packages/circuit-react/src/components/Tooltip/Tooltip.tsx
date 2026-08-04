import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import './Tooltip.css';

/* ============================================
   Tooltip Provider
   ============================================ */

export interface TooltipProviderProps {
  /** Delay before showing tooltip (ms) */
  delayDuration?: number;
  /** Delay before hiding when moving to another trigger (ms) */
  skipDelayDuration?: number;
  /** Disable hover card behavior */
  disableHoverableContent?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const TooltipProvider = ({
  delayDuration = 400,
  skipDelayDuration = 300,
  ...props
}: TooltipProviderProps) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    {...props}
  />
);

/* ============================================
   Tooltip Root
   ============================================ */

export interface TooltipProps {
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay before showing (ms) */
  delayDuration?: number;
  /** Disable closing on click */
  disableHoverableContent?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const Tooltip = ({ children, ...props }: TooltipProps) => (
  <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
);

/* ============================================
   Tooltip Trigger
   ============================================ */

export interface TooltipTriggerProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ children, asChild = true }, ref) => (
    <TooltipPrimitive.Trigger ref={ref} asChild={asChild}>
      {children}
    </TooltipPrimitive.Trigger>
  )
);
TooltipTrigger.displayName = 'TooltipTrigger';

/* ============================================
   Tooltip Content
   ============================================ */

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side relative to trigger */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Offset from trigger */
  sideOffset?: number;
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      className = '',
      side = 'top',
      sideOffset = 4,
      align = 'center',
      children,
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={`ds-tooltip-content ${className}`.trim()}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="ds-tooltip-arrow" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = 'TooltipContent';

/* ============================================
   Simple Tooltip (all-in-one convenience component)
   ============================================ */

export interface SimpleTooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Side relative to trigger */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
  /** Delay before showing (ms) */
  delayDuration?: number;
  /** Children (trigger element) */
  children: React.ReactNode;
}

export const SimpleTooltip = ({
  content,
  side = 'top',
  align = 'center',
  delayDuration,
  children,
}: SimpleTooltipProps) => (
  <Tooltip delayDuration={delayDuration}>
    <TooltipTrigger>{children}</TooltipTrigger>
    <TooltipContent side={side} align={align}>
      {content}
    </TooltipContent>
  </Tooltip>
);

export default Tooltip;
