const {test,expect, chromium} = require('@playwright/test');

test('Multiple Window Test',async() => {

    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');

    const Discount = await page.locator("//table[@class='gf-t']/tbody/tr/td[1]/ul/li/a");

    const Discount_count = await Discount.count();
    console.log('Total Links : ',Discount_count);

    for(let a=0;a<Discount_count;a++) {
        await Promise.all([
            context.waitForEvent('page'),
            await Discount.nth(a).click({modifiers:['Control']})
        ])
    }

    const pages = await context.pages();

    for(let pag of pages) {
        const title = await pag.title();
        console.log(title);

        const url = await pag.url();
        console.log(url);
    }

    if(!page==null) {
        page.close();
    }
})