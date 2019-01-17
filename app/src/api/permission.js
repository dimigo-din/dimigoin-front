import axios from './axios'
import magician from './magician'
import APIError from '@/src/errors/api-error'
import { Permission } from '@/src/struct/permission'

export async function getPermission () {
  const { data: { permissions } } = await magician(() => axios.get(`/permission/`), {})
  return permissions.map(Permission)
}

export async function addPermission (permission) {
  await magician(() => axios.post(`/permission/`, permission), {
    403: () => new APIError('선생님 권한이 없습니다.', 403)
  })
}
