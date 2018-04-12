import axios from './axios'
import magician from './magician'
import moment from 'moment'

export function getTodayMeal () {
  return getMeal(new Date())
}

export function getMeal (date) {
  return magician(() => axios.get(`/dimibobs/${moment(date).format('YYYY-MM-DD')}`), {
    404: () => ({})
  })
}
