export const Boook = book => ({
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

export const Notice = notice => ({
  idx: notice['idx'],
  desc: notice['description'],
  date: notice['date']
})
