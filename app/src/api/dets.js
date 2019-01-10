import axios from './axios'
import magician from './magician'
import { Dets, StudentDets } from '@/src/struct/dets'

export async function createDets (dets) {
  await magician(() => axios.post(`/dets/`, dets), {
    403: () => new Error('권한이 없습니다.')
  })
}

export async function getGradeDets (grade) {
  const { data: { dets } } = magician(() => axios.get(`/dets/grade/${grade}`), {
    404: () => []
  })

  return dets.map(Dets)
}

export async function cancelDets (idx) {
  await magician(() => axios.delete(`/dets/request/${idx}`), {
    403: () => new Error('신청 기간이 아닙니다.'),
    404: () => new Error('존재하지 않는 Dets 신청입니다.')
  })
}

export async function applyDets (idx) {
  await magician(() => axios.post(`/dets/request/${idx}`), {
    403: () => new Error('신청 기간이 아니거나 마감되었습니다.'),
    404: () => new Error('존재하지 않는 Dets 입니다.'),
    409: () => new Error('이미 신청을 완료했습니다.')
  })
}

export async function getStudentDets () {
  const { data: { dets } } = await magician(() => axios.get(`/dets/student/`), {
    404: () => []
  })

  return dets.map(StudentDets)
}

export async function getDets (idx) {
  const { data: { dets } } = await magician(() => axios.get(`/dets/${idx}`), {
    404: () => []
  })

  return dets.map(Dets)
}

export async function deleteDets (idx) {
  await magician(() => axios.delete(`/dets/${idx}`), {
    403: () => new Error('권한이 없습니다'),
    404: () => new Error('존재하지 않는 Dets 입니다.')
  })
}

export async function changeDets (idx, dets) {
  await magician(() => axios.put(`/dets/${idx}`, dets), {
    403: () => new Error('권한이 없습니다.')
  })
}
