const { RouteFlowEngine } = require('route-flow-engine')
const pkg = require('./package.json')

class Flow {
  static async createRoutes (node, server, handlersDir) {
    class Handlers extends require(`${handlersDir}/${node.handlers}`) {
      static get server () {
        return server
      }

      get flowNode () {
        return node
      }

      async getFlowNode (nodeId) {
        return server.app.flow(nodeId)
      }

      async getNextPath (...args) {
        const nextNode = await node.next(...args)
        return nextNode.path
      }

      async getPageHeading (...args) {
        if (node.title) {
          return node.title(...args)
        } else if (super.getPageHeading) {
          return super.getPageHeading(...args)
        } else {
          return node.title
        }
      }
    }

    const handlers = node.handlers = new Handlers()

    if (handlers.getPayload) {
      handlers.payload = await handlers.getPayload()
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
