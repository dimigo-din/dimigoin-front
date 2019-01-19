function ValidationError (message, properties) {
  this.stack = Error().stack
  this.message = message
  this.properties = properties
}

ValidationError.prototype = new Error()
ValidationError.prototype.name = 'ValidationError'

export default ValidationError
