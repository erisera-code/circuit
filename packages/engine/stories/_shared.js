// Shared by the generated stories: the frame URL and the iframe renderer.
export const INSTANCES = ["default", "editorial", "brutal", "glass", "terminal", "zine", "synthwave", "blueprint", "botanical", "circuit", "jjhub", "noitroidvania", "snake"];

export function frameSrc(system, id, globals = {}) {
  const q = new URLSearchParams({ system, c: id, theme: globals.theme || "dark" });
  if (system === "design-engine") q.set("instance", globals.instance || "default");
  return `/examples/family/frame.html?${q}`;
}

/** One system's rendering of one component, sized to its content. */
export function frame(system, id, globals, height = 160) {
  const f = document.createElement("iframe");
  f.src = frameSrc(system, id, globals);
  f.title = `${system}: ${id}`;
  f.style.cssText = `border:0;width:100%;height:${height}px;display:block;background:transparent`;
  f.dataset.frame = `${system}:${id}`;
  return f;
}

// frames post their document height; size every matching iframe on the page
if (typeof window !== "undefined" && !window.__familyResize) {
  window.__familyResize = true;
  window.addEventListener("message", (e) => {
    if (!e.data?.frame) return;
    for (const f of document.querySelectorAll(`iframe[data-frame="${e.data.frame}"]`)) f.style.height = Math.min(Math.max(e.data.height + 4, 60), 1200) + "px";
  });
}

/** The canonical markup under every design, side by side. */
export function compareDesigns(id, globals) {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px;padding:12px;font:12px ui-monospace,monospace";
  for (const design of INSTANCES) {
    const pane = document.createElement("div");
    pane.style.cssText = "border:1px solid #8884;border-radius:4px;overflow:hidden";
    const head = document.createElement("div");
    head.style.cssText = "padding:4px 8px;border-bottom:1px solid #8884;opacity:.7";
    head.textContent = design;
    pane.append(head, frame("design-engine", id, { ...globals, instance: design }));
    wrap.append(pane);
  }
  return wrap;
}

/** Five systems side by side for one component (their own markup). */
export function compare(id, globals, systems) {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;padding:12px;font:12px ui-monospace,monospace";
  for (const s of systems) {
    const pane = document.createElement("div");
    pane.style.cssText = "border:1px solid #8884;border-radius:4px;overflow:hidden";
    const head = document.createElement("div");
    head.style.cssText = "padding:4px 8px;border-bottom:1px solid #8884;opacity:.7";
    head.textContent = s.title;
    pane.append(head, frame(s.id, id, globals));
    wrap.append(pane);
  }
  return wrap;
}
