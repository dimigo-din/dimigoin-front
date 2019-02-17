import { ServiceBase } from '@/src/api/service-base'
import { Service } from './service.struct'

export class ServiceService extends ServiceBase {
  async getServiceList () {
    return (await this.magician(() => this.r.get('/'))).data.services.map(Service)
  }
}
