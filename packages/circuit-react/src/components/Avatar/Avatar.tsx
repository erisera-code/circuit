import React, {
  createContext,
  useContext,
  useState,
  forwardRef,
} from 'react';
import './Avatar.css';

/*
 * Avatar — dependency-free image avatar with graceful fallback.
 * The image is only shown once it has loaded; until then (or on error)
 * the AvatarFallback renders.
 */

export type AvatarSize = 'sm' | 'md' | 'lg';

type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface AvatarContextValue {
  imageStatus: ImageStatus;
  setImageStatus: (status: ImageStatus) => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

/* ============================================
   Avatar Root
   ============================================ */

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size variant */
  size?: AvatarSize;
  /** Additional class names */
  className?: string;
  /** Children (AvatarImage and/or AvatarFallback) */
  children: React.ReactNode;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = 'md', className = '', children, ...props }, ref) => {
    const [imageStatus, setImageStatus] = useState<ImageStatus>('idle');

    return (
      <AvatarContext.Provider value={{ imageStatus, setImageStatus }}>
        <span
          ref={ref}
          className={`ds-avatar ds-avatar--${size} ${className}`.trim()}
          {...props}
        >
          {children}
        </span>
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = 'Avatar';

/* ============================================
   Avatar Image
   ============================================ */

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Additional class names */
  className?: string;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className = '', src, onLoad, onError, alt = '', ...props }, ref) => {
    const context = useContext(AvatarContext);

    if (!src) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`ds-avatar__image ${className}`.trim()}
        data-status={context?.imageStatus}
        onLoad={(e) => {
          context?.setImageStatus('loaded');
          onLoad?.(e);
        }}
        onError={(e) => {
          context?.setImageStatus('error');
          onError?.(e);
        }}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

/* ============================================
   Avatar Fallback
   ============================================ */

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Additional class names */
  className?: string;
  /** Children (initials or an icon) */
  children?: React.ReactNode;
}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className = '', children, ...props }, ref) => {
    const context = useContext(AvatarContext);

    // Hide the fallback once the image has successfully loaded
    if (context?.imageStatus === 'loaded') return null;

    return (
      <span
        ref={ref}
        className={`ds-avatar__fallback ${className}`.trim()}
        {...props}
      >
        {children}
      </span>
    );
  }
);
AvatarFallback.displayName = 'AvatarFallback';

export default Avatar;
