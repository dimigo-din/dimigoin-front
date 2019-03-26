import timestamp from 'unix-timestamp'

export const Ingang = ingang => ({
  idx: ingang['idx'],
  grade: parseInt(ingang['target_grade']),
  klass: ingang['klass'],
  day: ingang['day'],
  time: ingang['time'],
  startDate: timestamp.toDate(ingang['request_start_date']),
  endDate: timestamp.toDate(ingang['request_end_date']),
  status: ingang['status'],
  count: ingang['present'],
  max: ingang['max_user'],
  date: ingang['date'],
  max_user_1: ingang['1_max_user'],
  max_user_2: ingang['2_max_user'],
  max_user_3: ingang['3_max_user'],
  max_user_4: ingang['4_max_user'],
  max_user_5: ingang['5_max_user'],
  max_user_6: ingang['6_max_user']
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
  'date': ingang.date,
  '1_max_user': ingang.max_user_1,
  '2_max_user': ingang.max_user_2,
  '3_max_user': ingang.max_user_3,
  '4_max_user': ingang.max_user_4,
  '5_max_user': ingang.max_user_5,
  '6_max_user': ingang.max_user_6
})

export const Announcement = notice => ({
  desc: notice['description'],
  grade: parseInt(notice['grade'])
})

export const CreateAnnouncementInput = notice => ({
  'desc': notice.description,
  'grade': notice.grade
})
