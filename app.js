const express = require('express')

const api = require('./routes/api')

const app = express()

app.set('trust proxy', true)
app.set('x-powered-by', false)

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/api', api)

module.exports = app
