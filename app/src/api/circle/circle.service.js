import { Circle, CircleApplicant } from './circle.struct'
import { ServiceBase } from '@/src/api/service-base'

export class CircleManagerService extends ServiceBase {
  async getCircleApplicant () {
    const { data: { circle_request: circleRequests } } = await this.magician(
      () => this.r.get('/apply/'), {
        403: '권한이 없습니다.',
        404: () => []
      })

    return circleRequests.map(CircleApplicant)
  }

  async setApplierStatus (applyIdx, status) {
    await this.magician(
      () => this.r.post(`/status/${applyIdx}`, { status }), {
        403: '권한이 없습니다.',
        404: '존재하지 않습니다.',
        409: '이미 다른 동아리에 최종 결정을 한 지원자입니다.'
      })
  }
}

export class CircleRequestorService extends ServiceBase {
  async getCircles () {
    const { data: { circles } } =
      await this.magician(() => this.r.get('/'), {
        404: () => []
      })

    return circles.map(Circle)
  }

  async getAppliedCircle () {
    const { data: { circle_request: circleRequests } } =
      await this.magician(() => this.r.get('/apply/user'), {
        403: '신청 기간이 아닙니다.',
        404: () => []
      })

    return circleRequests.map(v => ({
      idx: v['idx'],
      circleIdx: v['circle_idx'],
      userIdx: v['user_idx'],
      status: v['status']
    }))
  }

  /**
   * @param {number} circleIdx
   * @param {string} introduce
   */
  async applyCircle (circleIdx, introduce) {
    await this.magician(
      () => this.r.put(`/apply/${circleIdx}`, { introduce }), {
        403: '동아리 신청 기간이 아닙니다.',
        404: '존재하지 않는 동아리입니다.',
        409: '동아리는 최대 3개까지만 지원할 수 있습니다.',
        423: '마감된 동아리입니다.'
      })
  }

  async cancelCircle (circleIdx) {
    await this.magician(() => this.r.delete(`/apply/${circleIdx}`), {
      403: '동아리 신청 기간이 아닙니다.',
      404: '존재하지 않는 동아리입니다.'
    })
  }

  async setFinal (applyIdx) {
    await this.magician(() => this.r.put(`/final/${applyIdx}`), {
      403: '실패했습니다.',
      404: '존재하지 않는 지원자입니다.',
      409: '이미 다른 동아리를 최종 결정하셨습니다.'
    })
  }
}
