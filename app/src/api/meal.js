import { pureAxios as axios } from './axios'
import magician from './magician'
import { format } from 'date-fns'

export function getTodayMeal () {
  return getMeal(new Date())
}

export async function getMeal (date) {
  return (await magician(
    () => axios.get(`/dimibobs/${format(date, 'YYYY-MM-DD')}`),
    { 404: () => {} }
  )).data
}
