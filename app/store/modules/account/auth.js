import * as auth from '@/src/api/auth'
import setAuthorizationToken from '@/src/util/axios-set-authorization'
import parseToken from '@/src/util/parse-token'
import axios from '@/src/api/axios'
import {
  ASSIGN_ACCESS_TOKEN,
  ASSIGN_REFRESH_TOKEN,
  REMOVE_TOKENS,
  RESET_INFO,
  UPDATE_INFO
} from './mutation-types'

export default {
  state: {
    refreshToken: window.localStorage.getItem('refreshToken'),
    accessToken: window.localStorage.getItem('accessToken')
  },

  getters: {
    isLoggedIn: state => !!(state.refreshToken && state.accessToken)
  },

  mutations: {
    [ASSIGN_ACCESS_TOKEN] (state, { accessToken }) {
      window.localStorage.setItem('accessToken', accessToken)
      state.accessToken = accessToken

      setAuthorizationToken(axios, accessToken)
    },

    [ASSIGN_REFRESH_TOKEN] (state, { refreshToken }) {
      window.localStorage.setItem('refreshToken', refreshToken)
      state.refreshToken = refreshToken
      state.isLoggedIn = true

      setAuthorizationToken(axios, refreshToken)
    },

    [REMOVE_TOKENS] (state) {
      window.localStorage.removeItem('refreshToken')
      window.localStorage.removeItem('accessToken')

      setAuthorizationToken(axios, '')

      state.accessToken = null
      state.refreshtoken = null
    }
  },

  actions: {
    async register (ctx, payload) {
      await auth.register(payload)
    },

    async verify ({ commit }, { authcode }) {
      await auth.verifyStudent(authcode)
      commit(REMOVE_TOKENS)
    },

    async autoLogin ({ dispatch, state, getters }) {
      if (getters.isLoggedIn) await dispatch('loginWithToken', state)
    },

    async login ({ dispatch }, { id, password }) {
      const { accessToken, refreshToken } = await auth.auth(id, password)
      await dispatch('loginWithToken', { accessToken, refreshToken })
    },

    async regenerateAccessToken ({ dispatch, commit, state }) {
      const { accessToken, refreshToken } = await auth.generateAccessToken(state.refreshToken)

      if (refreshToken) commit(ASSIGN_REFRESH_TOKEN, { refreshToken })
      commit(ASSIGN_ACCESS_TOKEN, { accessToken })
    },

    async loginWithToken ({ commit, dispatch }, { accessToken, refreshToken }) {
      try {
        const info = parseToken(refreshToken)

        commit(ASSIGN_REFRESH_TOKEN, { refreshToken })
        if (!accessToken) await dispatch('regenerateAccessToken')
        else commit(ASSIGN_ACCESS_TOKEN, { accessToken })
        commit(UPDATE_INFO, {
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
      } catch (error) {
        commit(RESET_INFO)
        commit(REMOVE_TOKENS)
      }
    },

    async logout ({ commit, state }) {
      await auth.logout(state.refreshToken)
      commit(RESET_INFO)
      commit(REMOVE_TOKENS)
    }
  }
}
