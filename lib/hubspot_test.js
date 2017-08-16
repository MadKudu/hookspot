const hubspot = require('./hubspot')

module.exports = function () {
  // return a promise that checks first if the connection to the Hubspot API is working well
  return hubspot.lists.get()
    .then(res => {
      // console.log(res)
      if (res.length === 0) {
        throw new Error('Unxpected response from Hubspot API')
      }
    })
}
