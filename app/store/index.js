import account from './modules/account'
import meal from './modules/meal'
import service from './modules/service'

/**
 * WARN: The root store MUST NOT have any state or mutations, actions. Module is everything.
 */
export default {
  strict: process.env.NODE_ENV !== 'production',
  modules: { account, meal, service },
}
