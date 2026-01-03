const {test,expect} =require('@playwright/test');

test('Pagination_tests',async({page}) => {

    await page.goto('https://datatables.net/examples/basic_init/alt_pagination.html');

    await expect(page).toHaveTitle('DataTables example - Alternative pagination');
    await expect(page).toHaveURL('https://datatables.net/examples/basic_init/alt_pagination.html');

    const pages = await page.locator("//div[@class='dt-paging']//button[     not(contains(@class,'next')) and      not(contains(@class,'previous')) ]");

    const page_count = await pages.count();
    console.log('Total no of Pages : ',page_count);

    for(let a=0;a<page_count;a++) {

        const page_number = await pages.nth(a).textContent();
        console.log('Navigating To Page : ',page_number);
        await pages.nth(a).click();
        await page.waitForTimeout(500);
    }

    if(page!==null) {
        await page.close();
    }

});