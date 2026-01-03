const {test,expect} = require('@playwright/test');
const { createContext } = require('vm');

test.describe('Verify Funtionality of Swag Labs',async()=> {

    test('Login with coorect user Data',async({page})=> {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username',{exact:true}).fill('standard_user');
    await page.getByPlaceholder('Password',{exact:true}).fill('secret_sauce');
    await page.click("[name='login-button']");
    
    //Capturing user session for login test
    await page.context().storageState({path:'User.json'});

});


test('Validating title',async({browser}) => {
    
    const context = await browser.newContext({storageState:"User.json"});
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/inventory.html');
    const title =await page.title();
    console.log('Title : ',title);
    await expect(page).toHaveTitle('Swag Labs');
    
});

test('Validating Url',async({browser}) => {

    const context = await browser.newContext({storageState:'User.json'});
    const page = await context.newPage();
    
    await page.goto('https://www.saucedemo.com/inventory.html');
    const url =await page.url();
    console.log('url : ',url);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Verify Product Count',async({browser}) => {

   const context = await browser.newContext({storageState:'User.json'});
   const page = await context.newPage();
   
   await page.goto('https://www.saucedemo.com/inventory.html');
   const products = await page.locator("//div[@class='inventory_item']/child :: div[2]/div/a");
   const product_count = await products.count();
   console.log('No of Products : ',product_count);

   await expect(products).toHaveCount(6);

   for(let a=0;a<product_count;a++) {
    const product_Name = await products.nth(a).textContent();
    console.log(product_Name);
   }
});

test('Adding Product to Cart',async({browser}) => {

    const context = await browser.newContext({storageState:'User.json'});
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.waitForSelector("//div[text()='Sauce Labs Bolt T-Shirt']/ parent:: a",
        {state:'visible'}
    );

    await page.click("//div[text()='Sauce Labs Bolt T-Shirt']/ parent:: a");

    const product = await page.locator("//div[text()='Sauce Labs Bolt T-Shirt']");
    await expect(product).toHaveText('Sauce Labs Bolt T-Shirt');

    const price = await page.locator("//div[text()='15.99']");
    await expect(price).toHaveText('$15.99');

})

});