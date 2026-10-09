# Authoring an instance

An **instance** is one design for the canonical markup: a complete restyling,
not a hue swap. Since v0.4 an instance is written as five **facets**, so a host
can take the whole preset (`data-instance="zine"`) or mix facets from
different designs (`data-palette="synthwave" data-layout="editorial"`).

| Facet     | Attribute      | Sublayer               | Kind            | Holds |
|-----------|----------------|------------------------|-----------------|-------|
| palette   | `data-palette` | `de.instances.palette` | tokens          | `--de-color-*`, `--de-overlay-bg`, `--de-state-*` colors, preferred `color-scheme` |
| type      | `data-type`    | `de.instances.type`    | tokens + rules  | `--de-font-*`, `--de-text-*`, `--de-leading*`, `--de-measure`, `--de-weight-*`; text treatment (weight, case, tracking, drop caps) |
| shape     | `data-shape`   | `de.instances.shape`   | tokens + rules  | `--de-radius-*`, `--de-border-w`, `--de-shadow-*`, `--de-card-*`, `--de-button-*`, `--de-input-*`; edge geometry (borders, radii, outline offsets, hard shadows) |
| layout    | `data-layout`  | `de.instances.layout`  | scoped rules    | how the tree is arranged: grids, columns, flex, gaps, padding, sizes, positions |
| fx        | `data-fx`      | `de.instances.fx`      | scoped rules    | decoration: textures, gradients, glows, glyphs (`::before`/`::after` content), filters, hover motion, animations |

Later sublayers win, so when two facets touch the same property fx beats
layout beats shape beats type beats palette.

## The file skeleton

```css
/* src/instances/NAME.css */

/* ===== palette ===== */
@layer de.instances.palette {
  :where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-palette]), [data-palette="NAME"]) {
    --de-color-bg:      light-dark(oklch(97% 0.01 80), oklch(19% 0.01 60));
    --de-color-surface: light-dark(…, …);
    /* … every --de-color-* token as ONE light-dark() pair … */
    --de-overlay-bg: …;
  }
  /* dark-first designs only: prefer dark unless the author forces a theme */
  :where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-palette]), [data-palette="NAME"]):where(:not([data-theme])) {
    color-scheme: dark;
  }
}

/* ===== type ===== */
@layer de.instances.type {
  :where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-type]), [data-type="NAME"]) {
    --de-font-body: var(--de-font-serif);
    --de-font-display: var(--de-font-serif);
    --de-text-base: 1.125rem;
    --de-leading: 1.7;
    --de-measure: 64ch;
  }
  @scope (:where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-type]), [data-type="NAME"])) to ([data-instance], [data-type]) {
    :where(h1, h2, h3) { text-transform: uppercase; letter-spacing: -0.02em; }
    :where(article:not(li > article)) > :where(p:first-of-type)::first-letter { /* drop cap */ }
  }
}

/* ===== shape ===== */
@layer de.instances.shape {
  :where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-shape]), [data-shape="NAME"]) {
    --de-radius-sm: 0; --de-radius-md: 0; --de-radius-lg: 0;
    --de-shadow-1: 4px 4px 0 var(--de-color-fg);
    --de-button-radius: 0;
  }
  @scope (:where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-shape]), [data-shape="NAME"])) to ([data-instance], [data-shape]) {
    :where(button) { border-width: 3px; }
  }
}

/* ===== layout ===== */
@layer de.instances.layout {
  @scope (:where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-layout]), [data-layout="NAME"])) to ([data-instance], [data-layout]) {
    /* the structure layer turns ul:has(> li > article) into a card grid —
       reinterpret it here */
    :where(ul:has(> li > article)) { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; list-style: none; padding: 0; }
    :where(ul:has(> li > article)) > :where(li) { display: block; }
    :where(li) > :where(article) { padding: var(--de-space-4); container-type: normal; }
    :where(:scope) > :where(header) { padding-block-end: var(--de-space-4); }
  }
}

/* ===== fx ===== */
@layer de.instances.fx {
  @scope (:where([data-engine], [data-engine] *):where([data-instance="NAME"]:not([data-fx]), [data-fx="NAME"])) to ([data-instance], [data-fx]) {
    :where(:scope) {
      --de-NAME-tape: …;                 /* facet-private tokens live here */
      background-image: radial-gradient(…);
    }
    :where(section) > :where(h2)::before { content: "§ " attr(id); }
    :where(li) > :where(article):hover { transform: translateY(-3px); }
  }
}
/* signature: one line naming the design's signature. */
```

## Panels need inset

The core pads nothing that it does not also decorate, so if your facet gives
`section`, `article`, `form`, `figure`, `table`, `nav`, `blockquote`, the
masthead, the footer or a top-level `aside` a border or a background, set
`--de-inset` — once on `:where(:scope)` in the shape facet for the whole
design, or on the element — and the core applies it as padding:

```css
@layer de.instances.shape {
  :where(…):where([data-instance="glass"]:not([data-shape]), [data-shape="glass"]) {
    --de-inset: var(--de-space-5);   /* every panel in glass is inset */
  }
}
```

Never write `margin` in an instance (except `margin: 0` / `auto`); spacing is
`gap` and `padding`, so it composes with the core's flow rhythm.

## Hard rules

1. **Vanilla CSS.** The demo loads `src/index.css` raw. lightningcss only
   bundles/minifies. Nesting is allowed but not needed inside `@scope`.
2. **Zero specificity.** Every compound in every selector is wrapped in
   `:where()` — including `li`, `img`, `:scope`, `:hover`. Pseudo-elements
   (`::before`, `::first-letter`) are the only allowed contribution. A test
   fails the build otherwise. Bad: `:where(ul) > li`. Good:
   `:where(ul) > :where(li)`.
3. **One `light-dark()` pair per color token, no `@media (prefers-color-scheme)`
   and no `[data-theme]` selectors.** The `color-scheme` of the element that
   *uses* the token decides the side; `data-theme` on the root or any nested
   region sets it (modes/color-scheme.css). Tokens are unregistered on
   purpose so the pair resolves late. `light-dark()` takes colors only —
   never numbers.
4. **Rules go inside `@scope … to (…)`.** The limit is what makes nested
   regions work: an outer design's layout stops at any element that starts
   its own (`[data-instance]` or `[data-layout]`). Token facets need no scope:
   tokens inherit, and the nearest region wins naturally.
5. **Don't touch `::backdrop`, `dialog`, `[popover]`** beyond tokens
   (`--de-overlay-bg`).
6. **Do not use `revert-layer`**, `!important`, or `@media (prefers-color-scheme)`.
7. **Don't restyle the switcher** or anything outside `[data-engine]`.
8. **Facet-private tokens** are prefixed `--de-NAME-` and declared on
   `:where(:scope)` inside the facet that reads them.
9. **Motion**: every duration is a token (`var(--de-dur)`, `--de-dur-slow`);
   any `animation:` on an element should also set `--de-animation-reduced`
   to a calmer twin (or leave the default `none`).
10. **Knobs**: if the design rotates or offsets items, read `--de-tilt`
    (`rotate: var(--de-tilt)`) so `data-tilt` works; prefer `sibling-index()`
    (inside `@supports (top: calc(sibling-index() * 1px))`) over
    `:nth-child(1/2/3)` for per-item variation, keeping the nth-child version
    as the fallback.

## Splitting a rule across facets

A card rule that used to read

```css
& :where(li) > :where(article) {
  background: var(--de-color-surface);   /* palette-driven surface → shape or fx? */
  border: 2px solid var(--de-color-fg);  /* shape */
  border-radius: 2px;                    /* shape */
  padding: var(--de-space-4);            /* layout */
  box-shadow: 5px 5px 0 var(--de-color-accent); /* shape (hard edge) */
  transform: rotate(-2deg);              /* fx */
}
```

becomes three declarations in three facets. Ask "would swapping this facet
with another design's still make sense?" — border geometry travels with
shape, arrangement with layout, ornament with fx. Surface *colors* set via
tokens belong to palette; a surface rule that exists to shape a component
(`background: transparent` on an outlined button) belongs to shape.

## The canonical markup (elements available)

```
[data-engine][data-instance]
  header
    p > small, h1, p (lede), nav[aria-label=Contents] > a*
  main
    article
      header > p > time, address ; h2 ; p (summary)
      section#premise      : h2, p, p, aside[role=note], blockquote > p, footer > cite
      section#grammar      : h2, p, pre>code, dl>(dt+dd)*
      section#materials    : h2, p, figure>img+figcaption, ul>li>article (h3,p) [×3]
      section#sequence     : h2, p, ol>li*, table>caption+thead+tbody
      section#interaction  : h2, p, details>summary, form>fieldset>(legend,p>label>input/select/textarea,p>checkbox,p>radio), p>progress+meter, p>button*
      section#vocabulary   : every family component — buttons (data-variant, data-icon, role=group),
                             fields with small hints/errors, role=switch, data badges/dots, [data-chip],
                             [data-swatch], [data-step], [data-avatar], [aria-busy], [data-banner],
                             [data-toasts]>[data-toast], [data-empty], dialog[data-palette], [role=tooltip],
                             [role=menu], [role=tablist], nav[aria-label=breadcrumb], kbd, hr,
                             ul[role=listbox]>li[role=option], figure>figcaption+pre (data-sx),
                             pre[data-terminal]>kbd/samp, nav[aria-label=pagination], [data-board],
                             [data-shell]>header/nav/[data-resize]/main/footer, [data-scroll], [data-scrim],
                             [data-pattern], button[data-theme-toggle], de-cluster
      section#composition  : a nested section[data-instance], ul[data-cols], article[data-hue]
      dialog#info (article>header>h3, p, p>button[data-close])
      #popover-info[popover]
    aside > nav[aria-label=Design archive] > h2, p, ol>li>a*
  footer > p > small > a
```

- `article:not(li > article)` — the main prose article (drop caps / lede).
- `ul:has(> li > article)` — the 3-item "materials" card list: the key thing
  to reinterpret per design.
- `form > p:last-child > button:last-child` / `form > button:last-child` —
  the primary CTA.
- `:where(:scope) > :where(header)` — the page masthead.
- Every vocabulary component has a core default; an instance only needs to
  restyle the ones that carry its identity. See docs/element-binding-map.md
  for the selector of each.
