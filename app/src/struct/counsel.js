import { struct } from 'superstruct'

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
  time: 'string',
  user: _User
})

const _Counsel = struct.interface({
  idx: 'number',
  day: 'string',
  startDate: 'string',
  endDate: 'string',
  date: 'string',
  applied: 'string | null',
  caniapplied: 'string | null',
  applicant: 'string | null',
  request: [_Request]
})

const converRequest = v => (v && {
  idx: v['idx'],
  time: v['request_time'],
  user: {
    idx: v['user']['idx'],
    name: v['user']['name'],
    grade: v['user']['grade'],
    class: v['user']['class'],
    number: v['user']['number'],
    serial: v['user']['serial']
  }
})

export const Counsel = counsel => _Counsel({
  idx: counsel['idx'],
  day: counsel['day'],
  startDate: counsel['counsel_start_date'],
  endDate: counsel['counsel_end_date'],
  date: counsel['date'],
  applied: counsel['applied'],
  caniapplied: counsel['caniapplied'],
  applicant: counsel['applicant'],
  request: (counsel['counsel_request'] || []).map(converRequest)
})
