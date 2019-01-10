import magician from './magician'
import axios from './axios'
import { Circle, CircleApplicant } from '@/src/struct/circle'

export async function getCircles () {
  const { data: { circles } } =
    await magician(() => axios.get('/circles/'), {
      404: () => []
    })

  return circles.map(Circle)
}

export async function getCircleApplicant () {
  const { data: { circle_request: circleRequests } } = await magician(() => axios.get('/circles/apply/'), {
    401: () => new Error('권한이 없습니다.'),
    404: () => []
  })

  return circleRequests.map(CircleApplicant)
}

export async function getAppliedCircle () {
  const { data: { circle_request: circleRequests } } =
    await magician(() => axios.get('/circles/apply/user'), {
      403: () => new Error('신청 기간이 아닙니다.'),
      404: () => []
    })

  return circleRequests.map(v => ({
    idx: v['idx'],
    circleIdx: v['circle_idx'],
    userIdx: v['user_idx'],
    status: v['status']
  }))
}

/**
 * @param circleIdx
 * @param introduce
 * @returns {Promise<void>}
 */
export async function applyCircle (circleIdx, introduce) {
  await magician(() => axios.put(`/circles/apply/${circleIdx}`, { introduce }), {
    403: () => new Error('동아리 신청 기간이 아닙니다.'),
    404: () => new Error('존재하지 않는 동아리입니다.'),
    409: () => new Error('동아리는 최대 3개까지만 지원할 수 있습니다.'),
    423: () => new Error('마감된 동아리입니다.')
  })
}

export async function cancelCircle (circleIdx) {
  await magician(() => axios.delete(`/circles/apply/${circleIdx}`), {
    403: () => new Error('동아리 신청 기간이 아닙니다.'),
    404: () => new Error('존재하지 않는 동아리입니다.')
  })
}

export async function setApplierStatus (applyIdx, status) {
  await magician(() => axios.post(`/circles/status/${applyIdx}`, { status }), {
    403: () => new Error('권한이 없습니다.'),
    404: () => new Error('존재하지 않습니다.'),
    409: () => new Error('이미 다른 동아리에 최종 결정을 한 지원자입니다.')
  })
}

export async function setFinal (applyIdx) {
  await magician(() => axios.put(`/circles/final/${applyIdx}`), {
    403: () => new Error('실패했습니다.'),
    404: () => new Error('존재하지 않는 지원자입니다.'),
    409: () => new Error('이미 다른 동아리를 최종 결정하셨습니다.')
  })
}
