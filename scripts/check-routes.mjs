import assert from 'node:assert/strict';
import { articles } from '../src/lib/articles.ts';
import { services } from '../src/lib/services.ts';

const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const routes = ['/', '/about', '/services', '/news', '/partners', '/contact', ...Object.keys(services).map(s => `/services/${s}`), ...Object.keys(articles).map(s => `/news/${s}`)];
const assets = new Set();
const internalLinks = new Set();
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, route === "/" ? 0 : 1, `${route}: expected heading count`);
  assert.match(html, /id="main-content"/, `${route}: main landmark`);
  assert.match(html, /lang="fa" dir="rtl"/, `${route}: Persian RTL`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route}: title`);
  assert.ok(!html.includes('yourusername') && !html.includes('989000000000'), `${route}: no dummy destinations`);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (url.startsWith('/_next/') || url.startsWith('/images/') || url.startsWith('/fonts/') || url.startsWith('/favicon')) assets.add(url);
    else if (url.startsWith('/') && !url.startsWith('//')) internalLinks.add(url);
  }
  console.log(`PASS ${route}`);
}
for (const url of internalLinks) {
  assert.equal((await fetch(base + url)).status, 200, `linked route ${url}`);
}
for (const url of assets) {
  const response = await fetch(base + url, { headers: { Accept: 'image/webp,*/*' } });
  assert.equal(response.status, 200, `asset ${url}`);
}
for (const route of ['/missing-page', '/services/missing', '/services/toString', '/services/__proto__', '/news/missing', '/news/constructor']) {
  const response = await fetch(base + route);
  const html = await response.text();
  assert.equal(response.status, 404, `${route}: not found`);
  assert.match(html, /این صفحه روی خط نیست/, `${route}: branded recovery`);
  console.log(`PASS ${route} (not found, HTTP ${response.status})`);
}
console.log(`Verified ${routes.length} pages, ${internalLinks.size} linked routes and ${assets.size} asset URLs.`);
