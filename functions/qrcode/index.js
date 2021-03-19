const QRCode = require('qrcode-svg')

exports.main = async event => {
  const { text, url } = event.queryStringParameters
  const content = text || url
  if (!content) return { statusCode: 400, body: 'Missing required parameter: url.' }
  const qrcode = new QRCode({ content, padding: 0, join: true })
  const img = Buffer.from(qrcode.svg({ container: 'svg-viewbox' })).toString('base64')
  return {
    headers: {
      'content-type': 'text/html'
    },
    body: `<img style="display:block;margin:auto;max-width:400px" src="data:image/svg+xml;base64,${img}">`
  }
}
