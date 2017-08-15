var Q = require('q')
var Client = require('hubspot')

// instantiate the salesforce singleton
module.exports.init = function () {
  var client = new Client()
  client.useKey(process.env.HUBSPOT_API_KEY)
  module.exports.client = client

  // return a promise that checks first if Hubspot API is working well
  return Q.ninvoke(client.lists, 'get')
  // return getRecentlyModified()
    .then(res => {
      if (res.length !== 2) {
        throw new Error('Unxpected response from Hubspot API')
      }
    })
    .catch(console.error)
}
