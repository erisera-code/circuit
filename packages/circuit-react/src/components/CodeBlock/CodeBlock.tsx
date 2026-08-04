import React, { forwardRef, useState, useCallback } from 'react';
import './CodeBlock.css';

export type CodeBlockVariant = 'default' | 'terminal';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The code content */
  code: string;
  /** Language for syntax highlighting (visual label only) */
  language?: string;
  /** Filename to display in header */
  filename?: string;
  /** Visual style variant */
  variant?: CodeBlockVariant;
  /** Show the header with window controls */
  showHeader?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Footer content (e.g., command prompt) */
  footer?: React.ReactNode;
  /** Max height before scrolling */
  maxHeight?: string | number;
}

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language,
      filename,
      variant = 'default',
      showHeader = true,
      showCopy = true,
      showLineNumbers = false,
      footer,
      maxHeight,
      className = '',
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }, [code]);

    const lines = code.split('\n');

    return (
      <div
        ref={ref}
        className={`ds-code-block ds-code-block--${variant} ${className}`.trim()}
        {...props}
      >
        {showHeader && (
          <div className="ds-code-block__header">
            <div className="ds-code-block__header-left">
              <div className="ds-code-block__window-controls">
                <span className="ds-code-block__dot ds-code-block__dot--red" />
                <span className="ds-code-block__dot ds-code-block__dot--yellow" />
                <span className="ds-code-block__dot ds-code-block__dot--green" />
              </div>
              {(filename || language) && (
                <span className="ds-code-block__filename">
                  {filename || language}
                </span>
              )}
            </div>
            {showCopy && (
              <button
                type="button"
                className="ds-code-block__copy-btn"
                onClick={handleCopy}
                aria-label={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
        )}

        <div
          className="ds-code-block__body"
          style={{ maxHeight: maxHeight }}
        >
          <pre>
            <code>
              {showLineNumbers ? (
                <table className="ds-code-block__lines">
                  <tbody>
                    {lines.map((line, i) => (
                      <tr key={i}>
                        <td className="ds-code-block__line-number">{i + 1}</td>
                        <td className="ds-code-block__line-content">{line || ' '}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                code
              )}
            </code>
          </pre>
        </div>

        {footer && (
          <div className="ds-code-block__footer">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

// ============================================
// CommandLine - Helper for terminal prompts
// ============================================

export interface CommandLineProps {
  /** The command to display */
  command: string;
  /** Prompt character */
  prompt?: string;
  /** Prompt color */
  promptColor?: 'primary' | 'success' | 'muted';
}

export const CommandLine: React.FC<CommandLineProps> = ({
  command,
  prompt = '$',
  promptColor = 'success',
}) => (
  <div className={`ds-command-line ds-command-line--${promptColor}`}>
    <span className="ds-command-line__prompt">{prompt}</span>
    <span className="ds-command-line__command">{command}</span>
  </div>
);

CommandLine.displayName = 'CommandLine';
