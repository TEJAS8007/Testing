const {test,expect} = require('@playwright/test');

test('By-Passing login with user session',async({page})=>{ 

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.locator("[name='username']").fill('Admin');
    await page.locator("[name='password']").fill('admin123');
    await page.click("//button[text()=' Login ']");

    await page.context().storageState({path:'OraganeHRM.json'});

});

test('Verifying DashBoard',async({browser}) => {

    const context = await browser.newContext({storageState:'OraganeHRM.json'});
    const page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    const element = await page.locator("//h6[text()='Dashboard']");
    await expect(element).toHaveText('Dashboard');
});

test('Verifying Url and Title',async({browser}) => {

    const context = await browser.newContext({storageState:'OraganeHRM.json'});
    const page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    const url = await page.url();
    console.log('Url : ',url);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    const title = await page.title();
    console.log('Title : ',title);
    await expect(page).toHaveTitle('OrangeHRM');
});
