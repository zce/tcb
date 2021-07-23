const fetch = require('node-fetch')

exports.main = async ({ path, queryStringParameters }) => {
  const target = path.substr(1)

  if (!/^https?/.test(target)) return 'cors anywhere'

  const search = new URLSearchParams(queryStringParameters)

  const response = await fetch(`${target}?${search}`)

  const buffer = await response.arrayBuffer()

  return {
    isBase64Encoded: true,
    statusCode: response.status,
    headers: {
      ...response.headers,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      'Content-Type': response.headers.get('Content-Type')
    },
    body: Buffer.from(buffer).toString('base64')
  }
}
