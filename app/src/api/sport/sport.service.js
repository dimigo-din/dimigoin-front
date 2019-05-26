import { ServiceBase } from '@/src/api/service-base'
import { Notice, CreateNoticeInput, CreateSportEventInput, SportEvent, SportTeam,
  CreateSportTeamInput, AddMember, SportMatch, CreateSportMatch, AddMemberScore,
  EditMemberScore, AddTeamScore, EditTeamScore } from './sport.struct'

export class SportService extends ServiceBase {
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

export class SportPublicService extends SportService {
  /**
   * 모든 스포츠 종목 목록을 가져옵니다.
   */
  async getAllSportEvent () {
    const { data: { events } } = await this.magician(() => this.r.get('/events'), {
      403: '권한이 없습니다.',
      404: '등록된 종목이 없습니다.'
    })
    return events.map(SportEvent)
  }

  /**
   * 현재 종목별 스포츠 팀 정보를 가져옵니다.
   */
  async getSportTeam (idx) {
    const { data: { teams } } = await this.magician(() => this.r.get(`/teams/event/${idx}`), {
      403: '권한이 없습니다.',
      404: '등록된 팀이 없습니다.'
    })
    return teams.map(SportTeam)
  }

  /**
   * 모든 스포츠 경기 일정을 가져옵니다.
   */
  async getAllSportMatch () {
    const { data: { matchs } } = await this.magician(() => this.r.get('/matchs'), {
      403: '권한이 없습니다.',
      404: '등록된 경기 일정이 없습니다.'
    })
    return matchs.map(SportMatch)
  }
}

export class SportManageService extends SportService {
  /**
   * 공지사항을 추가합니다.
   */
  async addNotice (notice) {
    notice = CreateNoticeInput(notice)
    await this.magician(() => this.r.post('/notice', notice), {
      403: '권한이 없습니다.'
    })
  }

  /**
   * 스포츠 종목을 추가합니다.
   */
  async addSportEvent (event) {
    event = CreateSportEventInput(event)
    await this.magician(() => this.r.post('/event', event), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 스포츠 종목을 삭제합니다.
   */
  async deleteSportEvent (idx) {
    await this.magician(() => this.r.delete(`/event/${idx}`), {
      404: '존재하지 않는 스포츠 종목입니다.'
    })
  }

  /**
   * 스포츠 팀을 추가합니다.
   */
  async addSportTeam (team) {
    team = CreateSportTeamInput(team)
    await this.magician(() => this.r.post('/team', team), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 스포츠 팀을 삭제합니다.
   */
  async deleteSportTeam (idx) {
    await this.magician(() => this.r.delete(`/team/${idx}`), {
      404: '존재하지 않는 스포츠 팀입니다.'
    })
  }

  /**
   * 스포츠 팀 별 멤버를 추가합니다.
   */
  async addMember (member) {
    member = AddMember(member)
    await this.magician(() => this.r.post('/member', member), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 스포츠 팀 별 멤버를 삭제합니다.
   */
  async deleteMember (idx) {
    await this.magician(() => this.r.delete(`/member/${idx}`), {
      404: '존재하지 않는 학생입니다.'
    })
  }

  /**
   * 종목 별 경기 일정을 추가합니다.
   */
  async addSportMatch (match) {
    match = CreateSportMatch(match)
    await this.magician(() => this.r.post('/match', match), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 종목 별 경기 일정을 삭제합니다.
   */
  async deleteSportMatch (idx) {
    await this.magician(() => this.r.delete(`/match/${idx}`), {
      404: '존재하지 않는 경기 일정입니다.'
    })
  }

  /**
   * 멤버별 점수를 등록합니다.
   */
  async addMemberScore (score) {
    score = AddMemberScore(score)
    await this.magician(() => this.r.post('/scorebook/member', score), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 멤버별 점수를 수정합니다.
   */
  async editMemberScore (idx, score) {
    score = EditMemberScore(score)
    await this.magician(() => this.r.put(`/scorebook/${idx}/member`, score), {
      403: '권한이 없습니다.',
      404: '존재하지 않는 학생입니다.'
    })
  }

  /**
   * 멤버별 점수를 삭제합니다.
   */
  async deleteMemberScore (idx) {
    await this.magician(() => this.r.delete(`/scorebook/${idx}/member`), {
      404: '존재하지 않는 학생입니다.'
    })
  }

  /**
   * 팀별 점수를 등록합니다.
   */
  async addTeamScore (score) {
    score = AddTeamScore(score)
    await this.magician(() => this.r.post('/scorebook/team', score), {
      400: '잘못된 입력입니다.',
      403: '권한이 없습니다.'
    })
  }

  /**
   * 팀별 점수를 수정합니다.
   */
  async editTeamScore (idx, score) {
    score = EditTeamScore(score)
    await this.magician(() => this.r.put(`/scorebook/${idx}/team`, score), {
      403: '권한이 없습니다.',
      404: '존재하지 않는 팀입니다.'
    })
  }

  /**
   * 팀별 점수를 삭제합니다.
   */
  async deleteTeamScore (idx) {
    await this.magician(() => this.r.delete(`/scorebook/${idx}/team`), {
      404: '존재하지 않는 학생입니다.'
    })
  }
}
