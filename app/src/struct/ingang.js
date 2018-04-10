export const Ingang = ingang => ({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  klass: ingang['class'],
  day: ingang['day'],
  time: ingang['time'],
  count: ingang['count'],
  max: ingang['max'],
  applyStartDate: ingang['request_start_date'],
  applyEndDate: ingang['request_end_date'],
  weekApplyCount: ingang['week_request_count'],
  applied: ingang['request'],
  appliers: (ingang['ingang_request'] || []).map(v => ({
    idx: v['idx'],
    time: v['request_time'],
    user: v['user']
  }))
})
