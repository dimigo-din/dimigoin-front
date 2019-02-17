import {
  NoticeService,
  NoticeManagerService
} from './notice.service'

export const notice = new NoticeService('/notice')
export const noticeManager = new NoticeManagerService('/notice')
