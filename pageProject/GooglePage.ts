import { expect, Locator, type Page } from "@playwright/test";

export class GooglePage {

    readonly page: Page
    readonly signInButton: Locator
    readonly googleAccountTextbox: Locator
    readonly nextButton: Locator
    readonly signInErrorMessage: Locator
    readonly searchTexbox: Locator
    readonly searchButton: Locator
    readonly pagination: Locator
    readonly allTab: Locator
    readonly resultStat: Locator
    
    constructor(page:Page)
    {
        this.page=page
        this.signInButton=page.getByRole('link', { name: 'Sign in' })
        this.googleAccountTextbox=page.locator("//*[@class='whsOnd zHQkBf']")
        this.nextButton=page.getByRole('button', { name: 'Next' })
        this.signInErrorMessage=page.locator("//*[@class='o6cuMc Jj6Lae']")
        this.searchTexbox=page.getByRole('combobox', { name: 'Search' })
        this.searchButton=page.getByRole('button', { name: 'Google Search' })
        this.pagination=page.locator("//*[@class='AaVjTc']/tbody/tr")
        this.allTab=page.getByText('All', { exact: true })
        this.resultStat=page.locator("//*[@id='result-stats']")
    }

    async navigateGoogleUrl(url: string)
    {
        await this.page.goto(url)
        await this.page.waitForLoadState('networkidle')

        // Validation
        await expect(this.page).toHaveTitle(/Google/)
    }

    async failedLogin(username: string, password: string)
    {
        await this.page.waitForLoadState('networkidle')

        await this.signInButton.click()
        await this.googleAccountTextbox.first().fill(username)
        await this.nextButton.click()

        // Validation
        let msg = await this.signInErrorMessage.innerText()
        await expect(msg).toContain('Couldn’t find your Google Account')
    }

    async searchGoogle()
    {
        let paginationOffset = 2    // 'G' and 'Next' Elements

        await this.searchTexbox.fill('weird facts on earth')
        await this.page.keyboard.press('Enter')

        await this.page.waitForLoadState('networkidle')
        let paginationCount = await this.pagination.locator('td').count()
        console.log("pagination count: " + paginationCount)

        let lastPage = await this.pagination.locator('td').nth(paginationCount - paginationOffset).innerText()
        console.log("Last Page Number is " + lastPage)

        // Navigate to this pagination number
        await this.page.getByRole('link', { name: 'Page ' + lastPage }).click()
        await this.page.waitForLoadState('networkidle')
        let resStat = await this.resultStat.textContent()
        console.log("Page Result: " + resStat)
    }
}
