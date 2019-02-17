const CouncelRequest = v => ({
  idx: v['idx'],
  time: v['request_time'],
  user: {
    idx: v['user']['idx'],
    name: v['user']['name'],
    grade: v['user']['grade'],
    class: v['user']['class'],
    number: v['user']['number'],
    serial: v['user']['serial']
  }
})

export const Counsel = counsel => ({
  idx: counsel['idx'],
  day: counsel['day'],
  startDate: counsel['counsel_start_date'],
  endDate: counsel['counsel_end_date'],
  date: counsel['date'],
  applied: counsel['applied'],
  caniapplied: counsel['caniapplied'],
  applicant: counsel['applicant'],
  request: (counsel['counsel_request'] || []).map(CouncelRequest)
})
