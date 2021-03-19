const path = require('path')
const express = require('express')

const create = require('./routes/create')
const redirect = require('./routes/redirect')

const app = express()

app.set('trust proxy', true)
app.set('x-powered-by', false)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/create', create)
app.get('/:slug', redirect)

module.exports = app
