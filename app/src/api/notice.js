import axios from './axios'
import magician from './magician'

/**
 * 공지사항을 추가합니다.
 *
 * @param notice
 * @returns {Promise<void>}
 */
export async function postNotice (notice) {
  await magician(() => axios.post(`/notice/`, notice), {})
}

/**
 * 모든 공지사항을 출력합니다.
 *
 * @returns {Promise<Array<notice>>}
 */
export async function getAllNotice () {
  const { data: { notice } } = await magician(() => axios.get(`/notice/`), {})
  return notice
}

/**
 * 최근 공지사항을 출력합니다.
 *
 * @returns {Promise<Array<notice>>}
 */
export async function getNotice () {
  const { data: { notice } } = await magician(() => axios.get(`/notice/latest`), {})
  return notice[0].description
}
