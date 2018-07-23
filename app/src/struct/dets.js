import { struct } from 'superstruct'

const _Dets = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  speaker: 'string',
  request_start_date: 'string',
  request_end_date: 'string',
  day: 'string',
  time: 'number',
  room: 'string',
  maxCount: 'number',
  targetGrade: 'number',
  count: 'number',
  status: 'string | null | undefined'
})

export const Dets = dets => _Dets({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  speaker: dets['user_name'],
  request_start_date: dets['request_start_date'],
  request_end_date: dets['request_end_date'],
  day: dets['day'],
  time: dets['time'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['count'],
  status: dets['status']
})
