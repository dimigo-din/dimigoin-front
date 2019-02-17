import { getClient } from '@/src/api/axios'
import magician from '@/src/api/magician'

export class ServiceBase {
  constructor (endpoint, config) {
    this.endpoint = endpoint || ''
    this.r = getClient(this.endpoint, config)
    this.magician = magician
  }
}
