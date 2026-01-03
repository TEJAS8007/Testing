const{test,expect, chromium} = require('@playwright/test')

test('Frame_locator_test',async() => {

    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext({recordVideo:{dir:'./Videos/'}});  
    const page = await context.newPage();
    await page.context().tracing.start({screenshots:true,snapshots:true});

    await page.goto('https://jqueryui.com/datepicker/');

    await expect(page).toHaveURL('https://jqueryui.com/datepicker/');
    await expect(page).toHaveTitle('Datepicker | jQuery UI');

    const Main_Frame = await page.frameLocator("//iframe[@class='demo-frame']");
    await Main_Frame.locator('input#datepicker').click();

    while(true) {

        const month = await Main_Frame.locator("//span[@class='ui-datepicker-month']").textContent();
        const year = await Main_Frame.locator("//span[@class='ui-datepicker-year']").textContent();

        if(await month.includes('May') && await year.includes('2027')) {
            break;
        }
        else {
            await Main_Frame.locator("//span[@class='ui-icon ui-icon-circle-triangle-e']").click();
        }
    }

    const dates = await Main_Frame.locator("//td[@data-handler='selectDay']/a");
    const date_count = await dates.count();

    for(let a=0;a<date_count;a++) {
        const date_text = await dates.nth(a).textContent();

        if(await date_text.includes('28')) {
            await dates.nth(a).click();
        }
    }
    await Main_Frame.locator('input#datepicker').screenshot({ path:'./tests/Screenshots/datepicker.png'});
    await page.waitForTimeout(3000);

    await page.context().tracing.stop({path:'./Date_Trace.zip'});
    if(!page.isClosed) {
        await page.close();
    }
})