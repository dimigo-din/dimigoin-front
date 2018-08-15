import { struct } from 'superstruct'

const _StudentDets = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  startDate: 'string',
  endDate: 'string',
  speakerSerial: 'string',
  speakerName: 'string',
  date: 'string',
  room: 'string',
  maxCount: 'number',
  targetGrade: 'number',
  count: 'number',
  status: 'string | null | undefined',
  open: 'boolean?'
})

export const StudentDets = dets => _StudentDets({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  startDate: dets['request_start_date'],
  endDate: dets['request_end_date'],
  speakerSerial: dets['speakerserial'],
  speakerName: dets['speakername'],
  date: dets['date'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['all_request_count'],
  status: dets['status'],
  open: false
})

const _Dets = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  startDate: 'string',
  endDate: 'string',
  speakerSerial: 'string',
  speakerName: 'string',
  date: 'string',
  room: 'string',
  maxCount: 'number',
  targetGrade: 'number',
  count: 'number',
  open: 'boolean?'
})

export const Dets = dets => _Dets({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  startDate: dets['request_start_date'],
  endDate: dets['request_end_date'],
  speakerSerial: dets['speakerserial'],
  speakerName: dets['speakername'],
  date: dets['date'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['all_request_count'],
  open: false
})
