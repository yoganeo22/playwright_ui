import { expect } from '@playwright/test';
import test from '../basePage';

test('validate viteReact page', async({page, viteReactPage}) => {

    // To work with project in "https://github.com/PenpPenp/vite-project.git"
    await page.goto('/') 
    await expect(page).toHaveTitle("Vite + React + TS")

    let myMap = await viteReactPage.validateRecordByContinents();
    const result = Object.fromEntries(myMap)
    console.log("result: " + JSON.stringify(result))
});