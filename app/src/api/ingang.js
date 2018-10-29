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
  async AdminGetIngang (idx) {
    const ingang = await magician(() => axios.get(`/ingangs/users/${idx}/requests/`), {})
    return ingang
  },

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 합니다.
   *
   * @param idx
   * @param ingangIdx
   */
  async AdminPostIngang (idx, ingangIdx) {
    await magician(() => axios.post(`/ingangs/users/${idx}/request/${ingangIdx}`), {})
  },

  /**
   * 관리자가 해당 학생의 해당 인강실 신청을 취소합니다.
   *
   * @param idx
   * @param ingangIdx
   */
  async AdminDelIngang (idx, ingangIdx) {
    await magician(() => axios.delete(`/ingangs/users/${idx}/request/${ingangIdx}`), {})
  },

  /**
   * 자신이 신청한 인강실 목록을 출력합니다.
   *
   * @returns {Promise<Ingang>}
   */
  async getIngang () {
    const ingang = await magician(() => axios.get(`/ingangs/me/requests/`), {})
    return ingang
  },

  /**
   * 자신이 해당 인강실을 신청합니다.
   *
   * @param ingangIdx
   * @returns {Promise<void>}
   */
  async postIngang (ingangIdx) {
    await magician(() => axios.post(`/ingangs/me/requests/${ingangIdx}`), {})
  },

  /**
   * 자신이 해당 인강실 신청을 취소합니다.
   *
   * @param ingangIdx
   * @returns {Promise<void>}
   */
  async delIngang (ingangIdx) {
    await magician(() => axios.delete(`/ingangs/me/requests/${ingangIdx}`), {})
  },

  /**
   * 해당 학년의 인강실 신청자 목록을 출력합니다.
   *
   * @param grade
   * @returns {Promise<Array<ingang>>}
   */
  async getGradeIngang (grade) {
    const { ingang } = await magician(() => axios.get(`/ingangs/grade/${grade}`), {})
    return ingang
  },

  /**
   * 해당 시간의 인강실 신청자 목록을 출력합니다.
   *
   * @param grade
   * @param time
   * @returns {Promise<Array<ingang>>}
   */
  async getGradeTimeIngang (grade, time) {
    const { ingang } = await magician(() => axios.get(`/ingangs/grade/${grade}/${time}`), {})
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
