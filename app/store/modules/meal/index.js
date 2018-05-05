import { getTodayMeal } from '@/src/api'

const MEAL_REQUEST = 'MEAL:MEAL_REQUEST'
const MEAL_SUCCESS = 'MEAL:MEAL_SUCCESS'

export default {
  namespaced: true,

  state: {
    breakfast: '',
    lunch: '',
    dinner: '',
    snack: '',
    isFetched: false
  },

  mutations: {
    [MEAL_REQUEST] (state) {
      state.pending = true
    },

    [MEAL_SUCCESS] (state, { meal }) {
      state.breakfast = meal.breakfast
      state.lunch = meal.lunch
      state.dinner = meal.dinner
      state.snack = meal.snack

      state.isFetched = true
    }
  },

  actions: {
    async fetchMeal ({commit}) {
      commit(MEAL_REQUEST)
      commit(MEAL_SUCCESS, {
        meal: await getTodayMeal()
      })
    }
  }
}
