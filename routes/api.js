const marked = require('marked')
const puppeteer = require('puppeteer-core')
const chromium = require('chrome-aws-lambda')

const defaultParams = {
  width: 600,
  scale: 2,
  template: '<link rel="stylesheet" href="https://cdn.zce.me/markdown.css">{{markdown}}'
}

const chromePaths = {
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux: '/usr/bin/google-chrome'
}

// const edgePaths = {
//   win32: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
//   darwin: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
//   linux: '/usr/bin/microsoft-edge'
// }

const awsOptions = async () => ({
  headless: chromium.headless,
  executablePath: await chromium.executablePath,
  args: chromium.args
})

const localOptions = () => ({
  headless: true,
  executablePath: chromePaths[process.platform],
  args: []
})

module.exports = async (req, res) => {
  if (typeof req.body.markdown !== 'string' || req.body.markdown === '') {
    // return if without redirect url.
    return res.status(400).send({ message: 'Bad Request: missing required `markdown`.' })
  }

  const markdown = req.body.markdown
  /* eslint-disable @typescript-eslint/strict-boolean-expressions */
  const height = 200
  const width = ~~req.body.width || defaultParams.width
  const deviceScaleFactor = ~~req.body.scale || defaultParams.scale
  const template = req.body.template || defaultParams.template
  /* eslint-enable @typescript-eslint/strict-boolean-expressions */

  const content = marked(markdown)
  const html = template.replace('{{markdown}}', content.trim())

  const options = process.env.TENCENTCLOUD_REGION == null ? localOptions() : await awsOptions()
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor })
  await page.setContent(html)
  const buffer = await page.screenshot({ fullPage: true })
  await browser.close()

  res.setHeader('content-type', 'image/png')
  res.send(buffer)
}
