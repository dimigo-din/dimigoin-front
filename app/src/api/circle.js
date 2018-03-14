import axios from './axios'
import { Circle, CircleApplicant } from '../struct/circle'

export async function getCircles () {
  try {
    const res = await axios.get('/circles/')
    return res.data['circles'].map(Circle)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getCircleApplicant () {
  try {
    const res = await axios.get('/circles/apply/')
    return res.data['circle_apply'].map(CircleApplicant)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 401:
        throw new Error('권한이 없습니다.')
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function applyCircle (circleIdx) {
  try {
    await axios.put(`/circles/apply/${circleIdx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('동아리 신청 기간이 아닙니다.')
      case 404:
        throw new Error('존재하지 않는 동아리입니다.')
      case 409:
        throw new Error('동아리는 최대 3개까지만 지원할 수 있습니다.')
      case 423:
        throw new Error('마감된 동아리입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function cancelCircle (circleIdx) {
  try {
    await axios.delete(`/circles/apply/${circleIdx}`)
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('동아리 신청 기간이 아닙니다.')
      case 404:
        throw new Error('존재하지 않는 동아리입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function setApplierStatus (applyIdx, status) {
  try {
    await axios.post(`/circles/status/${applyIdx}`, {
      status
    })
  } catch ({ message, response: res }) {
    console.error(message)
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 401:
        throw new Error('권한이 없습니다.')
      case 403:
        throw new Error('변경이 불가능합니다.')
      case 404:
        throw new Error('존재하지 않습니다.')
      case 409:
        throw new Error('이미 최종 결정을 한 지원자입니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function setFinal (applyIdx) {
  try {
    await axios.put(`/circles/final/${applyIdx}`)
  } catch ({ message, response: res }) {
    if (!res) throw new Error('네트워크에 문제가 있습니다.')
    switch (res.status) {
      case 403:
        throw new Error('')
      case 404:
        throw new Error('존재하지 않는 지원자입니다.')
      case 409:
        throw new Error('')
    }
  }
}
