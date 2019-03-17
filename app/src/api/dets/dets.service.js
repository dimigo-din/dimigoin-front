import { CreateDetsInput, Dets, StudentDets } from './dets.struct'
import { ServiceBase } from '@/src/api/service-base'

export class DetsService extends ServiceBase {
  async getDets (idx) {
    const { data: { dets } } = await this.magician(() => this.r.get(`/${idx}`), {
      404: () => []
    })

    return dets.map(Dets)[0]
  }

  async getDetsList (idx) {
    const { data: { dets } } = await this.magician(() => this.r.get('/'), {
      404: () => []
    })

    return dets.map(Dets)
  }

  async getDetsListByGrade (grade) {
    const { data: { dets } } = await this.magician(() => this.r.get(`/grade/${grade}`), {
      404: () => ({ dets: [] })
    })

    return dets.map(Dets)
  }
}

export class DetsRequestService extends DetsService {
  async getDetsList () {
    const { data: { dets } } = await this.magician(() => this.r.get('/student/'), {
      404: () => []
    })

    return dets.map(StudentDets)
  }

  async cancelDets (idx) {
    await this.magician(() => this.r.delete(`/request/${idx}`), {
      403: '신청 기간이 아닙니다.',
      404: '존재하지 않는 Dets 신청입니다.'
    })
  }

  async applyDets (idx) {
    await this.magician(() => this.r.post(`/request/${idx}`), {
      403: '신청 기간이 아니거나 마감되었습니다.',
      404: '존재하지 않는 Dets 입니다.',
      409: '이미 신청을 완료했습니다.'
    })
  }
}

export class DetsManagerService extends DetsService {
  async createDets (dets) {
    await this.magician(() => this.r.post('/', CreateDetsInput(dets)), {
      403: '권한이 없습니다.'
    })
  }

  async deleteDets (idx) {
    await this.magician(() => this.r.delete(`/${idx}`), {
      403: '권한이 없습니다',
      404: '존재하지 않는 Dets 입니다.'
    })
  }

  async updateDets (idx, dets) {
    await this.magician(() => this.r.put(`/${idx}`, CreateDetsInput(dets)), {
      403: '권한이 없습니다.'
    })
  }

  async getExcel () {
    const { data } = await this.magician(() => this.r.get(`/excel`, {
      responseType: 'blob'
    }), {
      403: '권한이 없습니다.',
      default: '파일을 다운로드하던 중 문제가 발생했습니다.'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([data]))
    link.setAttribute('download', 'dets.xls')
    document.body.appendChild(link)
    link.click()
  }
}
