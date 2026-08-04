import React from 'react';
import './EmptyState.css';

export interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Primary action button */
  action?: React.ReactNode;
  /** Secondary action */
  secondaryAction?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className = '',
}) => {
  const classNames = ['ds-empty-state', `ds-empty-state--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {icon && <div className="ds-empty-state__icon">{icon}</div>}
      <h3 className="ds-empty-state__title">{title}</h3>
      {description && <p className="ds-empty-state__description">{description}</p>}
      {(action || secondaryAction) && (
        <div className="ds-empty-state__actions">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;
