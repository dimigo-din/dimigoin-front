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
    [UPDATE_INFO] (state, payload) {
      Object.keys(payload).forEach(v => (state[v] = payload[v]))

      Sentry.configureScope(scope => {
        scope.setUser({
          id: payload.id,
          userIdx: payload.idx,
          username: payload.name,
          serial: payload.serial,
          photoUrl: payload.photoUrl,
          userType: payload.userType
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
