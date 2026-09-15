import { test, expect } from '@playwright/test';

test('karat discovery works with the keyboard without changing prices', async ({ page }) => {
  await page.goto('/');
  const originalPrice = await page.locator('.calc-panel .result strong').innerText();
  const eight = page.locator('[data-karat="8"]');
  await eight.focus();
  await page.keyboard.press('Enter');
  await expect(eight).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-karat="14"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#karat-description')).toContainText('8 ayar takı.');
  await page.locator('[data-karat="18"]').click();
  await expect(page.locator('#karat-description')).toContainText('18 ayar takı.');
  await expect(page.locator('.calc-panel .result strong')).toHaveText(originalPrice);
});

test('motion can be paused, persists, and respects operating-system preference', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('body')).toHaveAttribute('data-motion', 'enabled');
  await page.locator('.motion-toggle').click();
  await expect(page.locator('body')).toHaveAttribute('data-motion', 'paused');
  await expect(page.locator('.reveal-ready')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.motion-toggle').click();
  await expect(page.locator('body')).toHaveAttribute('data-motion', 'enabled');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('body')).toHaveAttribute('data-motion', 'paused');
  await expect(page.locator('.motion-toggle')).toBeDisabled();
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length)).toBe(0);
});

test('mobile menu closes with Escape and remains keyboard accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.menu-btn').click();
  await expect(page.locator('.menu-btn')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('.menu-btn')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.menu-btn')).toBeFocused();
});

test('homepage survives unavailable storage and optional observer', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable'); } });
    delete (window as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;
  });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.reveal-ready')).toHaveCount(0);
  await page.locator('.theme-toggle').click();
  await page.locator('[data-karat="8"]').click();
  await expect(page.locator('#karat-description')).toContainText('8 ayar takı.');
  expect(errors).toEqual([]);
});

test('static content remains visible without JavaScript', async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto('http://127.0.0.1:4176/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/page-is-loading/);
  await expect(page.locator('.hero-actions a').first()).toHaveAttribute('href', '#uygulama-deneyimi');
  await page.close();
});

for (const width of [320, 375, 768, 1024]) {
  test(`homepage fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    // Text must stay in the flexible column, not collapse into the icon column.
    const paragraph = await page.locator('.why-cards .card p').first().boundingBox();
    expect(paragraph?.width).toBeGreaterThan(150);
  });
}
