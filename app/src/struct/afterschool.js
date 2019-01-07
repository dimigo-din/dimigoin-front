export const Afterschool = afterschool => ({
  idx: afterschool['idx'],
  name: afterschool['name'],
  startDate: afterschool['request_start_date'],
  endDate: afterschool['request_end_date'],
  day: afterschool['day'],
  grade: afterschool['target_grade'],
  maxCount: afterschool['max_of_count'],
  teacherName: afterschool['teacher_name'],
  count: afterschool['all_request_count'],
  status: afterschool['status']
})
