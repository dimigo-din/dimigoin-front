function NetworkError (message) {
  this.stack = Error().stack
  this.message = message
}

NetworkError.prototype = new Error()
NetworkError.prototype.name = 'NetworkError'

export default NetworkError
