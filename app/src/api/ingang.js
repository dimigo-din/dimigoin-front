import axios from './axios'
import magician from './magician'

/**
 * Warning
 * {
 *   "students": [
 *     {
 *       "idx": 0,
 *       "user_idx": 0,
 *       "serial": 0,
 *       "name": "박성민",
 *       "endDate": "2018-10-20T06:50:44.342Z",
 *       "totalCount": 3
 *     }
 *   ]
 * }
 */
export const warning = {
  /**
   * 현재 블랙리스트 명단인 학생들을 출력합니다.
   *
   * @returns {Promise<Array<Warning>>}
   */
  async getBlack () {
    const { students } = await magician(() => axios.get(`/ingangs/blacklist/`), {})
    return students
  },

  /**
   * 경고를 받은 모든 학생들을 출력합니다.
   *
   * @returns {Promise<Array<Warning>>}
   */
  async getAllWarning () {
    const { students } = await magician(() => axios.get(`/ingangs/warnings/`), {})
    return students
  },

  /**
   * 해당 학생의 경고를 확인합니다.
   *
   * @param idx
   * @returns {Promise<WarningLog>}
   */
  async getWarningLog (idx) {
    const log = await magician(() => axios.get(`/ingangs/users/${idx}/warnings`), {})
    return log
  },

  /**
   * 해당 학생의 모든 경고를 삭제합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async delAllWarning (idx) {
    await magician(() => axios.delete(`/ingangs/users/${idx}/warnings/`), {})
  },

  /**
   * 해당 학생의 경고를 추가합니다.
   * count는 누적됩니다.
   *
   * @param idx
   * @param warnReason
   * @returns {Promise<void>}
   */
  async postWarning (idx, warnReason) {
    await magician(() => axios.post(`/ingangs/users/${idx}/warnings/`, warnReason), {})
  },

  /**
   * 해당 학생의 특정 경고를 삭제합니다.
   *
   * @param idx
   * @param warningIdx
   * @returns {Promise<void>}
   */
  async delWarning (idx, warningIdx) {
    await magician(() => axios.delete(`/ingangs/users/${idx}/warings/${warningIdx}`), {})
  }
}

export const request = {
  /**
   * 관리자가 해당 학생이 신청한 인강실 목록을 출력합니다.
   *
   * @param idx
   * @returns {Promise<Ingang>}
   */
  async adminGetIngangRequestByStudent (idx) {
    const ingang = await magician(() => axios.get(`/ingangs/users/${idx}/requests/`), {
      404: () => []
    })
    return ingang
  },

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 합니다.
   *
   * @param idx
   * @param ingangIdx
   */
  async adminRequestIngangByStudent (idx, ingangIdx) {
    await magician(() => axios.post(`/ingangs/users/${idx}/request/${ingangIdx}`), {
      401: () => new Error('알맞지 않는 인강실이 아닙니다.'),
      403: () => new Error('모든 티켓을 사용했습니다.'),
      404: () => new Error('존재하지 않는 인강실 신청입니다.'),
      405: () => new Error('신청가능한 시간이 아닙니다.'),
      409: () => new Error('이미 신청을 했거나 인원이 꽉 찼습니다.'),
      451: () => new Error('블랙리스트입니다.')
    })
  },

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 취소합니다.
   *
   * @param idx
   * @param ingangIdx
   */
  async adminDeleteIngangRequestByStudent (idx, ingangIdx) {
    await magician(() => axios.delete(`/ingangs/users/${idx}/request/${ingangIdx}`), {
      401: () => new Error('알맞지 않는 인강실이 아닙니다.'),
      403: () => new Error('모든 티켓을 사용했습니다.'),
      404: () => new Error('존재하지 않는 인강실 신청입니다.')
    })
  },

  /**
   * 자신이 신청한 인강실 목록을 출력합니다.
   *
   * @returns {Promise<Ingang>}
   */
  async getIngangList () {
    const ingang = await magician(() => axios.get(`/ingangs/me/requests`), {
      404: () => []
    })
    const grade = ingang[0].target_grade
    const klass = ingang[0].class
    const today = new Date().getDay()

    const time = (today + klass) % 2
    return grade === 2 ? [ingang[time]] : ingang
  },

  /**
   * 자신이 해당 인강실을 신청합니다.
   *
   * @param ingangIdx
   * @returns {Promise<void>}
   */
  async requestIngang (ingangIdx) {
    await magician(() => axios.post(`/ingangs/me/requests/${ingangIdx}`), {
      401: () => new Error('알맞지 않는 인강실이 아닙니다.'),
      403: () => new Error('모든 티켓을 사용했습니다.'),
      404: () => new Error('존재하지 않는 인강실 신청입니다.'),
      405: () => new Error('신청가능한 시간이 아닙니다.'),
      409: () => new Error('이미 신청을 했거나 인원이 꽉 찼습니다.'),
      451: () => new Error('블랙리스트입니다.')
    })
  },

  /**
   * 자신이 해당 인강실 신청을 취소합니다.
   *
   * @param ingangIdx
   * @returns {Promise<void>}
   */
  async deleteIngangRequest (ingangIdx) {
    await magician(() => axios.delete(`/ingangs/me/requests/${ingangIdx}`), {
      401: () => new Error('알맞지 않는 인강실이 아닙니다.'),
      403: () => new Error('모든 티켓을 사용했습니다.'),
      404: () => new Error('존재하지 않는 인강실 신청입니다.')
    })
  },

  /**
   * 해당 학년의 인강실 신청자 목록을 출력합니다.
   *
   * @param grade
   * @returns {Promise<Array<ingang>>}
   */
  async getIngangRequestList (grade) {
    const { ingang } = await magician(() => axios.get(`/ingangs/grade/${grade}`), {
      404: () => []
    })
    return ingang
  },

  /**
   * 해당 시간의 인강실 신청자 목록을 출력합니다.
   *
   * @param grade
   * @param time
   * @returns {Promise<Array<ingang>>}
   */
  async getIngangRequestListByTime (grade, time) {
    const { ingang } = await magician(() => axios.get(`/ingangs/grade/${grade}/${time}`), {
      404: () => []
    })
    return ingang
  }
}

export const notice = {
  /**
   * 모든 공지사항을 출력합니다.
   *
   * @returns {Promise<Array<Notice>>}
   */
  async getAllNotice () {
    const { notice } = await magician(() => axios.get(`/ingangs/notices/`), {})
    return notice
  },

  /**
   * 공지사항을 추가합니다.
   *
   * @param notice
   */
  async postNotice (notice) {
    await magician(() => axios.post(`/ingangs/notices/`, notice), {})
  },

  /**
   * 해당 공지사항을 출력합니다.
   *
   * @param noticeIdx
   * @returns {Promise<Notice>}
   */
  async getNotice (noticeIdx) {
    const notice = await magician(() => axios.get(`/ingangs/notices/${noticeIdx}`), {})
    return notice
  },

  /**
   * 해당 공지사항을 삭제합니다.
   *
   * @param noticeIdx
   * @returns {Promise<void>}
   */
  async delNotice (noticeIdx) {
    await magician(() => axios.delete(`/ingangs/notices/${noticeIdx}`), {})
  },

  /**
   * 해당 공지사항을 수정합니다.
   *
   * @param noticeIdx
   * @param notice
   * @returns {Promise<void>}
   */
  async putNotice (noticeIdx, notice) {
    await magician(() => axios.put(`/ingangs/notices/${noticeIdx}`, notice), {})
  },

  /**
   * 최근의 공지사항을 출력합니다.
   *
   * @returns {Promise<notice>}
   */
  async getLatestNotice () {
    const notice = await magician(() => axios.get(`/ingangs/notices/latest`), {})
    return notice
  }
}
