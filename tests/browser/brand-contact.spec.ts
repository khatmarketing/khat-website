import { test, expect, type Locator } from '@playwright/test';

async function rotation(icon: Locator) {
  return icon.evaluate(el => el.getAnimations().map(animation => ({
    frames: (animation.effect as KeyframeEffect).getKeyframes().map(frame => frame.transform),
    iterations: animation.effect!.getTiming().iterations,
    duration: animation.effect!.getTiming().duration,
  })));
}

test('canonical logo, banners, shared footer fade and removed Home headline', async ({ page }) => {
  for (const route of ['/', '/news', '/partners', '/services/content-production', '/news/strong-brands']) {
    await page.goto(route);
    for (const logo of await page.locator('header .khat-logo img, footer .khat-logo img').all()) {
      await expect(logo).toHaveAttribute('src', /khat-logo/);
      expect(await logo.evaluate((el: HTMLImageElement) => el.width / el.height)).toBe(1);
      expect(await logo.evaluate(el => getComputedStyle(el).objectFit)).toBe('contain');
    }
    expect(await page.locator('footer').evaluate(el => getComputedStyle(el).backgroundImage)).toContain('radial-gradient');
    if (route === '/news' || route === '/partners') {
      await expect(page.locator('.page-hero img')).toHaveAttribute('src', new RegExp(`${route.slice(1)}%2Epng|${route.slice(1)}\\.png`));
      expect(await page.locator('.page-hero img').evaluate(el => getComputedStyle(el).objectFit)).toBe('cover');
    }
    if (route === '/') {
      await expect(page.getByText('ایده تا بازار کنارتیم تا برند بزرگتر و هدفمندتری داشته باشی', { exact: true })).toHaveCount(0);
      await expect(page.locator('.home-hero h1')).toHaveCount(0);
    }
  }
});

test('top contact and every partner have neutral defaults and neon hover/focus/press', async ({ page }) => {
  await page.goto('/partners');
  for (const item of await page.locator('.header-contact, main li.neon-ring').all()) {
    await expect.poll(() => item.evaluate(el => getComputedStyle(el).borderTopColor)).not.toBe('rgb(255, 106, 26)');
    const before = await item.boundingBox();
    await item.hover();
    await expect.poll(() => item.evaluate(el => getComputedStyle(el).borderTopColor)).toBe('rgb(255, 106, 26)');
    expect(await item.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    await item.focus();
    await page.mouse.move(0, 0);
    await expect.poll(() => item.evaluate(el => getComputedStyle(el).borderTopColor)).toBe('rgb(255, 106, 26)');
    const after = await item.boundingBox();
    expect(after?.width).toBe(before?.width);
    expect(after?.height).toBe(before?.height);
    await item.evaluate(el => (el as HTMLElement).blur());
  }
});

test('all contact icons rotate exactly three turns on hover and keyboard focus, without looping', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('.contact-card h2')).toHaveText(['تماس تلفنی', 'WhatsApp', 'Telegram', 'E-mail', 'Instagram']);
  for (const card of await page.locator('.contact-card').all()) {
    const icon = card.locator('.contact-icon');
    await card.hover();
    expect(await rotation(icon)).toEqual([{ frames: ['rotate(0deg)', 'rotate(1080deg)'], iterations: 1, duration: 900 }]);
    await icon.evaluate(async el => { await Promise.all(el.getAnimations().map(a => a.finished)); });
    expect(await rotation(icon)).toEqual([]);
    await page.mouse.move(0, 0);
    await page.keyboard.press('Tab');
    await card.focus();
    expect(await rotation(icon)).toEqual([{ frames: ['rotate(0deg)', 'rotate(1080deg)'], iterations: 1, duration: 900 }]);
    await card.evaluate(el => (el as HTMLElement).blur());
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  for (const card of await page.locator('.contact-card').all()) {
    await card.hover();
    expect(await rotation(card.locator('.contact-icon'))).toEqual([]);
  }
});

test('touch press rotates each contact icon and gives partner/header feedback', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  for (const route of ['/contact', '/partners']) {
    await page.goto(route);
    await page.evaluate(() => document.addEventListener('click', event => event.preventDefault(), true));
    const items = route === '/contact' ? '.contact-card' : '.header-contact, main li.neon-ring';
    for (const item of await page.locator(items).all()) {
      await item.scrollIntoViewIfNeeded();
      const box = (await item.boundingBox())!;
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }] });
      if (route === '/contact') expect(await rotation(item.locator('.contact-icon'))).toEqual([{ frames: ['rotate(0deg)', 'rotate(1080deg)'], iterations: 1, duration: 900 }]);
      await expect.poll(() => item.evaluate(el => getComputedStyle(el).borderTopColor)).toBe('rgb(255, 106, 26)');
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
  }
  await context.close();
});
