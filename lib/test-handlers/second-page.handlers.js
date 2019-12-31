class SecondPageHandlers extends require('defra-hapi-handlers') {
  async isAlternative ({ alternative }) {
    return alternative
  }
}

module.exports = SecondPageHandlers
