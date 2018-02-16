import { getAccessToken } from '../../../src/api'
import {Status} from '../../../src/util'

const LOGIN_REQUEST = 'ACCOUNT:LOGIN_REQUEST'
const LOGIN_SUCCESS = 'ACCOUNT:LOGIN_SUCCESS'
const LOGIN_FAIL = 'ACCOUNT:LOGIN_FAIL'
const LOGOUT = 'ACCOUNT:LOGOUT'

export default {
  state: {
    id: '',
    name: '',
    nickname: '',
    email: '',
    photoUrl: '',
    pending: false,
    status: Status(true),
    isLoggedIn: !!window.localStorage.getItem('token')
  },

  mutations: {
    [LOGIN_REQUEST] (state) {
      state.pending = true
    },

    [LOGIN_SUCCESS] (state, payload) {
      state.isLoggedIn = true
      state.pending = false
      state.status = Status(true)
    },

    [LOGIN_FAIL] (state, payload) {
      state.status = Status(false, payload)
    },

    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },

  actions: {
    async login ({ commit }, { id, password }) {
      commit(LOGIN_REQUEST)
      try {
        const token = await getAccessToken(id, password)
        if (token) {
          window.localStorage.setItem('token', token)
          commit(LOGIN_SUCCESS, { token })
        } else {
          const err = new Error()
          err.name = 'NoTokenError'
          throw err
        }
      } catch (error) {
        commit(LOGIN_FAIL, { error })
      }
    },

    logout ({ commit }) {
      window.localStorage.clear()
      this.isLoggedIn = false
    }
  }
}
