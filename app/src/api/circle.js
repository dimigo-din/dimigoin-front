import axios from './axios'
import { Circle, CircleApplicant } from '../struct/circle'

export async function getCircles () {
  try {
    const res = await axios.get('/circles/')
    return res.data['circles'].map(Circle)
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      case 404:
        return []
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getAppliedCircles () {
  try {
    const res = await axios.get(`/circles/apply/user`)
    return res.data['circle_user_apply']
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      case 403:
        throw new Error('동아리 신청 기간이 아닙니다.')
      case 404:
        throw new Error('존재하지 않는 동아리입니다.')
      case 409:
        throw new Error('신청한 동아리가 없습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function getCircleApplicant (circleIdx) {
  try {
    const res = await axios.get(`/circles/apply/${circleIdx}`)
    return res.data['circle_apply'].map(CircleApplicant)
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      case 404:
        throw new Error('동아리 지원자가 없습니다.')
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
    switch (res.status) {
      case 403:
        throw new Error('동아리 신청 기간이 아닙니다.')
      case 404:
        throw new Error('존재하지 않는 동아리입니다.')
      case 409:
        throw new Error('이미 신청했습니다.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}
