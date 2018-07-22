import { struct } from 'superstruct'

const _Dets = struct.interface({
  idx: 'number',
  title: 'string',
  description: 'string',
  speakerIdx: 'number',
  reqStartDate: 'string',
  reqEndDate: 'string',
  day: 'string',
  time: 'number',
  room: 'string',
  maxCount: 'number',
  targetGrade: 'number'
})

export const Dets = dets => _Dets({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  speakerIdx: dets['speaker_idx'],
  reqStartDate: dets['request_start_date'],
  reqEndDate: dets['request_end_date'],
  day: dets['day'],
  time: dets['time'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade']
})
