const serverless = require('serverless-http')

const app = require('./app')

exports.main = serverless(app)
