import timestamp from 'unix-timestamp'

export const Sport = sport => ({
  idx: sport['idx'],
  event: sport['event'],
  teams: sport['teams'],
  open: false
})

export const SportEvent = sport => ({
  idx: sport['idx'],
  name: sport['name']
})

export const CreateSportEventInput = sport => ({
  name: sport.name
})

export const SportTeam = sport => ({
  idx: sport['idx'],
  event: sport['event'],
  name: sport['name'],
  introduction: sport['introduction'],
  win: sport['win'],
  defeat: sport['defeat'],
  totalScore: sport['total_score'],
  totalScoreDate: sport['total_score_date'],
  members: sport['members']
})

export const CreateSportTeamInput = sport => ({
  eventIdx: sport.event,
  name: sport.name,
  introduction: sport.introduction
})

export const AddMember = sport => ({
  user_serial: sport['user_serial'],
  event_idx: sport['event_idx'],
  team_idx: sport['team_idx']
})

export const SportMatch = sport => ({
  idx: sport['idx'],
  event: sport['event'],
  eventIdx: sport['event_idx'],
  startDate: timestamp.toDate(sport['start_date']),
  endDate: timestamp.toDate(sport['end_date']),
  team1: sport['team1'],
  team2: sport['team2']
})

export const CreateSportMatch = sport => ({
  event_idx: sport.event_idx,
  start_date: sport.start_date,
  end_date: sport.end_date,
  team1_idx: sport['team1_idx'],
  team2_idx: sport['team2_idx']
})

export const AddMemberScore = sport => ({
  memberIdx: sport['member_idx'],
  matchIdx: sport['match_idx'],
  score: sport['score'],
  assist: sport['assist']
})

export const EditMemberScore = sport => ({
  score: sport['score'],
  assist: sport['assist']
})

export const TotalMemberScore = scorebook => ({
  idx: scorebook['idx'],
  memberIdx: scorebook['member_idx'],
  totalScore: scorebook['total_score'],
  totalAssist: scorebook['total_assist']
})

export const TeamScore = scorebook => ({
  idx: scorebook['idx'],
  teamIdx: scorebook['team_idx'],
  matchIdx: scorebook['match_idx'],
  score: scorebook['score'],
  result: scorebook['result']
})

export const MemberScore = scorebook => ({
  idx: scorebook['idx'],
  memberIdx: scorebook['member_idx'],
  matchIdx: scorebook['match_idx'],
  score: scorebook['score'],
  result: scorebook['result']
})

export const AddTeamScore = sport => ({
  team_idx: sport['team_idx'],
  match_idx: sport['match_idx'],
  score: sport['score'],
  result: sport['result']
})

export const EditTeamScore = sport => ({
  score: sport['score'],
  result: sport['result']
})

export const Notice = notice => ({
  date: timestamp.toDate(notice['date']),
  description: notice['description']
})

export const CreateNoticeInput = notice => ({
  date: timestamp.fromDate(notice['date']),
  description: notice['description']
})

export const Scorebook = scorebook => ({
  idx: scorebook['idx'],
  memberIdx: scorebook['member_idx']
})
