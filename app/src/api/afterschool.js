import axios from './axios'
import { Afterschool } from '../struct/afterschool'

export async function fetchAfterschool () {
  const res = await axios.get('/afterschools')

  switch (res.status) {
    case 404:
      return []
  }

  return res.data['afterschools'].map(Afterschool)
}
