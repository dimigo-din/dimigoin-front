import { ServiceBase } from '@/src/api/service-base'
import { Mentoring, Notice } from './mentoring.struct'

export class MentoringService extends ServiceBase {
  /**
   * 최신 공지사항을 가져옵니다.
   *
   * @returns {Object}
   */
  async getNotice () {
    const { data: notice } = await this.magician(() => this.r.get('/notice'), {})
    return Notice(notice)
  }
}

export class MentoringRequestorService extends MentoringService {
  /**
   * 학생이 신청할 수 있는 멘토링 목록을 가져옵니다.
   */
  async getStudentMentoring () {
    const { data: { mentors } } = await this.magician(() => this.r.get('/request'), {
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
      403: '본인 학년/반 인강실이 아니거나, 일주일치 신청을 모두 했습니다.',
      404: '인강실 신청이 없습니다.',
      405: '신청 시간이 아닙니다.',
      409: '이미 신청을 했거나 인원이 꽉 찼습니다.'
    })
  }

  /**
   * 멘토링 신청을 취소합니다.
   *
   * @param idx
   */
  async cancelMentoring (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
      403: '신청 시간이 아닙니다.',
      404: '존재하지 않는 멘토링 신청입니다.'
    })
  }
}

export class MentoringManagerService extends MentoringService {
  /**
   * 공지사항을 추가합니다.
   *
   * @param {Object} notice
   */
  async addNotice (notice) {
    await this.magician(() => this.r.post('/notice', notice), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 멘토링 정보를 가져옵니다.
   */
  async getAllMentorings () {
    const { data: { mentorings } } = await this.magician(() => this.r.get('/admin'))
    return mentorings.map(Mentoring)
  }
}
