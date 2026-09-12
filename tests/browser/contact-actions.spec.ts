import { test, expect } from '@playwright/test';

test('all five configured contact actions render correct safe destinations and press states', async ({ page }) => {
  await page.goto('/contact');
  const destinations = [
    'tel:09001040402',
    'https://wa.me/message/O3N4D4VFVTMBP1',
    'https://t.me/pezhmandavoudi',
    'mailto:Khatmarketing.group@gmail.com',
    'https://www.instagram.com/khat.marketing?stkn=MWVxYnc1eGN3YXl6bQ%3D%3D&utm_source=qr',
  ];
  const cards = page.locator('a.contact-card');
  await expect(cards).toHaveCount(5);
  await expect(cards.locator('p')).toHaveCount(0);
  await expect(page.locator('[aria-disabled="true"]')).toHaveCount(0);
  // Exercise each click but intercept it before invoking an external app or sending traffic.
  await page.evaluate(() => {
    document.addEventListener('click', event => {
      const link = (event.target as Element).closest('a.contact-card');
      if (link) {
        event.preventDefault();
        document.body.dataset.lastContact = link.getAttribute('href')!;
      }
    }, true);
  });
  for (let index = 0; index < destinations.length; index++) {
    const card = cards.nth(index);
    await expect(card).toHaveAttribute('href', destinations[index]);
    if (destinations[index].startsWith('https')) {
      await expect(card).toHaveAttribute('target', '_blank');
      await expect(card).toHaveAttribute('rel', 'noopener noreferrer');
    }
    await card.evaluate(el => (el as HTMLElement).blur());
    await page.mouse.move(0, 0);
    await expect.poll(() => card.evaluate(el => getComputedStyle(el).borderTopColor)).not.toBe('rgb(255, 106, 26)');
    await card.hover();
    await expect.poll(() => card.evaluate(el => getComputedStyle(el).borderTopColor)).toBe('rgb(255, 106, 26)');
    await card.click();
    await expect(page.locator('body')).toHaveAttribute('data-last-contact', destinations[index]);
    await expect(page).toHaveURL(/\/contact$/);
  }
});
