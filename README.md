# defra-hapi-route-flow
Hapi plugin to deal with the flow between pages and states

[![Build Status](https://travis-ci.com/DEFRA/defra-hapi-route-flow.svg?branch=master)](https://travis-ci.com/DEFRA/defra-hapi-route-flow)
[![Known Vulnerabilities](https://snyk.io/test/github/defra/defra-hapi-route-flow/badge.svg)](https://snyk.io/test/github/defra/defra-hapi-route-flow)
[![Code Climate](https://codeclimate.com/github/DEFRA/defra-hapi-route-flow/badges/gpa.svg)](https://codeclimate.com/github/DEFRA/defra-hapi-route-flow)
[![Test Coverage](https://codeclimate.com/github/DEFRA/defra-hapi-route-flow/badges/coverage.svg)](https://codeclimate.com/github/DEFRA/defra-hapi-route-flow/coverage)

## Installation

Via github:
```
npm install --save https://github.com/DEFRA/defra-hapi-route-flow.git#master
```

It is recommended that you tie to a specific commit/version as follows:
```
npm install --save https://github.com/DEFRA/defra-hapi-route-flow.git#commit_or_version
```
## Usage
Please note:
 - this example is written using the standard linter (no semicolons)
 - example usage can be found within the unit tests 
```
// Registering the plugin:

const Hapi = require('hapi')
const server = hapi.server()

await server.register([{
 plugin: require('defra-hapi-route-flow'),
  options: {
    flowConfig,
    handlersDir: path.normalize(`${__dirname}/../modules`)
  }
}])

```

Look for an example of the flowConfig in the unit tests: <https://github.com/DEFRA/defra-hapi-route-flow/blob/master/lib/route-flow.test.js>

## Contributing to this project

Please read the [contribution guidelines](/CONTRIBUTING.md) before submitting a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

>Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
