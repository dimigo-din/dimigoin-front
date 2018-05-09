export const Ingang = ingang => ({
  idx: ingang['idx'],
  grade: ingang['target_grade'],
  klass: ingang['klass'],
  day: ingang['day'],
  time: ingang['time'],
  count: ingang['count'],
  max: ingang['max'],
  applyStartDate: ingang['apply_start_date'],
  applyEndDate: ingang['apply_end_date'],
  weekApplyCount: ingang['week_apply_count'],
  applied: ingang['applied'],
  appliers: (ingang['ingang_apply'] || []).map(v => ({
    idx: v['idx'],
    time: v['apply_time'],
    user: v['student']
  }))
})
