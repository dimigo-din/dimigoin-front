import { ServiceBase } from '@/src/api/service-base'
import { Book, CreateBookInput, Notice } from './book.struct'

export class BookService extends ServiceBase {
  /**
   * 모든 공지를 출력합니다.
   *
   * @returns {Notice[]}
   */
  async getAllNotice () {
    const { data: notice } = await this.magician(() => this.r.get(`/library`), {})
    return notice.map(Notice)
  }

  /**
   * 공지를 출력합니다.
   *
   * @returns {Notice}
   */
  async getNotice () {
    const { data: notice } = await this.magician(() => this.r.get(`/library_latest`), {})
    return Notice(notice)
  }
}

export class BookRequestorService extends BookService {
  /**
   * 도서 신청을 합니다.
   *
   * @param book
   */
  async addBook (book) {
    await this.magician(() => this.r.post('/', CreateBookInput(book)), {
      409: '이미 신청한 도서입니다.',
      403: '가격은 숫자로 입력하세요.'
    })
  }

  /**
   * 도서 신청을 수정합니다.
   *
   * @param {number} idx
   * @param {Book~CreateBookInput} book
   */
  async changeBook (idx, book) {
    await this.magician(() => this.r.put(`/book/${idx}`, CreateBookInput(book)), {
      404: '존재하지 않는 신청입니다.'
    })
  }

  /**
   * 도서 신청을 삭제합니다.
   *
   * @param {number} idx
   */
  async deleteBook (idx) {
    await this.magician(() => this.r.delete(`/book/${idx}`), {
      404: '존재하지 않는 신청입니다.'
    })
  }

  /**
   * 자신이 신청한 도서 신청을 출력합니다.
   *
   * @returns {Book~Book[]}
   */
  async getStudentBook () {
    const { data: { book } } = await this.magician(() => this.r.get(`/student/`), {
      404: () => []
    })
    return book.map(Book)
  }
}

export class BookManagerService extends BookService {
  /**
   * 모든 도서 신청을 출력합니다.
   *
   * @returns {Book~Book[]}
   */
  async getAllBook () {
    const { data: { Book: book } } = await this.magician(() => this.r.get('/'), {
      403: '권한이 없습니다.'
    })
    return book.map(Book)
  }

  /**
   * 도서 신청을 승인합니다.
   *
   * @param {number} idx
   */
  async acceptBook (idx) {
    await this.magician(() => this.r.post(`/accept/${idx}`), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 도서 신청을 대기합니다.
   *
   * @param {number} idx
   */
  async waitBook (idx) {
    await this.magician(() => this.r.put(`/accept/${idx}`), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 도서 신청을 거부합니다.
   *
   * @param {number} idx
   */
  async rejectBook (idx) {
    await this.magician(() => this.r.delete(`/accept/${idx}`), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 도서 신청을 출력합니다.
   *
   * @param {number} idx
   * @return {Book~Book}
   */
  async getBook (idx) {
    const { data: { Book: book } } = await this.magician(() => this.r.get(`/book/${idx}`), {
      404: '존재하지 않는 신청입니다.'
    })
    return book.map(Book)
  }

  /**
   * 공지를 추가합니다.
   *
   * @param notice
   */
  async addNotice (notice) {
    await this.magician(() => this.r.post(`/library`, notice), {
      403: '권한이 없습니다.'
    })
  }
}
