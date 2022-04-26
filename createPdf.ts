import puppeteer from 'puppeteer-core'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'
;(async () => {
  async function createBrowser() {
    return await puppeteer.launch({
      headless: true,
      // headless: false,
      // devtools: true,
      executablePath: process.env.CHROME,
    })
  }

  const browser = await createBrowser()

  try {
    // Create a new incognito browser context
    const context = await browser.createIncognitoBrowserContext()
    // Create a new page inside context.
    const page = await context.newPage()

    //pdf true to omit other page stuff.
    await page.goto('http://localhost:3000/resume?pdf=true', {
      waitUntil: 'networkidle0',
    })

    console.log('Im in!!!!')

    // wait for email to show, delay is to prevent page scrapers from getting email.
    await page.waitForTimeout(3000)
    // const items = await page.$eval('#pdf', (element) => {
    //   return element.innerHTML
    // }) // Get DOM HTML elements

    // await page.setContent(items)
    const pdf = await page.pdf({
      // printBackground: true,
      // omitBackground: true,
    })

    const output = path.join(
      process.cwd(),
      '../portfolio/public',
      'Bryon_Resume.pdf'
    )
    fs.writeFileSync(output, pdf)
    await page.close()
  } catch (e) {
    console.error(e)
  } finally {
    await browser.close()
  }
})()
