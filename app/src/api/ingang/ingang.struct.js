import timestamp from 'unix-timestamp'

export const Ingang = ingang => ({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  klass: ingang['klass'],
  day: ingang['day'],
  time: ingang['time'],
  startDate: timestamp.toDate(ingang['request_start_date']),
  endDate: timestamp.toDate(ingang['request_end_date']),
  status: ingang['status'],
  count: ingang['present'],
  max: ingang['max_user']
})

export const Status = ingang => ({
  weekly_request_count: ingang['weekly_request_count'],
  daily_request_count: ingang['daily_request_count'],
  weekly_ticket_num: ingang['weekly_ticket_num'],
  daily_ticket_num: ingang['daily_ticket_num']
})

export const CreateIngangInput = ingang => ({
  'target_grade': ingang.grade,
  'day': ingang.day,
  'time': ingang.time,
  'request_start_date': ingang.startDate,
  'request_end_date': ingang.endDate,
  'date': timestamp.toDate(ingang['date']),
  '1_max_user': ingang['1_max_user'],
  '2_max_user': ingang['2_max_user'],
  '3_max_user': ingang['3_max_user'],
  '4_max_user': ingang['4_max_user'],
  '5_max_user': ingang['5_max_user'],
  '6_max_user': ingang['6_max_user']
})

export const Announcement = notice => ({
  idx: notice['idx'],
  title: notice['title'],
  desc: notice['description'],
  date: timestamp.toDate(notice['date'])
})

export const CreateAnnouncementInput = notice => ({
  'idx': notice.idx,
  'title': notice.title,
  'desc': notice.description,
  'date': notice.date
})
