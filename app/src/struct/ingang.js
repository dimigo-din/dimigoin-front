import { struct } from 'superstruct'

const _Ingang = struct({
  idx: 'number',
  grade: 'number',
  klass: 'number',
  day: 'string',
  time: 'string',
  count: 'number',
  max: 'number',
  applyStartDate: 'string',
  applyEndDate: 'string',
  applied: 'boolean'
})

export const Ingang = ingang => _Ingang({
  idx: ingang['idx'],
  grade: ingang['grade'],
  klass: ingang['klass'],
  day: ingang['day'],
  time: ingang['time'],
  count: ingang['count'],
  max: ingang['max'],
  applyStartDate: ingang['apply_start_date'],
  applyEndDate: ingang['apply_end_date'],
  applied: ingang['applied']
})
