import { expect, Locator, type Page } from "@playwright/test";

export class PlaywrightPage {

    readonly page: Page
    readonly nodejsButton: Locator
    readonly languageDDL: Locator
    readonly navbarLabel: Locator
    readonly iconPlaywright: Locator
    readonly toggleMode: Locator
    readonly searchButton: Locator
    readonly searchModalDialog: Locator
    readonly searchInput: Locator
    
    constructor(page:Page)
    {
        this.page=page
        this.nodejsButton=page.getByRole('button', { name: 'Node.js' }) 
        this.languageDDL=page.getByRole('navigation', { name: 'Main' }) 
        this.navbarLabel=page.locator("//*[@class='navbar__brand']") //<a ..>
        this.iconPlaywright=page.locator("//*[@class='navbar__logo']") //<img ..>
        this.toggleMode=page.locator("//*[@class='toggle_vylO colorModeToggle_DEke']") //<button ..>
        this.searchButton=page.locator("//*[@class='DocSearch DocSearch-Button']") //<button ..>
        this.searchModalDialog=page.locator("//*[@class='DocSearch-Modal']") //<div ..>
        this.searchInput=page.locator("//*[@class='DocSearch-Input']") //<input ..>
    }

    async navigatePlaywrightUrl(url: string)
    {
        await this.page.goto(url)
        await this.page.waitForLoadState('networkidle')

        // Validation
        await expect(this.page).toHaveTitle(/Playwright/)
    }

    async setLanguage(language: string)
    {
        await this.nodejsButton.hover()
        await this.languageDDL.getByRole('link', { name: language }).click()

        // Validation
        let result = await this.navbarLabel.innerText()
        await expect(result).toBe('Playwright for ' + language)
    }

    async validateIcon(icon: string)
    {
        let result = await this.iconPlaywright.innerHTML()
        
        // Validation
        await expect(result).toContain(icon)
    }

    async validateToggle()
    {
        let result = await this.toggleMode.innerHTML()
        await expect(result).toContain("light mode")

        await this.toggleMode.click()

        // Validation
        result = await this.toggleMode.innerHTML()
        await expect(result).toContain("dark mode")

        await this.toggleMode.click()

        // Validation
        result = await this.toggleMode.innerHTML()
        await expect(result).toContain("light mode")
    }

    async validateModal()
    {
        await this.searchButton.click()
        await this.page.waitForSelector('.DocSearch-Modal', {state: 'visible'})
        await this.searchInput.type('Inspector')
    }

    async validateClass()
    {
        await this.page.waitForLoadState('networkidle')
        
        let content = await this.page.locator("//*[@class='hero']").innerHTML()
        console.log("Content: " + content)
    }
}
