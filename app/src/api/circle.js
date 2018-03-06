import axios from './axios'

export async function getCircleList () {
  const res = await axios.get('/circles/')

  switch (res.status) {
    case 404:
      throw new Error('데이터가 없습니다.')
    case 200:
  }

  const { } = res.data['circle_apply']
}
