import { ServiceBase } from '@/src/api/service-base'
import { Mentoring, Notice, CreateMentoringInput,
  EditMentoringInput, CreateNoticeInput,
  BlackUser, CreateBlackUser } from './mentoring.struct'

export class MentoringService extends ServiceBase {
  /**
   * 최신 공지사항을 가져옵니다.
   *
   * @returns {Notice}
   */
  async getNotice () {
    const { data: notice } = await this.magician(() => this.r.get('/notice'), {})
    return Notice(notice)
  }
}

export class MentoringRequestorService extends MentoringService {
  /**
   * 학생이 신청할 수 있는 멘토링 목록을 가져옵니다.
   */
  async getStudentMentoring () {
    const { data: { mentors } } = await this.magician(() => this.r.get('/request'), {
      404: () => []
    })
    return mentors.map(Mentoring)
  }

  /**
   * 멘토링을 신청합니다.
   *
   * @param idx
   */
  async applyMentoring (idx) {
    await this.magician(() => this.r.post(`/request/${idx}`), {
      403: '본인 학년/반 멘토링이 아니거나, 일주일치 신청을 모두 했습니다.',
      404: '멘토링 신청이 없습니다.',
      405: '신청 시간이 아닙니다.',
      409: '이미 신청을 했거나 인원이 꽉 찼습니다.'
    })
  }

  /**
   * 멘토링 신청을 취소합니다.
   *
   * @param idx
   */
  async cancelMentoring (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
      403: '신청 시간이 아닙니다.',
      404: '존재하지 않는 멘토링 신청입니다.'
    })
  }
}

export class MentoringManagerService extends MentoringService {
  /**
   * 공지사항을 추가합니다.
   *
   * @param {Notice} notice
   */
  async addNotice (notice) {
    notice = CreateNoticeInput(notice)
    await this.magician(() => this.r.post('/notice', notice), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 학년별 멘토링 정보를 가져옵니다.
   */
  async getMentoringByGrade (grade) {
    const { data: { mentors } } = await this.magician(() => this.r.get(`/admin/${grade}`))
    return mentors.map(Mentoring)
  }

  /**
   * 멘토링을 수정합니다.
   */
  async editMentoring (mentoring) {
    mentoring = EditMentoringInput(mentoring)
    await this.magician(() => this.r.put(`/admin/${mentoring.idx}`, mentoring), {
      403: '권한이 없습니다.',
      404: '존재하지 않는 멘토링입니다.'
    })
  }

  /**
   * 멘토링을 삭제합니다. (관리자)
   */
  async deleteMentoringByAdmin (idx) {
    await this.magician(() => this.r.delete(`/admin/${idx}`), {
      403: '권한이 없습니다.',
      404: '존재하지 않는 멘토링입니다.'
    })
  }

  /**
   * 멘토링을 삭제합니다. (선생님)
   */
  async deleteMentoringByTeacher (idx) {
    await this.magician(() => this.r.delete(`/${idx}`), {
      404: '존재하지 않는 멘토링입니다.'
    })
  }

  /**
   * 멘토링을 추가합니다.
   */
  async addMentoring (mentoring) {
    mentoring = CreateMentoringInput(mentoring)
    await this.magician(() => this.r.post('/admin', mentoring), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
    * 모든 멘토링 정보를 가져옵니다.
    */
  async getAllMentoring () {
    const { data: { mentors } } = await this.magician(() => this.r.get('/admin'), {
      403: '권한이 없습니다.',
      404: '등록된 멘토링이 없습니다.'
    })
    return mentors.map(Mentoring)
  }

  /**
   * 모든 블랙리스트 학생을 가져옵니다.
   */
  async getBlacklist () {
    const { data: { blacks } } = await this.magician(() => this.r.get('/blacklist'), {
      403: '권한이 없습니다.'
    })
    return blacks.map(BlackUser)
  }

  /**
   * 블랙리스트에서 학생을 제거합니다.
   */
  async deleteBlackuser (idx) {
    await this.magician(() => this.r.delete(`/blacklist/${idx}`), {
      403: '권한이 없습니다.',
      404: '존재하지 않는 학생입니다.'
    })
  }

  /**
   * 블랙리스트에 학생을 추가합니다.
   */
  async addBlackuser (serial, date) {
    const user = CreateBlackUser({ serial, date })
    await this.magician(() => this.r.post('/blacklist', user), {
      403: '권한이 없습니다.',
      404: '존재하지 않는 학생입니다.'
    })
  }

  /**
   * 학년별 멘토링 엑셀 파일을 다운로드합니다.
   */
  async downloadExcel (grade) {
    const { data } = await this.magician(() => this.r.get(`/excel/${grade}`, {
      responseType: 'blob'
    }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', `${new Date().getFullYear()}년도 ${grade}학년 멘토링 신청 목록.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  /**
   * 주어진 기간의 멘토링 신청자 엑셀 파일을 다운로드합니다.
   */
  async downloadPeriodExcel (grade, startTime, endTime) {
    const { data } = await this.magician(() =>
      this.r.get(`/excel/${grade}/start/${startTime}/end/${endTime}`, {
        responseType: 'blob'
      }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', `${new Date().getFullYear()}년도 ${grade}학년 멘토링 신청 목록.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
