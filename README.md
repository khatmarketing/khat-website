# Khat Website — Mobile MVP

Persian RTL agency website using Next.js 16.3.4, React 19, TypeScript, Tailwind 4, and the supplied Anjoman fonts. The mobile canvas remains capped at 430px. This release does not include a desktop redesign.

## Run locally

Use Node.js 24 (the validated version is 24.20.0), then:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script execution restricted, use `npm.cmd` instead of `npm`.

## Verification

```sh
npm run lint
npm test
npm run check:routes
npm run test:browser
npm run build
```

Route and browser checks require a running server. Browser tests use the installed Google Chrome through Playwright, in isolated headless sessions; no personal browser profile is accessed. `QA_BROWSER_CHANNEL=msedge` selects an installed Edge instead. Reports and screenshots are written under `playwright-report/` and `test-results/` and are excluded from Git and ESLint.

To validate the production build:

```sh
npm run build
npm run start -- --port 3001
```

In a separate terminal, set `QA_BASE_URL=http://localhost:3001`, then run `npm run check:routes` and `npm run test:browser`. The suite covers every page at 320, 375, 390, and 430px, images, runtime diagnostics, RTL, navigation, drawer focus/history/dismissal, short screens, native touch input, mouse drag, and enlarged text/reduced motion.

## Approved contact actions

The exact owner-supplied destinations are stored in `src/lib/contact.ts`. Environment variables no longer override these values. Rebuild after any approved destination change.

- Phone: `tel:09001040402`
- WhatsApp: `https://wa.me/message/O3N4D4VFVTMBP1`
- Telegram: `https://t.me/pezhmandavoudi`
- E-mail: `mailto:Khatmarketing.group@gmail.com`
- Instagram: `https://www.instagram.com/khat.marketing?stkn=MWVxYnc1eGN3YXl6bQ%3D%3D&utm_source=qr`

All browser tests run together without fixture environment variables. Contact clicks are intercepted during QA to verify the exact destination without launching external applications. Physical-device app handoff depends on the installed/configured apps.

Contact icons rotate once through 1080 degrees in 900ms on mouse entry, keyboard focus, or touch/pen press. Reduced motion disables rotation. Native link navigation is not delayed for animation.

## Content and routes

- Main pages: `/`, `/about`, `/services`, `/news`, `/partners`, `/contact`.
- Five services: `src/lib/services.ts`.
- Four news entries: `src/lib/articles.ts`.
- Detail routes use static parameters and return 404 for unknown slugs.
- Existing partner names are preserved as text because their logo files were absent. Confirm the client list and supply approved logos before replacing these text treatments.

See `RELEASE-AUDIT.md` for findings, verification results, unresolved business inputs, and the previous pass's visual changes that need brand-owner review.