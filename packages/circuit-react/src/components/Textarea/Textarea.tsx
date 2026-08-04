import React from 'react';
import './Textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Additional class names */
  className?: string;
  /** Error state */
  error?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      error,
      size = 'md',
      fullWidth = true,
      resize = 'vertical',
      ...props
    },
    ref
  ) => (
    <textarea
      ref={ref}
      className={[
        'ds-textarea',
        `ds-textarea--${size}`,
        error && 'ds-textarea--error',
        fullWidth && 'ds-textarea--full-width',
        `ds-textarea--resize-${resize}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
