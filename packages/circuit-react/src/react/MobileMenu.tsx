import { useState, useEffect, useCallback } from 'react';

/*
 * MobileMenu - manages open/close state for mobile navigation
 * Styling is up to consumer - this just provides the behavior
 */

interface MobileMenuProps {
  children: (props: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => React.ReactNode;
}

export function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return <>{children({ isOpen, open, close, toggle })}</>;
}
