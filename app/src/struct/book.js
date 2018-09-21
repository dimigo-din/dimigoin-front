import { struct } from 'superstruct'

const _Boook = struct.interface({
  idx: 'number',
  title: 'string',
  author: 'string',
  publisher: 'string',
  price: 'number',
  possession: 'string',
  student: 'number',
  acceptable: 'string',
  open: 'boolean?'
})

export const Boook = book => _Boook({
  idx: book['idx'],
  title: book['name'],
  author: book['author'],
  publisher: book['publisher'],
  price: book['price'],
  possession: book['possession'],
  student: book['student_idx'],
  acceptable: book['acceptable'],
  open: false
})

const _Notice = struct.interface({
  idx: 'number',
  desc: 'string',
  date: 'string'
})

export const Notice = notice => _Notice({
  idx: notice['idx'],
  desc: notice['description'],
  date: notice['date']
})
