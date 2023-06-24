import { test as basePage } from '@playwright/test';
import { GooglePage } from './pageProject/GooglePage';
import { PlaywrightPage } from './pageProject/PlaywrightPage';
import { ViteReactPage } from './pageProject/ViteReactPage';

const test = basePage.extend<{
    googlePage: GooglePage;
    playwrightPage: PlaywrightPage;
    viteReactPage: ViteReactPage;
}>({
    googlePage: async ({ page, context }, use) => {
        await use(new GooglePage(page));
    },
    playwrightPage: async ({ page, context }, use) => {
        await use(new PlaywrightPage(page));
    },
    viteReactPage: async ({ page, context }, use) => {
        await use(new ViteReactPage(page));
    }
})

export default test;