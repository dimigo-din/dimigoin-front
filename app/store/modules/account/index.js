import { getNotifications } from '../../../src/api'

import auth from './auth'
import informations from './informations'

import * as types from './mutation-types'

export default {
  namespaced: true,

  state: {
    notifications: []
  },

  mutations: {
    [types.UPDATE_NOTIFICATIONS] (state, { notifications }) {
      state.notifications = notifications
    }
  },

  actions: {
    async fetchNotifications ({ commit }) {
      const notifications = await getNotifications()
      commit(types.UPDATE_NOTIFICATIONS, { notifications })
    }
  },

  modules: { auth, informations }
}
