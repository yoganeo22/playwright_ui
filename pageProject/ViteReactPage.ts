import { expect, Locator, type Page } from "@playwright/test";

export class ViteReactPage {

    readonly page: Page
    readonly totalCaseTable: Locator
    
    constructor(page:Page)
    {
        this.page=page
        this.totalCaseTable=page.locator("//*[@class='record']/table/tbody")
    }

    async navigateViteReactUrl(url: string)
    {
        await this.page.goto(url)
        await this.page.waitForLoadState('networkidle')

        // Validation
        await expect(this.page).toHaveTitle("Vite + React + TS")
    }


    async validateRecordByContinents()
    {
        let record: number
        let myRecord = new Map<string, number>()
        let continentsList: string[] = []
        let totalCasePerContinents: number[] = []
        let distinctContinenetList: string
        let totalCase: number
        let y: number = 0
        let index: number

        // get total number of records
        record = await this.totalCaseTable.locator('tr').count()
        console.log("record: " + record)

        // get distinct continents
        for (let i=0; i<record; i++)
        {
            distinctContinenetList = await this.totalCaseTable.locator("tr").nth(i).locator('td').nth(2).innerText()
            totalCase = +await this.totalCaseTable.locator("tr").nth(i).locator('td').nth(1).innerText()

            // find totalCase per Continent
            if(continentsList.includes(distinctContinenetList))
            {
                index = continentsList.indexOf(distinctContinenetList)
                totalCasePerContinents[index] += totalCase
            }
            else
            {
                continentsList[y] = distinctContinenetList
                totalCasePerContinents[y] = totalCase
                y++
            }
        }

        /*
        const distinctContinents = continentsList.filter((n, i) => continentsList.indexOf(n) === i)
        distinctContinents.forEach(element => {
            console.log("list: " + element)  
        });
        */
      
        // set the Key, value data into map
        for(let i=0; i<continentsList.length;i++)
        {
            myRecord.set(continentsList[i], totalCasePerContinents[i])
        }

        // print result
        //const result = Object.fromEntries(myRecord)
        //console.log("result: " + JSON.stringify(result))

        //Expected: {"Asia":12,"Europe":22}

        return myRecord
    }
}
