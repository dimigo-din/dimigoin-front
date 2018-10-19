import axios from './axios'
import magician from './magician'
import { StudentIngang, GradeIngang } from '@/src/struct/ingang'

/**
 * 2학년은 반, 요일에 따라 인강실을 쓸 수 있는 시간대가 다르다.
 * rightIngang()은 사용 가능한 인강 시간만 return해준다.
 */
function rightIngang (ingang) {
  const grade = ingang[0].target_grade
  const klass = ingang[0].class
  const today = new Date().getDay()
  return grade === 2 ? ((today + klass) % 2 ? ingang.slice(0, 1) : ingang.slice(1, 2)) : ingang
}

export const apply = {
  async cancelIngang (idx) {
    await magician(() => axios.delete(`/ingangs/request/${idx}`), {
      401: () => new Error('존재하지 않는 학년 또는 반입니다.'),
      403: () => new Error('신청 기간이 아닙니다.'),
      404: () => new Error('신청이 조회되지 않았습니다.')
    })
  },

  async applyIngang (idx) {
    await magician(() => axios.post(`/ingangs/request/${idx}`), {
      401: () => new Error('본인의 학년 또는 반이 아닙니다.'),
      403: () => new Error('일주일 2회 신청을 모두 했습니다.'),
      404: () => new Error('인강실 신청이 없습니다.'),
      405: () => new Error('신청 기간이 아닙니다.'),
      406: () => new Error('신청 가능한 시간이 아닙니다.'),
      409: () => new Error('이미 신청을 했거나 인원이 꽉 찼습니다.')
    })
  },

  async getStudentIngang () {
    const ingang = await magician(() => axios.get('/ingangs/student/'), {
      404: () => new Error('오늘은 인강실을 신청할 수 없습니다.')
    })
    const result = rightIngang(ingang)
    return result.map(StudentIngang)
  },

  async getGradeIngang (grade) {
    const { ingang } = await magician(() => axios.get(`/ingangs/${grade}`), {
      403: () => new Error('권한이 없습니다.'),
      404: () => new Error('인강 신청이 없습니다.')
    })
    return ingang.map(GradeIngang)
  },

  async getGradeTimeIngang (grade, time) {
    const { ingang } = await magician(() => axios.get(`/ingangs/${grade}/${time}`), {
      403: () => new Error('권한이 없습니다.'),
      404: () => new Error('인강 신청이 없습니다.')
    })
    return ingang.map(GradeIngang)
  }
}

export const notice = {
  async postNotice (notice) {
    await magician(() => axios.post(`/ingang_notice`, notice), {})
  },

  async getNotices () {
    let { notice } = await magician(() => axios.get(`/ingang_notice`), {})
    notice.description.replace(/(?:\r\n|\r|\n)/g, '<br/>')
    return notice
  },

  async getLatestNotice () {
    let notice = await magician(() => axios.get(`/ingang_notice/latest`), {})
    notice.description.split('\n').join('<br />')
    return notice
  }
}

// Object about Ingang BlackList
export const black = {
  async getGradeBlack (grade) {
    const { blacklist } = await magician(() => axios.get(`/ingang_black/grade/${grade}`), {})
    return blacklist
  },

  async getBlackLog (idx) {
    const { date } = await magician(() => axios.get(`/ingang_black/log/${idx}`), {})
    return date
  },

  async delBlack (idx) {
    await magician(() => axios.delete(`/ingang_black/${idx}`), {
      403: () => new Error('권한이 없습니다'),
      404: () => new Error('블랙리스트가 아닙니다.')
    })
  },

  async postBlack (idx) {
    await magician(() => axios.post(`/ingang_black/${idx}`), {})
  },

  async getStudentBlack (idx) {
    await magician(() => axios.get(`/ingang_black/${idx}`), {})
  }
}
