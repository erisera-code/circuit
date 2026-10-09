/** One mode's colour/shadow tokens, keyed by unprefixed role name. */
export interface ModeTokens {
  bg: string; surface: string; inset: string;
  text: string; dim: string; faint: string; border: string;
  accent: string; 'accent-hover': string; 'accent-soft': string; 'accent-border': string;
  success: string; 'success-soft': string;
  warning: string; 'warning-soft': string;
  danger: string; 'danger-soft': string;
  info: string; 'info-soft': string;
  scrim: string;
  'cat-1': string; 'cat-2': string; 'cat-3': string; 'cat-4': string; 'cat-5': string; 'cat-6': string;
  'code-bg': string; 'code-ink': string;
  [syntax: `sx-${string}`]: string;
  'shadow-sm': string; 'shadow-md': string; 'shadow-lg': string;
}

export interface Tokens {
  /** Mode-independent: hue, type, spacing, radius, motion. */
  readonly shared: Readonly<Record<string, string>>;
  readonly light: Readonly<ModeTokens>;
  readonly dark: Readonly<ModeTokens>;
}

/** The CSS custom-property prefix: properties render as `--circuit-<key>`. */
export const PREFIX: 'circuit';

export const tokens: Tokens;

export interface TokensCssOptions {
  /** Scope the tokens to an element instead of `:root`. */
  selector?: string;
}

/** Namespaced (`--circuit-*`) token CSS: light default, dark via prefers-color-scheme and `[data-theme]`. */
export function tokensCss(options?: TokensCssOptions): string;
