import { struct } from 'superstruct'

const _Ingang = struct({
  idx: 'number',
  grade: 'number',
  klass: 'number',
  day: 'string',
  time: 'string',
  max: 'number'
})

export default ingang => new _Ingang(ingang)
