import timestamp from 'unix-timestamp'

import days from '@/src/util/days'

export const Ingang = ingang => ({
  idx: ingang['idx'],
  title: ingang['title'],
  grade: ingang['target_grade'],
  klass: ingang['klass'],
  day: ingang['day'],
  time: ingang['time'],
  startDate: timestamp.toDate(ingang['request_start_date']),
  endDate: timestamp.toDate(ingang['request_end_date']),
  status: ingang['status'],
  count: ingang['present'],
  max: ingang['max_user'],
  date: ingang['date'],
  maxUser: ingang['maxUser']
})

export const Status = ingang => ({
  weeklyRequestCount: ingang['weekly_request_count'],
  dailyRequestCount: ingang['daily_request_count'],
  weeklyTicketNum: ingang['weekly_ticket_num'],
  dailyTicketNum: ingang['daily_ticket_num']
})

export const IngangApplier = user => ({
  time: user['time'],
  serial: user['serial'],
  name: user['name'],
  grade: user['grade'],
  klass: user['klass'],
  number: user['number']
})

export const CreateIngangInput = ingang => ({
  'target_grade': ingang.grade,
  'day': days[new Date(ingang.date).getDay() - 1].code,
  'time': ingang.time,
  'request_start_date': timestamp.fromDate(ingang.startDate),
  'request_end_date': timestamp.fromDate(ingang.endDate),
  'date': timestamp.fromDate(ingang.date),
  '1_max_user': ingang.maxUser[1],
  '2_max_user': ingang.maxUser[2],
  '3_max_user': ingang.maxUser[3],
  '4_max_user': ingang.maxUser[4],
  '5_max_user': ingang.maxUser[5],
  '6_max_user': ingang.maxUser[6]
})

export const Announcement = notice => ({
  desc: notice['description'],
  grade: notice['grade'],
  date: timestamp.toDate(notice['date'])
})

export const CreateAnnouncementInput = notice => ({
  'desc': notice.description,
  'grade': notice.grade
})
