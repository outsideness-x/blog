# chemical pink — portfolio

A bilingual design-engineering portfolio for Alex: Home, Projects and Contact, with case studies for OROT, diple. and inkept. English is the default; the Russian preference persists locally. Original app screenshots and a locally built chemical font ship with the site.

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

Use `NEXT_DIST_DIR=.next-build npm run build` to build separately while the development server is running. Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment; otherwise the existing mini-blog.vercel.app origin is used for canonical metadata and the sitemap.

## Editing

- `lib/projects.ts`: English and Russian project copy and App Store URLs.
- `components/case-studies.tsx`: individual editorial project layouts.
- `components/liquid-navigation.tsx`: transparent refractive lens and spring motion.
- `app/contacts/page.tsx`: contact details. Replacement contact addresses are pending from the author; the old email and Telegram are intentionally not published.
- `app/globals.css`: visual system, responsive layouts and chemical OpenType features.
- `docs/assets.md` and `docs/liquid-glass.md`: asset provenance and optical implementation notes.

The screen viewer is keyboard accessible and closes with Escape. Reduced-motion preferences disable the navigation spring and CSS motion. A high-contrast preference increases navigation opacity. No analytics or remote font requests are added.
