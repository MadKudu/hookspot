'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const update_contact = require('./update_contact')

const app = express()
app.use(bodyParser.json()) // for parsing application/json

app.post('/', update_contact)

module.exports = app
