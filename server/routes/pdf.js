const puppeteer = require('puppeteer')
const hbs = require('handlebars')

const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.post('/create_pdf', (req, res) => {
  const compile = async (templateName, data) => {
    const filePath = path.join(
      process.cwd(),
      'templates',
      `${templateName}.hbs`
    )

    const html = fs.readFileSync(filePath, 'utf8')

    hbs.registerHelper('multiply', (firstValue, secondValue) => {
      return (firstValue * secondValue).toFixed(2)
    })
    return hbs.compile(html)(data)
  }
  const createPDF = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const content = await compile('pdf', req.body)

    await page.setContent(content)

    await page.pdf({
      path: 'output.pdf',
      format: 'A4',
      printBackground: true,
    })

    await browser.close()
  }
  createPDF()
})

module.exports = router
