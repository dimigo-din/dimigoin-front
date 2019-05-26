import timestamp from 'unix-timestamp'

export const Application = etc => ({
  idx: etc['idx'],
  applicationIdx: etc['application_idx'],
  requestIdx: etc['request_idx'],
  hostIdx: etc['host_idx'],
  title: etc['title'],
  startDate: timestamp.toDate(etc['request_start_date']),
  endDate: timestamp.toDate(etc['request_end_date']),
  targetFirst: etc['1_grade'],
  targetSecond: etc['2_grade'],
  targetThird: etc['3_grade'],
  description: etc['description'],
  maxUser: etc['max_user'],
  status: etc['status'],
  open: false
})

export const CreateApplication = etc => ({
  'title': etc.title,
  'request_start_date': timestamp.fromDate(etc.startDate),
  'request_end_date': timestamp.fromDate(etc.endDate),
  '1_grade': etc.targetFirst,
  '2_grade': etc.targetSecond,
  '3_grade': etc.targetThird,
  'description': etc.description,
  'max_user': etc.maxUser
})

export const EditApplication = etc => ({
  'title': etc.title,
  'request_start_date': timestamp.fromDate(etc.startDate),
  'request_end_date': timestamp.fromDate(etc.endDate),
  '1_grade': etc.targetFirst,
  '2_grade': etc.targetSecond,
  '3_grade': etc.targetThird,
  'description': etc.description,
  'max_user': etc.maxUser
})
