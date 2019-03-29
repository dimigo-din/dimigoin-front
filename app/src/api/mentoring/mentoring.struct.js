import timestamp from 'unix-timestamp'

export const Mentoring = mentoring => ({
  idx: mentoring['idx'],
  day: mentoring['day'],
  time: mentoring['time'],
  subject: mentoring['subject'],
  teacher: mentoring['teacher'],
  startDate: timestamp.toDate(mentoring['request_start_date']),
  endDate: timestamp.toDate(mentoring['request_end_date']),
  room: mentoring['room'],
  status: mentoring['status'],
  present: mentoring['present'],
  max_user: mentoring['max_user']
})

export const Notice = notice => ({
  desc: notice['description']
})
