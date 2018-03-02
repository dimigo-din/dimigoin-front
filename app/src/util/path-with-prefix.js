export default (prefix, routes) =>
  routes.map(route => {
    route.path = prefix + route.path
    return route
  })
