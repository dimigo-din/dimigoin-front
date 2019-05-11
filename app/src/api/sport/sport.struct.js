import timestamp from 'unix-timestamp'

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
  total_score: sport['total_score'],
  total_score_date: timestamp.toDate(sport['total_score_date'])
})

export const CreateSportTeamInput = sport => ({
  event_idx: sport.event,
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
  event_idx: sport['event_idx'],
  start_date: timestamp.toDate(sport['start_date']),
  end_date: timestamp.toDate(sport['end_date']),
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
  member_idx: sport['member_idx'],
  match_idx: sport['match_idx'],
  score: sport['score'],
  assist: sport['assist']
})

export const EditMemberScore = sport => ({
  score: sport['score'],
  assist: sport['assist']
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
