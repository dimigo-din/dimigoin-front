import axios from './axios'
import magician from './magician'
import ValidationError from '@/src/errors/validation-error'
import { Afterschool } from '@/src/struct/afterschool'

function tempValidation (afterschool) {
  const keys = ['name', 'request_start_date', 'request_end_date', 'day', 'target_grade', 'max_of_count', 'teacher_name']
  const missingArguments = keys.filter(key => !afterschool[key])
  if (missingArguments.length > 0) {
    throw new ValidationError('모든 입력란을 채워주세요.', missingArguments)
  }
}

export async function createAfterschool (afterschool) {
  tempValidation(afterschool)
  await magician(() => axios.post(`/afterschools/`, afterschool), {
    403: '권한이 없습니다.'
  })
}

export async function getGradeAfterschool (grade) {
  const { data: { afterschools } } = await magician(() => axios.get(`/afterschools/grade/${grade}`), {
    404: () => []
  })
  return afterschools.map(Afterschool)
}

export async function cancelAfterschool (idx) {
  await magician(() => axios.delete(`/afterschools/request/${idx}`), {
    403: '신청 기간이 아니거나 마감되었습니다.',
    404: '존재하지 않는 방과 후 신청입니다.'
  })
}

export async function applyAfterschool (idx, captcha) {
  await magician(() => axios.post(`/afterschools/request/${idx}`, { 'g-recaptcha-response': captcha }), {
    401: '잘못된 학년에 신청했습니다.',
    403: '신청 기간이 아닙니다.',
    404: '존재하지 않는 과목입니다.',
    406: '잘못된 요청입니다.',
    409: '이미 신청을 완료했습니다.'
  })
}

export async function getStudentAfterschool () {
  const { data: { afterschools } } = await magician(() => axios.get(`/afterschools/student/`), {
    404: () => []
  })
  return afterschools.map(Afterschool)
}

export async function deleteAfterschool (idx) {
  await magician(() => axios.delete(`/afterschools/${idx}`), {
    404: '존재하지 않는 방과후 신청입니다.'
  })
}
