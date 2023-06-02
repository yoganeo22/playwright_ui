import { expect, Locator, type Page } from "@playwright/test";

export class PlaywrightPage {

    readonly page: Page
    readonly nodejsButton: Locator
    readonly languageDDL: Locator
    readonly navbarLabel: Locator
    
    constructor(page:Page)
    {
        this.page=page
        this.nodejsButton=page.getByRole('button', { name: 'Node.js' }) 
        this.languageDDL=page.getByRole('navigation', { name: 'Main' })
        this.navbarLabel=page.locator("//*[@class='navbar__brand']")
    }

    async setLanguage(language: string)
    {
        await this.page.goto('https://playwright.dev/');
        await this.page.waitForLoadState('networkidle')

        // Expect a title "to contain" a substring.
        await expect(this.page).toHaveTitle(/Playwright/);

        await this.nodejsButton.hover()
        await this.languageDDL.getByRole('link', { name: language }).click();

        // Validation
        let res = await this.navbarLabel.innerText()
        await expect(res).toBe('Playwright for ' + language)
    }

}
