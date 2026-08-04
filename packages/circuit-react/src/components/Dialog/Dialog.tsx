import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import './Dialog.css';

/* ============================================
   Dialog Root
   ============================================ */

export interface DialogProps {
  /** Open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Children */
  children: React.ReactNode;
  /** Whether to render as modal (blocks interaction with rest of page) */
  modal?: boolean;
}

export const Dialog = ({ children, ...props }: DialogProps) => (
  <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
);

/* ============================================
   Dialog Trigger
   ============================================ */

export interface DialogTriggerProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(({ children, asChild }, ref) => (
  <DialogPrimitive.Trigger ref={ref} asChild={asChild}>
    {children}
  </DialogPrimitive.Trigger>
));
DialogTrigger.displayName = 'DialogTrigger';

/* ============================================
   Dialog Portal
   ============================================ */

export const DialogPortal = DialogPrimitive.Portal;

/* ============================================
   Dialog Overlay
   ============================================ */

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
}

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className = '', ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={`ds-dialog-overlay ${className}`.trim()}
      {...props}
    />
  )
);
DialogOverlay.displayName = 'DialogOverlay';

/* ============================================
   Dialog Content
   ============================================ */

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Children */
  children: React.ReactNode;
  /** Description for accessibility - auto-generated if DialogDescription not used */
  'aria-describedby'?: string;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className = '', size = 'md', children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={`ds-dialog-content ds-dialog-content--${size} ${className}`.trim()}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = 'DialogContent';

/* ============================================
   Dialog Header
   ============================================ */

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`ds-dialog-header ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

/* ============================================
   Dialog Title
   ============================================ */

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className = '', children, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`ds-dialog-title ${className}`.trim()}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  )
);
DialogTitle.displayName = 'DialogTitle';

/* ============================================
   Dialog Description
   ============================================ */

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className = '', children, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={`ds-dialog-description ${className}`.trim()}
      {...props}
    >
      {children}
    </DialogPrimitive.Description>
  )
);
DialogDescription.displayName = 'DialogDescription';

/* ============================================
   Dialog Body
   ============================================ */

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`ds-dialog-body ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
DialogBody.displayName = 'DialogBody';

/* ============================================
   Dialog Footer
   ============================================ */

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`ds-dialog-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
DialogFooter.displayName = 'DialogFooter';

/* ============================================
   Dialog Close
   ============================================ */

export interface DialogCloseProps {
  /** Render as child element */
  asChild?: boolean;
  /** Children */
  children: React.ReactNode;
}

export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, asChild }, ref) => (
    <DialogPrimitive.Close ref={ref} asChild={asChild}>
      {children}
    </DialogPrimitive.Close>
  )
);
DialogClose.displayName = 'DialogClose';

export default Dialog;
