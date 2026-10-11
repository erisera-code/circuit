# Architecture

How the engine is put together, and why. Companion to
[authoring-an-instance.md](authoring-an-instance.md) (how to write a design)
and [css-feature-map.md](css-feature-map.md) (which CSS features are used,
with support status).

## 1. Layers: ordering, not packaging

Cascade layers answer exactly one question: *when two declarations target the
same property on the same element at equal specificity, which wins?* They do
not load code, cannot be toggled at runtime, and are not a module system. So
"swap a layer out" is not literally possible — but the thing people mean by it
is, through a **facet**: a sublayer paired with an attribute that selects it.

```
@layer de.reset, de.properties, de.tokens, de.modes, de.base, de.structure,
       de.components, de.capabilities,
       de.instances.palette, de.instances.type, de.instances.shape,
       de.instances.layout, de.instances.fx,
       de.instances, de.experimental, de.utilities;
```

Every rule in the engine lives in one of these. Because every selector is also
wrapped in `:where()`, the engine contributes zero specificity: a host's own
rule always wins against the engine at equal specificity, layered or not.

### Facets

An instance (one design) is five facets:

| facet   | selected by    | sublayer               | carries |
|---------|----------------|------------------------|---------|
| palette | `data-palette` | `de.instances.palette` | colour tokens |
| type    | `data-type`    | `de.instances.type`    | font tokens + text treatment |
| shape   | `data-shape`   | `de.instances.shape`   | radius / border / shadow tokens + edge rules |
| layout  | `data-layout`  | `de.instances.layout`  | arrangement rules |
| fx      | `data-fx`      | `de.instances.fx`      | decoration rules |

`data-instance="zine"` is a **preset**: it selects all five zine facets. A
facet attribute overrides the preset for that facet only:

```html
<body data-engine data-instance="zine" data-palette="synthwave" data-type="editorial">
```

The selection logic is in every facet block's selector:

```css
:where([data-instance="zine"]:not([data-palette]), [data-palette="zine"])
```

— "zine's palette applies when the preset is zine *and no palette override is
present*, or when the palette is explicitly zine". Two facets of the same kind
can therefore never both match one element, and when two *different* facets
touch the same property (say, shape sets a card border and fx sets a glow
that includes a border colour) the sublayer order decides: fx beats layout
beats shape beats type beats palette. That is the whole "mix and match"
mechanism: **attributes choose, layers arbitrate.**

What mixes well and what does not:

- palette / type / shape are token facets. They combine with anything: a
  token is just a value, and every core rule reads tokens.
- layout and fx are rule facets. They combine with token facets freely, and
  with each other *usually*: a layout that turns the card list into a
  three-column ruled grid and an fx that rotates cards will produce rotated
  cards in a ruled grid. Whether that is good is a design question; the
  cascade will at least be deterministic.

## 2. `@scope`: proximity for rule facets

Token facets need no scope. A token is an inherited custom property, so a
nested region that sets its own tokens wins for its subtree automatically —
inheritance already encodes proximity.

Rule facets are different. Two descendant selectors
`:where([data-instance="a"]) :where(button)` and
`:where([data-instance="b"]) :where(button)` both match a button inside a `b`
region nested inside an `a` region, at equal (zero) specificity, so source
order picks the winner regardless of nesting. `@scope` fixes this in two ways:

1. the scope **limit** (`to ([data-instance], [data-layout])`) stops an outer
   design at the boundary of any inner region that declares its own;
2. among rules that still both match, **scope proximity** is a cascade
   criterion (after specificity, before source order): the rule whose scope
   root is closer to the element wins.

So every layout and fx rule is written as

```css
@scope (:where([data-engine], [data-engine] *):where([data-instance="glass"]:not([data-layout]), [data-layout="glass"]))
    to ([data-instance], [data-layout]) {
  :where(ul:has(> li > article)) { … }
}
```

and nested regions compose:

```html
<main data-engine data-instance="editorial">
  …
  <section data-instance="terminal">   <!-- a terminal window inside the magazine -->
```

Where `@scope` is not understood (Firefox before 144) the rule facets are
ignored and a design degrades to its token facets — colours, type and shape
survive, decoration and layout do not. `@scope` is Baseline Newly Available
since October 2025 and is the right tool here; the alternative,
`:not([data-instance] *)` chains, breaks at the second level of nesting.

The engine also relies on two other scoping mechanisms:

- the scope anchor `[data-engine]` itself, a plain attribute descendant
  selector, because it must work everywhere and needs no proximity logic;
- `[data-engine-off]`, the opt-out, implemented as `all: revert` in the last
  engine layer (so it undoes every engine declaration but not the host's).

## 3. `@function`: reusable value logic, gated

`@function` (CSS custom functions) is used for value logic that recurs or
that wants a conditional *inside* the value:

```css
@function --de-alpha(--c <color>, --a <number>) returns <color> {
  result: oklch(from var(--c) l c h / var(--a));
}
@function --de-shadow(--y <length>, --blur <length>, --spread <length>: 0px) {
  result: 0 var(--y) var(--blur) var(--spread) var(--de-shadow-ink);
  @media (prefers-reduced-data: reduce) { result: none; }
}
```

Support in September 2026 is Chromium only, so functions are progressive:

- in a **real property**, write the plain declaration first and the function
  version second; an engine that cannot parse the second keeps the first;
- in a **custom property** that trick fails (custom properties accept any
  token stream, so the last declaration always wins), so the function version
  is wrapped in `@supports at-rule(@function) { … }`. Engines that do not know
  `at-rule()` evaluate the condition as false and skip the block.

The engine defines `--de-alpha`, `--de-tint`, `--de-shade`, `--de-mix`,
`--de-space`, `--de-fluid`, `--de-dur` and `--de-shadow` in
`foundation/functions.css` and uses them for its derived tokens. Instances
may call them the same way. Until Firefox and Safari ship, the honest
summary is: functions make the *intent* readable and let a value carry its
own media condition; they do not yet reduce the amount of CSS shipped.

## 4. Typed `attr()` + `@property`: attribute knobs

There is no `@attribute` at-rule in CSS; the mechanism is the typed `attr()`
function (`attr(name type(<syntax>), fallback)`) feeding a **registered**
custom property. Registration gives the knob a type and a default, so a
missing or malformed attribute degrades to the default instead of
invalidating the rule:

```css
@property --de-cols { syntax: "<integer>"; inherits: false; initial-value: 0; }

@supports (width: attr(x type(<length>))) {
  :where([data-engine]) :where([data-cols]) {
    --de-cols: attr(data-cols type(<integer>), 0);
    grid-template-columns: repeat(var(--de-cols), minmax(0, 1fr));
  }
}
```

```html
<ul data-cols="5">…</ul>            any integer, not just the enumerated 2/3/4
<section data-hue="30">…</section>  re-hues the accent for one region
<article data-measure="52ch">       overrides the reading measure
<figure data-tilt="-2deg">          rotates (registered <angle>)
```

Override precedence works out naturally: an instance sets the same
properties in CSS, the attribute rule (capabilities layer) applies only to
elements that carry the attribute, and a host rule beats both. The knobs are
Chromium 133+ today, so each rule is inside `@supports`; the enumerated
`[data-cols="2|3|4"]` selectors in `structure/grids.css` remain as the
fallback.

## 5. Which colour tokens are registered: none

A registered `<color>` custom property is resolved on the element that
declares it. `light-dark(a, b)` would therefore be decided by the *anchor's*
colour scheme and inherit already-resolved; a nested `data-theme="dark"`
region would keep the light value. Leaving colour tokens unregistered lets
the `light-dark()` expression travel down the tree and resolve where it is
used. That is why every instance palette is one `light-dark()` pair per token
and why the old three-way duplication (light block, media-query dark block,
explicit dark block) is gone. `@property` is used only where it earns its
keep: numeric/length/angle knobs and animatable effect values. (Note also
that `@property` rejects relative units in `initial-value` — `1rem` silently
un-registers the property — so those are `px`.)

## 6. Function census

Functions the engine uses, and where:

| function | use |
|---|---|
| `light-dark()` | every semantic colour token, instance palettes |
| `color-mix(in oklab …)` | tints, overlays, state colours (fallback path) |
| `oklch(from …)` relative colour | derived tints, `data-hue` re-hueing, contrast |
| `contrast-color()` | `--de-color-accent-fg` where supported |
| `clamp()` / `min()` / `max()` | fluid type, gutters, grid minimums |
| `calc()` | spacing scale, offsets |
| `attr(… type())` | knobs (cols, span, hue, measure, tilt) |
| `sibling-index()` | zine card tilt ramp (with `:nth-child` fallback) |
| `mod()` | alternating sign in the tilt ramp |
| `calc-size()` | auto-height reveals |
| `anchor()` / `anchor-size()` | tooltips, anchored popovers (advanced anchor is experimental) |
| `if()` | experimental module only |
| `var()` with fallback | host-facing knobs (`--de-anchor-name`, `--de-stack-gap`…) |
| custom `--de-*()` | derived tokens under `@supports at-rule(@function)` |

Container **style queries** (`@container style(--de-variant: featured)`,
`--de-viewport`, `--de-has-*` flags) are the declarative counterpart to
`if()` and are Baseline; the engine prefers them over `if()`.
