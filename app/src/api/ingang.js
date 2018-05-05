import axios from './axios'
import magician from './magician'
import { Ingang } from '@/src/struct/ingang'

export async function applyIngang (ingangIdx) {
  await magician(() => axios.post(`/ingangs/request/${ingangIdx}`), {
    401: () => new Error('존재하지 않는 학년 또는 반입니다.'),
    403: () => new Error('신청 기간이 아닙니다.'),
    404: () => new Error('인강실 신청이 없습니다.'),
    409: () => new Error('이미 신청을 했거나 인원이 꽉 찼습니다.')
  })
}

export async function cancelIngang (ingangIdx) {
  await magician(() => axios.delete(`/ingangs/request/${ingangIdx}`), {
    401: () => new Error('존재하지 않는 학년 또는 반입니다.'),
    403: () => new Error('신청 기간이 아닙니다.'),
    404: () => new Error('신청이 조회되지 않았습니다.')
  })
}

export async function getIngang () {
  return Ingang(await magician(() => axios.get('/ingangs/student/'), {
    404: () => new Error('오늘은 인강실을 신청할 수 없습니다.')
  }))
}

export const admin = {
  async getIngang (grade) {
    const data = await magician(() => axios.get(`/ingangs/${grade}`), {
      403: () => new Error('권한이 없습니다.'),
      404: () => new Error('인강 신청이 없습니다.')
    })
    return data['ingang'].map(Ingang)
  }
}
