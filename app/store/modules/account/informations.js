import { UPDATE_INFO, RESET_INFO } from './mutation-types'
import * as Sentry from '@sentry/browser'

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
    number: 0
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
        number: 0
      })

      Sentry.configureScope(scope => scope.setUser({}))
    }
  }
}
