// The build must succeed, keep every modern construct intact, and match the
// package's exports map.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { build, INSTANCES } from "../build.mjs";
import { ROOT } from "./_helpers.mjs";

const dist = (p) => join(ROOT, "dist", p);
let built;
test.before(async () => { built = await build(); });

test("build emits engine, core, experimental and one file per instance", async () => {
  for (const name of ["engine", "core", "experimental", ...INSTANCES.map((i) => `instances/${i}`)]) {
    for (const ext of [".css", ".min.css"]) {
      const s = await stat(dist(name + ext));
      assert.ok(s.size > 0, `${name}${ext} is empty`);
    }
  }
});

test("modern syntax survives bundling + minification verbatim", async () => {
  const engine = await readFile(dist("engine.min.css"), "utf8");
  const core = await readFile(dist("core.min.css"), "utf8");
  const exp = await readFile(dist("experimental.min.css"), "utf8");
  for (const needle of [
    "@layer de.reset,", "de.instances.palette", "@scope(", "@function --de-alpha(", "result:",
    "@supports at-rule(@function)", "@supports at-rule(@scope)", "light-dark(", "oklch(from ",
    "attr(data-cols type(<integer>)", "@container style(--de-variant:featured)", "sibling-index()",
    "contrast-color(", "@property --de-cols", "@starting-style", "animation-timeline:view()",
  ]) assert.ok(engine.includes(needle) || core.includes(needle), `missing in bundle: ${needle}`);

  assert.ok(/if\(\s*style\(--de-viewport: narrow\)/.test(exp), "if() missing from experimental bundle");
  assert.ok(!/--lightningcss-light/.test(engine), "light-dark() was polyfilled instead of preserved");
  assert.ok(!/@scope\s*\)/.test(engine.replace(/@supports at-rule\(@scope\)/g, "")), "an @scope prelude was lost");
});

test("instance bundles carry their own facet layers and only their instance", async () => {
  for (const name of INSTANCES) {
    const css = await readFile(dist(`instances/${name}.min.css`), "utf8");
    assert.ok(css.startsWith("@layer de.reset,"), `${name}: layer spine missing`);
    for (const other of INSTANCES.filter((o) => o !== name)) {
      assert.ok(!css.includes(`data-instance="${other}"`) && !css.includes(`data-instance=${other}`), `${name} bundle contains ${other}`);
    }
  }
});

test("package.json exports point at files the build produces", async () => {
  const pkg = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
  for (const [key, target] of Object.entries(pkg.exports)) {
    if (key.includes("*")) continue;
    await stat(join(ROOT, target));
  }
  for (const name of INSTANCES) await stat(join(ROOT, pkg.exports["./instances/*"].replace("*", `${name}.min.css`)));
});
