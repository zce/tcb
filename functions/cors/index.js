const fetch = require('node-fetch')

exports.main = async ({ path, queryStringParameters }) => {
  const search = new URLSearchParams(queryStringParameters)

  const response = await fetch(`${path.substr(1)}?${search}`)

  const { data } = await response.json()

  return {
    headers: {
      ...response.headers,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    },
    body: data
  }
}
