import {
  SportManageService,
  SportPublicService
} from './sport.service'

export const sportPublicService = new SportPublicService('/sports')
export const sportManager = new SportManageService('/sports')
