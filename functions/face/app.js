const path = require('path')
const express = require('express')
const multer  = require('multer')
const detect = require('./detect')

const app = express()

const upload = multer()

app.set('x-powered-by', false)

app.post('/api', upload.single('image'), (req, res) => {
  detect(req.file.buffer.toString('base64')).then(
    data => res.send(data),
    error => res.status(500).send(error)
  )
})

module.exports = app
