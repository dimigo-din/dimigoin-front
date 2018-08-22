import axios from './axios'
import magician from './magician'
import { StudentIngang, GradeIngang } from '@/src/struct/ingang'

function rightIngang (ingang) {
  if (ingang[0].target_grade === 2) {
    const klass = ingang[0].class
    const today = new Date().getDay()
    if (today % 2) {
      if (klass % 2) {
        return ingang.slice(1, 2)
      } else {
        return ingang.slice(0, 1)
      }
    } else {
      if (klass % 2) {
        return ingang.slice(0, 1)
      } else {
        return ingang.slice(1, 2)
      }
    }
  } else {
    return ingang
  }
}

export async function applyIngang (idx) {
  await magician(() => axios.post(`/ingangs/request/${idx}`), {
    401: () => new Error('본인의 학년 또는 반이 아닙니다.'),
    403: () => new Error('일주일 2회 신청을 모두 했습니다.'),
    404: () => new Error('인강실 신청이 없습니다.'),
    405: () => new Error('신청 기간이 아닙니다.'),
    406: () => new Error('신청 가능한 시간이 아닙니다.'),
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
  const ingang = await magician(() => axios.get('/ingangs/student/'), {
    404: () => new Error('오늘은 인강실을 신청할 수 없습니다.')
  })
  const result = rightIngang(ingang)
  return result.map(StudentIngang)
}

export async function getGradeIngang (grade) {
  const { ingang } = await magician(() => axios.get(`/ingangs/${grade}`), {
    403: () => new Error('권한이 없습니다.'),
    404: () => new Error('인강 신청이 없습니다.')
  })
  return ingang.map(GradeIngang)
}

export async function getGradeTimeIngang (grade, time) {
  const { ingang } = await magician(() => axios.get(`/ingangs/${grade}/${time}`), {
    403: () => new Error('권한이 없습니다.'),
    404: () => new Error('인강 신청이 없습니다.')
  })
  return ingang.map(GradeIngang)
}
