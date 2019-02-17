export const StudentDets = dets => ({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  startDate: dets['request_start_date'],
  endDate: dets['request_end_date'],
  speakerSerial: dets['speakerserial'],
  speakerName: dets['speakername'],
  date: dets['date'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['all_request_count'],
  status: dets['status'],
  open: false
})

export const Dets = dets => ({
  idx: dets['idx'],
  title: dets['title'],
  description: dets['description'],
  startDate: dets['request_start_date'],
  endDate: dets['request_end_date'],
  speakerSerial: dets['speakerserial'],
  speakerName: dets['speakername'],
  date: dets['date'],
  room: dets['room'],
  maxCount: dets['max_of_count'],
  targetGrade: dets['target_grade'],
  count: dets['all_request_count'],
  open: false
})

export const CreateDetsInput = dets => ({
  'title': dets.title,
  'description': dets.description,
  'request_start_date': dets.startDate.toISOString(),
  'request_end_date': dets.endDate.toISOString(),
  'speakerserial': dets.speakerSerial,
  'speakername': dets.speakerName,
  'date': dets.date,
  'room': dets.room,
  'max_of_count': parseInt(dets.maxCount),
  'target_grade': parseInt(dets.targetGrade)
})
