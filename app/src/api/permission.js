import axios from './axios'
import magician from './magician'
import { Permission } from '@/src/struct/permission'

export async function getPermission () {
  const { permissions } = await magician(() => axios.get(`/permission/`), {})
  return permissions.map(Permission)
}
