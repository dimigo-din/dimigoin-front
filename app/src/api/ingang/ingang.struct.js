const convertRequest = v => (v && {
  idx: v['idx'],
  reqTime: v['request_time'],
  user: {
    idx: v['user']['idx'],
    name: v['user']['name'],
    grade: v['user']['grade'],
    class: v['user']['class'],
    number: v['user']['number'],
    serial: v['user']['serial']
  }
})

export const GradeIngang = ingang => ({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  class: ingang['class'],
  day: ingang['day'],
  time: ingang['time'],
  max: ingang['max'],
  startDate: ingang['request_start_date'],
  endDate: ingang['request_end_date'],
  request: (ingang['ingang_request'] || []).map(convertRequest)
})
