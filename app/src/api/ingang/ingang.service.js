import ValidationError from '@/src/errors/validation-error'
import { ServiceBase } from '@/src/api/service-base'

import { format } from 'date-fns'
import { Ingang, Status, CreateIngangInput, IngangApplier, Announcement } from './ingang.struct'

function tempValidation (ingang) {
  const keys = [
    'target_grade', 'day', 'time', 'date',
    'request_start_date', 'request_end_date',
    '1_max_user', '2_max_user', '3_max_user', '4_max_user', '5_max_user', '6_max_user'
  ]
  const missingArguments = keys.filter(key => !ingang[key])
  if (missingArguments.length > 0) {
    throw new ValidationError('모든 입력란을 채워주세요.', missingArguments)
  }
}

class IngangService extends ServiceBase {
  /**
   * 공지사항을 반환합니다.
   *
   * @returns {Object}
   */
  async getAnnouncement () {
    const { data: notice } = await this.magician(() => this.r.get(`/notice`), {})
    return Announcement(notice)
  }
}

export class IngangRequestorService extends IngangService {
  /**
   * 자신이 신청가능한 인강실 목록을 반환합니다.
   *
   * @returns {Object}
   */
  async getIngangs () {
    const { data: { ingangs } } = await this.magician(() => this.r.get(`/`))
    return ingangs.map(Ingang)
  }

  /**
   * 학년, 반을 받아 해당 반 인강실 신청자 목록을 가져옵니다.
   * @returns {Object}
   */
  async getIngangAppliersByClass (grade, klass) {
    const { data: { users } } = await this.magician(() => this.r.get(`/users/grade/${grade}/klass/${klass}`), {
      403: '권한이 없습니다.',
      404: '해당 반의 신청자가 없습니다.'
    })
    return users.map(IngangApplier)
  }

  /**
   * 자신의 반 인강실 신청자 목록을 가져옵니다.
   * @returns {Object}
   */
  async getIngangAppliersInMyClass () {
    const { data: { users } } = await this.magician(() => this.r.get('/users/myklass'), {
      403: '권한이 없습니다.',
      404: '해당 반의 신청자가 없습니다.'
    })
    return users.map(IngangApplier)
  }

  /**
   * 자신의 신청 현황을 반환합니다.
   *
   * @returns {Promise<{daily_request_count, weekly_ticket_num, daily_ticket_num, weekly_request_count}>}
   */
  async getStatus () {
    const { data: status } = await this.magician(() => this.r.get(`/status`), {})
    return Status(status)
  }

  /**
   * 자신이 해당 인강실을 신청합니다.
   *
   * @param idx
   */
  async applyIngang (idx) {
    await this.magician(() => this.r.post(`/${idx}`), {
      403: '모든 티켓을 사용했습니다.',
      404: '존재하지 않는 인강실 신청입니다.',
      405: '신청 기간이 아닙니다.',
      409: '이미 신청을 완료했거나 인원이 꽉 찼습니다.'
    })
  }

  /**
   * 자신이 해당 인강실 신청을 취소합니다.
   *
   * @param idx
   */
  async cancelIngang (idx) {
    await this.magician(() => this.r.delete(`/${idx}`), {
      403: '모든 티켓을 사용했습니다.',
      404: '존재하지 않는 인강실 신청입니다.',
      405: '취소 기한이 지났습니다.'
    })
  }
}

export class IngangManagerService extends IngangService {
  /**
   * 모든 인강실을 반환합니다.
   */
  async getIngangs () {
    const { data: { ingangs } } = await this.magician(() => this.r.get(`/admin`), {})
    return ingangs.map(Ingang)
  }

  async getIngangAppliers () {
    const { data: { users } } = await this.magician(() => this.r.get('/users'))
    return users.map(IngangApplier)
  }

  /**
   * 인강실을 추가합니다.
   *
   * @return {ingang}
   */
  async createIngang (ingang) {
    ingang = CreateIngangInput(ingang)
    tempValidation(ingang)
    await this.magician(() => this.r.post(`/admin`, ingang), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 인강실을 삭제합니다.
   *
   * @param idx
   */
  async deleteIngang (idx) {
    await this.magician(() => this.r.delete(`/admin/${idx}`), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 공지사항을 추가합니다.
   *
   * @param {Object} notice
   */
  async addAnnouncement (notice) {
    await this.magician(() => this.r.post(`/notice`, notice), {
      403: '권한이 없습니다.'
    })
  }

  async downloadExcel (grade) {
    const { data } = await this.magician(() => this.r.get(`/excel/${grade}`, {
      responseType: 'blob'
    }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', `${grade}학년 ${format(new Date(), 'YYYY')}년 ${format(new Date(), 'MM')}월 ${format(new Date(), 'DD')}일 인강실.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
