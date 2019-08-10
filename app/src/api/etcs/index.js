import {
  EtcManagerService,
  EtcRequestService
} from './etcs.service'

export const etcRequestor = new EtcRequestService('/etc')
export const etcManager = new EtcManagerService('/etc')
