import { struct } from 'superstruct'

const _Afterschool = struct.interface({
  idx: 'number',
  name: 'string',
  applyStartDate: 'string',
  applyEndDate: 'string',
  day: 'string',
  count: 'number',
  capacity: 'number',
  teacherName: 'string',
  status: 'string | null | undefined'
})

export const Afterschool = afterschool => _Afterschool({
  idx: afterschool['idx'],
  name: afterschool['name'],
  applyStartDate: afterschool['apply_start_date'],
  applyEndDate: afterschool['apply_end_date'],
  day: afterschool['day'],
  count: afterschool['count'],
  capacity: afterschool['max_of_count'],
  teacherName: afterschool['teacher_name'],
  status: afterschool['status']
})
