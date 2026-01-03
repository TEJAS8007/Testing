const {test,expect} = require('@playwright/test');

test('login_MMercury', async({page}) => {

    await page.goto('https://demo.guru99.com/test/newtours/login.php');

    await page.locator("//input[@name='userName']").fill("QQQQ");
    await page.locator("//input[@name='password']").fill("qqqq");
    await page.locator("//input[@name='submit']").click();
});

test('login_MMercury_Success', async({page}) => {

    await page.goto('https://demo.guru99.com/test/newtours/login_sucess.php');

    const msg = await page.locator("//h3[text()='Login Successfully']");
    await expect(msg).toHaveText('Login Successfully');
});

