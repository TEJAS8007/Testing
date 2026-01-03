const {test,expect, chromium} = require('@playwright/test')
const { features } = require('process')

test('Pagination Test for Automation', async() =>{

    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/');~

    await expect(page).toHaveTitle('Automation Testing Practice');
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');

    const pages = await page.locator('ul#pagination a');
    const page_count = await pages.count();
    console.log('Total Page : ',page_count);

    for(let a=0;a<page_count;a++) {

        await pages.nth(a).click();
        console.log('Navigating To Page : ',pages.nth(a).textContent());

        const names = await page.locator('table#productTable tr :nth-child(2)').allInnerTexts();
        const prices = await page.locator('table#productTable tr :nth-child(3)').allInnerTexts();

        for(let b=0;b<names.length;b++) {

            console.log(`Item ${b + 1} → Name: ${names[b]}, Price: ${prices[b]}`);
        }
        

        console.log('-----------------------------------------------------------------');
    }

    if(!page==null) {
        page.close();
    }
})