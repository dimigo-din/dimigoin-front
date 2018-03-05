import axios from './axios'

export async function getServiceList () {
  const res = await axios.get('/services/')

  switch (res.status) {
    case 200:
  }

  return res.data.services
}
