const path = require('path')
const express = require('express')

const api = require('./routes/api')

const app = express()

app.set('x-powered-by', false)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', api)

module.exports = app
