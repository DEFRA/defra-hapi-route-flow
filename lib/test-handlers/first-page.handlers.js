class FirstPageHandlers extends require('defra-hapi-handlers') {
  async skipPage ({ skip }) {
    return skip
  }
}

module.exports = FirstPageHandlers
