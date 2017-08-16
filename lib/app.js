const express = require('express')
const bodyParser = require('body-parser')

const update_contact = require('./update_contact')

const app = express()
app.use(bodyParser.json()) // for parsing application/json

app.post('/', update_contact)

// error handler
app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500)
  res.send({ message: err.message })
  next()
})

module.exports = app
