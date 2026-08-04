import { useState, useCallback } from 'react';

/*
 * CopyButton - copies text to clipboard with feedback
 * Styling comes from components.css (.btn, .btn-ghost)
 */

export function CopyButton({
  text,
  children,
  copiedText = 'Copied!',
  className = 'btn btn-ghost',
  timeout = 2000,
}: {
  text: string;
  children: React.ReactNode;
  copiedText?: React.ReactNode;
  className?: string;
  timeout?: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [text, timeout]);

  return (
    <button type="button" className={className} onClick={handleCopy}>
      {copied ? copiedText : children}
    </button>
  );
}
