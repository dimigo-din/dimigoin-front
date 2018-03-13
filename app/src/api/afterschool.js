import axios from './axios'
import { Afterschool } from '../struct/afterschool'

function tempValidation (afterschool) {
  const keys = ['name', 'day', 'capacity', 'teacherName', 'applyStartDate', 'applyEndDate']
  for (const key of keys) {
    if (!afterschool[key]) throw new Error('모든 입력란을 채워주세요.')
  }

  const validDate = new Date(afterschool.applyStartDate).getTime() + new Date(afterschool.applyEndDate).getTime()
  if (isNaN(validDate)) {
    throw new Error('날짜를 모두 정확하게 채워주세요.')
  }
}

export async function getAfterschools () {
  try {
    const res = await axios.get(`/afterschools/apply/`)
    return res.data['afterschools'].map(Afterschool)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function fetchAfterschool (grade) {
  try {
    const res = await axios.get(`/afterschools/grade/${grade}`)
    return res.data['afterschools'].map(Afterschool)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function createAfterschool (grade, afterschool) {
  tempValidation(afterschool)

  try {
    await axios.post(`/afterschools/grade/${grade}`, {
      'name': afterschool['name'],
      'day': afterschool['day'],
      'max_of_count': afterschool['capacity'],
      'teacher_name': afterschool['teacherName'],
      'apply_start_date': afterschool['applyStartDate'],
      'apply_end_date': afterschool['applyEndDate']
    })
  } catch ({message, response: res}) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function deleteAfterschool (idx) {
  try {
    await axios.delete(`/afterschools/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        throw new Error('존재하지 않는 방과 후 신청입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function applyAfterschool (idx, captcha) {
  try {
    await axios.post(`/afterschools/apply/${idx}`, { 'g-recaptcha-response': captcha })
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 401:
        throw new Error('잘못된 학년에 신청했습니다.')
      case 403:
        throw new Error('신청 기간이 아니거나 마감되었습니다.')
      case 404:
        throw new Error('존재하지 않는 과목입니다.')
      case 406:
        throw new Error('잘못된 요청입니다.')
      case 409:
        throw new Error('이미 신청을 완료했습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function cancelAfterschool (idx) {
  try {
    await axios.delete(`/afterschools/apply/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('신청 기간이 아니거나 마감되었습니다.')
      case 404:
        throw new Error('존재하지 않는 방과 후 신청입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}
