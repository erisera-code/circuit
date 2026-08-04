import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import './Accordion.css';

/* ============================================
   Accordion Root
   ============================================ */

export interface AccordionSingleProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className = '', ...props }, ref) => (
    <AccordionPrimitive.Root
      ref={ref}
      className={`ds-accordion ${className}`.trim()}
      {...(props as any)}
    />
  )
);
Accordion.displayName = 'Accordion';

/* ============================================
   Accordion Item
   ============================================ */

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item */
  value: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className = '', ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={`ds-accordion-item ${className}`.trim()}
      {...props}
    />
  )
);
AccordionItem.displayName = 'AccordionItem';

/* ============================================
   Accordion Trigger
   ============================================ */

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional class names */
  className?: string;
  /** Children */
  children: React.ReactNode;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className = '', children, ...props }, ref) => (
    <AccordionPrimitive.Header className="ds-accordion-header">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={`ds-accordion-trigger ${className}`.trim()}
        {...props}
      >
        {children}
        <svg
          className="ds-accordion-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = 'AccordionTrigger';

/* ============================================
   Accordion Content
   ============================================ */

export interface AccordionContentProps {
  /** Additional class names */
  className?: string;
  /** Force mount (keep in DOM when closed) */
  forceMount?: true;
  /** Children */
  children: React.ReactNode;
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={`ds-accordion-content ${className}`.trim()}
      {...props}
    >
      <div className="ds-accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = 'AccordionContent';

export default Accordion;
