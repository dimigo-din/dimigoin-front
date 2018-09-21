import { struct } from 'superstruct'

const _Notice = struct.interface({
  idx: 'number',
  desc: 'string'
})

export const Notice = notice => _Notice({
  idx: notice['idx'],
  desc: notice['description']
})
