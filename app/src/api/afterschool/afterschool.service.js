import ValidationError from '@/src/errors/validation-error'
import { ServiceBase } from '@/src/api/service-base'
import { Afterschool, CreateAfterschoolInput } from './afterschool.struct'

function tempValidation (afterschool) {
  const keys = ['name', 'request_start_date', 'request_end_date', 'time', 'target_grade', 'max_of_count', 'teacher_name']
  const missingArguments = keys.filter(key => !afterschool[key])
  if (missingArguments.length > 0) {
    throw new ValidationError('모든 입력란을 채워주세요.', missingArguments)
  }
}

export class AfterschoolService extends ServiceBase {
  async createAfterschool (afterschool) {
    afterschool = CreateAfterschoolInput(afterschool)
    tempValidation(afterschool)
    await this.magician(() => this.r.post(`/`, afterschool), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  async getTodayAfterschool () {
    const { data: { afterschools } } = await this.magician(() => this.r.get('/student/today'))
    return afterschools.map(Afterschool)
  }

  async getGradeAfterschool (grade) {
    const { data: { afterschools } } = await this.magician(() => this.r.get(`/grade/${grade}`))
    return afterschools.map(Afterschool)
  }

  async cancelAfterschool (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
      403: '신청 기간이 아니거나 마감되었습니다.',
      404: '존재하지 않는 방과 후 신청입니다.'
    })
  }

  async applyAfterschool (idx, captcha) {
    await this.magician(() => this.r.post(`/request/${idx}`, { 'g-recaptcha-response': captcha }), {
      401: '잘못된 학년에 신청했습니다.',
      403: '신청 기간이 아닙니다.',
      404: '존재하지 않는 과목입니다.',
      406: '잘못된 요청입니다.',
      409: '이미 신청을 완료했습니다.'
    })
  }

  async getStudentAfterschool () {
    const { data: { afterschools } } = await this.magician(() => this.r.get(`/student/`), {
      404: () => []
    })
    return afterschools.map(Afterschool)
  }

  async deleteAfterschool (idx) {
    await this.magician(() => this.r.delete(`/${idx}`), {
      404: '존재하지 않는 방과후 신청입니다.'
    })
  }

  async downloadExcel (grade) {
    const { data } = await this.magician(() => this.r.get(`/excel1/${grade}`, {
      responseType: 'blob'
    }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', `${new Date().getFullYear()}년도 ${grade}학년 방과후 신청 목록.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
