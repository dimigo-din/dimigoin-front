function APIError (message, code) {
  this.stack = Error().stack
  this.message = message
  this.code = code
}

APIError.prototype = new Error()
APIError.prototype.name = 'APIError'

export default APIError
