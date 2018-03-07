import axios from './axios'
import { Circle, CircleApplicant } from '../struct/circle'

export async function getCircles () {
  const res = await axios.get('/circles/')

  switch (res.status) {
    case 404:
      throw new Error('동아리가 없습니다.')
    case 200:
  }

  return res.data['circles'].map(Circle)
}

export async function getCircleApplicant (circleIdx) {
  const res = await axios.get(`/circles/apply/${circleIdx}/`)

  switch (res.status) {
    case 404:
      throw new Error('동아리 지원자가 없습니다.')
    case 200:
  }

  return res.data['circle_apply'].map(CircleApplicant)
}

export async function applyCircle (circleIdx) {
  const res = await axios.put(`/circles/apply/${circleIdx}/`)

  switch (res.status) {
    case 403:
      throw new Error('동아리 신청 기간이 아닙니다.')
    case 404:
      throw new Error('존재하지 않는 동아리입니다.')
    case 409:
      throw new Error('이미 신청했습니다.')
    case 200:
  }
}
