import { expect, Locator, type Page } from "@playwright/test";

export class GooglePage {

    readonly page: Page
    readonly signInButton: Locator
    readonly googleAccountTextbox: Locator
    readonly nextButton: Locator
    readonly signInErrorMessage: Locator
    readonly searchTexbox: Locator
    readonly searchButton: Locator

    /* Tabs */
    readonly allTab: Locator
    
    constructor(page:Page)
    {
        this.page=page
        this.signInButton=page.getByRole('link', { name: 'Sign in' })
        this.googleAccountTextbox=page.locator("//*[@class='whsOnd zHQkBf']")
        this.nextButton=page.getByRole('button', { name: 'Next' })
        this.signInErrorMessage=page.locator("//*[@class='o6cuMc Jj6Lae']")
        this.searchTexbox=page.getByRole('combobox', { name: 'Search' })
        this.searchButton=page.getByRole('button', { name: 'Google Search' })

        /* Tabs */
        this.allTab=page.getByText('All', { exact: true })
    }

    async failedLogin(username: string, password: string)
    {
        await this.page.goto('https://www.google.com/');
        await this.page.waitForLoadState('networkidle')

        // Expect a title "to contain" a substring.
        await expect(this.page).toHaveTitle(/Google/);

        await this.signInButton.click()
        await this.googleAccountTextbox.first().fill(username)
        await this.nextButton.click()

        // Validation
        let msg = await this.signInErrorMessage.innerText()
        await expect(msg).toContain('Couldn’t find your Google Account')
    }

    async searchGoogle()
    {
        await this.page.goto('https://www.google.com/');

        await this.searchTexbox.fill('weird facts on earth')
        await this.page.keyboard.press('Enter')

        await expect(await this.allTab).toBeVisible()
    }
}
