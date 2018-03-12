import axios from './axios'
import { Afterschool } from '../struct/afterschool'

function tempValidation (afterschool) {
  const keys = ['name', 'day', 'capacity', 'teacherName', 'applyStartDate', 'applyEndDate']
  for (const key of keys) {
    if (!afterschool[key]) throw new Error('모든 입력란을 채워주세요.')
  }
  try {
    console.debug(new Date(afterschool.applyStartDate))
    console.debug(new Date(afterschool.applyStartDate))
  } catch (err) {
    throw new Error('날짜를 모두 채워주세요.')
  }
}

export async function fetchAfterschool (grade) {
  try {
    const res = await axios.get(`/afterschools/${grade}`)
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
    await axios.post(`/afterschools/${grade}`, {
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
