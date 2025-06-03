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

test('link to individual stock page works', async({page}) => {
  await page.goto("http://localhost:4173")
  await page.locator('a').first().click()
  expect(page.url()).toBe("http://localhost:4173/stock/MSFT")
})

test('link back to home page works', async({page}) => {
  await page.goto('http://localhost:4173/stock/MSFT')
  await page.locator('a').first().click()
  expect(page.url()).toBe('http://localhost:4173')
})

test('all bullets are rendering on individual stock page', async({page}) => {
  await page.goto('http://localhost:4173/stock/MSFT')
  await new Promise(resolve => setTimeout(resolve, 2000)) 
  expect(page.locator('li')).toHaveCount(14)
})

test('all subheading are rendering on individual stock page', async({page}) => {
  await page.goto('http://localhost:4173/stock/MSFT')
  await new Promise(resolve => setTimeout(resolve, 2000)) 
  expect(page.locator('h3')).toHaveCount(6)
})

test('prices are rendering on main page', async({page}) => {
  await page.goto('http://localhost:4173')
  expect(page.locator('td').nth(1)).toBeDefined
})