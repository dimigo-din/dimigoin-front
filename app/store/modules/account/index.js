import { getAccessToken } from '../../../src/api'

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
    isLoggedIn: !!window.localStorage.getItem('token')
  },

  mutations: {
    [LOGIN_REQUEST] (state) {
      state.pending = true
    },

    [LOGIN_SUCCESS] (state, payload) {
      state.isLoggedIn = true
      state.pending = false
    },

    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },

  actions: {
    async login ({ commit }, { id, password }) {
      commit(LOGIN_REQUEST)
      const token = await getAccessToken(id, password)

      /**
       * getAccessToken throws errors whether logging in is successful, or not.
       * If getAccessToken doesn't return any token, error handling is failed in getAccessToken.
       * Therefore, if this statement is committed, bug must be there.
       */
      if (!token) {
        const err = new Error()
        err.name = 'NoTokenError'
        err.message = '알 수 없는 이유로 로그인에 실패했습니다. 관리자에게 문의해주세요.'
        throw err
      }

      window.localStorage.setItem('token', token)
      commit(LOGIN_SUCCESS, { token })
    },

    logout ({ commit }) {
      window.localStorage.clear()
      this.isLoggedIn = false
    }
  }
}
