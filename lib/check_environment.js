module.exports = function () {
  console.log('Checking the proper setup of the environment variables...')

  // check if filter variable is defined
  if (!process.env.HUBSPOT_API_KEY) {
    throw new Error('HUBSPOT_API_KEY needs to be defined as an environment variable')
  }

  if (!process.env.PROPERTY_NAME) {
    throw new Error('PROPERTY_NAME needs to be defined as an environment variable')
  }
}
