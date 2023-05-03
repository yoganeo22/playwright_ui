import { expect } from '@playwright/test';
import test from '../basePage';

test('validate login with invalid username', async ({ page, loginPage}) => {
    
    await loginPage.failedLogin('demo', 'demo')
    
});