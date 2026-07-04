/**
 * Circuit command palette — framework-agnostic, ~150 lines, no dependencies.
 * Pair with palette.css. Requires tokens.css to be loaded for --accent etc.
 *
 * @example
 *   import { createCommandPalette } from '@erisera/circuit/palette.js';
 *
 *   createCommandPalette({
 *     mount: document.body,
 *     trigger: document.getElementById('search-trigger'),
 *     pages: [{ title: 'Quickstart', path: 'docs / getting-started', href: '/quickstart' }],
 *     actions: [
 *       { title: 'Toggle dark mode', icon: '◐', run: () => document.documentElement.classList.toggle('dark') },
 *       { title: 'Copy page as Markdown', icon: PAGE_ICON, run: () => navigator.clipboard.writeText(pageMarkdown), feedback: 'Copied to clipboard' },
 *     ],
 *   });
 */

const PAGE_ICON =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>' +
  '<line x1="9.5" y1="12" x2="16" y2="12"/><line x1="9.5" y1="16" x2="14" y2="16"/></svg>';

const SEARCH_ICON =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.3" y2="15.3"/></svg>';

export { PAGE_ICON, SEARCH_ICON };

/**
 * @param {Object} opts
 * @param {HTMLElement} [opts.mount=document.body] - where the backdrop is appended
 * @param {HTMLElement} [opts.trigger] - element that opens the palette on click
 * @param {Array<{title:string,path?:string,href?:string}>} [opts.pages=[]]
 * @param {Array<{title:string,icon?:string,run?:Function,feedback?:string}>} [opts.actions=[]]
 * @param {string} [opts.openKey='/'] - single-char key that opens the palette (ignored while typing)
 * @param {boolean} [opts.metaK=true] - also bind Cmd/Ctrl+K
 * @returns {{ open: Function, close: Function, destroy: Function }}
 */
export function createCommandPalette(opts) {
  const { mount = document.body, trigger, pages = [], actions = [], openKey = '/', metaK = true } = opts;

  const backdrop = document.createElement('div');
  backdrop.className = 'c-palette-backdrop';
  backdrop.innerHTML = `
    <div class="c-palette" role="dialog" aria-modal="true" aria-label="Search">
      <div class="c-palette-input-row">
        ${SEARCH_ICON}
        <input type="text" placeholder="Search docs, or jump to a tool…" autocomplete="off" spellcheck="false">
        <kbd>esc</kbd>
      </div>
      <div class="c-palette-results"></div>
      <div class="c-palette-footer">
        <span><kbd>↑↓</kbd> navigate</span>
        <span><kbd>↵</kbd> select</span>
        <span><kbd>esc</kbd> close</span>
      </div>
    </div>`;
  mount.appendChild(backdrop);

  const input = backdrop.querySelector('input');
  const results = backdrop.querySelector('.c-palette-results');

  let flat = [];
  let selIdx = 0;

  function esc(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  }

  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return safe;
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }

  function render() {
    const q = input.value.trim();
    const matchedPages = q ? pages.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())) : [];
    const matchedActions = q ? actions.filter((a) => a.title.toLowerCase().includes(q.toLowerCase())) : actions;
    flat = [...matchedPages.map((p) => ({ ...p, kind: 'page' })), ...matchedActions.map((a) => ({ ...a, kind: 'action' }))];
    selIdx = Math.min(selIdx, Math.max(flat.length - 1, 0));

    if (!flat.length) {
      results.innerHTML = `<div class="c-palette-empty">No results for "${esc(q)}"</div>`;
      return;
    }
    let html = '';
    let idx = 0;
    if (matchedPages.length) {
      html += `<div class="c-presult-group"><div class="c-presult-label">Pages</div>`;
      matchedPages.forEach((p) => {
        html += `<div class="c-presult ${idx === selIdx ? 'sel' : ''}" data-i="${idx}"><span class="picon">${PAGE_ICON}</span><span class="ptext"><div class="ptitle">${highlight(p.title, q)}</div>${p.path ? `<div class="ppath">${esc(p.path)}</div>` : ''}</span><span class="penter">↵</span></div>`;
        idx++;
      });
      html += `</div>`;
    }
    if (matchedActions.length) {
      html += `<div class="c-presult-group"><div class="c-presult-label">Actions</div>`;
      matchedActions.forEach((a) => {
        html += `<div class="c-presult ${idx === selIdx ? 'sel' : ''}" data-i="${idx}"><span class="picon">${a.icon || ''}</span><span class="ptext"><div class="ptitle">${highlight(a.title, q)}</div></span><span class="penter">↵</span></div>`;
        idx++;
      });
      html += `</div>`;
    }
    results.innerHTML = html;
    results.querySelectorAll('.c-presult').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        selIdx = +row.dataset.i;
        render();
      });
      row.addEventListener('click', runSelected);
    });
  }

  function runSelected() {
    const item = flat[selIdx];
    if (!item) return;
    if (item.kind === 'action') {
      item.run?.();
      close();
      if (item.feedback && trigger) {
        const orig = trigger.innerHTML;
        trigger.innerHTML = `<span style="color:var(--accent)">${esc(item.feedback)}</span>`;
        setTimeout(() => (trigger.innerHTML = orig), 1400);
      }
      return;
    }
    if (item.href) window.location.href = item.href;
    close();
  }

  function open() {
    backdrop.classList.add('open');
    input.value = '';
    selIdx = 0;
    render();
    setTimeout(() => input.focus(), 10);
  }
  function close() {
    backdrop.classList.remove('open');
  }

  trigger?.addEventListener('click', open);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  input.addEventListener('input', () => {
    selIdx = 0;
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selIdx = (selIdx + 1) % Math.max(flat.length, 1);
      render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selIdx = (selIdx - 1 + flat.length) % Math.max(flat.length, 1);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runSelected();
    } else if (e.key === 'Escape') {
      close();
    }
  });

  function onWindowKeydown(e) {
    if (backdrop.classList.contains('open')) return;
    const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
    if (openKey && e.key === openKey && !typing) {
      e.preventDefault();
      open();
    }
    if (metaK && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    }
  }
  window.addEventListener('keydown', onWindowKeydown);

  return {
    open,
    close,
    destroy() {
      window.removeEventListener('keydown', onWindowKeydown);
      backdrop.remove();
    },
  };
}
