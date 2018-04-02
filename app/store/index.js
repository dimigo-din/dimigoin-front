import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import meal from './modules/meal'

Vue.use(Vuex)

/**
 * WARN: The root store MUST NOT have any state or mutations, actions. Module is everything.
 */
export default new Vuex.Store({
  modules: { account, meal },
  strict: process.env.NODE_ENV !== 'production'
})
