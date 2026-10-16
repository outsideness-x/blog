import assert from "node:assert/strict";
import { access } from "node:fs/promises";
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
const routes = new Map([
  ["/", "I make it feel right."],
  ["/projects", "Made with intent."],
  ["/projects/orot", "OROT"],
  ["/projects/diple", "diple."],
  ["/projects/inkept", "inkept"],
  ["/contacts", "something good."],
  ["/projects/chemical", "chemical"],
  ["/playground", "Small things, moving."],
]);
for (const [route, expected] of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.ok(html.includes(expected), `${route}: missing expected content`);
  assert.ok(html.includes('lang="en"'), `${route}: English is the default`);
  assert.ok(html.includes("lang-ru"), `${route}: Russian translation exists`);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${route}: one primary heading`,
  );
  assert.ok(!html.includes("made by a human"), `${route}: removed annotation`);
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, "");
  assert.ok(!/\\n[A-ZА-Я]/.test(visible), `${route}: no literal \\n in copy`);
  assert.ok(html.includes("og:image"), `${route}: has a link preview image`);
  console.log(`OK ${route}`);
}
for (const route of [
  "/projects/does-not-exist",
  "/articles",
  "/analytics",
  "/donate",
]) {
  assert.equal(
    (await fetch(new URL(route, origin))).status,
    404,
    `${route}: should not exist`,
  );
}
const sitemap = await (await fetch(new URL("/sitemap.xml", origin))).text();
for (const route of routes.keys())
  assert.ok(sitemap.includes(route), `sitemap: ${route}`);
for (const route of ["/opengraph-image", "/icon.svg", "/apple-icon.png"]) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
}
const contact = await (await fetch(new URL("/contacts", origin))).text();
assert.ok(contact.includes("mailto:outsidenessx@gmail.com"), "contact: email");
assert.ok(contact.includes("https://t.me/coldd_me"), "contact: Telegram");
for (const asset of [
  "fonts/chemical-latin.woff2",
  "fonts/chemical-cyrillic.woff2",
  "projects/inkept/flower.webp",
  "projects/orot/reading-hd.webp",
  "projects/diple/mac-library.webp",
]) {
  await access(`public/${asset}`);
  assert.equal((await fetch(new URL(`/${asset}`, origin))).status, 200, asset);
}
console.log(
  "Smoke checks passed: pages, translations, contacts, previews, retired routes, sitemap and core assets.",
);
