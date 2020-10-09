const { expect } = require('chai')
const { Builder, By } = require('selenium-webdriver')
const firefox = ()=> new Builder().forBrowser('firefox').build()


describe('Creating realm', ()=> {

    let driver
    let element

    beforeEach(()=> {
        driver = firefox()
    })
    afterEach(async ()=> {
        await driver.quit();
    })

    it('worked', async ()=> {
        await driver.get('http://localhost:8081')
        await driver.sleep(1 * 1000)
        element = await driver.findElement(By.css('a[href*=admin]'))
        await element.click()
        await driver.sleep(1 * 1000)
        await enterCredentials(driver, { username:'admin', password:'admin' })

        element = await driver.findElement(By.css('.realm-selector'))
        const actions = driver.actions({bridge: true})
        await actions.move({ origin:element, x:0, y:0 }).perform()
        element = await driver.findElement(By.css('a[href*="create/realm"]'))
        await element.click()
        await driver.sleep(1 * 1000)
        
        element = await driver.findElement(By.css('#name'))
        await element.sendKeys('this-name')
        element = await driver.findElement(By.css('button[kc-save]'))
        await element.click()

        await driver.sleep(5 * 1000)
    })
})
const enterCredentials = async (driver, options)=> {
    let username = await driver.findElement(By.css('#username'))
    let password = await driver.findElement(By.css('#password'))
    let login = await driver.findElement(By.css('#kc-login'))

    await username.sendKeys(options.username)
    await password.sendKeys(options.password)
    await login.click()
    await driver.sleep(1 * 1000)
}
