import ValidationError from '@/src/errors/validation-error'
import { ServiceBase } from '@/src/api/service-base'
import { Application, CreateApplication, EditApplication } from './etcs.struct'

function tempValidation (application) {
  const keys = [
    'name', 'request_start_date', 'request_end_date', 'description'
  ]
  const missingArguments = keys.filter(key => !application[key])
  if (missingArguments.length > 0) {
    throw new ValidationError('학년 선택과 소개작성 필요 여부 입력란을 제외한 모든 입력란을 채워주세요.', missingArguments)
  }
}

export class EtcRequestService extends ServiceBase {
  /**
   * 자신의 신청 가능한 신청목록을 불러옵니다.
   */
  async getApplications () {
    const { data: { applications } } = await this.magician(() => this.r.get('/applications'))
    return applications.map(Application)
  }

  /**
   * 자신이 기타 신청을 신청합니다.
   */
  async applyApplication (idx) {
    await this.magician(() => this.r.post('/request', idx), {})
  }

  /**
   * 자신이 기타 신청 소개를 수정합니다.
   */
  async editApplicationIntroduce (idx) {
    await this.magician(() => this.r.put(`/request/${idx}`), {
      403: '본인이 아닙니다.',
      404: '존재하지 않는 신청입니다.'
    })
  }

  /**
   * 자신이 기타 신청을 취소합니다.
   */
  async cancelApplication (idx) {
    await this.magician(() => this.r.delete(`request/${idx}`), {
      403: '본인이 아닙니다.',
      404: '존재하지 않는 신청입니다.'
    })
  }
}

export class EtcManagerService extends ServiceBase {
  /**
   * 모든 기타 신청을 반환힙니다.
   */
  async getAllApplications () {
    const { data: { applications } } = await this.magician(() => this.r.get(`/applications/admin`))
    return applications.map(Application)
  }

  /**
   * 기타 신청을 추가합니다.
   */
  async createApplication (application) {
    application = CreateApplication(application)
    tempValidation(application)
    await this.magician(() => this.r.post('/application/admin', application), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 기타 신청을 수정합니다.
   */
  async editApplication (idx, application) {
    application = EditApplication(application)
    await this.magician(() => this.r.put(`/application/${idx}/admin`, application), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 기타 신청을 삭제합니다.
   */
  async deleteApplication (idx) {
    await this.magician(() => this.r.delete(`/application/${idx}/admin`), {
      403: '권한이 없습니다.'
    })
  }
}
