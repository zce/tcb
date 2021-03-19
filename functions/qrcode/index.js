const QRCode = require('qrcode-svg')

exports.main = async event => {
  const { text, url } = event.queryStringParameters
  const content = text || url
  if (!content) return { statusCode: 400, body: 'Missing required parameter: url.' }
  const qrcode = new QRCode({ content, padding: 0, join: true })
  return {
    headers: { 'content-type': 'image/svg+xml' },
    body: qrcode.svg({ container: 'svg-viewbox' })
  }
}
