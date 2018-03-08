import { register, getAccessToken, verifyStudent } from '../../../src/api'
import { setAuthorizationToken, parseToken } from '../../../src/util'
import axios from '../../../src/api/axios'
import * as types from './mutation-types'

export default {
  state: {
    token: window.localStorage.getItem('token'),
    isLoggedIn: !!window.localStorage.getItem('token'),
    needVerify: false
  },

  mutations: {
    [types.VERIFY] (state) {
      state.needVerify = false
    },

    [types.LOGIN] (state, { token, needVerify }) {
      window.localStorage.setItem('token', token)
      setAuthorizationToken(axios, token)

      state.needVerify = needVerify
      state.token = token
      state.isLoggedIn = true
    },

    [types.LOGOUT] (state) {
      window.localStorage.removeItem('token')
      setAuthorizationToken(axios, '')

      state.token = null
      state.isLoggedIn = false
    }
  },

  actions: {
    async register (ctx, payload) {
      await register(payload)
    },

    async verify ({ commit }, { authcode }) {
      await verifyStudent(authcode)
      commit(types.VERIFY)
    },

    async autoLogin ({ dispatch, state }) {
      if (state.isLoggedIn) dispatch('loginWithToken', state)
    },

    async login ({ dispatch }, { id, password }) {
      const { token, needVerify } = await getAccessToken(id, password)
      dispatch('loginWithToken', { token, needVerify })
    },

    async loginWithToken ({ commit }, { token, needVerify }) {
      if (!token) {
        const err = new Error()
        err.name = 'NoTokenError'
        err.message = '알 수 없는 이유로 로그인에 실패했습니다. 관리자에게 문의해주세요.'
        throw err
      }

      const info = parseToken(token)

      commit(types.LOGIN, { token, needVerify })
      commit(types.UPDATE_INFO, {
        idx: info.idx,
        name: info.name,
        userType: info['user_type'],
        email: info.email,
        photoUrl: info.photo,
        serial: info.serial,
        grade: info.grade,
        klass: info.klass,
        number: info.number
      })
    },

    logout ({ commit }) {
      commit(types.LOGOUT)
    }
  }
}
