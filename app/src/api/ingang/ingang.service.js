import { ServiceBase } from '@/src/api/service-base'

class IngangService extends ServiceBase {
  /**
   * 모든 공지사항을 출력합니다.
   *
   * @returns {Promise<Array<Notice>>}
   */
  async getAllNotice () {
    const { data: { notice } } = await this.magician(() => this.r.get('/notices/'), {})
    return notice
  }

  /**
   * 해당 공지사항을 출력합니다.
   *
   * @param noticeIdx
   * @returns {Promise<Notice>}
   */
  async getNotice (noticeIdx) {
    const { data: notice } = await this.magician(() => this.r.get(`/notices/${noticeIdx}`), {})
    return notice
  }

  /**
   * 최근의 공지사항을 출력합니다.
   *
   * @returns {Promise<notice>}
   */
  async getLatestNotice () {
    const { data: notice } = await this.magician(() => this.r.get('/notices/latest'), {})
    return notice
  }
}

export class IngangRequestorService extends IngangService {
  /**
   * 자신이 신청한 인강실 목록을 출력합니다.
   *
   * @returns {Promise<Ingang>}
   */
  async getIngangList () {
    const ingang = await this.magician(() => this.r.get('/me/requests'), {
      404: () => []
    })
    const grade = ingang[0].target_grade
    const klass = ingang[0].class
    const today = new Date().getDay()

    const time = (today + klass) % 2
    return grade === 2 ? [ingang[time]] : ingang
  }

  /**
   * 자신이 해당 인강실을 신청합니다.
   *
   * @param ingangIdx
   * @returns {Promise<void>}
   */
  async requestIngang (ingangIdx) {
    await this.magician(() => this.r.post(`/me/requests/${ingangIdx}`), {
      401: '알맞지 않는 인강실이 아닙니다.',
      403: '모든 티켓을 사용했습니다.',
      404: '존재하지 않는 인강실 신청입니다.',
      405: '신청가능한 시간이 아닙니다.',
      409: '이미 신청을 했거나 인원이 꽉 찼습니다.',
      451: '블랙리스트입니다.'
    })
  }

  /**
   * 자신이 해당 인강실 신청을 취소합니다.
   *
   * @param ingangIdx
   * @returns {Promise<void>}
   */
  async deleteIngangRequest (ingangIdx) {
    await this.magician(() => this.r.delete(`/me/requests/${ingangIdx}`), {
      401: '알맞지 않는 인강실이 아닙니다.',
      403: '모든 티켓을 사용했습니다.',
      404: '존재하지 않는 인강실 신청입니다.'
    })
  }
}

export class IngangManagerService extends IngangService {
  /**
   * 현재 블랙리스트 명단인 학생들을 출력합니다.
   *
   * @returns {Promise<Array<Warning>>}
   */
  async getBlack () {
    const { data: { students } } = await this.magician(() => this.r.get('/blacklist/'), {})
    return students
  }

  /**
   * 경고를 받은 모든 학생들을 출력합니다.
   *
   * @returns {Promise<Array<Warning>>}
   */
  async getAllWarning () {
    const { data: { students } } = await this.magician(() => this.r.get('/warnings/'), {})
    return students
  }

  /**
   * 해당 학생의 경고를 확인합니다.
   *
   * @param idx
   * @returns {Promise<WarningLog>}
   */
  async getWarningLog (idx) {
    const { data: log } = await this.magician(() => this.r.get(`/users/${idx}/warnings`), {})
    return log
  }

  /**
   * 해당 학생의 모든 경고를 삭제합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async delAllWarning (idx) {
    await this.magician(() => this.r.delete(`/users/${idx}/warnings/`), {})
  }

  /**
   * 해당 학생의 경고를 추가합니다.
   * count는 누적됩니다.
   *
   * @param idx
   * @param warnReason
   * @returns {Promise<void>}
   */
  async postWarning (idx, warnReason) {
    await this.magician(() => this.r.post(`/users/${idx}/warnings/`, warnReason), {})
  }

  /**
   * 해당 학생의 특정 경고를 삭제합니다.
   *
   * @param idx
   * @param warningIdx
   * @returns {Promise<void>}
   */
  async delWarning (idx, warningIdx) {
    await this.magician(() => this.r.delete(`/users/${idx}/warings/${warningIdx}`), {})
  }

  /**
   * 관리자가 해당 학생이 신청한 인강실 목록을 출력합니다.
   *
   * @param idx
   * @returns {Promise<Ingang>}
   */
  async getIngangRequestByStudent (idx) {
    const { data: ingang } = await this.magician(() => this.r.get(`/users/${idx}/requests/`), {
      404: () => []
    })
    return ingang
  }

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 합니다.
   *
   * @param studentIdx
   * @param ingangIdx
   */
  async requestIngang (studentIdx, ingangIdx) {
    await this.magician(() => this.r.post(`/users/${studentIdx}/request/${ingangIdx}`), {
      401: '잘못된 인강실입니다.',
      403: '모든 티켓을 사용했습니다.',
      404: '존재하지 않는 인강실입니다.',
      405: '신청가능한 시간이 아닙니다.',
      409: '이미 신청을 했거나 인원이 꽉 찼습니다.',
      451: '블랙리스트입니다.'
    })
  }

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 취소합니다.
   *
   * @param studentIdx
   * @param ingangIdx
   */
  async deleteIngagnRequest (studentIdx, ingangIdx) {
    await this.magician(() => this.r.delete(`/users/${studentIdx}/request/${ingangIdx}`), {
      401: '잘못된 인강실입니다.',
      403: '모든 티켓을 사용했습니다.',
      404: '존재하지 않는 인강실입니다.'
    })
  }

  /**
   * 해당 학년의 인강실 신청자 목록을 출력합니다.
   *
   * @param grade
   * @returns {Promise<Array<ingang>>}
   */
  async getIngangRequestsByGrade (grade) {
    const { data: { ingang } } = await this.magician(() => this.r.get(`/grade/${grade}`), {
      404: () => []
    })
    return ingang
  }

  /**
   * 해당 시간의 인강실 신청자 목록을 출력합니다.
   *
   * @param grade
   * @param time
   * @returns {Promise<Array<ingang>>}
   */
  async getIngangRequestsByTime (grade, time) {
    const { data: { ingang } } = await this.magician(() => this.r.get(`/grade/${grade}/${time}`), {
      404: () => []
    })
    return ingang
  }

  /**
   * 공지사항을 추가합니다.
   *
   * @param notice
   */
  async postNotice (notice) {
    await this.magician(() => this.r.post('/notices/', notice), {})
  }

  /**
   * 해당 공지사항을 삭제합니다.
   *
   * @param noticeIdx
   * @returns {Promise<void>}
   */
  async delNotice (noticeIdx) {
    await this.magician(() => this.r.delete(`/notices/${noticeIdx}`), {})
  }

  /**
   * 해당 공지사항을 수정합니다.
   *
   * @param noticeIdx
   * @param notice
   * @returns {Promise<void>}
   */
  async putNotice (noticeIdx, notice) {
    await this.magician(() => this.r.put(`/notices/${noticeIdx}`, notice), {})
  }
}
