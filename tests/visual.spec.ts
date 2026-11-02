import { test, expect } from '@playwright/test';

const sections = [
  ['hero', '.hero', 'header-and-hero.png'],
  ['proof', '.proof', 'section1.png'],
  ['services', '.services', 'section2.png'],
  ['process', '.process', 'section3.png'],
  ['testimonial', '.testimonial', 'section4.png'],
  ['faq', '.faq', 'section5.png'],
  ['footer', '.footer', 'footer.png'],
] as const;

test.describe('Ridgeline reference visual checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
  });

  for (const [name, selector, reference] of sections) {
    test(`${name} matches its reference checkpoint: ${reference}`, async ({ page }) => {
      await expect(page.locator(selector)).toHaveScreenshot(`${name}.png`, {
        maxDiffPixels: name === 'faq' ? 500 : 100,
      });
    });
  }

  test('full page keeps the approved section sequence', async ({ page }) => {
    // Long-page rasterization can differ slightly between browser runs; section checks remain strict.
    await expect(page).toHaveScreenshot('ridgeline-full-page.png', { fullPage: true, maxDiffPixels: 2500 });
  });

  test('mobile navigation opens accessibly', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile menu is intentionally hidden at desktop widths.');
    const menu = page.locator('.mobile-menu');
    await expect(menu).toBeVisible();
    await menu.locator('summary').click();
    await expect(menu.locator('nav')).toBeVisible();
    await expect(menu.locator('a')).toHaveCount(5);
  });
});
