import struct from './base-struct'

export default struct({
  name: 'string',
  email: 'email',
  gender: struct.enum(['male', 'female']),
  id: 'string',
  password: 'string',
  phone: 'string',
  birthday: 'date'
})
