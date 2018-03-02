import { getAccessToken } from '../../../src/api'
import * as types from './mutation-types'

export default {
  state: {
    token: window.localStorage.getItem('token'),
    isLoggedIn: !!window.localStorage.getItem('token')
  },

  mutations: {
    [types.LOGIN_SUCCESS] (state, { token }) {
      this.token = token
      state.isLoggedIn = true
    },

    [types.LOGOUT] (state) {
      state.token = null
      state.isLoggedIn = false
    }
  },

  actions: {
    async login ({ commit }, { id, password }) {
      const token = await getAccessToken(id, password)
      console.log(id, password, 'hi')

      if (!token) {
        const err = new Error()
        err.name = 'NoTokenError'
        err.message = '알 수 없는 이유로 로그인에 실패했습니다. 관리자에게 문의해주세요.'
        throw err
      }

      window.localStorage.setItem('token', token)
      commit(types.LOGIN_SUCCESS, { token })
    },

    logout ({ commit }) {
      window.localStorage.clear()
      commit(types.LOGOUT)
    }
  }
}
