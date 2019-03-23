import ValidationError from '@/src/errors/validation-error'
import { ServiceBase } from '@/src/api/service-base'
import { Ingang, CreateIngangInput, Announcement } from './ingang.struct'

function tempValidation (ingang) {
  const keys = ['target_grade', 'day', 'time', 'request_start_date', 'request_end_date', 'date', '1_max_user', '2_max_user', '3_max_user', '4_max_user', '5_max_user', '6_max_user']
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
   * 자신이 해당 인강실을 신청합니다.
   *
   * @param idx
   */
  async applyIngang (idx) {
    await this.magician(() => this.r.post(`/`, idx), {
      401: '알맞지 않은 인강실 신청입니다.',
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
    await this.magician(() => this.r.delete(`/`, idx), {
      401: '알맞지 않은 인강실 신청입니다.',
      403: '신청 기간이 아니거나 모든 티켓을 사용하였습니다.',
      404: '존재하지 않는 인강실 신청입니다.'
    })
  }
}

export class IngangManagerService extends IngangService {
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
    await this.magician(() => this.r.post(`/admin`, idx), {
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
}
