import { expect } from '@playwright/test';
import test from '../basePage';

test('validate login with invalid username', async ({ page, googlePage}) => {
    
    // Includes - text field, button, message box
    await page.goto('/') 
    await googlePage.failedLogin('demo', 'demo')
    
});

test('validate search function', async ({ page, googlePage}) => {
    
    // Includes - search field, pagination
    await page.goto('/') 
    await googlePage.searchGoogle()
    
});
