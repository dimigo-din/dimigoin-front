import timestamp from 'unix-timestamp'

export const Application = etc => ({
  applicationIdx: etc['application_idx'],
  requestIdx: etc['request_idx'],
  hostIdx: etc['host_idx'],
  hostSerial: etc['host_serial'],
  title: etc['title'],
  startDate: timestamp.toDate(etc['request_start_date']),
  endDate: timestamp.toDate(etc['request_end_date']),
  targetFirst: etc['1_grade'],
  targetSecond: etc['2_grade'],
  targetThird: etc['3_grade'],
  description: etc['description'],
  maxUser: etc['max_user'],
  userCount: etc['user_count'],
  status: etc['status'],
  open: false
})

export const CreateApplicationInput = etc => ({
  'host_serial': etc.hostSerial,
  'title': etc.title,
  'request_start_date': timestamp.fromDate(etc.startDate),
  'request_end_date': timestamp.fromDate(etc.endDate),
  '1_grade': etc.targetFirst,
  '2_grade': etc.targetSecond,
  '3_grade': etc.targetThird,
  'description': etc.description,
  'max_user': etc.maxUser
})

export const EditApplicationInput = etc => ({
  'host_serial': etc.hostSerial,
  'title': etc.title,
  'request_start_date': timestamp.fromDate(etc.startDate),
  'request_end_date': timestamp.fromDate(etc.endDate),
  '1_grade': etc.targetFirst,
  '2_grade': etc.targetSecond,
  '3_grade': etc.targetThird,
  'description': etc.description,
  'max_user': etc.maxUser
})
