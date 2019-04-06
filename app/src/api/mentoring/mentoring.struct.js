import timestamp from 'unix-timestamp'

import days from '@/src/util/days'

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

export const CreateMentoringInput = mentoring => ({
  'teacher_name': mentoring.teacher,
  'day': days[new Date(mentoring.date).getDay() - 1].code,
  'date': timestamp.fromDate(mentoring.date),
  'start_time': timestamp.fromDate(mentoring.startTime),
  'end_time': timestamp.fromDate(mentoring.endTime),
  'subject': mentoring.subject,
  'target_grade': mentoring.grade + 1,
  'room': mentoring.room,
  'max_user': mentoring.maxUser
})

export const Notice = notice => ({
  desc: notice['description']
})
