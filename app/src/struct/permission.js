export const Permission = permission => ({
  idx: permission['idx'],
  userIdx: permission['user_idx'],
  section: permission['section'],
  level: permission['level']
})
