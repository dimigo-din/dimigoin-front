import axios from './axios'
import magician from './magician'
import moment from 'moment'

export function getTodayMeal () {
  return getMeal(new Date())
}

export async function getMeal (date, time = 1) {
  return (await magician(
    () => axios.get(`/dimibobs/${moment(date).format('YYYY-MM-DD')}`),
    { 404: () => {} }
  )).data
}
