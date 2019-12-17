const { RouteFlowEngine } = require('route-flow-engine')
const pkg = require('./package.json')

const createRoutes = async (node, server, handlersDir) => {
  const Handlers = require(`${handlersDir}/${node.handlers}`)
  Handlers.server = server

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

const register = async (server, { flowConfig: config, handlersDir }) => {
  server.app.flow = async (routeId) => RouteFlowEngine.flow(routeId)

  const resolveQuery = async (routes, query, ...args) => {
    return routes.handlers[query](...args)
  }

  const _createRoutes = async (node) => {
    return createRoutes(node, server, handlersDir)
  }

  return new RouteFlowEngine({ config, _createRoutes, resolveQuery })
}

exports.plugin = {
  name: pkg.name,
  register,
  once: true,
  pkg
}

exports.test = { createRoutes }
