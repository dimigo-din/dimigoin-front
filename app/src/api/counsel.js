import axios from './axios'
import magician from './magician'
import { Counsel } from '@/src/struct/counsel'

export async function getCounsel () {
  const { data: { counsel } } = await magician(() => axios.get(`/counsel/`), {})
  return counsel.map(Counsel)
}

export async function getAdminCounsel () {
  const { data: { counsel } } = await magician(() => axios.get(`/counsel/admin`), {})
  return counsel.map(Counsel)
}

export async function addCounsel () {
  await magician(() => axios.get(`/counsel/cron`), {
    404: '상담신청이 없습니다'
  })
}

export async function getDateCounsel (date) {
  const { data: { counsel } } = await magician(() => axios.get(`/counsel/date/${date}`), {})
  return counsel.map(Counsel)
}

export async function cancelCounsel (idx) {
  await magician(() => axios.delete(`/counsel/request/${idx}`), {
    404: '상담실 또는 신청이 없습니다'
  })
}

export async function applyCounsel (idx) {
  await magician(() => axios.post(`/counsel/request/${idx}`), {
    404: '상담 신청이 없습니다.',
    409: '이미 신청을 했거나 다른 학생이 신청하였습니다.'
  })
}

export async function getIdxCounsel (idx) {
  const { data: { counsel } } = await magician(() => axios.get(`/counsel/${idx}`), {})
  return counsel.map(Counsel)
}
