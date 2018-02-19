import { sleep } from '../util'

export async function getServiceList () {
  await sleep(1000)
  return [
    {
      name: '소셜',
      description: '페이지, 게시, 댓글'
    }, {
      name: '신청',
      description: '간식, 방과 후, 인강실, 상담, 잔류'
    }, {
      name: '만족도조사',
      description: '교사별 만족도 조사'
    }, {
      name: 'DETS',
      description: '강좌 신청, 강좌 목록'
    }, {
      name: '과제제출',
      description: '과제 제출, 과제 목록'
    }, {
      name: 'Edison',
      description: '공문 인원 확인, 사용 가능 특별실 확인'
    }
  ]
}
