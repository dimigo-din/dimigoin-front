import { ServiceBase } from '@/src/api/service-base'
import { Mentoring, Notice } from './mentoring.struct'

export class MentoringService extends ServiceBase {
  async getNotice () {
    const { data: notice } = await this.magician(() => this.r.get(`/notice`), {})
    return Notice(notice)
  }
}

export class MentoringRequestorService extends MentoringService {
  async getStudentMentoring () {
    const { data: { mentors } } = await this.magician(() => this.r.get(`/request`), {
      404: () => []
    })
    return mentors.map(Mentoring)
  }
}
