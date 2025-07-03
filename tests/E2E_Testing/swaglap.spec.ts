import { test, expect } from '@playwright/test'

test.describe('Login Work Flow', () => {

    test('Valid Login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await expect(page).toHaveScreenshot('Before-login.png', { fullPage: true });
        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveScreenshot('After-login.png', { fullPage: true });
    });

    test('AddCart', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
    });


});

test('Invalid Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('Wruser');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveScreenshot('Invalid-login.png', { fullPage: true });
});

