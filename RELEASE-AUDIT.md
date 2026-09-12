# Focused brand and contact correction - final verification

This section supersedes the historical contact blockers and visual-review notes below. Changes were limited to the owner's latest request. Existing uncommitted QA work and supplied asset changes were preserved.

## Changes made

- Restored the canonical unchanged /images/brand/khat-logo.png in header, footer and drawer through KhatLogo. Both supplied logo copies have identical hashes. The image remains square at its native ratio, with its original transparent padding intact; no cropping, recoloring or asset editing.
- Restored a shared soft #FF6A1A radial footer fade for every page, including details. It is a CSS background without overlays, extra layout dimensions or touch interception.
- Restored News and Partners top banners using news.png and partners.png through the existing PageHero system, with object-fit cover and the existing text/spacing treatment.
- Removed the exact Home hero sentence and its h1 container entirely. Reduced hero minimum height from 610px to 460px, retaining its image, eyebrow and consultation CTA.
- Added restrained neon hover/focus/press feedback to the top contact control and every partner tile. Partner tiles are keyboard-focusable. Passive pointer listeners ensure mobile press feedback and release/cancel cleanup without blocking scrolling.
- Activated all five exact owner-supplied contact destinations and labels. Environment variables no longer override them.
- Added one 900ms transform animation from 0 to 1080 degrees on mouse entry, keyboard focus, and touch/pen press. No infinite loop or layout changes; reduced motion disables rotation. Links activate immediately without waiting for animation to finish.

## Exact contact destinations

| Label | Destination |
| --- | --- |
| Phone (Persian label retained) | tel:09001040402 |
| WhatsApp | https://wa.me/message/O3N4D4VFVTMBP1 |
| Telegram | https://t.me/pezhmandavoudi |
| E-mail | mailto:Khatmarketing.group@gmail.com |
| Instagram | https://www.instagram.com/khat.marketing?stkn=MWVxYnc1eGN3YXl6bQ%3D%3D&utm_source=qr |

HTTPS links retain native app-compatible universal-link behavior with browser fallback. Mail uses the configured device composer, not a Gmail-only URL. QA intercepted clicks before external apps/network navigation; actual app installation, account availability and message delivery are outside browser verification.

## Tests performed

- Production build: PASS, including TypeScript and generation of 18 pages.
- ESLint: PASS. Unit tests: 4 PASS, including exact approved destination assertions and malformed-input guards.
- Production browser suite: 16 PASS. Tests cover canonical logo/ratios, banners, fade, removed Home sentence, exact labels/destinations, hover/focus/touch neon states, all five 1080-degree animations, one iteration, completion and reduced motion.
- Regression coverage: all 15 routes at 320/375/390/430px, loaded images/fonts, Persian RTL, no document overflow, 200% text, short-screen drawer, focus/history/dismissal, six menu routes, service/news detail links, native news swipes, mouse drag and keyboard navigation.
- Production route checks: 15 pages, 15 linked routes, 32 asset URLs and 6 strict HTTP 404 checks PASS.
- Browser route sweep: no console warnings/errors, page exceptions or failed asset responses.
- Production screenshots reviewed for Home, News, Partners and Contact; remaining pages use the tested shared logo/footer. Existing full-route screenshot output remains in test-results.
- git diff --check: PASS.

Runtime note: Next.js 16.3.4 logs Internal: NoFallbackError for unknown dynamic detail slugs with dynamicParams=false, while correctly returning HTTP 404. These route implementations were not changed in this visual pass. Valid routes and browser interactions remain clean; this server-side framework diagnostic is not claimed to be resolved.

## Files changed in this focused pass

- src/app/components/KhatLogo.tsx (new), ContactAction.tsx (new), NeonFeedback.tsx (new)
- src/app/components/KhatFooter.tsx, KhatMenu.tsx
- src/app/layout.tsx, globals.css, page.tsx
- src/app/news/page.tsx, partners/page.tsx, contact/page.tsx
- src/lib/contact.ts
- tests/contact.test.mjs, tests/browser/mobile.spec.ts
- tests/browser/brand-contact.spec.ts (new), tests/browser/contact-actions.spec.ts (renamed from contact-fixture.spec.ts and updated)
- playwright.config.ts, scripts/check-routes.mjs
- .env.example, README.md, RELEASE-AUDIT.md

The pre-existing modified public/images/news.png and new public/images/partners.png were used without editing. Other earlier uncommitted files were preserved.

## Manual review and limits

Review logo size/placement with its original generous asset padding, mobile banner crops and footer glow intensity on a real iPhone. Chrome mobile/touch emulation passed; Safari and physical device app handoff were not exercised. Approved partner logos and favicon remain optional brand-completion inputs from the historical audit; no new logo or favicon was invented. No missing contact-information blocker remains. Nothing was deployed or committed.

---

# Historical audit (superseded where noted above)

# Mobile MVP release audit

Final local validation: 12 September 2026. Resumed from clean commit `e782383` (partial MVP work), compared with `dee539f`. Completed work was retained. No deployment was performed.

## Result

Production build and final production browser/route checks pass. No remaining reproducible functional failure was found in the tested scope. Public launch remains blocked by missing verified contact details. Physical iPhone Safari and hardware animation performance have not been validated.

## Previous work retained

- Corrected font references to supplied Anjoman WOFF files; consolidated shared header, drawer, footer and content data.
- Replaced expandable navigation with six requested direct routes in the requested order; added left drawer, overlay and body scroll locking.
- Restored approved Home headline, consultation route and latest-news heading; removed obsolete sections.
- Completed five service and four news detail routes, static parameters, metadata and unknown-slug 404 behavior.
- Replaced broken image references with existing assets and Next Image; used partner names where logos were unavailable.
- Added native horizontal news scrolling, mouse dragging, keyboard navigation and drag click suppression.
- Separated contact configuration from placeholders and validated destination formats.
- Added reduced-motion styling and refined shared dark surfaces and orange accents.

## Functional fixes in this final pass

- Drawer keyboard focus could escape: explicitly wrap Tab and Shift+Tab within its controls.
- Browser Back could leave the drawer and body scroll lock active: reset drawer state on pathname changes.
- Footer and a long partner name overflowed at 320px with 200% text: allow footer wrapping and partner-name breaking. Normal layouts are preserved.
- First News image triggered a lazy-loaded LCP warning: load the above-fold image eagerly.
- Removed temporary pointer console logging.
- Strengthened route checks to require actual HTTP 404 responses for invalid routes.
- Added repeatable isolated browser QA, excluded generated reports from Git/ESLint, and documented operation/contact configuration.

## Final verification

- [x] `npm run lint`: clean.
- [x] `npm test`: all 3 unit tests pass.
- [x] `npm run build`: successful Next.js 16.3.4 compilation, TypeScript check and static generation (18 generated pages).
- [x] Development route checks: 15 pages, 15 linked routes, 39 asset URLs and 6 invalid-route 404 checks pass.
- [x] Production route checks: 15 pages, 15 linked routes, 29 asset URLs and 6 invalid-route 404 checks pass.
- [x] Development browser suite passes after fixes.
- [x] Final production browser suite: all 11 tests pass; `test-results/.last-run.json` records `passed` with no failed tests.
- [x] Separate configured-contact browser test: 1 test passes for all five destinations, intercepted clicks, external-link attributes, neutral default borders and orange hover outlines. Example values existed only in a temporary server process; they were not saved or included in production.
- [x] All 15 routes checked at 320, 375, 390 and 430px for status, title, heading, Persian RTL, Anjoman, loaded images and document overflow.
- [x] Drawer: left position, six links, focus trap/restoration, Escape, overlay, close button, history, short 320x400 screen and touch taps.
- [x] News: browser touch events for horizontal swipe and vertical scrolling, mouse drag, click/tap navigation, keyboard Home/End and accidental-click prevention.
- [x] Home consultation, all service cards/detail consultation links and all news cards/back links.
- [x] 200% text and reduced motion across all six main routes at 320px; no tested heading/paragraph clipping or document overflow.
- [x] No console errors/warnings, page exceptions or failed HTTP responses during the all-route browser sweep.
- [x] Visually reviewed production full-page screenshots of six main pages and nine detail pages for layout, image ratios, Persian rendering and RTL.
- [x] `git diff --check`: no whitespace errors.

Tests ran with Node.js 24.20.0 and installed headless Chrome in isolated profiles. The app was run in development and from its production build. Animation/reduced-motion behavior and touch reliability were checked in Chromium; no measured physical-device frame-rate or Safari claim is made.

### Verified routes (HTTP 200)

| Main pages | Service details | News details |
| --- | --- | --- |
| `/` | `/services/content-production` | `/news/strong-brands` |
| `/about` | `/services/advertising` | `/news/content-growth` |
| `/services` | `/services/personal-branding` | `/news/strategy-path` |
| `/news` | `/services/business-growth` | `/news/good-advertising` |
| `/partners` | `/services/team-building` | |
| `/contact` | | |

## Files changed in this resumed pass

| Files | Purpose |
| --- | --- |
| `src/app/components/KhatMenu.tsx` | Focus trap and history/state cleanup |
| `src/app/components/KhatFooter.tsx` | Enlarged-text wrapping |
| `src/app/components/NewsRail.tsx`, `src/app/news/page.tsx` | Above-fold image loading and removed debug logging |
| `src/app/partners/page.tsx` | Long-name wrapping |
| `scripts/check-routes.mjs` | Strict 404 assertions |
| `playwright.config.ts`, `tests/browser/mobile.spec.ts`, `tests/browser/contact-fixture.spec.ts` | Mobile and configured-contact browser QA |
| `package.json`, `package-lock.json` | Development-only Playwright dependency and test script |
| `.gitignore`, `eslint.config.mjs` | Generated-report exclusions |
| `README.md`, `RELEASE-AUDIT.md` | Runbook, configuration and release evidence |

## Remaining business inputs and validation limits

1. Supply verified phone, WhatsApp number, email, Telegram and Instagram handles using the five `KHAT_*` variables in `.env.example` and README. Production cards currently remain visibly inactive. Link construction and click destinations are tested; account ownership, delivery and external-app handoff cannot be verified without real information. Rebuild after configuration changes.
2. Supply approved partner logos and confirm the existing partner list. Current text tiles have no missing-image requests. Team biographies/photos are only needed if the omitted team section is restored.
3. Perform a physical iPhone Safari check before public launch, particularly safe areas, external-app handoff and animation feel. Browser emulation passes but hardware smoothness is not certified.

## Earlier visual changes requiring manual brand review

These were present in the partial commit and were preserved instead of applying another redesign:

- Header/footer use Anjoman text for the Khat wordmark rather than the supplied image logo.
- Hero proportions, overlays, spacing, typography and shared footer treatment changed in the earlier pass.
- About's unfinished team skeleton was removed and replaced with strategic copy.
- Missing partner logos became text tiles; missing news imagery uses related supplied images.
- The existing app favicon still uses the starter icon and needs an approved Khat favicon for brand-complete publication.

This pass did not replace logos, approved copy, major page composition or visual assets. Visible changes are limited to overflow corrections and image-loading behavior. Screenshots and the browser HTML report are local ignored outputs under `test-results/` and `playwright-report/`.