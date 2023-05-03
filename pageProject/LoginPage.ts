import { expect, Locator, type Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly signInButton: Locator
    readonly googleAccountTextbox: Locator
    readonly nextButton: Locator
    readonly signInErrorMessage: Locator
    
    constructor(page:Page)
    {
        this.page=page
        this.signInButton=page.getByRole('link', { name: 'Sign in' })
        this.googleAccountTextbox=page.getByRole('textbox', { name: 'Email or phone' })
        this.nextButton=page.getByRole('button', { name: 'Next' })
        this.signInErrorMessage=page.locator("//*[@class='o6cuMc Jj6Lae']")
    }

    async failedLogin(username: string, password: string)
    {
        await this.page.goto('https://www.google.com/');
        await this.page.waitForLoadState('networkidle')

        // Expect a title "to contain" a substring.
        await expect(this.page).toHaveTitle(/Google/);

        await this.signInButton.click()
        await this.googleAccountTextbox.fill(username)
        await this.nextButton.click()

        await this.page.waitForLoadState('networkidle')

        // Validation
        let msg = await this.signInErrorMessage.innerText()
        await expect(msg).toContain('Couldn’t find your Google Account')
    }
}
