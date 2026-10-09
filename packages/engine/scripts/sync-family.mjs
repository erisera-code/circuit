// Copies each sibling design system's stylesheet into examples/family/vendor/
// so the family gallery can render all of them side by side. Run after
// pulling any of the three repos. Paths are the sibling checkouts on disk.
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const H = homedir();
const OUT = new URL("../examples/family/vendor/", import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const circuit = new URL("../../circuit/src/", import.meta.url).pathname;
const jjhubRepo = join(H, "Projects/@erisera-code/jjhub");
const jjhub = join(jjhubRepo, "web/src/styles.css");
// jjhub's design-system work rides its design-system-updates branch until it lands
// upstream; prefer that branch's sheet over whatever the checkout happens to be on.
import { execFileSync } from "node:child_process";
function jjhubSheet() {
  try { return execFileSync("git", ["-C", jjhubRepo, "show", "design-system-updates:web/src/styles.css"], { encoding: "utf8" }); }
  catch { return null; }
}
const noitro = join(H, "Projects/noitroidvania/src/ds/ds.css");
const snake = join(H, "Projects/impressive-snake/src/ds/ds.css");

// circuit: tokens + themes + components + palette, concatenated in load order
const parts = [];
for (const f of ["tokens.css", "themes.css", "components.css", "palette.css"]) parts.push(`/* ==== ${f} ==== */\n` + (await readFile(join(circuit, f), "utf8")));
await writeFile(join(OUT, "circuit.css"), parts.join("\n\n"));
await writeFile(join(OUT, "jjhub.css"), jjhubSheet() ?? (await readFile(jjhub, "utf8")));
await copyFile(noitro, join(OUT, "noitroidvania.css"));
const { existsSync } = await import("node:fs");
if (existsSync(snake)) await copyFile(snake, join(OUT, "snake.css")); else console.warn("  (impressive-snake ds.css not found; skipped)");
console.log("✓ synced circuit.css, jjhub.css, noitroidvania.css" + (existsSync(snake) ? ", snake.css" : "") + " into examples/family/vendor/");
