import timestamp from 'unix-timestamp'

import { daysWithSun as days } from '@/src/util/days'

export const Afterschool = afterschool => ({
  idx: afterschool['idx'],
  name: afterschool['name'],
  startDate: timestamp.toDate(afterschool['request_start_date']),
  endDate: timestamp.toDate(afterschool['request_end_date']),
  day: afterschool['day'],
  time: afterschool['time'],
  grade: afterschool['target_grade'],
  maxCount: afterschool['max_of_count'],
  teacherName: afterschool['teacher_name'],
  count: afterschool['all_request_count'],
  status: afterschool['status']
})

export const CreateAfterschoolInput = afterschool => ({
  'name': afterschool.name,
  'request_start_date': timestamp.fromDate(afterschool.startDate),
  'request_end_date': timestamp.fromDate(afterschool.endDate),
  'day': afterschool.day.reduce((out, v, idx) =>
    v ? out.concat(days[idx].code) : out, []),
  'time': afterschool.time.reduce((out, v, idx) => v ? out.concat(idx + 1) : out, []),
  'target_grade': afterschool.grade,
  'max_of_count': parseInt(afterschool.maxCount),
  'teacher_name': afterschool.teacherName
})

export const ChangeRequestTime = time => ({
  'request_start_date': timestamp.fromDate(time.start),
  'request_end_date': timestamp.fromDate(time.end),
  'day': days[time.day].code
})
