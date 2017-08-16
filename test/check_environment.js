const expect = require('chai').expect

// load env variables from .env
require('dotenv').config()

const check_environment = require('../lib/check_environment')

describe('check_validity_of_environment_variables', function () {
  this.timeout(10000)

  it('should not throw an error when the environment variables have been set correctly', () => {
    expect(check_environment).not.to.throw(Error)
  })

  it('should throw an error when the environment variables have not been set correctly', () => {
    delete process.env.HUBSPOT_API_KEY
    expect(check_environment).to.throw(Error)
  })
})
