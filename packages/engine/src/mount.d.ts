export interface EngineSkin {
  /** Where engine.css is served from (`/vendor/engine.css` when vendored). */
  href: string;
  /** The instance preset: all five facets of one design. */
  instance: string;
  palette?: string;
  type?: string;
  shape?: string;
  layout?: string;
  /** One design's composition facet under another's paint. */
  fx?: string;
  theme?: "dark" | "light" | "auto";
}

export const SKIN_LINK_ID: string;
export const GEOMETRY_PROPS: RegExp;
export const SHARED_COMPOSITION: RegExp;

/** The foreign skin in force, if any. */
export function foreignSkin(): EngineSkin | null;

/** The geometric half of a stylesheet: placing and sizing declarations and the custom properties they spend. */
export function geometryOf(css: string): string;

/** Mount a skin over the document's native sheets, or `null` to return to the native look. */
export function mountSkin(skin: EngineSkin | null, doc?: Document): void;

/** Parse a `?skin=` value — `jjhub`, `noitroidvania+snake` (instance + fx) — into a skin. */
export function skinFromParam(value: string | null | undefined, href?: string): EngineSkin | null;
