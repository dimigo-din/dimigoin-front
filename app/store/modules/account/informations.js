import * as types from './mutation-types'

export default {
  state: {
    id: '',
    name: '',
    nickname: '',
    email: '',
    photoUrl: ''
  },

  mutations: {
    [types.UPDATE_INFO] (state, { updatedField }) {
      Object.keys(updatedField).forEach(key => (state[key] = updatedField[key]))
    }
  },

  actions: {
    update ({ commit }, payload) {
      // TODO
    }
  }
}
