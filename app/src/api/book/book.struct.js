/**
 * @typedef {Object} Book~Book
 * @property {number} idx
 * @property {string} title
 * @property {string} author
 * @property {string} publisher
 * @property {number} price
 * @property {string} possession
 * @property {number} studentIdx
 * @property {string} acceptable
 * @property {boolean} open
 */

/**
 * @param {Object} book
 * @returns {Book~Book}
 */
export const Book = book => ({
  idx: book['idx'],
  title: book['name'],
  author: book['author'],
  publisher: book['publisher'],
  price: book['price'],
  possession: book['possession'],
  studentIdx: book['student_idx'],
  acceptable: book['acceptable'],
  open: false
})

/**
 * @typedef {Object} Book~CreateBookInput
 * @property {string} name
 * @property {string} author
 * @property {string} publisher
 * @property {string} price
 * @property {string} possession
 */

/**
 * @param {Book~CreateBookInput} book
 * @returns {{name: string, author: string, publisher: string, price: number, possession: string}}
 */
export const CreateBookInput = book => ({
  'name': book['title'],
  'author': book['author'],
  'publisher': book['publisher'],
  'price': parseInt(book['price']),
  'possession': book['possession'] || ''
})

/**
 * @typedef {Object} Book~Notice
 * @property {number} idx
 * @property {string} desc
 * @property {Date} date
 */

/**
 * @param {Object} notice
 * @returns {Book~Notice}
 */
export const Notice = notice => ({
  idx: notice['idx'],
  desc: notice['description'],
  date: new Date(notice['date'])
})

export const CreateNoticeInput = notice => ({
  'idx': notice.idx,
  'description': notice.desc,
  'date': notice.date
})
