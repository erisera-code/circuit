/**
 * Circuit theme toggle — three states (system / dark / light), matching
 * tokens.css's `@media (prefers-color-scheme: dark)` + `.dark`/`.light`
 * (or `data-theme`) override pattern. Pair with a button element; this
 * module owns its label/state, you own its placement.
 *
 * Framework-agnostic, no dependencies. Persists the explicit choice
 * (not "system") to localStorage and re-applies it on load; live-updates
 * while in "system" mode if the OS preference changes mid-session.
 *
 * @example
 *   import { initThemeToggle } from '@erisera/circuit/theme-toggle.js';
 *   initThemeToggle({ root: document.getElementById('canvas'), button: document.getElementById('mode') });
 */

const STORAGE_KEY = 'circuit-theme';
const LABELS = { system: '◐ auto', dark: '● dark', light: '○ light' };
const NEXT = { system: 'dark', dark: 'light', light: 'system' };

/**
 * @param {Object} opts
 * @param {HTMLElement} [opts.root=document.documentElement] - element carrying the `.dark`/`.light` class
 * @param {HTMLElement} [opts.button] - toggle button; click cycles system → dark → light → system
 * @param {boolean} [opts.useDataAttribute=false] - set `data-theme="dark|light"` instead of a class (matches Starlight's convention)
 * @returns {{ get: () => string, set: (mode: string) => void }}
 */
export function initThemeToggle(opts = {}) {
  const root = opts.root || document.documentElement;
  const button = opts.button;
  const useDataAttribute = !!opts.useDataAttribute;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function apply(mode) {
    root.classList.remove('dark', 'light');
    if (useDataAttribute) root.removeAttribute('data-theme');
    if (mode === 'dark') {
      root.classList.add('dark');
      if (useDataAttribute) root.setAttribute('data-theme', 'dark');
    } else if (mode === 'light') {
      root.classList.add('light');
      if (useDataAttribute) root.setAttribute('data-theme', 'light');
    }
    // mode === 'system': no class/attribute — tokens.css's prefers-color-scheme
    // media query takes over.
    if (button) {
      button.textContent = LABELS[mode];
      button.setAttribute('aria-pressed', String(mode !== 'system'));
    }
  }

  function get() {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  }

  function set(mode) {
    if (mode === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, mode);
    apply(mode);
  }

  apply(get());

  button?.addEventListener('click', () => set(NEXT[get()]));

  media.addEventListener('change', () => {
    if (get() === 'system') apply('system'); // re-render is a no-op for classes, but keeps label in sync if you show the resolved theme elsewhere
  });

  return { get, set };
}
