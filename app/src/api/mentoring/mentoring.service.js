import { ServiceBase } from '@/src/api/service-base'
import { Mentoring, Notice } from './mentoring.struct'

export class MentoringService extends ServiceBase {
  /**
   * 최신 공지사항을 가져옵니다.
   *
   * @returns {Object}
   */
  async getNotice () {
    const { data: notice } = await this.magician(() => this.r.get(`/notice`), {})
    return Notice(notice)
  }
}

export class MentoringRequestorService extends MentoringService {
  /**
   * 학생이 신청할 수 있는 멘토링 목록을 가져옵니다.
   */
  async getStudentMentoring () {
    const { data: { mentors } } = await this.magician(() => this.r.get(`/request`), {
      404: () => []
    })
    return mentors.map(Mentoring)
  }

  /**
   * 멘토링을 신청합니다.
   *
   * @param idx
   */
  async applyMentoring (idx) {
    await this.magician(() => this.r.post(`/request/${idx}`), {
      404: '존재하지 않는 멘토링 신청입니다.'
    })
  }

  /**
   * 멘토링 신청을 취소합니다.
   *
   * @param idx
   */
  async cancelMentoring (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
      404: '존재하지 않는 멘토링 신청입니다.'
    })
  }
}
