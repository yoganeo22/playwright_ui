import { expect } from '@playwright/test';
import test from '../basePage';

test('validate login with invalid username', async ({ page, googlePage}) => {
    
    // Includes - textbox, button, label/title
    await googlePage.failedLogin('demo', 'demo')
    
});

test('validate search function', async ({ page, googlePage}) => {
    
    // Includes - textbox, keyboard enter
    await googlePage.searchGoogle()
    
});

test('validate playwright supported language', async({page, playwrightPage}) => {

    // Includes - label/title, drop down list, 
    await playwrightPage.setLanguage('Java')
});