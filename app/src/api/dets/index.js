import {
  DetsManagerService,
  DetsRequestService
} from './dets.service'

export const detsRequestor = new DetsRequestService('/dets')
export const detsManager = new DetsManagerService('/dets')
