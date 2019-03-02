import {
  BookManagerService,
  BookRequestorService
} from './book.service'

export const bookRequestor = new BookRequestorService('/book_info')
export const bookManager = new BookManagerService('/book_info')
