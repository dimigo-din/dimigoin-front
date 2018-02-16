import account from './modules/account/' // Weird error occured if omit lastest '/'
import meal from './modules/meal'

export default {
  strict: process.env.NODE_ENV !== 'production',
  modules: { account, meal }
}
