import axios from './axios'

export async function getTodayMeal () {
  const res = await axios.get('/dimibobes/today/')

  switch (res.status) {
    case 404:
      return { breakfast: 'X', lunch: 'X', dinner: 'X', snack: 'X' }
    case 200:
  }

  return res.data
}
