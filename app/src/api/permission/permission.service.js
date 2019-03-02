import { Permission } from './permission.struct'
import { ServiceBase } from '@/src/api/service-base'

export class PermissionService extends ServiceBase {
  async getPermissions () {
    const { data: { permissions } } = await this.magician(() => this.r.get('/'), {})
    return permissions.map(Permission)
  }
}

export class PermissionManagerService extends PermissionService {
  async addPermission (permission) {
    await this.magician(() => this.r.post('/', permission), {
      403: '권한이 없습니다.'
    })
  }
}
