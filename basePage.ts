import { test as basePage } from '@playwright/test';
import { LoginPage } from './pageProject/LoginPage';

const test = basePage.extend<{
    loginPage: LoginPage;
}>({
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page));
    }
})

export default test;