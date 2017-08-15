// require('dotenv').config()
const hubspot = require('./lib/hubspot_client')
const check_validity_of_environment_variables = require('./lib/check_validity_of_environment_variables')
const app = require('./lib/app')

const PORT = process.env.PORT || 3000

hubspot.init().then(() => {
  return check_validity_of_environment_variables()
    .then(() => {
      app.listen(PORT, function () {
        console.log('hookforce started on port ' + PORT)
      })
    }).catch(err => {
      console.log(err)
      console.log('\nPlease review and fix the issue described above and restart this service')
    })
}).catch(console.error)
