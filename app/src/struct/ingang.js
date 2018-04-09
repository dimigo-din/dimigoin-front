import { superstruct } from 'superstruct'
import moment from 'moment'

const struct = superstruct({
  types: {
    moment: moment.isMoment
  }
})

const _Applier = struct.interface({
  idx: 'number',
  applyTime: 'moment',
  user: struct.interface({
    idx: 'number',
    name: 'string',
    grade: 'number',
    klass: 'number',
    serial: 'string'
  })
})

const _Ingang = struct.interface({
  idx: 'number',
  grade: 'number',
  klass: 'number',
  day: 'string',
  time: 'string',
  count: 'number',
  max: 'number',
  applyStartDate: 'string',
  applyEndDate: 'string',
  weekApplyCount: 'number',
  applied: 'boolean? | null',
  appliers: struct.union([_Applier], 'undefined', 'null')
})

export const Ingang = ingang => _Ingang({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  klass: ingang['klass'],
  day: ingang['day'],
  time: ingang['time'],
  count: ingang['count'],
  max: ingang['max'],
  applyStartDate: ingang['request_start_date'],
  applyEndDate: ingang['request_end_date'],
  weekApplyCount: ingang['week_request_count'],
  applied: ingang['request'],
  appliers: ingang['ingang_request']
})
