export default {
  methods: {
    getInvalidDataKeys () {
      return Object.keys(this.formData)
        .filter(v => !this.formData[v].value)
    },

    updateErrors (bads) {
      Object.keys(this.formData).forEach(key => {
        if (bads.indexOf(key) !== -1) {
          this.formData[key].error = '정보를 채워주세요.'
        } else {
          this.formData[key].error = ''
        }
      })
    },

    validate () {
      const bads = this.getInvalidDataKeys()

      this.updateErrors(bads)
      return bads.length === 0
    }
  }
}
