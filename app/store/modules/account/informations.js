import { UPDATE_INFO, RESET_INFO, UPDATE_PERMISSIONS } from './mutation-types'
import * as Sentry from '@sentry/browser'
import { permission } from '@/src/api/permission'

export default {
  state: {
    idx: 0,
    name: '',
    id: '',
    userType: '',
    email: '',
    photoUrl: '',
    serial: 0,
    grade: 0,
    klass: 0,
    number: 0,
    permissions: []
  },

  getters: {
    needVerify: state => state.userType === 'O'
  },

  mutations: {
    [UPDATE_INFO] (state, decodedToken) {
      const info = decodedToken.identity[0]

      Object.assign(state, {
        id: info.id,
        idx: info.idx,
        name: info.name,
        userType: info['user_type'],
        email: info.email,
        photoUrl: info.photo,
        serial: info.serial,
        grade: info.grade,
        klass: info.klass,
        number: info.number,
        ssoToken: info['sso_token']
      })

      Sentry.configureScope(scope => {
        scope.setUser({
          id: info.id,
          userIdx: info.idx,
          username: info.name,
          serial: info.serial,
          photoUrl: info.photo,
          userType: info['user_type']
        })
      })
    },

    [UPDATE_PERMISSIONS] (state, permissions) {
      state.permissions = permissions
    },

    [RESET_INFO] (state) {
      Object.assign(state, {
        idx: 0,
        name: '',
        id: '',
        userType: '',
        email: '',
        photoUrl: '',
        serial: 0,
        grade: 0,
        klass: 0,
        number: 0,
        permissions: []
      })

      Sentry.configureScope(scope => scope.setUser({}))
    }
  },

  actions: {
    async fetchPermissions ({ commit }) {
      commit(UPDATE_PERMISSIONS, await permission.getPermissions())
    }
  }
}
