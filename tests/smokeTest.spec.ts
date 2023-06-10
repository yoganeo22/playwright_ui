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

test('validate playwright supported language', async({page, playwrightPage}) => {

    // Includes - dropdown list
    await page.goto('/') 
    await playwrightPage.setLanguage('Java')
});

test('validate playwright icon', async({page, playwrightPage}) => {

    // Includes - icon
    await page.goto('/')
    await playwrightPage.validateIcon('/img/playwright-logos.svg')
});

test('validate toggle mode', async({page, playwrightPage}) => {

    // Includes - toggle
    await page.goto('/')
    await playwrightPage.validateToggle()
});

test('validate modal', async({page, playwrightPage}) => {

    // Includes - toggle
    await page.goto('/')
    await playwrightPage.validateModal()
});