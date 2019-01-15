import * as auth from '@/src/api/auth'
import setAuthorizationToken from '@/src/util/axios-set-authorization'
import parseToken from '@/src/util/parse-token'
import isTokenExpired from '@/src/util/is-token-expired'
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
    accessToken: window.localStorage.getItem('accessToken'),
    decodedRefreshToken: null,
    decodedAccessToken: null
  },

  mutations: {
    [ASSIGN_ACCESS_TOKEN] (state, { accessToken }) {
      window.localStorage.setItem('accessToken', accessToken)
      state.accessToken = accessToken
      state.decodedAccessToken = parseToken(accessToken)

      setAuthorizationToken(axios, accessToken)
    },

    [ASSIGN_REFRESH_TOKEN] (state, { refreshToken }) {
      window.localStorage.setItem('refreshToken', refreshToken)
      state.refreshToken = refreshToken
      state.decodedRefreshToken = parseToken(refreshToken)

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

  getters: {
    isLoggedIn: state => !!(state.refreshToken && state.accessToken),
    isRefreshTokenExpired: ({ decodedRefreshToken }) => isTokenExpired(decodedRefreshToken),
    isAccessTokenExpired: ({ decodedAccessToken }) => isTokenExpired(decodedAccessToken)
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
      if (getters.isLoggedIn) {
        try {
          await dispatch('loginWithToken', state)
        } catch (err) {
          await dispatch('logout')
        }
      }
    },

    async login ({ dispatch }, { id, password }) {
      const { accessToken, refreshToken } = await auth.auth(id, password)
      await dispatch('loginWithToken', { accessToken, refreshToken })
    },

    async regenerateAccessToken ({ commit, dispatch, getters, state }) {
      const { accessToken, refreshToken } = await auth.generateAccessToken(state.refreshToken)

      if (refreshToken) commit(ASSIGN_REFRESH_TOKEN, { refreshToken })
      commit(ASSIGN_ACCESS_TOKEN, { accessToken })
    },

    async loginWithToken ({ commit, dispatch, getters, state }, { accessToken, refreshToken }) {
      // Since token is not assigned yet, we can't check whether token is expired by getters or etc,
      // so that this function must decode and check itself.
      if (isTokenExpired(parseToken(refreshToken))) return dispatch('logout')
      else commit(ASSIGN_REFRESH_TOKEN, { refreshToken })
      if (!accessToken || isTokenExpired(parseToken(accessToken))) await dispatch('regenerateAccessToken')
      else commit(ASSIGN_ACCESS_TOKEN, { accessToken })
      commit(UPDATE_INFO, state.decodedRefreshToken)
    },

    async logout ({ commit, state }) {
      await auth.logout(state.refreshToken)
      commit(RESET_INFO)
      commit(REMOVE_TOKENS)
    }
  }
}
