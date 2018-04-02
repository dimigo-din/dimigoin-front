import axios from './axios'
import magician from './magician'
import { Assignment } from '../struct/assignment'

/**
 *  관리자 이상의 권한을 요구하는 요청입니다.
 */
export const admin = {
  /**
   * 모든 과제를 출력합니다.
   *
   * @returns {Promise<Array<Assignment>>}
   */
  async getAssignmentList () {
    const { assignments } = await magician(() => axios.get('/assignments/'), {
      default: () => new Error('알 수 없는 오류가 발생했으니 잠시 후 다시 시도해주세요.')
    })

    return assignments.map(Assignment)
  },

  /**
   * 과제를 추가합니다. 과제 제출자는 JWT token기준으로 작성됩니다.
   * description 필드는 작성을 하지 않아도 되지만 나머지 필드는 작성을 필수로 합니다.
   *
   * @param assignment
   * @returns {Promise<void>}
   */
  async createAssignment (assignment) {
    await magician(() => axios.post('/assignments/', assignment), {
      default: () => new Error('과제를 추가하던 중 문제가 발생했습니다.')
    })
  },

  /**
   * 특정 과제를 가져옵니다.
   *
   * @param idx
   * @returns {Promise<Assignment>}
   */
  async getAssignment (idx) {
    const assignment = await magician(() => axios.get(`/assignments/${idx}`), {
      404: () => new Error('과제를 찾을 수 없습니다.')
    })

    return Assignment(assignment)
  },

  /**
   * 선택한 과제를 삭제합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async deleteAssignment (idx) {
    await magician(() => axios.delete(`/assignments/${idx}`), {
      404: () => new Error('과제를 찾을 수 없습니다.')
    })
  },

  /**
   * 선택한 과제의 정보를 수정합니다.
   *
   * @param idx
   * @param assignment
   * @returns {Promise<void>}
   */
  async editAssignment (idx, assignment) {
    await magician(() => axios.put(`/assignments/${idx}`, assignment), {
      404: () => new Error('과제를 찾을 수 없습니다.')
    })
  }
}

/**
 * 과제 할당자(제출자)와 관련된 함수들입니다.
 */
export const assignee = {
  /**
   * 할당된 과제 목록을 출력합니다.
   *
   * @returns {Promise<Array<Assignment>>}
   */
  async getAssignmentList () {
    const { assignments } = await magician(() => axios.get('/assignments/assignee'))

    return assignments.map(Assignment)
  },

  /**
   * 자신에게 할당된 특정 과제를 출력합니다.
   *
   * @param idx
   * @returns {Promise<Assignment>}
   */
  async getAssignment (idx) {
    const assignment = await magician(() => axios.get(`/assignments/assignee/${idx}`))

    return Assignment(assignment)
  },

  /**
   * 과제를 제출합니다.
   *
   * @param idx
   * @param file
   * @returns {Promise<void>}
   */
  async submitAssignment (idx, file) {
    const formData = new FormData()
    formData.append('file', file)

    await magician(() => axios.post(`/assignments/${idx}/reports`, formData), {
      400: new Error('파일을 찾을 수 없습니다. 다시 확인해주세요.'),
      403: new Error('제출된 파일에 문제가 있습니다. 허가되지 않은 파일을 업로드하지 않았는지' +
        ' 확인해주세요.'),
      405: new Error('이미 과제를 제출했습니다.'),
      406: new Error('할당받은 과제가 아닙니다.'),
      412: new Error('제출 기한이 마감되었습니다.')
    })
  },

  /**
   * 제출한 과제를 수정합니다.
   * @param idx
   * @param file
   * @returns {Promise<void>}
   */
  async editAssignment (idx, file) {
    const formData = new FormData()
    formData.append('file', file)

    await magician(() => axios.put(`/assignments/${idx}/reports`, formData), {
      400: new Error('파일을 찾을 수 없습니다. 다시 확인해주세요.'),
      403: new Error('제출된 파일에 문제가 있습니다. 허가되지 않은 파일을 업로드하지 않았는지' +
        ' 확인해주세요.'),
      405: new Error('이미 과제를 제출했습니다.'),
      406: new Error('할당받은 과제가 아닙니다.'),
      412: new Error('제출 기한이 마감되었습니다.')
    })
  }
}

/**
 * 과제 발행자(생성자)와 관련된 함수들입니다.
 */
export const assignor = {
  /**
   * 자신이 발행한 과제 목록을 가져옵니다.
   *
   * @returns {Promise<Array<Assignment>>}
   */
  async getAssignmentList () {
    const { assignment } = await magician(() => axios.get('/assignments/assignor'))

    return assignment.map(Assignment)
  },

  /**
   * 자신이 발행한 특정 과제를 가져옵니다.
   *
   * @param idx
   * @returns {Promise<Assignment>}
   */
  async getAssignment (idx) {
    const assignment = await magician(() => axios.get(`/assignments/assignor/${idx}`), {
      403: new Error('과제에 접근할 권한이 없습니다.'),
      404: new Error('과제를 찾을 수 없습니다.')
    })

    return Assignment(assignment)
  },

  /**
   * 자신이 발행한 특정 과제를 삭제합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async deleteAssignment (idx) {
    await magician(() => axios.delete(`/assignments/assignor/${idx}`), {
      404: () => new Error('과제를 찾을 수 없습니다.')
    })
  },

  /**
   * 자신이 발행한 특정 과제의 정보를 수정합니다.
   *
   * @param idx
   * @param assignment
   * @returns {Promise<void>}
   */
  async editAssignment (idx, assignment) {
    await magician(() => axios.put(`/assignments/assignor/${idx}`, assignment), {
      404: () => new Error('과제를 찾을 수 없습니다.')
    })
  },

  /**
   * 과제에 해당하는 제출물들을 압축해 파일로 출력합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async getResult (idx) {
    const data = await magician(() => axios.get(`/assignments/${idx}/reports`, {
      responseType: 'blob'
    }), {
      403: new Error('존재하지 않거나 접근할 수 없는 과제입니다.')
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.click()
  }
}
