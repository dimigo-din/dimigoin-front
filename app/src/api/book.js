import axios from './axios'
import magician from './magician'
import { Boook, Notice } from '@/src/struct/book'

export async function addBook (book) {
  await magician(() => axios.post(`/book_info/`, book), {
    409: () => new Error('이미 신청한 도서입니다.'),
    403: () => new Error('가격은 숫자로 입력하세요.')
  })
}

export async function getAllBook () {
  const { Book } = await magician(() => axios.get(`/book_info/`), {})
  return Book.map(Boook)
}

export async function rejectBook (idx) {
  await magician(() => axios.delete(`/book_info/accept/${idx}`), {})
}

export async function acceptBook (idx) {
  await magician(() => axios.post(`/book_info/accept/${idx}`), {})
}

export async function changeBook (idx, book) {
  await magician(() => axios.put(`/book_info/book/${idx}`, book), {
    404: () => new Error('존재하지 않는 신청입니다.')
  })
}

export async function deleteBook (idx) {
  await magician(() => axios.delete(`/book_info/book/${idx}`), {
    404: () => new Error('존재하지 않는 신청입니다.')
  })
}

export async function getBook (idx) {
  const { Book } = await magician(() => axios.get(`/book_info/book/${idx}`), {
    404: () => new Error('존재하지 않는 신청입니다.')
  })
  return Book.map(Boook)
}

export async function addNotice (notice) {
  await magician(() => axios.post(`/book_info/library`, notice), {})
}

export async function getAllNotice () {
  const { notice } = await magician(() => axios.get(`/book_info/library`), {})
  return notice.map(Notice)
}

export async function getNotice () {
  const notice = await magician(() => axios.get(`/book_info/library_latest`), {})
  return Notice(notice)
}

export async function getStudentBook () {
  const { Book } = await magician(() => axios.get(`/book_info/student/`), {
    404: () => []
  })
  return Book.map(Boook)
}
