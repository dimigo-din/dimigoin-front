import { struct } from 'superstruct'

const _Permission = struct.interface({
  idx: 'number',
  userIdx: 'string',
  section: 'string',
  level: 'string'
})

export const Permission = permission => _Permission({
  idx: permission['idx'],
  userIdx: permission['user_idx'],
  section: permission['section'],
  level: permission['level']
})
