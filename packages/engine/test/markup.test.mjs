// The showcase markup is the contract: no classes inside [data-engine], and the
// elements the instances bind to are all present.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ROOT } from "./_helpers.mjs";

test("examples/index.html is classless inside [data-engine]", async () => {
  const html = await readFile(join(ROOT, "examples", "index.html"), "utf8");
  const start = html.indexOf("<div data-engine");
  const end = html.indexOf("<!-- ============ END CANONICAL GARDEN MARKUP");
  assert.ok(start > 0 && end > start, "canonical markup markers missing");
  const garden = html.slice(start, end);
  assert.equal((garden.match(/\sclass=/g) || []).length, 0, "class attribute found in canonical markup");
  for (const needle of ["<article", "<figure", "<blockquote", "<details", "<form", "<table", "<dialog", "popover", "<dl", "<time", "<address", "<ul", "<ol"]) {
    assert.ok(garden.includes(needle), `canonical markup lacks ${needle}`);
  }
});
