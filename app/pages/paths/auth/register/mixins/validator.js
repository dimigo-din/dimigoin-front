export default {
  methods: {
    getInvalidDataKeys () {
      return Object.keys(this.internalFormData)
        .filter(v => !this.internalFormData[v].value)
    },

    updateErrors (bads) {
      Object.keys(this.internalFormData).forEach(key => {
        if (bads.indexOf(key) !== -1) {
          this.internalFormData[key].error = '정보를 채워주세요.'
        } else {
          this.internalFormData[key].error = ''
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
