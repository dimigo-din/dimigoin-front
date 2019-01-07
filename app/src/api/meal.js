import axios from './axios'
import magician from './magician'
import sleep from '@/src/util/sleep'
import moment from 'moment'

export function getTodayMeal () {
  return getMeal(new Date())
}

export async function getMeal (date, time = 1) {
  try {
    return magician(
      () => axios.get(`/dimibobs/${moment(date).format('YYYY-MM-DD')}`),
      { 404: () => {} }
    )
  } catch (err) {
    console.warn(err)
    await sleep(300 * time)
    return getMeal(date, Math.ceil(time * 1.5))
  }
}
