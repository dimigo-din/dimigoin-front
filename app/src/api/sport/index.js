import {
  SportManageService,
  SportPublicService
} from './sport.service'

export const SportPublicService = new SportPublicService('/sports')
export const sportManager = new SportManageService('/sports')
