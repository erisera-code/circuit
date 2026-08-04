// ============================================
// PRIMITIVES
// ============================================

// Button
export { Button, type ButtonProps } from './Button';

// Badge
export { Badge, type BadgeProps } from './Badge';

// IconButton
export { IconButton, type IconButtonProps, type IconButtonVariant, type IconButtonSize } from './IconButton';

// LinkButton
export { LinkButton, type LinkButtonProps, type LinkButtonVariant, type LinkButtonSize, type LinkButtonArrow } from './LinkButton';

// ============================================
// FORMS
// ============================================

// Input
export { Input, type InputProps } from './Input';

// Textarea
export { Textarea, type TextareaProps } from './Textarea';

// Label
export { Label, type LabelProps } from './Label';

// FormField
export { FormField, FormFieldInline, type FormFieldProps, type FormFieldInlineProps } from './FormField';

// Checkbox
export { Checkbox, type CheckboxProps } from './Checkbox';

// RadioGroup
export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps } from './RadioGroup';

// Select
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectProps,
  type SelectTriggerProps,
  type SelectContentProps,
  type SelectGroupProps,
  type SelectLabelProps,
  type SelectItemProps,
  type SelectSeparatorProps,
} from './Select';

// Switch
export { Switch, type SwitchProps } from './Switch';

// ============================================
// FEEDBACK
// ============================================

// Spinner
export { Spinner, type SpinnerProps } from './Spinner';

// StatusDot
export { StatusDot, type StatusDotProps, type StatusDotStatus, type StatusDotSize } from './StatusDot';

// ErrorMessage
export { ErrorMessage, type ErrorMessageProps } from './ErrorMessage';

// EmptyState
export { EmptyState, type EmptyStateProps } from './EmptyState';

// Toast
export {
  ToastProvider,
  Toast,
  useToast,
  type ToastProviderProps,
  type ToastProps,
  type ToastData,
  type ToastVariant,
  type ToastContextValue,
} from './Toast';

// ============================================
// OVERLAYS
// ============================================

// Popover
export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverHeaderProps,
  type PopoverTitleProps,
  type PopoverDescriptionProps,
} from './Popover';

// ConfirmDialog
export { ConfirmDialog, type ConfirmDialogProps } from './ConfirmDialog';

// Dialog
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  type DialogProps,
  type DialogTriggerProps,
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogBodyProps,
  type DialogFooterProps,
  type DialogCloseProps,
} from './Dialog';

// AlertDialog
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogProps,
  type AlertDialogTriggerProps,
  type AlertDialogOverlayProps,
  type AlertDialogContentProps,
  type AlertDialogHeaderProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogFooterProps,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
} from './AlertDialog';

// Tooltip
export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type SimpleTooltipProps,
} from './Tooltip';

// DropdownMenu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
} from './DropdownMenu';

// ============================================
// DATA DISPLAY
// ============================================

// Avatar
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarSize,
} from './Avatar';

// Terminal
export { Terminal, TerminalLine, type TerminalProps, type TerminalLineProps } from './Terminal';

// Card
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
} from './Card';

// CodeBlock
export {
  CodeBlock,
  CommandLine,
  type CodeBlockProps,
  type CodeBlockVariant,
  type CommandLineProps,
} from './CodeBlock';

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionSingleProps,
  type AccordionMultipleProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './Accordion';

// ============================================
// NAVIGATION
// ============================================

// Tabs
export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  type TabsProps,
  type TabListProps,
  type TabProps,
  type TabPanelProps,
  type TabsVariant,
} from './Tabs';

// ============================================
// LAYOUT
// ============================================

// Container
export { Container, type ContainerProps } from './Container';

// Separator
export { Separator, type SeparatorProps } from './Separator';

// BackgroundPattern
export {
  BackgroundPattern,
  Glow,
  type BackgroundPatternProps,
  type BackgroundPatternVariant,
  type GlowProps,
  type GlowColor,
} from './BackgroundPattern';
