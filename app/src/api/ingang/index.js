import {
  IngangManagerService,
  IngangRequestorService
} from './ingang.service'

export const ingangRequestor = new IngangRequestorService('/ingangs')
export const ingangManager = new IngangManagerService('/ingangs')
