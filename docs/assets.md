# Portfolio assets

## Type

- `public/fonts/chemical-*.woff2`: the author's [chemical](https://github.com/outsideness-x/chemical_font) typeface, rebuilt from source revision `85e8b6b` with `tools/build.py --hangul-sample "…"` (every Hangul syllable used on the site and in the type tester) and sliced with `pyftsubset` into core Latin, extended Latin, Cyrillic and Hangul. `app/globals.css` declares each slice with its `unicode-range`, so a page downloads only the scripts it shows. All OpenType features (`calt`, `kern`, `ss01`–`ss03`) are kept.
- `app/fonts/Geist-Variable.woff2`: [Geist](https://vercel.com/font) by Vercel and basement.studio, SIL Open Font License (`app/fonts/Geist-OFL.txt`), from the `geist` npm package 1.7.2. Self-hosted through `next/font/local`.
- Literata (diple's own editorial face, OFL) is fetched by `next/font/google` at build time and served from this origin. Nothing is requested from Google at runtime.
- `lib/og/*.ttf`: Latin subsets of Geist, chemical and Literata, used only at build time to render link previews.

## Projects

- `public/projects/orot`: original OROT icon, artwork and screenshots from the author's OROT and orot-landing projects. `reading-hd.webp` and `grammar-hd.webp` are the 1320 px App Store screens (`OROT/exports/appstore`), shown inside the CSS iPhone.
- `public/projects/orot/motion`: interaction clips and the mascot's idle and hello animations (`OROT/exports/mascot`), re-encoded to 600–720 px H.264 without audio, with WebP posters. The six interaction clips were re-recorded on 2026-10-16 from the current app (a Debug build in an iPhone 17 Pro simulator, English, through the app's own `--ui-testing` launch seams). For the 외웠다 stamp, one seeded card was given twelve days of memory so that a single answer makes the word learned.
- `public/projects/orot/brand`: the mascot model sheet and poses (`OROT/docs/design/mascot`), the six alternate app icons (`OROT/docs/design/app_icon/concepts`), slides of the first Hangul carousel and the 창문 reel (`OROT/instagram`).
- `public/projects/diple`: original diple icon and screenshots from the author's diple and diple-landing projects. `motion/` holds clips re-recorded on 2026-10-16 from the current app (a Debug build in an iPhone 17 Pro simulator, dark appearance), with the library filled by `app-store/1.1/tools/seed.py`: three Standard Ebooks novels, their passages and notes. `passages-notes` replaced `mode-switch` when the separate Notes mode left the app.
- `public/projects/inkept`: original inkept App Store screenshots (resized to WebP) and the original forget-me-not illustration from its App Icon Composer assets.
- `lib/og/img`: small PNG/JPEG copies of the screens above for the build-time link previews.

## Artbook drawings

`public/sketchbook` holds the home page's paper and drawings, all made in code for this site rather than drawn from any reference:

- `hero.webp`: the working sketch of an iPhone, half pencil wireframe and half inked and painted interface, with a pencil and forget-me-nots (`scripts/art/hero.mjs`).
- `forget-me-not.webp`: the botanical plate on the About spread (`scripts/art/forget-me-not.mjs`); `sprig.webp` is the small sprig on the postcard (`scripts/art/sprig.mjs`).
- `paper.webp` and `specks.webp`: seamless tiles of warm paper and of dust and specks, laid over each other at different sizes (`scripts/art/paper.py`).

`scripts/art/brush.mjs` draws pressure-shaped ink, graphite and watercolour washes as SVG; `scripts/art/render.mjs` renders each drawing at 2x with a transparent background and encodes it with `cwebp`. The page sets the drawings on the paper with `mix-blend-mode: multiply`.

## Icons

`app/icon.svg`, `app/favicon.ico` and `app/apple-icon.png` are drawn from the asterisk in the wordmark.

Product descriptions checked against the three supplied App Store pages on 2026-10-14. Screenshots and clips show the actual apps; no performance metrics, research findings or customer testimonials are invented. The Android version of OROT is not presented as the author's work.
