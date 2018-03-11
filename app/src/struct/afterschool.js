import { struct } from 'superstruct'

const _Afterschool = struct({
  idx: 'number',
  name: 'number',
  applyStartDate: 'string',
  applyEndDate: 'string',
  day: 'string',
  gradeTarget: 'string',
  max: 'number',
  teacherName: 'string'
})

export const Afterschool = afterschool => new _Afterschool({
  idx: afterschool['idx'],
  name: afterschool['name'],
  applyStartDate: afterschool['apply_start_day'],
  applyEndDate: afterschool['apply_end_day'],
  day: afterschool['day'],
  gradeTarget: afterschool['grade_target'],
  max: afterschool['max_of_count'],
  teacherName: afterschool['teacher_name']
})
