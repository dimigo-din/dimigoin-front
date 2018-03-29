import axios from './axios'
import { Ingang } from '../struct/ingang'

export async function applyIngang (ingangIdx) {
  try {
    await axios.post(`/ingangs/apply/${ingangIdx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')

    switch (res.status) {
      case 401:
        throw new Error('존재하지 않는 학년 또는 반입니다.')
      case 403:
        throw new Error('신청 기간이 아닙니다.')
      case 404:
        throw new Error('인강실 신청이 없습니다.')
      case 409:
        throw new Error('이미 신청을 했거나 인원이 꽉 찼습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function cancelIngang (ingangIdx) {
  try {
    await axios.delete(`/ingangs/apply/${ingangIdx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')

    switch (res.status) {
      case 401:
        throw new Error('존재하지 않는 학년 또는 반입니다.')
      case 403:
        throw new Error('신청 기간이 아닙니다.')
      case 404:
        throw new Error('신청이 조회되지 않았습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getIngang () {
  try {
    const res = await axios.get('/ingangs/user/')

    return Ingang(res.data) // TODO
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')

    switch (res.status) {
      case 404:
        throw new Error('오늘은 인강실을 신청할 수 없습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}
