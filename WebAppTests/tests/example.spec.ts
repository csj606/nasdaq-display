import { test, expect } from '@playwright/test';

test('tab name correct', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await expect(page).toHaveTitle(/NASDAQ Stock Display/);
});

test('page heading correct', async ({page}) => {
  await page.goto('http://localhost:4173');
  await expect(page.locator('h1')).toHaveText("NASDAQ 100 Daily Prices")
})

test('correct number of columns + rows', async ({page}) => {
  await page.goto("http://localhost:4173")
  await expect(page.locator('th')).toHaveCount(3)
  await expect(page.locator('tr')).toHaveCount(101)
})