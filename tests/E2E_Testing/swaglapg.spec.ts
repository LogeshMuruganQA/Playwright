import { test, expect } from '@playwright/test'

async function login(page) {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

}

test.describe('Login Work Flow', () => {

    test('Valid Login', async ({ page }) => {
        await login(page);
        // await expect(page).toHaveScreenshot('Before-login.png', { fullPage: true });
        // await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        //await expect(page).toHaveScreenshot('After-login.png', { fullPage: true });
    });

    test('Verify All items are listed', async ({ page }) => {
        await login(page);
        //await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        const items = await page.locator("//div[@class='inventory_item']").count();
        expect(items).toBe(6);

    });

    // test('Add items aand check the bag', async ({ page }) => {
    //     await login(page);
    //     const buttons = page.locator('button:has-text("Add to cart")');
    //     const count = await buttons.count();
    //     for (let i = 0; i < count; i++) {
    //         await buttons.nth(i).scrollIntoViewIfNeeded();
    //         await buttons.nth(i).click();
    //         await page.waitForTimeout(100); // optional: smooth interaction
    //     }
    //     await expect(page.locator(".shopping_cart_badge")).toHaveText(`${count}`);
    // });

    test('Add items aand check the bag', async ({ page }) => {
        await login(page);
        const buttons = page.locator("(//*[@class='btn btn_primary btn_small btn_inventory '])");
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await page.locator("(//*[@class='btn btn_primary btn_small btn_inventory '])[1]").click();
        }
        await expect(page.locator(".shopping_cart_badge")).toHaveText(`${count}`);
    });
    test('LowtoHigh', async ({ page }) => {
        await login(page);
        await page.locator('.product_sort_container').selectOption('lohi');
        const pricestext = await page.locator('.inventory_item_price').allTextContents();
        const prices = pricestext.map(price => parseFloat(price.replace('$', '')));
        const sortedprices = [...prices].sort((a,b)=>a-b);
        expect(prices).toEqual(sortedprices);
        await expect(page).toHaveScreenshot('dd.png',{fullPage:true})
    });
});