import {
  IngangManagerService,
  IngangRequestorService
} from './ingang.service'

export const ingangRequestor = new IngangRequestorService('/ingang')
export const ingangManager = new IngangManagerService('/ingang')
