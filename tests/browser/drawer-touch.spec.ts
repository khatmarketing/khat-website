import { test, expect } from '@playwright/test';

for (const width of [320, 375, 390, 414, 430]) {
  test(`drawer touch lifecycle at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/');
    // Exercise the fallback even when a mobile browser suppresses compatibility clicks.
    await page.evaluate(() => {
      document.addEventListener('click', event => {
        if (event.target instanceof Element && event.target.closest('.menu-trigger') && event.detail !== 0) event.stopImmediatePropagation();
      }, true);
    });
    const trigger = page.locator('.menu-trigger');
    const drawer = page.locator('#khat-drawer');
    const panel = page.locator('.drawer-panel');
    const bounds = (await trigger.boundingBox())!;
    expect(bounds.width).toBeGreaterThanOrEqual(44);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
    expect(await trigger.evaluate(el => {
      const box = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
    })).toBe(true);
    await trigger.tap();
    await expect(drawer).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // An opening gesture retargeted to the new dialog must not dismiss it.
    await drawer.dispatchEvent('click');
    await expect(drawer).toBeVisible();
    await expect.poll(() => panel.evaluate(el => Math.round(el.getBoundingClientRect().left))).toBe(0);
    await expect.poll(() => drawer.evaluate(el => getComputedStyle(el, '::backdrop').opacity)).toBe('1');
    expect(await drawer.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor)).toBe('rgba(0, 0, 0, 0.72)');
    await expect(page.locator('body')).toHaveCSS('position', 'fixed');
    await drawer.locator('a[href="/services"]').tap();
    await expect(page).toHaveURL(/\/services$/);
    await expect(drawer).not.toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('position', 'fixed');
    for (let cycle = 0; cycle < 3; cycle++) {
      await trigger.tap();
      await expect(drawer).toBeVisible();
      await expect.poll(() => panel.evaluate(el => Math.round(el.getBoundingClientRect().left))).toBe(0);
      await page.touchscreen.tap(width - 8, 300);
      await expect(drawer).not.toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(drawer).toHaveCSS('pointer-events', 'none');
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
