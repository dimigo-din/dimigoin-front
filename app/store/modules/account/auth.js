import { auth } from '@/src/api/auth'
import parseToken from '@/src/util/parse-token'
import isTokenExpired from '@/src/util/is-token-expired'
import { updateHeader, mountTokenRefreshInterceptor, unmountTokenRefreshInterceptor } from '@/src/api/axios'
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
    decodedRefreshToken: undefined,
    decodedAccessToken: undefined
  },

  getters: {
    isLoggedIn: state => !!(state.refreshToken && state.accessToken),
    isRefreshTokenExpired: ({ decodedRefreshToken }) => isTokenExpired(decodedRefreshToken),
    isAccessTokenExpired: ({ decodedAccessToken }) => isTokenExpired(decodedAccessToken)
  },

  mutations: {
    [ASSIGN_ACCESS_TOKEN] (state, { accessToken }) {
      window.localStorage.setItem('accessToken', accessToken)
      state.accessToken = accessToken
      state.decodedAccessToken = parseToken(accessToken)

      updateHeader('Authorization', 'Bearer ' + accessToken)
    },

    [ASSIGN_REFRESH_TOKEN] (state, { refreshToken }) {
      window.localStorage.setItem('refreshToken', refreshToken)
      state.refreshToken = refreshToken
      state.decodedRefreshToken = parseToken(refreshToken)

      updateHeader('Authorization', 'Bearer ' + refreshToken)
    },

    [REMOVE_TOKENS] (state) {
      window.localStorage.removeItem('refreshToken')
      window.localStorage.removeItem('accessToken')

      updateHeader('Authorization', undefined)

      state.accessToken = undefined
      state.refreshtoken = undefined
      state.decodedAccessToken = undefined
      state.decodedRefreshToken = undefined
    }
  },

  actions: {
    async verify ({ commit, dispatch }, { authcode }) {
      await auth.verifyStudent(authcode)
      await dispatch('logout')
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
      const { accessToken, refreshToken } = await auth.verify(id, password)
      await dispatch('loginWithToken', { accessToken, refreshToken })
    },

    async regenerateAccessToken ({ commit, dispatch, getters, state }) {
      const { accessToken, refreshToken } = await auth.generateAccessToken(state.refreshToken)

      if (refreshToken) commit(ASSIGN_REFRESH_TOKEN, { refreshToken })
      commit(ASSIGN_ACCESS_TOKEN, { accessToken })
    },

    async loginWithToken ({ commit, dispatch, getters, state }, { accessToken, refreshToken }) {
      // Since token is not assigned yet, we can't check whether token is expired or not by getters,
      // so that this function must decode and check itself.
      if (isTokenExpired(parseToken(refreshToken))) throw new Error('Refresh token is Expired')
      commit(ASSIGN_REFRESH_TOKEN, { refreshToken })
      if (isTokenExpired(parseToken(accessToken))) await dispatch('regenerateAccessToken')
      else commit(ASSIGN_ACCESS_TOKEN, { accessToken })
      commit(UPDATE_INFO, state.decodedRefreshToken)
      mountTokenRefreshInterceptor()
    },

    async logout ({ commit, state }) {
      unmountTokenRefreshInterceptor()
      await auth.logout(state.refreshToken)
      commit(RESET_INFO)
      commit(REMOVE_TOKENS)
    }
  }
}
