import axios from './axios'
import magician from './magician'
import { Permission } from '@/src/struct/permission'

export async function getPermission () {
  const { permissions } = await magician(() => axios.get(`/permission/`), {})
  return permissions.map(Permission)
}

export async function addPermission (permission) {
  await magician(() => axios.post(`/permission/`, permission), {
    403: () => new Error('선생님 권한이 없습니다.')
  })
}
