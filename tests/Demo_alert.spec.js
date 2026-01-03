const { skip } = require('node:test');
const {test,expect} = require('playwright/test')

test.skip('Alert Handling_simple...',async({page})=> {

    await page.goto('https://testautomationpractice.blogspot.com/',{
        waitUntil:'domcontentloaded'
    });

    await expect(page).toHaveTitle('Automation Testing Practice');
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
    
    await page.on('dialog',async(dialog)=> {
      await dialog.accept();  
    });

    const alert_button = await page.locator("//button[text()='Simple Alert']");
    await alert_button.click();

});

test,skip('Alert Handling_confirmation...',async({page})=> {

    await page.goto('https://testautomationpractice.blogspot.com/',{
        waitUntil:'domcontentloaded'
    });

    await expect(page).toHaveTitle('Automation Testing Practice');
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
    
    await page.on('dialog',async(dialog)=> {
      const msg = await dialog.message();
      console.log(msg);  
      await dialog.accept();  
    });

    const alert_button = await page.locator("//button[text()='Confirmation Alert']");
    await alert_button.click();

});

test('Alert Handling_confirmation...',async({page})=> {

    await page.goto('https://testautomationpractice.blogspot.com/',{
        waitUntil:'domcontentloaded'
    });

    await expect(page).toHaveTitle('Automation Testing Practice');
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
    
    await page.on('dialog',async(dialog)=> {
      const msg = await dialog.message();
      console.log(msg);  
      await dialog.accept("Harry");  
    });

    const alert_button = await page.locator("//button[text()='Prompt Alert']");
    await alert_button.click();

    const message = await page.locator("p#demo");
    const text = await message.textContent();
    console.log('msg : ',text);
});