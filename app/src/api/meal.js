import axios from './axios'
import moment from 'moment'

export async function getTodayMeal () {
  return getMeal(new Date())
}

export async function getMeal (date) {
  try {
    const res = await axios.get(`/dimibobs/${moment(date).format('YYYY-MM-DD')}`)
    return res.data
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      case 404:
        return { breakfast: 'X', lunch: 'X', dinner: 'X', snack: 'X' }
      default:
        throw new Error('알 수 없는 오류로 급식을 불러오지 못했습니다.')
    }
  }
}
