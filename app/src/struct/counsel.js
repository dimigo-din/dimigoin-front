import { struct } from 'superstruct'

const _Counsel = struct.interface({
  idx: 'number',
  day: 'string',
  startDate: 'string',
  endDate: 'string',
  date: 'string',
  request: struct.tuple([{
    idx: 'number',
    time: 'string',
    user: struct.interface({
      idx: 'number',
      name: 'string',
      grade: 'number',
      class: 'number',
      number: 'number',
      serial: 'string'
    })
  }])
})

export const Counsel = counsel => _Counsel({
  idx: counsel['idx'],
  day: counsel['day'],
  startDate: counsel['counsel_start_date'],
  endDate: counsel['counsel_end_date'],
  date: counsel['date'],
  request: {
    idx: counsel['counsel_request']['idx'],
    time: counsel['counsel_request']['request_time'],
    user: {
      idx: counsel['counsel_request']['user']['idx'],
      name: counsel['counsel_request']['user']['name'],
      grade: counsel['counsel_request']['user']['grade'],
      class: counsel['counsel_request']['user']['class'],
      number: counsel['counsel_request']['user']['number'],
      serial: counsel['counsel_request']['user']['serial']
    }
  }
})
