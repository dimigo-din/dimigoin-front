import axios from './axios'
import magician from './magician'
import { Boook, Notice } from '@/src/struct/book'

/**
 * 도서 신청을 합니다.
 *
 * @param book
 * @returns {Promise<void>}
 */
export async function addBook (book) {
  await magician(() => axios.post(`/book_info/`, book), {
    409: () => new Error('이미 신청한 도서입니다.'),
    403: () => new Error('가격은 숫자로 입력하세요.')
  })
}

/**
 * 모든 도서 신청을 출력합니다.
 *
 * @returns {Promise<Array<Book>>}
 */
export async function getAllBook () {
  const { Book } = await magician(() => axios.get(`/book_info/`), {})
  return Book.map(Boook)
}

/**
 * 도서 신청을 승인합니다.
 *
 * @param idx
 * @returns {Promise<void>}
 */
export async function acceptBook (idx) {
  await magician(() => axios.post(`/book_info/accept/${idx}`), {})
}

/**
 * 도서 신청을 대기합니다.
 *
 * @param idx
 * @returns {Promise<void>}
 */
export async function waitBook (idx) {
  await magician(() => axios.put(`/book_info/accept/${idx}`), {})
}

/**
 * 도서 신청을 거부합니다.
 *
 * @param idx
 * @returns {Promise<void>}
 */
export async function rejectBook (idx) {
  await magician(() => axios.delete(`/book_info/accept/${idx}`), {})
}

/**
 * 도서 신청을 수정합니다.
 *
 * @param idx
 * @param book
 * @returns {Promise<void>}
 */
export async function changeBook (idx, book) {
  await magician(() => axios.put(`/book_info/book/${idx}`, book), {
    404: () => new Error('존재하지 않는 신청입니다.')
  })
}

/**
 * 도서 신청을 삭제합니다.
 *
 * @param idx
 * @returns {Promise<void>}
 */
export async function deleteBook (idx) {
  await magician(() => axios.delete(`/book_info/book/${idx}`), {
    404: () => new Error('존재하지 않는 신청입니다.')
  })
}

/**
 * 도서 신청을 출력합니다.
 *
 * @param idx
 * @return {Promise<Book>}
 */
export async function getBook (idx) {
  const { Book } = await magician(() => axios.get(`/book_info/book/${idx}`), {
    404: () => new Error('존재하지 않는 신청입니다.')
  })
  return Book.map(Boook)
}

/**
 * 공지를 추가합니다.
 *
 * @param notice
 * @returns {Promise<void>}
 */
export async function addNotice (notice) {
  await magician(() => axios.post(`/book_info/library`, notice), {})
}

/**
 * 모든 공지를 출력합니다.
 *
 * @returns {Promise<Array<Notice>>}
 */
export async function getAllNotice () {
  const { notice } = await magician(() => axios.get(`/book_info/library`), {})
  return notice.map(Notice)
}

/**
 * 공지를 출력합니다.
 *
 * @returns {Promise<Notice>}
 */
export async function getNotice () {
  const notice = await magician(() => axios.get(`/book_info/library_latest`), {})
  return Notice(notice)
}

/**
 * 자신이 신청한 도서 신청을 출력합니다.
 *
 * @returns {Promise<Array<Book>>}
 */
export async function getStudentBook () {
  const { Book } = await magician(() => axios.get(`/book_info/student/`), {
    404: () => []
  })
  return Book.map(Boook)
}
