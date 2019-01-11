import { UPDATE_INFO, RESET_INFO } from './mutation-types'

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
    }
  }
}
