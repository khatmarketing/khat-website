import { test, expect } from '@playwright/test';

for (const width of [320, 375, 390, 414, 430]) {
  test(`drawer touch lifecycle at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/');
    await page.addStyleTag({ content: ':root { --safe-top: 59px; }' });
    const trigger = page.locator('.menu-trigger');
    const drawer = page.locator('#khat-drawer');
    const panel = page.locator('.drawer-panel');
    const bounds = (await trigger.boundingBox())!;
    expect(bounds.width).toBeGreaterThanOrEqual(44);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
    const headerBounds = (await page.locator('.site-header').boundingBox())!;
    expect(bounds.y + bounds.height / 2).toBeLessThanOrEqual(headerBounds.y + headerBounds.height);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(headerBounds.y + headerBounds.height);
    expect(await trigger.evaluate(el => {
      const box = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
    })).toBe(true);
    await trigger.tap();
    await expect(drawer).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // An opening gesture retargeted to the drawer root must not dismiss it.
    await drawer.dispatchEvent('click');
    await expect(drawer).toBeVisible();
    await expect.poll(() => panel.evaluate(el => Math.round(el.getBoundingClientRect().left))).toBe(0);
    const panelBounds = (await panel.boundingBox())!;
    expect(panelBounds.width).toBeLessThanOrEqual(Math.min(width * 0.78, 320) + 1);
    expect(await panel.evaluate(el => getComputedStyle(el).animationName)).toBe('drawer-slide-in');
    const backdrop = drawer.locator('.drawer-backdrop');
    await expect.poll(() => backdrop.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
    expect(await backdrop.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(0, 0, 0, 0.72)');
    await expect(page.locator('body')).toHaveCSS('position', 'fixed');
    await drawer.locator('a[href="/services"]').tap();
    await expect(page).toHaveURL(/\/services$/);
    await expect(drawer).not.toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('position', 'fixed');
    for (const route of ['/partners', '/news', '/about', '/contact', '/']) {
      await trigger.tap();
      await drawer.locator(`nav a[href="${route}"]`).tap();
      await expect(page).toHaveURL(new RegExp(`${route === '/' ? '/$' : route + '$'}`));
      await expect(drawer).not.toBeVisible();
    }
    for (let cycle = 0; cycle < 3; cycle++) {
      await trigger.tap();
      await expect(drawer).toBeVisible();
      await expect.poll(() => panel.evaluate(el => Math.round(el.getBoundingClientRect().left))).toBe(0);
      await page.touchscreen.tap(width - 8, 300);
      await expect(drawer).not.toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    }
    await trigger.tap();
    await drawer.locator('button').tap();
    await expect(drawer).not.toBeVisible();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
    await page.keyboard.press('Space');
    await expect(drawer).toBeVisible();
    expect(errors).toEqual([]);
    await context.close();
  });
}
