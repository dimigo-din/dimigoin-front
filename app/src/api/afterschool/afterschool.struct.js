import timestamp from 'unix-timestamp'

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
  'day': Object.keys(afterschool.day)
    .filter(v => afterschool.day[v]),
  'time': Object.keys(afterschool.time)
    .map(v => parseInt(v))
    .filter(v => afterschool.time[v]),
  'target_grade': afterschool.grade,
  'max_of_count': parseInt(afterschool.maxCount),
  'teacher_name': afterschool.teacherName
})
