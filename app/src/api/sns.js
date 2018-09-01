import axios from './axios'
import magician from './magician'

export const page = {
  /**
   * SNS 페이지를 개설합니다.
   *
   * @param snspage
   * @returns {Promise<void>}
   */
  async postSnsPage (snspage) {
    await magician(() => axios.post(`/snspages/`, snspage), {
      default: () => new Error('Error by postSnspage')
    })
  },

  /**
   * 모든 SNS 페이지를 출력합니다.
   *
   * @returns {Promise<Array<snspage>>}
   */
  async getAllSnspage () {
    const { snspages } = await magician(() => axios.get(`/snspages/`), {
      default: () => new Error('Error by getAllSnspage')
    })
    return snspages
  },

  /**
   * 관리자 이상의 권한을 요구하는 요청입니다.
   * SNS 페이지를 수정합니다.
   *
   * @param idx
   * @param snspages
   * @returns {Promise<void>}
   */
  async putAdminSnspage (idx, snspage) {
    magician(() => axios.put(`/snspages/admin/${idx}`, snspage), {
      default: () => new Error('Error by putAdminSnspage')
    })
  },

  /**
   * 관리자 이상의 권한을 요구하는 요청입니다.
   * SNS 페이지를 삭제합니다
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async delAdminSnspage (idx) {
    magician(() => axios.delete(`/snspages/admin/${idx}`), {
      404: () => new Error('존재하지 않는 SNS 페이지입니다.'),
      default: () => new Error('Error by delAdminSnspage')
    })
  },

  /**
   * 해당 학년의 SNS 페이지를 출력합니다.
   *
   * @param grade
   * @returns {Promise<Array<snspage>>}
   */
  async getGradeSnspage (grade) {
    magician(() => axios.get(`/snspages/grade/${grade}`), {
      default: () => new Error('Error by getGradeSnspage')
    })
  },

  /**
   * 개설한 SNS 페이지를 출력합니다
   *
   * @returns {Promise<Array<snspage>>}
   */
  async getMySnspage () {
    magician(() => axios.get(`/snspages/mypage/`), {
      default: () => new Error('Error by getMySnspage')
    })
  }

  /**
   * 프로필 이미지를 등록합니다.
   *
   * @param idx
   * @param image
   * @returns {Promise<void>}
   */
}
