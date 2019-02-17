import { ServiceBase } from '@/src/api/service-base'

export class AssignmentManagerService extends ServiceBase {
  /**
   * 모든 과제를 출력합니다.
   *
   * @returns {Object}
   */
  async getAssignmentList () {
    const { data: { assignments } } = await this.magician(() => this.s.get('/'), {
      403: '권한이 없습니다'
    })

    return assignments
  }

  /**
   * 과제를 추가합니다. 과제 제출자는 JWT token기준으로 작성됩니다.
   * description 필드는 작성을 하지 않아도 되지만 나머지 필드는 작성을 필수로 합니다.
   *
   * @param {Object} assignment
   */
  async createAssignment (assignment) {
    await this.magician(() => this.s.post('/', assignment), {
      403: '권한이 없습니다',
      default: '과제를 추가하던 중 문제가 발생했습니다.'
    })
  }

  /**
   * 특정 과제를 가져옵니다.
   *
   * @param {number} idx
   * @returns {Object}
   */
  async getAssignment (idx) {
    const { data: assignment } = await this.magician(() => this.s.get(`/${idx}`), {
      403: '권한이 없습니다',
      404: '과제를 찾을 수 없습니다.'
    })

    return assignment
  }

  /**
   * 선택한 과제를 삭제합니다.
   *
   * @param {number} idx
   */
  async deleteAssignment (idx) {
    await this.magician(() => this.s.delete(`/${idx}`), {
      403: '권한이 없습니다',
      404: '과제를 찾을 수 없습니다.'
    })
  }

  /**
   * 선택한 과제의 정보를 수정합니다.
   *
   * @param {number} idx
   * @param {Object} assignment
   */
  async editAssignment (idx, assignment) {
    await this.magician(() => this.s.put(`/${idx}`, assignment), {
      403: '권한이 없습니다',
      404: '과제를 찾을 수 없습니다.'
    })
  }
}

export class AssignmentSubscriberService extends ServiceBase {
  /**
   * 할당된 과제 목록을 출력합니다.
   *
   * @returns {Object[]}
   */
  async getAssignmentList () {
    const { data: { assignments } } = await this.magician(() => this.r.get('/assignee'))

    return assignments
  }

  /**
   * 자신에게 할당된 특정 과제를 출력합니다.
   *
   * @param {number} idx
   * @returns {Object}
   */
  async getAssignment (idx) {
    const { data: assignment } = await this.magician(() => this.r.get(`/assignee/${idx}`))

    return assignment
  }

  /**
   * 과제를 제출합니다.
   *
   * @param {number} idx
   * @param {File} file
   * @param {function(ProgressEvent)} onUploadProgress
   */
  async submitAssignment (idx, file, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)

    await this.magician(() => this.r.post(`/${idx}/reports`, formData, { onUploadProgress }), {
      400: '파일을 찾을 수 없습니다. 다시 확인해주세요.',
      403: '제출된 파일에 문제가 있습니다. 허가되지 않은 파일을 업로드하지 않았는지 확인해주세요.',
      405: '이미 과제를 제출했습니다.',
      406: '할당받은 과제가 아닙니다.',
      412: '제출 기한이 마감되었습니다.'
    })
  }

  /**
   * 제출한 과제를 수정합니다.
   * @param {number} idx
   * @param {File} file
   * @param {function(ProgressEvent)} onUploadProgress
   */
  async editAssignment (idx, file, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)

    await this.magician(() => this.r.put(`/${idx}/reports`, formData, { onUploadProgress }), {
      400: '파일을 찾을 수 없습니다. 다시 확인해주세요.',
      403: '제출된 파일에 문제가 있습니다. 허가되지 않은 파일을 업로드하지 않았는지' +
        ' 확인해주세요.',
      405: '이미 과제를 제출했습니다.',
      406: '할당받은 과제가 아닙니다.',
      412: '제출 기한이 마감되었습니다.'
    })
  }
}

export class AssignmentPublisherService extends ServiceBase {
  /**
   * 과제를 추가합니다. 과제 제출자는 JWT token기준으로 작성됩니다.
   * description 필드는 작성을 하지 않아도 되지만 나머지 필드는 작성을 필수로 합니다.
   *
   * @param {Object} assignment
   */
  async createAssignment (assignment) {
    await this.magician(() => this.r.post('/', assignment), {
      403: '권한이 없습니다',
      default: '과제를 추가하던 중 문제가 발생했습니다.'
    })
  }

  /**
   * 자신이 발행한 과제 목록을 가져옵니다.
   *
   * @returns {Object[]}
   */
  async getAssignmentList () {
    const { data: { assignments } } = await this.magician(() => this.r.get('/assignor'))

    return assignments
  }

  /**
   * 자신이 발행한 특정 과제를 가져옵니다.
   *
   * @param {number} idx
   * @returns {Object}
   */
  async getAssignment (idx) {
    const { data: assignment } = await this.magician(() => this.r.get(`/assignor/${idx}`), {
      403: '과제에 접근할 권한이 없습니다.',
      404: '과제를 찾을 수 없습니다.'
    })

    return assignment
  }

  /**
   * 자신이 발행한 특정 과제를 삭제합니다.
   *
   * @param {number} idx
   */
  async deleteAssignment (idx) {
    await this.magician(() => this.r.delete(`/assignor/${idx}`), {
      403: '과제에 접근할 권한이 없습니다.',
      404: '과제를 찾을 수 없습니다.'
    })
  }

  /**
   * 자신이 발행한 특정 과제의 정보를 수정합니다.
   *
   * @param {number} idx
   * @param {Object} assignment
   */
  async editAssignment (idx, assignment) {
    await this.magician(() => this.r.put(`/assignor/${idx}`, assignment), {
      403: '과제에 접근할 권한이 없습니다.',
      404: '과제를 찾을 수 없습니다.'
    })
  }

  /**
   * 과제에 해당하는 제출물들을 압축해 파일로 출력합니다.
   *
   * @param {number} idx
   */
  async getResult (idx) {
    const { data } = await this.magician(() => this.r.get(`/${idx}/reports`, {
      responseType: 'blob'
    }), {
      403: '존재하지 않거나 접근할 수 없는 과제입니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', 'assignment.zip')
    document.body.appendChild(link)
    link.click()
  }
}
