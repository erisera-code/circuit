import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import './Popover.css';

/* ============================================
   Popover Root
   ============================================ */

export interface PopoverProps {
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the popover should be modal */
  modal?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const Popover = ({ children, ...props }: PopoverProps) => (
  <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
);

/* ============================================
   Popover Trigger
   ============================================ */

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ children, asChild, ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} asChild={asChild} {...props}>
    {children}
  </PopoverPrimitive.Trigger>
));
PopoverTrigger.displayName = 'PopoverTrigger';

/* ============================================
   Popover Anchor
   ============================================ */

export const PopoverAnchor = PopoverPrimitive.Anchor;

/* ============================================
   Popover Content
   ============================================ */

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(
  (
    { className = '', side = 'bottom', sideOffset = 4, align = 'center', children, ...props },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={`ds-popover-content ${className}`.trim()}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';

/* ============================================
   Popover Header / Title / Description
   ============================================ */

export interface PopoverHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PopoverHeader = React.forwardRef<
  HTMLDivElement,
  PopoverHeaderProps
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`ds-popover-header ${className}`.trim()}
    {...props}
  />
));
PopoverHeader.displayName = 'PopoverHeader';

export interface PopoverTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PopoverTitle = React.forwardRef<HTMLDivElement, PopoverTitleProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`ds-popover-title ${className}`.trim()}
      {...props}
    />
  )
);
PopoverTitle.displayName = 'PopoverTitle';

export interface PopoverDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>(({ className = '', ...props }, ref) => (
  <p
    ref={ref}
    className={`ds-popover-description ${className}`.trim()}
    {...props}
  />
));
PopoverDescription.displayName = 'PopoverDescription';

export default Popover;
