import React from 'react';
import './Terminal.css';

export interface TerminalLineProps {
  /** Line type for styling */
  type?: 'command' | 'output' | 'error' | 'success' | 'comment';
  /** Line content */
  children: React.ReactNode;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({
  type = 'output',
  children,
}) => {
  const classNames = ['ds-terminal__line', `ds-terminal__line--${type}`].join(' ');

  return (
    <div className={classNames}>
      {type === 'command' && <span className="ds-terminal__prompt">$</span>}
      {type === 'comment' && <span className="ds-terminal__comment-marker">#</span>}
      <span className="ds-terminal__content">{children}</span>
    </div>
  );
};

TerminalLine.displayName = 'TerminalLine';

export interface TerminalProps {
  /** Terminal window title */
  title?: string;
  /** Show window controls (close, minimize, maximize dots) */
  showControls?: boolean;
  /** Children (TerminalLine components or raw text) */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  title = 'terminal',
  showControls = true,
  children,
  className = '',
}) => {
  const classNames = ['ds-terminal', className].filter(Boolean).join(' ');

  // If children is a string, wrap it in a code block
  const content =
    typeof children === 'string' ? (
      <pre className="ds-terminal__code">{children}</pre>
    ) : (
      children
    );

  return (
    <div className={classNames}>
      <div className="ds-terminal__header">
        {showControls && (
          <div className="ds-terminal__controls">
            <span className="ds-terminal__dot ds-terminal__dot--close" />
            <span className="ds-terminal__dot ds-terminal__dot--minimize" />
            <span className="ds-terminal__dot ds-terminal__dot--maximize" />
          </div>
        )}
        <span className="ds-terminal__title">{title}</span>
      </div>
      <div className="ds-terminal__body">{content}</div>
    </div>
  );
};

Terminal.displayName = 'Terminal';

export default Terminal;
