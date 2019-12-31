const glob = require("glob")
const testFiles = glob.sync('lib/**/*.test.js')
const testHandlers = glob.sync('lib/test-handlers/*.handlers.js')
const config = {
  paths: testFiles,
  coverage: true,
  threshold: 85,
  'coverage-exclude': [...testHandlers, ...testFiles],
  globals: '__core-js_shared__'
}

module.exports = config
