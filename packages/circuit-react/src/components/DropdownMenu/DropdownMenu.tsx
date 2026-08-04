import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import './DropdownMenu.css';

/* ============================================
   DropdownMenu Root
   ============================================ */

export interface DropdownMenuProps {
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether menu should be modal */
  modal?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
);

/* ============================================
   DropdownMenu Trigger
   ============================================ */

export interface DropdownMenuTriggerProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, asChild }, ref) => (
    <DropdownMenuPrimitive.Trigger ref={ref} asChild={asChild}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

/* ============================================
   DropdownMenu Content
   ============================================ */

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  (
    {
      className = '',
      side = 'bottom',
      sideOffset = 4,
      align = 'start',
      children,
      ...props
    },
    ref
  ) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={`ds-dropdown-content ${className}`.trim()}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

/* ============================================
   DropdownMenu Item
   ============================================ */

export interface DropdownMenuItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Disabled state */
  disabled?: boolean;
  /** Callback when selected */
  onSelect?: (event: Event) => void;
  /** Prevent closing on select */
  preventClose?: boolean;
  /** Visual variant */
  variant?: 'default' | 'destructive';
  /** Render as child element (e.g. a router link) */
  asChild?: boolean;
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className = '', preventClose, onSelect, variant = 'default', asChild, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      asChild={asChild}
      className={[
        'ds-dropdown-item',
        variant === 'destructive' && 'ds-dropdown-item--destructive',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onSelect={(e) => {
        if (preventClose) e.preventDefault();
        onSelect?.(e);
      }}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

/* ============================================
   DropdownMenu Label
   ============================================ */

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className = '', ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={`ds-dropdown-label ${className}`.trim()}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

/* ============================================
   DropdownMenu Separator
   ============================================ */

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
}

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className = '', ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`ds-dropdown-separator ${className}`.trim()}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/* ============================================
   DropdownMenu Group
   ============================================ */

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/* ============================================
   DropdownMenu Shortcut (visual-only)
   ============================================ */

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Children (shortcut text) */
  children: React.ReactNode;
}

export const DropdownMenuShortcut = ({
  className = '',
  ...props
}: DropdownMenuShortcutProps) => (
  <span className={`ds-dropdown-shortcut ${className}`.trim()} {...props} />
);

export default DropdownMenu;
