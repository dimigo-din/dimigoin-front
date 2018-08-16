import axios from './axios'
import magician from './magician'
import { StudentIngang, GradeIngang } from '@/src/struct/ingang'

export async function applyIngang (idx) {
  await magician(() => axios.post(`/ingangs/request/${idx}`), {
    401: () => new Error('본인의 학년 또는 반이 아닙니다.'),
    403: () => new Error('일주일 2회 신청을 모두 했습니다.'),
    404: () => new Error('인강실 신청이 없습니다.'),
    405: () => new Error('신청 기간이 아닙니다.'),
    409: () => new Error('이미 신청을 했거나 인원이 꽉 찼습니다.')
  })
}

export async function cancelIngang (idx) {
  await magician(() => axios.delete(`/ingangs/request/${idx}`), {
    401: () => new Error('존재하지 않는 학년 또는 반입니다.'),
    403: () => new Error('신청 기간이 아닙니다.'),
    404: () => new Error('신청이 조회되지 않았습니다.')
  })
}

export async function getStudentIngang () {
  const res = await magician(() => axios.get('/ingangs/student/'), {
    404: () => new Error('오늘은 인강실을 신청할 수 없습니다.')
  })
  return StudentIngang(res)
}

export async function getGradeIngang (grade) {
  const { ingang } = await magician(() => axios.get(`/ingangs/${grade}`), {
    403: () => new Error('권한이 없습니다.'),
    404: () => new Error('인강 신청이 없습니다.')
  })
  return ingang.map(GradeIngang)
}
