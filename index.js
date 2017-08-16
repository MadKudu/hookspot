// require('dotenv').config()
const hubspot = require('./lib/hubspot')
const check_environment = require('./lib/check_environment')
const app = require('./lib/app')

const PORT = process.env.PORT || 3000

check_environment()

hubspot.test()
  .then(() => {
    app.listen(PORT, () => {
      console.log('hookforce started on port ' + PORT)
    })
  }).catch(err => {
    console.error(err)
    console.log('\nPlease review and fix the issue described above and restart this service')
  })

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})
