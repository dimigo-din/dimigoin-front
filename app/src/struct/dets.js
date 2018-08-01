import { struct } from 'superstruct'

const _StudentDets = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  request_start_date: 'string',
  request_end_date: 'string',
  day: 'string',
  time: 'number',
  room: 'string',
  maxCount: 'number',
  targetGrade: 'number',
  count: 'number',
  speakerIdx: 'string',
  speakerSerial: 'string',
  speakerName: 'string',
  detsStatus: 'string',
  status: 'string | null | undefined',
  open: 'boolean?'
})

export const StudentDets = dets => _StudentDets({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  request_start_date: dets['request_start_date'],
  request_end_date: dets['request_end_date'],
  day: dets['day'],
  time: dets['time'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['all_request_count'],
  speakerIdx: dets['speaker_idx'],
  speakerSerial: dets['speaker_serial'],
  speakerName: dets['speaker_name'],
  detsStatus: dets['dets_status'],
  status: dets['status'],
  open: false
})

const _Dets = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  request_start_date: 'string',
  request_end_date: 'string',
  day: 'string',
  time: 'number',
  room: 'string',
  maxCount: 'number',
  targetGrade: 'number',
  count: 'number',
  speakerIdx: 'string',
  speakerSerial: 'string',
  speakerName: 'string',
  detsStatus: 'string',
  open: 'boolean?'
})

export const Dets = dets => _Dets({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  request_start_date: dets['request_start_date'],
  request_end_date: dets['request_end_date'],
  day: dets['day'],
  time: dets['time'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['all_request_count'],
  speakerIdx: dets['speaker_idx'],
  speakerSerial: dets['speaker_serial'],
  speakerName: dets['speaker_name'],
  detsStatus: dets['dets_status'],
  open: false
})
