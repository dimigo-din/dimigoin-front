import { createNamespacedHelpers } from 'vuex'
import { NAMESPACE } from './mutation-types'

export const { mapState, mapGetters, mapActions } = createNamespacedHelpers(NAMESPACE)
