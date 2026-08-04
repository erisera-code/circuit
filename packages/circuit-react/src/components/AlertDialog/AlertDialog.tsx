import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import './AlertDialog.css';

/* ============================================
   AlertDialog Root
   ============================================ */

export interface AlertDialogProps {
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialog = ({ children, ...props }: AlertDialogProps) => (
  <AlertDialogPrimitive.Root {...props}>{children}</AlertDialogPrimitive.Root>
);

/* ============================================
   AlertDialog Trigger
   ============================================ */

export interface AlertDialogTriggerProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ children, asChild }, ref) => (
    <AlertDialogPrimitive.Trigger ref={ref} asChild={asChild}>
      {children}
    </AlertDialogPrimitive.Trigger>
  )
);
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

/* ============================================
   AlertDialog Portal
   ============================================ */

export const AlertDialogPortal = AlertDialogPrimitive.Portal;

/* ============================================
   AlertDialog Overlay
   ============================================ */

export interface AlertDialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
}

export const AlertDialogOverlay = React.forwardRef<HTMLDivElement, AlertDialogOverlayProps>(
  ({ className = '', ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={`ds-alert-dialog-overlay ${className}`.trim()}
      {...props}
    />
  )
);
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

/* ============================================
   AlertDialog Content
   ============================================ */

export interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className = '', size = 'sm', children, ...props }, ref) => (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={`ds-alert-dialog-content ds-alert-dialog-content--${size} ${className}`.trim()}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  )
);
AlertDialogContent.displayName = 'AlertDialogContent';

/* ============================================
   AlertDialog Header
   ============================================ */

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`ds-alert-dialog-header ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

/* ============================================
   AlertDialog Title
   ============================================ */

export interface AlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className = '', children, ...props }, ref) => (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={`ds-alert-dialog-title ${className}`.trim()}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Title>
  )
);
AlertDialogTitle.displayName = 'AlertDialogTitle';

/* ============================================
   AlertDialog Description
   ============================================ */

export interface AlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className = '', children, ...props }, ref) => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={`ds-alert-dialog-description ${className}`.trim()}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Description>
  )
);
AlertDialogDescription.displayName = 'AlertDialogDescription';

/* ============================================
   AlertDialog Footer
   ============================================ */

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`ds-alert-dialog-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

/* ============================================
   AlertDialog Action
   ============================================ */

export interface AlertDialogActionProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ children, asChild }, ref) => (
    <AlertDialogPrimitive.Action ref={ref} asChild={asChild}>
      {children}
    </AlertDialogPrimitive.Action>
  )
);
AlertDialogAction.displayName = 'AlertDialogAction';

/* ============================================
   AlertDialog Cancel
   ============================================ */

export interface AlertDialogCancelProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ children, asChild }, ref) => (
    <AlertDialogPrimitive.Cancel ref={ref} asChild={asChild}>
      {children}
    </AlertDialogPrimitive.Cancel>
  )
);
AlertDialogCancel.displayName = 'AlertDialogCancel';

export default AlertDialog;
