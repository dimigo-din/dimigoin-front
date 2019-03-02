import {
  PermissionManagerService,
  PermissionService
} from './permission.service'

export const permission = new PermissionService('/permission')
export const permissionManager = new PermissionManagerService('/permission')
