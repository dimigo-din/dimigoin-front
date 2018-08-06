import axios from './axios'
import { Counsel } from '@/src/struct/counsel'

export async function getCounsel () {
  try {
    const res = await axios.get(`/counsel/`)
    console.log(res.data)
    return res.data['counsel'].map(Counsel)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function addCounsel () {
  try {
    await axios.get(`/counsel/cron`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getDateCounsel (date) {
  try {
    const res = axios.get(`/counsel/date/${date}`)
    return res.data['counsel'].map(Counsel)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function cancelCounsel (idx) {
  try {
    await axios.delete(`/counsel/request/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        throw new Error('상담신청이 없습니다')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function applyCounsel (idx) {
  try {
    await axios.post(`/counsel/request/${idx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        throw new Error('상담신청이 없습니다')
      case 409:
        throw new Error('이미 신청을 했거나 다른 학생이 신청하였습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getIdxCounsel (idx) {
  try {
    const res = await axios.get(`/counsel/${idx}`)
    return res.data['counsel'].map(Counsel)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

/*
export async function getCounsel () {
  const { counsel } = await magician(() => axios.get(`/counsel/`), {})
  return counsel.map(Counsel)
}

export async function addCounsel () {
  await magician(() => axios.get(`/counsel/cron`), {
    404: () => new Error('상담신청이 없습니다')
  })
}

export async function getDateCounsel (date) {
  const { counsel } = await magician(() => axios.get(`/counsel/date/${date}`), {})
  return counsel.map(Counsel)
}

export async function cancelCounsel (idx) {
  await magician(() => axios.delete(`/counsel/request/${idx}`), {
    404: () => new Error('상담실 또는 신청이 없습니다')
  })
}

export async function applyCounsel (idx) {
  await magician(() => axios.post(`/counsel/request/${idx}`), {
    404: () => new Error('상담 신청이 없습니다.'),
    409: () => new Error('이미 신청을 했거나 다른 학생이 신청하였습니다.')
  })
}

export async function getIdxCounsel (idx) {
  const { counsel } = await magician(() => axios.get(`/counsel/${idx}`), {})
  return counsel.map(Counsel)
}
*/
