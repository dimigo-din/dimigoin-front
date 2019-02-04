function NetworkError (message = '인터넷 연결을 확인해주세요.') {
  this.stack = Error().stack
  this.message = message
}

NetworkError.prototype = new Error()
NetworkError.prototype.name = 'NetworkError'

export default NetworkError
