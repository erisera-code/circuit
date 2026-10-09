import { readFile, readdir } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const SRC = join(ROOT, "src");

export async function cssFiles(dir = SRC) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await cssFiles(p)));
    else if (entry.name.endsWith(".css")) out.push(p);
  }
  return out.sort();
}

export const rel = (p) => relative(ROOT, p);

/** Parse a CSS file with postcss (permissive) and return the root. */
export async function parse(file) {
  const css = await readFile(file, "utf8");
  return postcss.parse(css, { from: file });
}

/** Collect every style rule as { rule, layer, scope, … }. */
export function styleRules(root) {
  const out = [];
  root.walkRules((rule) => {
    const chain = [];
    for (let n = rule.parent; n && n.type !== "root"; n = n.parent) chain.push(n);
    const layer = chain.find((n) => n.type === "atrule" && n.name === "layer")?.params ?? null;
    const scope = chain.find((n) => n.type === "atrule" && n.name === "scope")?.params ?? null;
    const isKeyframeStep = chain.some((n) => n.type === "atrule" && /keyframes$/.test(n.name));
    const isFunctionBody = chain.some((n) => n.type === "atrule" && n.name === "function");
    out.push({ rule, layer, scope, isKeyframeStep, isFunctionBody, chain });
  });
  return out;
}
