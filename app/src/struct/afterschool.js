import { struct } from 'superstruct'

const _Afterschool = struct.interface({
  idx: 'number',
  name: 'string',
  startDate: 'string',
  endDate: 'string',
  day: 'string',
  grade: 'number',
  maxCount: 'number',
  teacherName: 'string',
  count: 'number',
  status: 'string | null | undefined'
})

export const Afterschool = afterschool => _Afterschool({
  idx: afterschool['idx'],
  name: afterschool['name'],
  startDate: afterschool['request_start_date'],
  endDate: afterschool['request_end_date'],
  day: afterschool['day'],
  grade: afterschool['target_grade'],
  maxCount: afterschool['max_of_count'],
  teacherName: afterschool['teacher_name'],
  count: afterschool['my_request_count'],
  status: afterschool['status']
})
