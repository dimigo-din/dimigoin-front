import timestamp from 'unix-timestamp'

export const Ingang = ingang => ({
  ingangs: {
    idx: ingang['idx'],
    day: ingang['day'],
    time: ingang['time'],
    startDate: timestamp.toDate(ingang['request_start_date']),
    endDate: timestamp.toDate(ingang['request_end_date']),
    status: ingang['status'],
    count: ingang['present'],
    max: ingang['max_user']
  },
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
  'date': ingang.date
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
