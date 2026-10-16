// Renders the drawings to transparent 2x WebP in public/.
//   node scripts/art/render.mjs [name ...]
// Needs a Chromium build (CHROME, or Playwright's headless shell) and cwebp.
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir, homedir } from "node:os";
import { join } from "node:path";

const drawings = {
  "forget-me-not": {
    module: "./forget-me-not.mjs",
    out: "public/sketchbook/forget-me-not.webp",
  },
  hero: { module: "./hero.mjs", out: "public/sketchbook/hero.webp" },
  sprig: { module: "./sprig.mjs", out: "public/sketchbook/sprig.webp" },
};
const chrome =
  process.env.CHROME ||
  join(
    homedir(),
    "Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell",
  );
if (!existsSync(chrome))
  throw new Error(`No Chromium at ${chrome}; set CHROME`);

const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : Object.keys(drawings);
const dir = mkdtempSync(join(tmpdir(), "artbook-"));
for (const name of names) {
  const spec = drawings[name];
  if (!spec) throw new Error(`Unknown drawing ${name}`);
  const mod = await import(spec.module);
  const svg = mod.draw();
  writeFileSync(join(dir, `${name}.svg`), svg);
  writeFileSync(
    join(dir, `${name}.html`),
    `<!doctype html><html><head><style>html,body{margin:0;background:transparent}img{display:block;width:${mod.width}px;height:${mod.height}px}</style></head><body><img src="${name}.svg"></body></html>`,
  );
  const png = join(dir, `${name}.png`);
  execFileSync(
    chrome,
    [
      "--headless",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      "--default-background-color=00000000",
      "--allow-file-access-from-files",
      `--window-size=${mod.width},${mod.height}`,
      `--screenshot=${png}`,
      `file://${join(dir, `${name}.html`)}`,
    ],
    { stdio: "ignore" },
  );
  execFileSync("cwebp", [
    "-quiet",
    "-q",
    "86",
    "-alpha_q",
    "100",
    "-m",
    "6",
    png,
    "-o",
    spec.out,
  ]);
  console.log(
    `${name}: ${spec.out} (${(svg.length / 1024).toFixed(0)} KB of SVG)`,
  );
}
