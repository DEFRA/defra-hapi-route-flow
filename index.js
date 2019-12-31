const pkg = require('./package.json')
const { Flow, register } = require('./lib/route-flow')

exports.plugin = {
  name: pkg.name,
  register,
  once: true,
  pkg
}

// Expose Flow through test object to aid unit testing
exports.test = { Flow }
