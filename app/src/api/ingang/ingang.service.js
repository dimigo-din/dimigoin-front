import { ServiceBase } from '@/src/api/service-base'

class IngangService extends ServiceBase {
  /**
   * 공지사항을 반환합니다.
   *
   * @returns {Object}
   */
  async getAnnouncement () {
    // TODO
    return {}
  }
}

export class IngangRequestorService extends IngangService {
  /**
   * 신청가능한 인강실 목록을 반환합니다.
   *
   * @returns {Object}
   */
  async getIngangs () {
    // TODO
    return { ingangs: [], ticket: 3 }
  }

  /**
   * 자신이 해당 인강실을 신청합니다.
   *
   * @param ingangIdx
   */
  async applyIngang (ingangIdx) {
    // TODO
    return new Promise(resolve => {
      setTimeout(resolve, 1500)
    })
  }

  /**
   * 자신이 해당 인강실 신청을 취소합니다.
   *
   * @param ingangIdx
   */
  async cancelIngang (ingangIdx) {
    // TODO
    return new Promise(resolve => {
      setTimeout(resolve, 1500)
    })
  }
}

export class IngangManagerService extends IngangService {
  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 합니다.
   *
   * @param {number} studentIdx
   * @param {number} ingangIdx
   */
  async applyIngang (studentIdx, ingangIdx) {
    // TODO
  }

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 취소합니다.
   *
   * @param studentIdx
   * @param ingangIdx
   */
  async cancelIngang (studentIdx, ingangIdx) {
    // TODO
  }

  /**
   * 해당 인강실 정보를 반환합니다.
   *
   * @param {number} idx
   * @returns {Array<Object>}
   */
  async getIngang (idx) {
    // TODO
    return {}
  }

  /**
   * 공지사항을 추가합니다.
   *
   * @param {Object} notice
   */
  async addAnnouncement (notice) {
    // TODO
  }

  /**
   * 해당 공지사항을 삭제합니다.
   *
   * @param {number} idx
   */
  async deleteAnnouncement (idx) {
    // TODO
  }

  /**
   * 해당 공지사항을 수정합니다.
   *
   * @param {number} idx
   * @param {Object} notice
   */
  async editAnnouncement (idx, notice) {
    // TODO
  }

  async getExcel (grade) {
    const { data } = await this.magician(() => this.r.get(`/excel/${grade}`, {
      responseType: 'blob'
    }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', 'ingang-' + grade + '학년.xls')
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
    }, 500)
  }
}
