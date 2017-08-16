const hash = require('./hash')
const hubspot = require('./hubspot')

module.exports = function (req, res, next) {
  // check that a vid is povided in the request body
  const vid = req.body.vid
  if (vid) {
    // generate a "random" number between 1 and 100
    const random_number = hash(vid.toString())
    // create update json to use to make a Hubspot update call
    const update_json = {
      properties: [
        {
          property: process.env.PROPERTY_NAME,
          value: random_number
        }
      ]
    }
    return hubspot.contacts.update(vid, update_json)
      .then(() => {
        const msg = `${new Date().toString()}: contact updated`
        console.log(msg)
        res.sendStatus(204)
      }).catch(next)
  } else {
    next(new Error('No Hubspot vid found in the request body'))
  }
}
