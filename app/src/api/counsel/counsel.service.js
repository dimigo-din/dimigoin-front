import { Counsel } from './counsel.struct'
import { ServiceBase } from '@/src/api/service-base'

export class CouncelRequestorService extends ServiceBase {
  async getCounsels () {
    const { data: { counsel } } = await this.magician(() => this.r.get('/'), {})
    return counsel.map(Counsel)
  }

  async addCounsel (password) {
    await this.magician(() => this.r.post('/cron', { password }), {
      404: '상담신청이 없습니다'
    })
  }

  async cancelCounsel (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
      404: '상담실 또는 신청이 없습니다'
    })
  }

  async applyCounsel (idx) {
    await this.magician(() => this.r.post(`/request/${idx}`), {
      404: '상담 신청이 없습니다.',
      409: '이미 신청을 했거나 다른 학생이 신청하였습니다.'
    })
  }
}

export class CounselManagerService extends ServiceBase {
  async getCounsels () {
    const { data: { counsel } } = await this.magician(() => this.r.get('/admin'), {
      403: '권한이 없습니다.'
    })
    return counsel.map(Counsel)
  }

  async getCounsel (idx) {
    const { data: { counsel } } = await this.magician(() => this.r.get(`/${idx}`), {
      403: '권한이 없습니다.'
    })
    return counsel.map(Counsel)
  }

  async getDateCounsel (date) {
    const { data: { counsel } } = await this.magician(() => this.r.get(`/date/${date}`), {
      403: '권한이 없습니다.'
    })
    return counsel.map(Counsel)
  }
}
