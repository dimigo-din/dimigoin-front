import NotFound from '@/pages/NotFound.vue'
const types = ['O', 'P', 'S', 'D', 'T']

export default type => ({
  components: { NotFound },
  data: () => ({ rejected: false }),
  created () {
    if (process.env.NODE_ENV !== 'production') return
    if (types.indexOf(this.$store.state.account.informations.userType) < types.indexOf(type)) this.rejected = true
  }
})
