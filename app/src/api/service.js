import axios from './axios'

export async function getServiceList () {
  try {
    const res = await axios.get('/services/')
    return res.data.services
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}
