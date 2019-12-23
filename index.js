const { RouteFlowEngine } = require('route-flow-engine')
const pkg = require('./package.json')

class Flow {
  static async createRoutes (node, server, handlersDir) {
    const Handlers = require(`${handlersDir}/${node.handlers}`)
    Handlers.server = server

    const handlers = node.handlers = new Handlers()

    handlers.flowNode = node

    handlers.getFlowNode = async (nodeId) => {
      return server.app.flow(nodeId)
    }

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

  static async resolveQuery (routes, query, ...args) {
    return routes.handlers[query](...args)
  }

  static get RouteFlowEngine () {
    return RouteFlowEngine
  }
}

const register = async (server, { flowConfig: config, handlersDir }) => {
  server.app.flow = async (routeId) => RouteFlowEngine.flow(routeId)

  const resolveQuery = async (...args) => Flow.resolveQuery(...args)

  const createRoutes = async (node) => Flow.createRoutes(node, server, handlersDir)

  return new RouteFlowEngine({ config, createRoutes, resolveQuery })
}

exports.plugin = {
  name: pkg.name,
  register,
  once: true,
  pkg
}

// Expose Flow through test object to aid unit testing
exports.test = { Flow }
