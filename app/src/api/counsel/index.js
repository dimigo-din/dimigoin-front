import {
  CouncelRequestorService,
  CounselManagerService
} from './counsel.service'

export const counselRequestor = new CouncelRequestorService('/counsel')
export const counselManager = new CounselManagerService('/counsel')
