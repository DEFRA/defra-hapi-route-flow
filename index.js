const { RouteFlowEngine } = require('route-flow-engine')
const pkg = require('./package.json')

const register = async (server, { flowConfig: config, handlersDir }) => {
  const createRoutes = async (node) => {
    const Handlers = require(`${handlersDir}/${node.handlers}`)
    const handlers = node.handlers = new Handlers()

    if (handlers.getPayload) {
      handlers.payload = await handlers.getPayload()
    }

    if (node.next) {
      handlers.getNextPath = async (...args) => {
        const nextNode = await node.next(...args)
        return nextNode.path
      }
    }

    if (node.title) {
      handlers.getPageHeading = async (...args) => {
        return node.title(...args)
      }
    }

    const { path, isQuestionPage = false, view, tags = [] } = node
    const routes = handlers.routes({
      path,
      app: {
        view,
        isQuestionPage,
        tags
      }
    })

    routes.forEach((route) => server.route(route))
  }

  const resolveQuery = async (routes, query, ...args) => {
    return routes.handlers[query](...args)
  }

  return new RouteFlowEngine({ config, createRoutes, resolveQuery })
}

exports.plugin = {
  name: pkg.name,
  register,
  once: true,
  pkg
}

// returns global reference to RouteFlowEngine
exports.RouteFlowEngine = RouteFlowEngine
