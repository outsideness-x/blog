# chemical pink — portfolio

A bilingual portfolio for Alex, a UI/UX designer and iOS developer. Pages: Home, Projects (case studies for OROT, diple. and inkept, and a page for the chemical typeface), Playground and Contact. English is the default; the Russian preference persists locally.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
# With the site running:
npm run test:smoke
```

Use `NEXT_DIST_DIR=.next-build npm run build` to build separately while the development server is running, and `NEXT_DIST_DIR=.next-build npx next start -p 3100` with `TEST_ORIGIN=http://127.0.0.1:3100` to smoke-test that build. Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment; otherwise `mini-blog.vercel.app` is used for canonical URLs, link previews and the sitemap. The build fetches Literata from Google Fonts once and self-hosts it.

## Editing

- `lib/site.ts`: name, description, and the contact details (email, Telegram, GitHub) used across the site, the footer and structured data.
- `lib/projects.ts`: English and Russian project copy, tags, App Store and source URLs.
- `lib/motion.ts`: the recorded interactions shown in the case reels and the playground, with their captions.
- `components/case-studies.tsx`: individual editorial project layouts; `components/brand-world.tsx` is OROT's character, icons and social chapter.
- `components/services.tsx` and `components/faq.tsx`: service packages, the process and the FAQ.
- `components/contact-brief.tsx`: the brief that composes an email or a Telegram message. Nothing is sent from the site.
- `components/reel.tsx`, `components/media.tsx`: the CSS iPhone, the case reels and the tap-to-pause loops.
- `app/projects/chemical/page.tsx` and `components/type-tester.tsx`: the typeface page.
- `lib/og.tsx`: link preview images, rendered at build time.
- `components/liquid-navigation.tsx`: the refractive navigation lens; it samples what is behind it and keeps the labels dark on paper, light over a dark screen.
- `app/artbook.css` and `components/sketchbook.tsx`: the artbook pieces every page shares (paper, washi tape, pills drawn by hand) and the home page — stickers, taped prints, index cards, the About spread and the postcard. The paper itself and the palette are tokens in `app/globals.css`.
- `scripts/art/`: the drawings on the home page, made in code. `node scripts/art/render.mjs` redraws them into `public/sketchbook/` (needs a Chromium build, set `CHROME` if it is not Playwright's, and `cwebp`); `python3 scripts/art/paper.py` makes the paper tiles.
- `docs/assets.md` and `docs/liquid-glass.md`: asset provenance and optical implementation notes.

Video loops load only once they are on screen and actually playing, pause off screen, start paused for reduced motion or data saver, and can always be paused. The screen viewer is keyboard accessible and closes with Escape. A high-contrast preference increases navigation opacity. No analytics or third-party requests are added at runtime.
