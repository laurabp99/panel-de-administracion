const services = {
  imageService: new (require('../services/image-service'))()
}

function createServiceMiddleware (serviceName) {
  return (req, res, next) => {
    req[serviceName] = services[serviceName]
    next()
  }
}

module.exports = Object.keys(services).reduce((middlewares, serviceName) => {
  middlewares[`${serviceName}Middleware`] = createServiceMiddleware(serviceName)
  return middlewares
}, {})