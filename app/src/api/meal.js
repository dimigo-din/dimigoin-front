import { pureAxios as axios } from './axios'
import magician from './magician'
import { format } from 'date-fns'

export function getTodayMeal () {
  return getMeal(new Date())
}

export async function getMeal (date) {
  const formattedDate = format(date, 'YYYY-MM-DD')

  return (await magician(
    () => axios.get(`/dimibobs/${formattedDate}`),
    {
      404: () => ({
        breakfast: '',
        lunch: '',
        dinner: '',
        snack: '',
        date: formattedDate
      })
    }
  )).data
}
