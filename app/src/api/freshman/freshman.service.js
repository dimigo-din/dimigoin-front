import { ServiceBase } from '@/src/api/service-base'
import { CreateFreshmanMessageInput } from '@/src/api/freshman/freshman.struct'

export class FreshmanManagerService extends ServiceBase {
  async broadcastMessage (post) {
    await this.magician(() => this.r.post('/', CreateFreshmanMessageInput(post)), {
      403: '권한이 없습니다.'
    })
  }
}
