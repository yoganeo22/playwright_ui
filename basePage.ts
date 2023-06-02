import { test as basePage } from '@playwright/test';
import { GooglePage } from './pageProject/GooglePage';
import { PlaywrightPage } from './pageProject/PlaywrightPage';

const test = basePage.extend<{
    googlePage: GooglePage;
    playwrightPage: PlaywrightPage;
}>({
    googlePage: async ({ page, context }, use) => {
        await use(new GooglePage(page));
    },
    playwrightPage: async ({ page, context }, use) => {
        await use(new PlaywrightPage(page));
    }
})

export default test;