import axios from './axios'
import { Afterschool } from '../struct/afterschool'

export async function fetchAfterschool () {
  const res = await axios.get('/afterschools/')

  switch (res.status) {
    case 404:
      return []
    default:
      throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
  }

  return res.data['afterschools'].map(Afterschool)
}

export async function createAfterschool (afterschool) {
  const res = await axios.post('/afterschools/', Afterschool(afterschool))

  switch (res.status) {
    default:
      throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
  }
}
