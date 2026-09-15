import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

for (const width of [390, 1440]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    for (const path of ['/', '/ozellikler.html']) {
      test(`${path} ${width}px ${colorScheme}`, async ({ browser }, testInfo) => {
        const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme });
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`http://127.0.0.1:4176${path}`);
        await page.waitForFunction(() => !document.documentElement.classList.contains('page-is-loading'));
        // Trigger below-the-fold lazy images and progressive section reveals.
        for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 700) {
          await page.evaluate(offset => scrollTo(0, offset), y);
          await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.evaluate(async () => {
          await Promise.all(document.getAnimations().filter(a => a.effect?.getTiming().iterations !== Infinity).map(a => a.finished.catch(() => {})));
          await Promise.all([...document.images].map(i => i.decode()));
        });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (width < 900) {
          await page.getByRole('button', { name: 'Menüyü aç', exact: true }).click();
          await expect(page.locator('.nav-links')).toBeVisible();
          await expect(page.locator('.menu-btn')).toHaveAttribute('aria-expanded', 'true');
          await page.locator('.menu-btn').click();
        }
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const violations = await page.evaluate(async () => {
          const axe = (window as unknown as { axe: { run: (node: Document, options: object) => Promise<{ violations: { id: string; nodes: unknown[] }[] }> } }).axe;
          return (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations;
        });
        expect(violations).toEqual([]);
        expect(errors).toEqual([]);
        await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true });
        const targetTheme = colorScheme === 'light' ? 'dark' : 'light';
        await page.locator('.theme-toggle').click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', targetTheme);
        await page.reload();
        await expect(page.locator('html')).toHaveAttribute('data-theme', targetTheme);
        await page.close();
      });
    }
  }
}
