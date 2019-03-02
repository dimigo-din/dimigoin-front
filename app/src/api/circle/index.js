import {
  CircleRequestorService,
  CircleManagerService
} from './circle.service'

export const circleRequestor = new CircleRequestorService('/circles')
export const circleManager = new CircleManagerService('/circles')
