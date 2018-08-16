import { struct } from 'superstruct'

const _StudentIngang = struct.interface({
  idx: 'number',
  grade: 'number',
  class: 'number',
  day: 'string',
  time: 'string',
  max: 'number',
  startDate: 'string',
  endDate: 'string',
  request: 'boolean?',
  count: 'number',
  weekCount: 'number'
})

export const StudentIngang = ingang => _StudentIngang({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  class: ingang['class'],
  day: ingang['day'],
  time: ingang['time'],
  max: ingang['max'],
  startDate: ingang['request_start_date'],
  endDate: ingang['request_end_date'],
  request: ingang['request'],
  count: ingang['count'],
  weekCount: ingang['week_request_count']
})

const _User = struct.interface({
  idx: 'number',
  name: 'string',
  grade: 'number',
  class: 'number',
  number: 'number',
  serial: 'string'
})

const _Request = struct.interface({
  idx: 'number',
  reqTime: 'string',
  user: _User
})

const _GradeIngang = struct.interface({
  idx: 'number',
  grade: 'number',
  class: 'number',
  day: 'string',
  time: 'string',
  max: 'number',
  startDate: 'string',
  endDate: 'string',
  request: [_Request]
})

const convertRequest = v => (v && {
  idx: v['idx'],
  reqTime: v['request_time'],
  user: {
    idx: v['user']['idx'],
    name: v['user']['name'],
    grade: v['user']['grade'],
    class: v['user']['class'],
    number: v['user']['number'],
    serial: v['user']['serial']
  }
})

export const GradeIngang = ingang => _GradeIngang({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  class: ingang['class'],
  day: ingang['day'],
  time: ingang['time'],
  max: ingang['max'],
  startDate: ingang['request_start_date'],
  endDate: ingang['request_end_date'],
  request: (ingang['ingang_request'] || []).map(convertRequest)
})
