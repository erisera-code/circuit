import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '../AlertDialog';
import { Button } from '../Button';

/*
 * ConfirmDialog — AlertDialog-based confirmation composite.
 *
 * Fully controlled: the parent owns `isOpen` and decides when to close
 * (typically after the confirmed action resolves). Escape / overlay
 * dismissal calls `onCancel`. While `isLoading` both buttons are locked
 * so the dialog cannot be dismissed mid-action.
 */

export interface ConfirmDialogProps {
  /** Whether the dialog is visible */
  isOpen: boolean;
  /** Dialog title */
  title: string;
  /** Dialog body message */
  message: React.ReactNode;
  /** Confirm button label */
  confirmLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Visual intent of the confirm action */
  variant?: 'default' | 'destructive';
  /** Show a loading state on the confirm button and lock the dialog */
  isLoading?: boolean;
  /** Called when the user confirms */
  onConfirm: () => void;
  /** Called when the user cancels or dismisses */
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  isLoading = false,
  onConfirm,
  onCancel,
}) => (
  <AlertDialog
    open={isOpen}
    onOpenChange={(open) => {
      if (!open && !isLoading) onCancel();
    }}
  >
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={variant === 'destructive' ? 'danger' : 'primary'}
          size="sm"
          onClick={onConfirm}
          loading={isLoading}
        >
          {confirmLabel}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
