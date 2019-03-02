import { ServiceBase } from '@/src/api/service-base'
import { Notice } from '@/src/api/notice/notice.struct'

export class NoticeService extends ServiceBase {
  /**
   * 모든 공지사항을 출력합니다.
   *
   * @returns {string[]}
   */
  async getNotices () {
    const { data: { notice } } = await this.magician(() => this.r.get('/'))
    return notice.map(Notice).map(v => v.desc)
  }

  /**
   * 최근 공지사항을 출력합니다.
   *
   * @returns {string}
   */
  async getNotice () {
    const { data: { notice } } = await this.magician(() => this.r.get('/latest'))
    return Notice(notice[0]).desc
  }
}

export class NoticeManagerService extends NoticeService {
  /**
   * 공지사항을 추가합니다.
   *
   * @param notice
   */
  async postNotice (notice) {
    await this.magician(() => this.r.post('/', notice))
  }
}
