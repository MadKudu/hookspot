'use strict'

const hash = require('./hash')
const hubspot = require('./hubspot_client')
const Q = require('q')

module.exports = function (req, res, next) {
  // check that a vid is povided in the request body
  if (req.body.vid) {
    // generate a "random" number between 1 and 100
    const random_number = hash(req.body.vid.toString())
    // create update json to use to make a Hubspot update call
    const update_json = {
      properties: [
        {
          property: process.env.PROPERTY_NAME,
          value: random_number
        }
      ]
    }
    return Q.ninvoke(hubspot.client.contacts, 'update', req.body.vid, update_json)
      .then(console.log((new Date()).toString() + ': contact updated'))
      .catch(console.error)
  } else {
    console.error('No Hubspot vid found in the request body')
  }
}
