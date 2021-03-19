const path = require('path')
const express = require('express')

const app = express()

app.set('trust proxy', true)
app.set('x-powered-by', false)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', (req, res) => {
  const { name, host } = req.body // from request body
  // const { name, host } = req.query // from querystring or pathinfo

  if (name == null || name === '') {
    // return if without redirect url.
    return res.status(400).send({ message: 'Bad Request' })
  }

  res.send({ name, email: `${name}@${host || 'zce.me'}` })
})

module.exports = app
