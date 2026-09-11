# Mobile MVP audit

Scope: existing Next.js App Router project; mobile release preparation. Preserve Anjoman, supplied imagery, dark editorial surfaces and #FF6A1A capsule accents. No deployment or desktop redesign.

## Baseline findings

- Fonts reference missing TTF files; approved WOFF assets exist.
- Home duplicates the shared drawer; services has a hamburger that links home.
- Expandable menus violate the requested direct navigation; no modal focus management, and short screens can clip navigation.
- Home consultation points to a missing anchor; three news links have no articles.
- Four news images, twelve partner images and the services hero are missing.
- Contact numbers and social accounts are placeholders; the email is unverified.
- News cards are oversized; pointer capture interferes with clicks and native touch; wheel interception blocks vertical navigation.
- Team section contains eight unfinished skeleton cards and no real biographies.
- Repeated footers, signatures and content data; inconsistent orange, tiny low-contrast text, raw images, absent per-page metadata and reduced-motion support.
- Dynamic lookup uses inherited object properties, permitting invalid slugs to pass the existence check.

## Verification checklist

- [ ] Shared accessible navigation, direct routes, focus/scroll restoration
- [ ] Approved home copy and consultation route
- [ ] Five services and all news details, metadata and unknown-slug 404s
- [ ] Optimized existing images and working Anjoman
- [ ] Compact news rail: native touch, mouse drag, keyboard, click suppression
- [ ] Contact configuration separated from placeholders
- [ ] Mobile 320–430px, short screens, text enlargement and reduced motion
- [ ] ESLint, TypeScript and production build
- [ ] Development browser interaction and console/network QA

Missing business inputs: verified phone, WhatsApp number, email, Telegram and Instagram handles; partner logo assets; team biographies/photos. Do not invent them.
