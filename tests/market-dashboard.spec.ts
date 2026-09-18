import { test, expect } from '@playwright/test';

test('piyasa dashboard renders the 21st.dev finance chart and interactions', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/piyasa.html');

  await expect(page.getByRole('heading', { name: 'Altın değerini tek bakışta takip et.' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Gram altın örnek fiyat grafiği' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Gram Altın' })).toBeVisible();
  await expect(page.getByText('Gram Altın · 24 Ayar')).toBeVisible();

  await page.getByRole('button', { name: '7G' }).click();
  await expect(page.getByRole('button', { name: '7G' })).toHaveClass(/is-active/);
  await expect(page.getByText('7G görünüm')).toBeVisible();

  await page.getByRole('link', { name: 'Ürün kataloğunu incele' }).click();
  await expect(page).toHaveURL(/ozellikler\.html$/);
  expect(errors).toEqual([]);
});
