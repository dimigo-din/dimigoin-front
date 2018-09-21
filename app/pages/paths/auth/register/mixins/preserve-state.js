export default {
  created () {
    const passedFormData = this.$route.params.formData

    if (passedFormData) {
      this.formData = {
        ...this.formData,
        ...Object.keys(passedFormData)
          .filter(v => this.formData[v])
          .reduce((pv, cv) => {
            pv[cv] = passedFormData[cv]
            return pv
          }, {})
      }
    }
  },

  methods: {
    mergeFormData () {
      return { ...this.$route.params.formData, ...this.formData }
    }
  }
}
