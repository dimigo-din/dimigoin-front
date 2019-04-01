import timestamp from 'unix-timestamp'

export const Mentoring = mentoring => ({
  idx: mentoring['idx'],
  day: mentoring['day'],
  date: timestamp.toDate(mentoring['date']),
  startTime: mentoring['start_date'],
  endTime: mentoring['end_date'],
  subject: mentoring['subject'],
  teacher: mentoring['teacher'],
  targetGrade: mentoring['target_grade'],
  startDate: timestamp.toDate(mentoring['request_start_date']),
  endDate: timestamp.toDate(mentoring['request_end_date']),
  room: mentoring['room'],
  status: mentoring['status'],
  present: mentoring['present'],
  maxUser: mentoring['max_user'],
  mentoringRequest: mentoring['mentoring_request']
})

export const Notice = notice => ({
  desc: notice['description']
})
