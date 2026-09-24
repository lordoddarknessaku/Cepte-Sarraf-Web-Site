import { createRequire } from 'node:module';
import { expect, test } from '@playwright/test';

const require = createRequire(import.meta.url);
const pages = [
  ['blog.html', 'Çok yakında.'],
  ['iletisim.html', 'Soruların ve geri bildirimlerin için buradayız.'],
  ['gizlilik.html', 'Gizlilik Politikası'],
  ['kullanim-kosullari.html', 'Kullanım Koşulları'],
] as const;
const widths = [320, 768, 1024, 1440] as const;

for (const [path, heading] of pages) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${path}: ${colorScheme} theme, responsive layout, and axe`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));

      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${path}`);
        await page.waitForFunction(() => !document.documentElement.classList.contains('page-is-loading'));
        await page.evaluate(async () => {
          await Promise.all(document.getAnimations().filter(animation => animation.effect?.getTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
        });
        await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
        await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} overflows at ${width}px`).toBe(true);

        if (width === 320 || width === 1440) {
          await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
          const violations = await page.evaluate(async () => {
            const axe = (window as unknown as {
              axe: { run: (node: Document, options: object) => Promise<{ violations: { id: string }[] }> };
            }).axe;
            const result = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
            return result.violations.map(violation => violation.id);
          });
          expect(violations, `${path} ${colorScheme} ${width}px axe violations`).toEqual([]);
        }

        if (width === 320) {
          const menu = page.getByRole('button', { name: 'Menüyü aç' });
          await menu.click();
          await expect(page.getByRole('navigation', { name: 'Ana menü' })).toBeVisible();
          await expect(menu).toHaveAttribute('aria-expanded', 'true');
          await page.keyboard.press('Escape');
          await expect(menu).toHaveAttribute('aria-expanded', 'false');
          await expect(menu).toBeFocused();
        }
      }
      expect(errors, `${path} produced browser errors`).toEqual([]);
    });
  }

  test(`${path}: skip link focuses the main region`, async ({ page }) => {
    await page.goto(`/${path}`);
    await page.waitForFunction(() => !document.documentElement.classList.contains('page-is-loading'));
    const skip = page.getByRole('link', { name: 'İçeriğe geç' });
    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });
}

test('contact demo announces the outcome without sending data', async ({ page }) => {
  const postRequests: string[] = [];
  page.on('request', request => {
    if (request.method() === 'POST') postRequests.push(request.url());
  });
  await page.goto('/iletisim.html');
  await page.waitForFunction(() => !document.documentElement.classList.contains('page-is-loading'));
  await expect(page.getByText('Tanıtım formudur; bilgileriniz gönderilmez veya kaydedilmez.')).toBeVisible();
  const form = page.getByRole('form', { name: 'Tanıtım iletişim formu' });
  await form.getByLabel('Ad Soyad').fill('Test Kullanıcısı');
  await form.getByLabel('E-posta').fill('test@example.com');
  await form.getByLabel('Konu').fill('Örnek');
  await form.getByLabel('Mesaj').fill('Bu formun durum mesajı denetleniyor.');
  await form.getByRole('button', { name: 'Formu Dene' }).click();
  await expect(form.getByRole('status')).toContainText('Bilgileriniz gönderilmedi');
  expect(postRequests).toEqual([]);
});
