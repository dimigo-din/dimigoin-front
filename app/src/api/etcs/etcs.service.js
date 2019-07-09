import ValidationError from '@/src/errors/validation-error'
import { ServiceBase } from '@/src/api/service-base'
import { Application, CreateApplicationInput, EditApplicationInput } from './etcs.struct'

function tempValidation (application) {
  const keys = [
    'title', 'request_end_date', 'description'
  ]
  const missingArguments = keys.filter(key => !application[key])
  if (missingArguments.length > 0) {
    throw new ValidationError('다시 한번 확인해주세요.', missingArguments)
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
    await this.magician(() => this.r.post(`/requests/application/${idx}`), {
      403: '본인 학년이 아닙니다.',
      404: '존재하지 않는 신청입니다.',
      405: '마감 기한이 지난 신청입니다.'
    })
  }

  /**
   * 자신이 기타 신청을 취소합니다.
   */
  async cancelApplication (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
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
    application = CreateApplicationInput(application)
    tempValidation(application)
    await this.magician(() => this.r.post('/application/admin', application), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 기타 신청을 수정합니다.
   */
  async editApplication (idx, application) {
    application = EditApplicationInput(application)
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

  /**
   * 각 신청의 엑셀 파일을 다운로드합니다.
   */
  async downloadExcel (idx, title) {
    const { data } = await this.magician(() => this.r.get(`/requests/application/${idx}/excel`, {
      responseType: 'blob'
    }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', `${title} 신청현황 ${new Date().toISOString().substring(0, 10)}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
