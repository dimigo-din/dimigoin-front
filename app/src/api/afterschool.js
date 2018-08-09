import axios from './axios'
import magician from './magician'
import { Afterschool } from '@/src/struct/afterschool'

function tempValidation (afterschool) {
  const keys = ['name', 'request_start_date', 'request_end_date', 'day', 'target_grade', 'max_of_count', 'teacher_name']
  for (const key of keys) {
    if (!afterschool[key]) throw new Error('모든 입력란을 채워주세요.')
  }
}

export async function createAfterschool (afterschool) {
  tempValidation(afterschool)
  await magician(() => axios.post(`/afterschools/`, afterschool), {
    403: () => new Error('권한이 없습니다.')
  })
}

export async function getGradeAfterschool (grade) {
  const { afterschools } = await magician(() => axios.get(`/afterschools/grade/${grade}`), {
    404: () => []
  })
  return afterschools.map(Afterschool)
}

export async function cancelAfterschool (idx) {
  await magician(() => axios.delete(`/afterschools/request/${idx}`), {
    403: () => new Error('신청 기간이 아니거나 마감되었습니다.'),
    404: () => new Error('존재하지 않는 방과 후 신청입니다.')
  })
}

export async function applyAfterschool (idx, captcha) {
  await magician(() => axios.post(`/afterschools/request/${idx}`, { 'g-recaptcha-response': captcha }), {
    401: () => new Error('잘못된 학년에 신청했습니다.'),
    403: () => new Error('신청 기간이 아닙니다.'),
    404: () => new Error('존재하지 않는 과목입니다.'),
    406: () => new Error('잘못된 요청입니다.'),
    409: () => new Error('이미 신청을 완료했습니다.')
  })
}

export async function getStudentAfterschool () {
  const { afterschools } = await magician(() => axios.get(`/afterschools/student/`), {
    404: () => []
  })
  return afterschools.map(Afterschool)
}

export async function deleteAfterschool (idx) {
  await magician(() => axios.delete(`/afterschools/${idx}`), {
    404: () => new Error('존재하지 않는 방과후 신청입니다.')
  })
}
