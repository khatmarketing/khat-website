import { test, expect, type Page } from '@playwright/test';
import { services } from '../../src/lib/services';
import { articles } from '../../src/lib/articles';

const mainRoutes = ['/', '/about', '/services', '/news', '/partners', '/contact'];
const routes = [...mainRoutes, ...Object.keys(services).map(s => `/services/${s}`), ...Object.keys(articles).map(s => `/news/${s}`)];

async function ready(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('main')).toBeVisible();
}

async function noOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    overflowing: [...document.querySelectorAll('body *')].filter(el => {
      if (el.closest('.news-rail, dialog')) return false;
      const bounds = el.getBoundingClientRect();
      return bounds.width > 0 && (bounds.right > innerWidth + 1 || bounds.left < -1);
    }).slice(0, 10).map(el => el.outerHTML.slice(0, 180)),
  }));
  expect(sizes.document, JSON.stringify(sizes.overflowing)).toBeLessThanOrEqual(sizes.viewport + 1);
}

for (const width of [320, 375, 390, 430]) {
  test(`all 15 routes: assets, console, RTL and overflow at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: width === 320 ? 568 : 844 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    for (const route of routes) {
      expect((await page.goto(route))?.status()).toBe(200);
      await ready(page);
      await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await expect(page.locator('main h1')).toHaveCount(route === '/' ? 0 : 1);
      await expect(page).toHaveTitle(/خط/);
      await noOverflow(page);
      for (const image of await page.locator('main img, .header-brand img, footer img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy();
      }
      // Check the bottom too: overflowing lower cards must not be hidden by a blanket overflow rule.
      await page.locator('footer').scrollIntoViewIfNeeded();
      await noOverflow(page);
      const font = await page.locator('body').evaluate(el => getComputedStyle(el).fontFamily);
      expect(font.toLowerCase()).toContain('anjoman');
      if (width === 390) {
        await page.evaluate(() => {
          document.querySelectorAll('.news-rail').forEach(el => { el.scrollLeft = 0; });
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
        await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll('/', '_') || 'home'}.png`), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('drawer traps focus, closes by Escape/overlay/button and navigates directly', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/');
  await ready(page);
  const trigger = page.getByRole('button', { name: 'باز کردن منو', exact: true });
  const dialog = page.getByRole('dialog');
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'بستن منو', exact: true })).toBeFocused();
  await expect.poll(() => page.locator('.drawer-panel').evaluate(el => Math.round(el.getBoundingClientRect().left))).toBe(0);
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBeTruthy();
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.locator('body').evaluate(el => el.style.position)).toBe('');
  await trigger.click();
  await page.mouse.click(386, 110);
  await expect(dialog).not.toBeVisible();
  await trigger.click();
  await page.getByRole('button', { name: 'بستن منو', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  for (const route of mainRoutes) {
    await trigger.click();
    expect(await dialog.locator('nav a').count()).toBe(6);
    await dialog.locator(`nav a[href="${route}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${route === '/' ? '/$' : route + '$'}`));
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  }
});

test('drawer remains usable on short screens and after browser history navigation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 400 });
  await page.goto('/');
  await page.locator('.header-contact').click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.getByRole('button', { name: 'باز کردن منو', exact: true }).click();
  await page.getByRole('dialog').locator('a[href="/contact"]').scrollIntoViewIfNeeded();
  await expect(page.getByRole('dialog').locator('a[href="/contact"]')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.locator('body').evaluate(el => el.style.position)).toBe('');
});

test('news mouse dragging, keyboard navigation, and ordinary clicks', async ({ page }) => {
  await page.goto('/news');
  await ready(page);
  const rail = page.locator('.news-rail');
  await rail.scrollIntoViewIfNeeded();
  const box = (await rail.boundingBox())!;
  const y = box.y + 100;
  await page.mouse.move(box.x + 80, y);
  await page.mouse.down();
  await page.mouse.move(box.x + 280, y, { steps: 15 });
  await page.mouse.up();
  await expect(page).toHaveURL(/\/news$/);
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeLessThan(-80);
  await rail.focus();
  await page.keyboard.press('End');
  await expect.poll(() => page.locator('progress').evaluate((el: HTMLProgressElement) => el.value)).toBeGreaterThan(.95);
  await page.keyboard.press('Home');
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0);
  await rail.getByRole('link').first().click();
  await expect(page).toHaveURL(/\/news\/strong-brands$/);
});

test('native touch supports horizontal news swipe and vertical page scroll', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('/news');
  await ready(page);
  await page.getByRole('button', { name: 'باز کردن منو', exact: true }).tap();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'بستن منو', exact: true }).tap();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  const rail = page.locator('.news-rail');
  const box = (await rail.boundingBox())!;
  const cdp = await context.newCDPSession(page);
  async function swipe(x: number, y: number, dx: number, dy: number) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
    for (let step = 1; step <= 12; step++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * step / 12, y: y + dy * step / 12, id: 1 }] });
      await page.waitForTimeout(20);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  }
  await swipe(75, box.y + 110, 230, 0);
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeLessThan(-80);
  await expect(page).toHaveURL(/\/news$/);
  await swipe(220, box.y + 160, 0, -200);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(60);
  await noOverflow(page);
  await rail.evaluate(el => { el.scrollLeft = 0; });
  await rail.getByRole('link').first().tap();
  await expect(page).toHaveURL(/\/news\/strong-brands$/);
  await context.close();
});

test('home and every service/news card open their intended routes', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/');
  await page.getByRole('link', { name: 'مشاوره رایگان', exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  for (const slug of Object.keys(services)) {
    await page.goto('/services');
    await page.locator(`main a[href="/services/${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/services/${slug}$`));
    await page.getByRole('link', { name: 'مشاوره رایگان', exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
  }
  for (const slug of Object.keys(articles)) {
    await page.goto('/news');
    await page.locator(`main a[href="/news/${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/news/${slug}$`));
    await page.getByRole('link', { name: /بازگشت به خبرهای خط/ }).click();
    await expect(page).toHaveURL(/\/news$/);
  }
});

test('approved contact details are active', async ({ page }) => {
 await page.goto('/contact');
 await expect(page.locator('a.contact-card')).toHaveCount(5);
 await expect(page.locator('.contact-card[aria-disabled="true"]')).toHaveCount(0);
});

test('200% text and reduced motion preserve navigation and content', async ({ page }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 568 });
  for (const route of mainRoutes) {
    await page.goto(route);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await ready(page);
    await noOverflow(page);
    const clipped = await page.locator('main h1, main h2, main p').evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent));
    expect(clipped).toEqual([]);
    await page.getByRole('button', { name: 'باز کردن منو', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const duration = await page.locator('.drawer-panel').evaluate(el => getComputedStyle(el).transitionDuration);
    expect(parseFloat(duration)).toBeLessThan(.01);
    await page.getByRole('dialog').locator('a[href="/contact"]').click();
    await expect(page).toHaveURL(/\/contact$/);
  }
});
