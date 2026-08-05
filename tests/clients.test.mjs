import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const built = new URL("../dist/clients/index.html", import.meta.url);
test("build emits the client workbench", () => assert.ok(existsSync(built)));
test("client workbench includes every maintained language", () => {
  const html = readFileSync(built, "utf8");
  for (const expected of ["Select client language", "TypeScript", "Rust", "Dart / Flutter", "Gleam", "ftnl-clients"]) {
    assert.ok(html.includes(expected), `missing ${expected}`);
  }
  assert.ok(!html.includes("undefined"));
});
