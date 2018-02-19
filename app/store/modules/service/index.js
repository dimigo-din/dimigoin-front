import { getServiceList } from '../../../src/api'

import * as types from './mutation-types'

export default {
  namespaced: true,

  state: {
    serviceList: []
  },

  mutations: {
    [types.UPDATE_SERVICE_LIST] (state, { serviceList }) {
      state.serviceList = serviceList
    }
  },

  actions: {
    async fetchServiceList ({ commit }) {
      const serviceList = await getServiceList()
      commit(types.UPDATE_SERVICE_LIST, { serviceList })
    }
  }
}
