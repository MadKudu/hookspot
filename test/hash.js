const chai = require('chai')
const expect = chai.expect

const hash = require('../lib/hash')

describe('hash', function () {
  it('should return an integer between 0 and 100', () => {
    const result = hash('1878712')
    expect(result).to.be.a('number')
    expect(parseInt(result)).to.equal(result) // check if integer
    expect(result).to.be.above(-1)
    expect(result).to.be.below(101)
  })
})
