// design-engine — build script
// -----------------------------------------------------------------------------
// Resolves the @import graph and emits:
//   dist/engine.css / engine.min.css        core + every instance
//   dist/core.css / core.min.css            everything except instances
//   dist/experimental.css / .min.css        opt-in volatile modules
//   dist/instances/<name>.css / .min.css    ONE instance (load after core)
// Uses lightningcss purely as a bundler + minifier; the source is hand-authored
// vanilla CSS and is valid without any build step. Virtual entries are served
// through a custom resolver so no temp files touch src/.
//
// Run: `node build.mjs` (or `npm run build`). `--watch` rebuilds on change.

import { readFile, writeFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname, resolve, relative } from "node:path";
import { bundleAsync } from "lightningcss";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "src");
const DIST = join(__dirname, "dist");
const VIRTUAL = "virtual:";

export const INSTANCES = (await readdir(join(SRC, "instances")))
  .filter((f) => f.endsWith(".css"))
  .map((f) => f.replace(/\.css$/, ""))
  .sort();

// Keep every modern at-rule intact: no downleveling, no vendor prefixes.
const TARGETS = undefined;

async function compile(entry, { minify, virtual = {} }) {
  const { code, warnings } = await bundleAsync({
    filename: entry,
    minify,
    targets: TARGETS,
    errorRecovery: false,
    // The source is hand-authored modern CSS; keep nesting/@layer/@scope/@function verbatim.
    include: 0,
    exclude: 0,
    resolver: {
      resolve(specifier, from) {
        const base = from.startsWith(VIRTUAL) ? SRC : dirname(from);
        return resolve(base, specifier);
      },
      read(file) {
        if (file.startsWith(VIRTUAL)) return virtual[file];
        return readFile(file, "utf8");
      },
    },
  });
  for (const w of (warnings ?? []).filter((w) => !/Unknown at rule: @function/.test(w.message))) console.warn(`  ⚠ ${relative(__dirname, w.loc?.filename ?? entry)}:${w.loc?.line ?? "?"} ${w.message}`);
  return code.toString("utf8");
}

// lightningcss drops the comma-separated @layer ORDER statement from some
// bundles (it keeps the blocks). Layer order is the engine's whole cascade
// contract, so the statement is re-emitted verbatim at the top of every file.
let LAYER_STATEMENT;
async function layerStatement() {
  if (!LAYER_STATEMENT) {
    const css = (await readFile(join(SRC, "layers.css"), "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
    LAYER_STATEMENT = css.match(/@layer[^{};]*;/)[0].replace(/\s+/g, " ");
  }
  return LAYER_STATEMENT;
}

async function emit(name, entry, virtual) {
  const spine = await layerStatement();
  const strip = (css) => css.replace(/@layer[^{};]*;\s*/g, "");
  const readable = spine + "\n\n" + strip(await compile(entry, { minify: false, virtual }));
  const min = spine.replace(/,\s+/g, ",") + strip(await compile(entry, { minify: true, virtual }));
  await writeFile(join(DIST, `${name}.css`), readable);
  await writeFile(join(DIST, `${name}.min.css`), min);
  return { name, bytes: min.length };
}

export async function build() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(join(DIST, "instances"), { recursive: true });

  const out = [];
  out.push(await emit("engine", join(SRC, "index.css")));
  out.push(await emit("core", join(SRC, "core.css")));
  out.push(await emit("experimental", join(SRC, "experimental", "index.css")));

  // one file per instance: just that instance's facets (needs core loaded first)
  for (const name of INSTANCES) {
    const entry = `${VIRTUAL}instance-${name}.css`;
    const virtual = { [entry]: `@import "./layers.css";\n@import "./instances/${name}.css";\n` };
    out.push(await emit(`instances/${name}`, entry, virtual));
  }

  for (const { name, bytes } of out) console.log(`  ${name.padEnd(24)} ${String(bytes).padStart(7)} B (min)`);
  console.log(`✓ built ${out.length} stylesheets into dist/`);
  return out;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  await build();
  if (process.argv.includes("--watch")) {
    console.log("… watching src/ for changes");
    let timer;
    watch(SRC, { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => build().catch((e) => console.error(e)), 80);
    });
  }
}
