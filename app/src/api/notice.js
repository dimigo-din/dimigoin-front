import axios from './axios'
import magician from './magician'
import { Notice } from '@/src/struct/notice'

export async function addNotice (notice) {
  await magician(() => axios.post(`/notice/`, notice), {
    default: () => new Error('공지를 추가하던 중 에러가 발생하였습니다')
  })
}

export async function getAllNotice () {
  const { notice } = await magician(() => axios.get(`/notice/`), {})
  return notice.map(Notice)
}

export async function getLatestNotice () {
  const { notice } = await magician(() => axios.get(`/notice/latest`), {})
  return notice[0].description
}
