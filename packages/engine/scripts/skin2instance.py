"""Translate noitroidvania's native skin sheets into a design-engine instance block.

Reads the four *_SKIN template literals out of the game's src/ui/*.ts, maps every
--ui-* token onto a --de-* one, wraps every compound in :where(), restates margins
as padding/translate/size, and (emit-sorted) orders the rules by their native
specificity so that source order reproduces the native cascade. The output
replaces the block between "the game's own composition" and the signature line
in src/instances/noitroidvania.css.

Usage: python3 scripts/skin2instance.py report|emit-sorted > block.css
"""
import re, sys
ROOT='/Users/johnhenry/Projects/noitroidvania/src/ui/'
MODE=sys.argv[1] if len(sys.argv)>1 else 'report'

def skin_of(file, const):
    s=open(ROOT+file).read()
    m=re.search(r'const '+const+r' = /\* css \*/ `(.*?)\n`;', s, re.S)
    assert m, (file, const)
    return m.group(1)

SOURCES=[('style.ts','GAME_SKIN'),('shellStyle.ts','SHELL_SKIN'),('runSetup.ts','RUNSETUP_SKIN'),('gameOver.ts','GAMEOVER_SKIN')]

TOKENS={
 '--ui-fg':'--de-color-fg','--ui-fg-dim':'--de-color-muted','--ui-fg-mute':'--de-color-faint',
 '--ui-line':'--de-color-line','--ui-line-hot':'--de-noitroidvania-line-hot','--ui-line-soft':'--de-noitroidvania-line-soft',
 '--ui-panel':'--de-color-surface','--ui-panel-2':'--de-color-surface-2','--ui-panel-3':'--de-noitroidvania-surface-3',
 '--ui-well':'--de-noitroidvania-well','--ui-bg':'--de-color-bg','--ui-cell':'--de-noitroidvania-cell',
 '--ui-accent':'--de-color-accent','--ui-accent-2':'--de-color-accent-2',
 '--ui-good':'--de-color-ok','--ui-bad':'--de-color-danger','--ui-warn':'--de-color-warn',
 '--ui-mark':'--de-noitroidvania-mark','--ui-scrim':'--de-overlay-bg',
 '--ui-fs':'--de-noitroidvania-fs','--ui-fs-label':'--de-noitroidvania-fs-label','--ui-fs-tiny':'--de-noitroidvania-fs-tiny',
 '--ui-gap':'--de-noitroidvania-gap','--ui-u':'--de-noitroidvania-u','--ui-dur':'--de-noitroidvania-dur','--ui-ease':'--de-noitroidvania-ease',
 '--ui-font':'--de-font-mono',
 '--ui-r-common':'--de-cat-1','--ui-r-uncommon':'--de-cat-2','--ui-r-rare':'--de-cat-3','--ui-r-epic':'--de-cat-4','--ui-r-relic':'--de-cat-5','--ui-r-cursed':'--de-cat-6',
 '--ui-hp':'--de-noitroidvania-hp','--ui-shield':'--de-noitroidvania-shield','--ui-rhythm':'--de-noitroidvania-rhythm','--ui-dash':'--de-noitroidvania-dash','--ui-flight':'--de-noitroidvania-flight',
}
ROOTS={'.pause':'[data-layer="pause"]','.pro':'[data-layer="prologue"]','.radial':'[data-layer="radial"]','.vend':'[data-kind="vendor"]',
       '.sh-layer':'[data-layer="shell"]','.go':'[data-layer="game-over"]','.rs-layer':'[data-layer="run-setup"]'}

def strip_comments(css): return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

def parse(css):
    """→ list of ('rule', selector, decls) | ('media', prelude, [rules])"""
    out=[]; i=0; n=len(css)
    def block_end(j):
        depth=0
        while j<n:
            if css[j]=='{': depth+=1
            elif css[j]=='}':
                depth-=1
                if depth==0: return j
            j+=1
        raise ValueError('unbalanced')
    while i<n:
        b=css.find('{', i)
        if b<0: break
        head=css[i:b].strip()
        e=block_end(b)
        body=css[b+1:e]
        if head.startswith('@media'):
            out.append(('media', head, parse(body)))
        elif head:
            out.append(('rule', head, body.strip()))
        i=e+1
    return out

def split_top(s, sep):
    parts=[]; depth=0; q=None; cur=''
    for ch in s:
        if q:
            cur+=ch
            if ch==q: q=None
            continue
        if ch in '"\'': q=ch; cur+=ch; continue
        if ch in '([': depth+=1
        elif ch in ')]': depth-=1
        if ch==sep and depth==0: parts.append(cur); cur=''
        else: cur+=ch
    parts.append(cur)
    return parts

def compounds(sel):
    """split a complex selector into [(compound, combinator_after)]"""
    toks=[]; depth=0; q=None; cur=''; i=0
    while i<len(sel):
        ch=sel[i]
        if q:
            cur+=ch
            if ch==q: q=None
        elif ch in '"\'': q=ch; cur+=ch
        elif ch in '([': depth+=1; cur+=ch
        elif ch in ')]': depth-=1; cur+=ch
        elif depth==0 and ch in ' >+~':
            # combinator run
            j=i
            while j<len(sel) and sel[j] in ' >+~': j+=1
            comb=sel[i:j].strip() or ' '
            if cur.strip(): toks.append([cur.strip(), comb])
            cur=''; i=j; continue
        else: cur+=ch
        i+=1
    if cur.strip(): toks.append([cur.strip(), ''])
    return toks

PSEUDO_EL=re.compile(r'(::[a-z-]+(?:\([^)]*\))?)+$')
def wrap(comp):
    m=PSEUDO_EL.search(comp)
    pel=''
    if m: pel=m.group(0); comp=comp[:m.start()]
    if not comp: return pel
    # already fully wrapped?
    if re.fullmatch(r':where\((.*)\)', comp) and split_top(comp[7:-1], ',')==[comp[7:-1]] and balanced(comp[7:-1]):
        inner=comp[7:-1]
    else:
        inner=comp
    for k,v in ROOTS.items():
        if inner==k or (inner.startswith(k) and inner[len(k)] in '[:'): inner=v+inner[len(k):]
    return f':where({inner}){pel}'

def house(sel):
    """House rules applied to a translated selector: the shell layer's
    header rules are about the layer's own masthead/bar, not a section's
    header inside it (another game's settings sections have those)."""
    return re.sub(r'(\[data-layer="shell"\]\) :where\(header)', r'\1:not(section > header)', sel)

def balanced(s):
    d=0
    for ch in s:
        if ch=='(': d+=1
        elif ch==')':
            d-=1
            if d<0: return False
    return d==0

PROBLEMS=[]
# Margins other than 0/auto are a house rule in the engine: each is restated as
# the padding, translate or size that produces the same box.
MARGIN_FIX=[
 # the engine's house rule: no coloured side rail (tells.test) — a tone edge all round instead
 ('border-left-color: var(--de-color-accent-2);','border-color: var(--de-color-accent-2);'),
 ('border-left-color: var(--de-color-ok);','border-color: var(--de-color-ok);'),
 ('border-left-color: var(--de-color-danger);','border-color: var(--de-color-danger);'),
 ('border-left: 2px solid var(--de-color-accent);','border: 1px solid var(--de-color-accent);'),
 ('border-left: 2px solid var(--de-color-accent-2);','border: 1px solid var(--de-color-accent-2);'),
 ('width: 3px; margin-left: -1px;', 'width: 3px; translate: -1px 0;'),
 ('margin-left: -46px; margin-top: -18px;', 'translate: -46px -18px;'),
 ('padding-left: 4px; margin-left: -4px;', 'padding-left: 4px; position: relative; left: -4px; width: calc(100% + 4px);'),
 ('margin-left: 12px; border-left', 'inline-size: calc(100% - 12px); margin-inline-start: auto; border-left'),
 ('td > span { margin-left: 6px; }', ''),  # handled below via selector-specific text
 ('margin-top: 2px;', 'padding-top: 2px;'),
 ('margin-top: 3px;', 'padding-top: 3px;'),
 ('margin-top: 4px;', 'padding-top: 4px;'),
 ('margin: 0 0 4px;', 'margin: 0; padding-bottom: 4px;'),
 ('margin: 0 0 5px;', 'margin: 0; padding-bottom: 5px;'),
 ('margin: 0 0 6px;', 'margin: 0; padding-bottom: 6px;'),
 ('margin: 0 0 8px;', 'margin: 0; padding-bottom: 8px;'),
 ('margin: 5px 0 0;', 'margin: 0; padding-top: 5px;'),
 ('margin-left: 6px;', 'padding-inline-start: 6px;'),
]
def tx_selector(sel):
    sel=sel.strip()
    cs=compounds(sel)
    # drop scoping .ui-root compounds
    cs=[c for c in cs if c[0] not in ('.ui-root', ':where(.ui-root)', '.ui-layer', ':where(.ui-layer)')]
    out=''
    for comp,comb in cs:
        w=wrap(comp)
        if re.search(r'(?<![\w-])\.[a-zA-Z]', re.sub(r'\[[^\]]*\]|"[^"]*"', '', w)):
            PROBLEMS.append(f'class left in selector: {sel!r} -> {w}')
        out+=w+(' ' if comb==' ' else f' {comb} ' if comb else '')
    return out.strip()

def tx_decls(decls, sel):
    def rep(m):
        t=m.group(1)
        if t not in TOKENS:
            PROBLEMS.append(f'unmapped token {t} in {sel[:60]}'); return m.group(0)
        return 'var('+TOKENS[t]
    d=re.sub(r'var\((--ui-[a-z0-9-]+)', rep, decls)
    for a,b in MARGIN_FIX:
        if a in d: d=d.replace(a,b)
    for m in re.finditer(r'(margin[a-z-]*)\s*:\s*([^;]+);', d):
        vals=m.group(2).strip().split()
        if not all(re.fullmatch(r'0(px)?|auto', v) for v in vals):
            PROBLEMS.append(f'margin {m.group(1)}: {m.group(2).strip()}  in {sel[:70]}')
    if '!important' in d: PROBLEMS.append(f'!important in {sel[:60]}')
    return d

def emit(rules, indent='    '):
    out=[]
    for r in rules:
        if r[0]=='media':
            out.append(f'{indent}{r[1]} {{')
            out.extend(emit(r[2], indent+'  '))
            out.append(f'{indent}}}')
        else:
            sel=', '.join(house(tx_selector(s)) for s in split_top(r[1], ','))
            decls=' '.join(tx_decls(r[2], r[1]).split())
            out.append(f'{indent}{sel} {{ {decls} }}')
    return out

blocks=[]
for f,c in SOURCES:
    css=strip_comments(skin_of(f,c))
    rules=parse(css)
    # drop token-declaration-only rules on .ui-root
    rules=[r for r in rules if not (r[0]=='rule' and r[1].strip()=='.ui-root')]
    blocks.append((f, emit(rules)))

if MODE=='report':
    for p in sorted(set(PROBLEMS)): print(p)
    print('rules:', sum(len(b) for _,b in blocks))

# ------------------------------------------------------------------ the block
HEAD = '''
/* ===== the game's own composition ===== */
/*
  Noitroidvania's chrome, rule for rule: the HUD corners, the pause box, the
  prologue caption, the vendor card, the run overlays, the shell screens
  (title, settings, run setup, game over) and the two dialogs (codex,
  loadout) — every screen written against the shared classless vocabulary
  (article[role=dialog], [role=listbox] > li[role=option], [role=menu],
  section[data-track], [data-corner], [data-chip], progress, kbd, dl…) and
  named where the vocabulary needs a name (aria-label="Traversal",
  "Gathering field", "Altar"; data-layer="pause|prologue|radial|shell|
  run-setup|game-over"; data-kind="vendor|swatch|thumb"). Generated from the
  game's native skin sheets by scripts/skin2instance.py (emit-sorted): tokens
  mapped onto the engine's, every compound in :where(), margins restated as
  padding, translate or size, rules ordered by their native specificity so
  source order reproduces the native cascade. It sits in the fx facet
  because it has to outrank every generic facet on the same property — this
  is the design's own composition, not a decoration on top of it.
*/
@layer de.instances.palette {
  :where([data-engine], [data-engine] *):where([data-instance="noitroidvania"]:not([data-palette]), [data-palette="noitroidvania"]) {
    /* the game's own channel colours: a hit point, a shield, the combo meter, a dash, flight — hues by taste, not by meaning */
    --de-noitroidvania-hp:     light-dark(#c8453c, #c8453c);
    --de-noitroidvania-shield: light-dark(#6fa8d3, #6fa8d3);
    --de-noitroidvania-rhythm: light-dark(#e0a860, #e0a860);
    --de-noitroidvania-dash:   light-dark(#9ad0e8, #9ad0e8);
    --de-noitroidvania-flight: light-dark(#b8e0a0, #b8e0a0);
    /* an empty cell of the map, the sixth surface */
    --de-noitroidvania-cell:   light-dark(oklch(93% 0.012 88), #0a0b10);
  }
}
@layer de.instances.fx {
  @scope (:where([data-engine], [data-engine] *):where([data-instance="noitroidvania"]:not([data-fx]), [data-fx="noitroidvania"])) to ([data-instance], [data-fx]) {
    :where(:scope) {
      /* the three type sizes the chrome is drawn in, and the interface-scale unit derived from the base */
      --de-noitroidvania-fs: var(--de-text-base);
      --de-noitroidvania-fs-label: 10px;
      --de-noitroidvania-fs-tiny: 9px;
      --de-noitroidvania-gap: 6px;
      --de-noitroidvania-u: calc(var(--de-noitroidvania-fs) / 12px);
      --de-noitroidvania-dur: 140ms;
      --de-noitroidvania-ease: linear;
    }

    /* ---- the engine's document rhythm does not apply inside the chrome ---- */
    :where(*) { max-inline-size: none; }
    :where(p, li, dd, dt, figcaption, blockquote, summary, legend, label, small, span, b, i, strong, em, data, kbd, time, th, td) { line-height: inherit; }
    :where([role="note"], [role="status"], [role="alert"], label, legend, th, caption, summary, dt, [role="tab"], [role="menuitem"]) { font-size: inherit; letter-spacing: inherit; text-transform: inherit; color: inherit; }
    :where(main, article, section, aside, header, footer, figure, nav, form, details, fieldset, [role="search"], [role="group"], [role="note"], [role="status"], [role="alert"]) {
      display: block; row-gap: normal; grid-template-columns: none; align-content: normal;
      padding: 0; border: 0; background: none; inline-size: auto; max-inline-size: none; margin: 0;
    }
    :where([role="note"], [role="status"], [role="alert"], [data-toast], [role="listbox"] > li[role="option"])::before { content: none; }
    :where(section + section) { padding-block-start: 0; }
    :where(main, article, section, aside) > :where(h2, h3, h4) { padding: 0; }
    :where([data-engine] [data-engine]) { padding: 0; }
    :where(ul, ol) { padding-inline-start: 40px; }
    :where(nav) :where(ul, ol) { display: block; flex-wrap: nowrap; gap: normal; align-items: normal; }
    :where(nav) :where(li) { display: list-item; }
    :where(nav) :where(a) { display: inline; padding: 0; border: 0; background: none; }
    :where(li + li, li > ul, li > ol) { padding-block-start: 0; }
    :where(dl, dt, dd) { padding: 0; }
    :where(h1, h2, h3, h4) { font: inherit; letter-spacing: inherit; text-transform: inherit; }
    :where(strong, b, em, i) { text-transform: inherit; letter-spacing: inherit; }
    :where(h1, h2, h3, h4, p, li, dd, dt, small, span, strong, b, i, data) { overflow-wrap: normal; word-break: normal; hyphens: manual; }
    :where([data-scroll], [data-toasts], [data-toast], section, aside, article, main) { font-size: inherit; }
    :where([data-toasts], [data-toast]) { position: static; inset: auto; }
    /* the scrim is a sibling behind the panels; sibling order stacks it, never a z token */
    :where([data-scrim]) { z-index: auto; }
    :where(small) { font-size: smaller; }
    :where(data, kbd) { display: inline; border: 0; padding: 0; background: none; font: inherit; color: inherit; letter-spacing: inherit; text-transform: inherit; }
    :where(label) { display: inline; gap: normal; padding: 0; }
    :where(progress) { border: 0; background: none; block-size: auto; }
    :where([role="listbox"]) { border: 0; padding: 0; max-inline-size: none; }
    :where([role="listbox"] > li[role="option"]) { padding: 0; border: 0; background: none; box-shadow: none; gap: normal; align-items: stretch; color: inherit; font-size: inherit; }
    :where([role="listbox"] > li[role="option"]) > :where(small) { margin-inline-start: 0; color: inherit; }
    :where([role="listbox"] > li[role="option"]) :where(button) { line-height: inherit; min-inline-size: 0; min-block-size: 0; }
    :where([role="menu"]) { border: 0; background: none; min-inline-size: 0; padding: 0; }
    :where([role="menuitem"]) { padding: 0; }
    :where([role="tablist"]) { border: 0; background: none; gap: 0; }
    :where([role="tab"]) { border-block-end: 0; background: none; }
    :where([data-chip], [data-scroll], [data-scrim], [data-toasts], [data-toast], [data-stat], [data-empty]) { padding: 0; border: 0; background: none; box-shadow: none; gap: normal; justify-items: normal; text-align: inherit; }
    :where([data-stat]) :where(data) { font: inherit; }
    :where(th, td, caption) { padding: 0; }
    :where(pre) { padding: 0; line-height: inherit; }
    :where(table) { border: 0; }

    /* ---- the base the native skin was written over: a plain control ---- */
    :where(button, input, select, textarea) {
      font: inherit; letter-spacing: inherit; color: inherit; text-transform: none; line-height: inherit;
      background: var(--de-color-surface-2); border: 1px solid var(--de-color-line);
      border-radius: 0; padding: 2px 6px; cursor: pointer; min-inline-size: 0; min-block-size: 0; inline-size: auto;
    }
    :where(button:hover, select:hover) { border-color: var(--de-noitroidvania-line-hot); background: var(--de-noitroidvania-surface-3); }
    :where(button:active) { background: var(--de-color-surface); }
    :where(button[disabled]) { opacity: .35; cursor: default; }
    :where(input, textarea) { cursor: text; }
    :where(input[type="checkbox"], input[type="radio"]) { appearance: auto; inline-size: auto; block-size: auto; padding: 0; }
    :where(:focus-visible) { outline: 1px solid var(--de-color-accent); outline-offset: 1px; }
'''
TAIL = '''  }
}
/* signature: the game's own chrome, rule for rule. */
'''
if MODE == 'emit':
    body='\n'.join(l for _,b in blocks for l in b)
    print(HEAD + body + '\n' + TAIL)

# ------------------------------------------------------- specificity ordering
# The native sheet's cascade ran on specificity; the engine's runs on source
# order alone (every selector is :where()-wrapped). Emitting the translated
# rules sorted by their ORIGINAL specificity, stable, makes source order
# reproduce the native cascade exactly.
def _inner_max(arg):
    return max((spec(x) for x in split_top(arg, ',')), default=(0,0,0))

def spec(sel):
    a=b=c=0
    i=0; n=len(sel)
    while i<n:
        ch=sel[i]
        if ch=='"' or ch=="'":
            j=sel.index(ch, i+1); i=j+1; continue
        if ch=='[':
            j=sel.index(']', i); b+=1; i=j+1; continue
        if ch==':':
            if sel.startswith('::', i):
                m=re.match(r'::[a-zA-Z-]+(\([^)]*\))?', sel[i:]); c+=1; i+=m.end(); continue
            m=re.match(r':([a-zA-Z-]+)', sel[i:]); name=m.group(1); i+=m.end()
            if i<n and sel[i]=='(':
                depth=0; j=i
                while j<n:
                    if sel[j]=='(': depth+=1
                    elif sel[j]==')':
                        depth-=1
                        if depth==0: break
                    j+=1
                arg=sel[i+1:j]; i=j+1
                if name=='where': continue
                if name in ('not','is','has'):
                    aa,bb,cc=_inner_max(arg); a+=aa; b+=bb; c+=cc; continue
                b+=1; continue
            b+=1; continue
        if ch=='.':
            m=re.match(r'\.[a-zA-Z0-9_-]+', sel[i:]); b+=1; i+=m.end(); continue
        if ch=='#':
            m=re.match(r'#[a-zA-Z0-9_-]+', sel[i:]); a+=1; i+=m.end(); continue
        if ch.isalpha():
            m=re.match(r'[a-zA-Z][a-zA-Z0-9-]*', sel[i:]); c+=1; i+=m.end(); continue
        i+=1
    return (a,b,c)

def emit_sorted(rules, indent='    '):
    items=[]  # (spec, order, lines)
    order=0
    for r in rules:
        if r[0]=='media':
            inner=emit_sorted(r[2], indent+'  ')
            first=r[2][0]
            key=max(spec(s) for s in split_top(first[1], ',')) if first[0]=='rule' else (0,0,0)
            items.append((key, order, [f'{indent}{r[1]} {{']+inner+[f'{indent}}}']))
        else:
            sels=split_top(r[1], ',')
            specs=[spec(s.strip()) for s in sels]
            decls=' '.join(tx_decls(r[2], r[1]).split())
            if len(set(specs))==1:
                items.append((specs[0], order, [f'{indent}{", ".join(house(tx_selector(s)) for s in sels)} {{ {decls} }}']))
            else:
                # split a list whose members differ in weight, so each lands where its own weight puts it
                for s,sp in zip(sels, specs):
                    items.append((sp, order, [f'{indent}{house(tx_selector(s))} {{ {decls} }}']))
        order+=1
    items.sort(key=lambda t: (t[0], t[1]))
    out=[]
    for _,_,lines in items: out.extend(lines)
    return out

if MODE=='emit-sorted':
    allrules=[]
    for f,c in SOURCES:
        css=strip_comments(skin_of(f,c))
        rules=[r for r in parse(css) if not (r[0]=='rule' and r[1].strip()=='.ui-root')]
        allrules.extend(rules)
    body='\n'.join(emit_sorted(allrules))
    print(HEAD + body + '\n' + TAIL)
    for p in sorted(set(PROBLEMS)): sys.stderr.write(p+'\n')
