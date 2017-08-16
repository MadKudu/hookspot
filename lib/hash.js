const md5 = require('blueimp-md5')

// hash function that transforms a string into a number between 1 and 100
// use md5 to convert string into a 128bit hash value
// use the 6 first hex digits and convert back in base 10
// finally take the last 2 digits for this number and add 1 to make the number go from 1 to 100
module.exports = function (string_to_hash) {
  const hashed_string = parseInt(md5(string_to_hash).substring(0, 12), 16).toString()
  return parseInt(hashed_string.substring(hashed_string.length - 2, hashed_string.length)) + 1
}
