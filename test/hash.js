'use strict'

const chai = require('chai')
const expect = chai.expect

const hash = require('../lib/hash')

// load env variables from .env
describe('hash', function () {
  this.timeout(5000)

  it('return a hash without error', () => {
    const result = hash('1878712')
    console.log(result)
  })
})
