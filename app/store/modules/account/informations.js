import * as types from './mutation-types'

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

  mutations: {
    [types.UPDATE_INFO] (state, payload) {
      Object.keys(payload).forEach(v => (state[v] = payload[v]))
    }
  }
}
