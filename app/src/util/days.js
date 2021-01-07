const days = [
  { idx: 0, code: 'mon', text: '월요일', smallText: '월' },
  { idx: 1, code: 'tus', text: '화요일', smallText: '화' },
  { idx: 2, code: 'wed', text: '수요일', smallText: '수' },
  { idx: 3, code: 'thr', text: '목요일', smallText: '목' },
  { idx: 4, code: 'fri', text: '금요일', smallText: '금' },
  { idx: 5, code: 'sat', text: '토요일', smallText: '토' }
]

export default days

export const daysWithNight = [
  ...days,
  { idx: 6, code: 'sun', text: '야자 시간', smallText: '야자' }
]
