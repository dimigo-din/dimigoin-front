import timestamp from 'unix-timestamp'
import { format } from 'date-fns'

import days from '@/src/util/days'

export const Mentoring = mentoring => ({
  idx: mentoring['idx'],
  day: mentoring['day'],
  date: timestamp.toDate(mentoring['date']),
  startTime: mentoring['start_time'],
  endTime: mentoring['end_time'],
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
  'day': days.find(v => v.idx === mentoring.day).code,
  'start_time': format(mentoring.startTime, 'HH:mm'),
  'end_time': format(mentoring.endTime, 'HH:mm'),
  'subject': mentoring.subject,
  'target_grade': mentoring.grade + 1,
  'room': mentoring.room,
  'max_user': mentoring.maxUser
})

export const EditMentoringInput = mentoring => ({
  'idx': mentoring.idx,
  'teacher_name': mentoring.teacher,
  'day': days.find(v => v.idx === mentoring.day).code,
  'start_time': format(mentoring.startTime, 'HH:mm'),
  'end_time': format(mentoring.endTime, 'HH:mm'),
  'subject': mentoring.subject,
  'target_grade': mentoring.grade + 1,
  'room': mentoring.room,
  'max_user': mentoring.maxUser
})

export const BlackUser = user => ({
  idx: user['idx'],
  date: user['date'],
  name: user['name'],
  serial: user['serial'],
  userIdx: user['user_idx']
})

export const CreateBlackUser = user => ({
  date: user.date,
  serial: user.serial
})

export const Notice = notice => ({
  date: timestamp.toDate(notice['date']),
  description: notice['description']
})

export const CreateNoticeInput = notice => ({
  date: timestamp.fromDate(notice.date),
  description: notice.description
})
