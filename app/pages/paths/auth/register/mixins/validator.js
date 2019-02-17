import validators from '@/src/validators'

function validate (key, value) {
  switch (key) {
    case 'birthday':
      return validators.date(value)
    case 'phone':
      return validators.phone(value)
    case 'email':
      return validators.email(value)
    default:
      return validators.required(value)
  }
}

export default {
  methods: {
    getInvalidDataKeys () {
      return Object.keys(this.internalFormData)
        .filter(k => !validate(k, this.internalFormData[k].value))
    },
    updateErrors (bads) {
      Object.keys(this.internalFormData).forEach(key => {
        this.internalFormData[key].error = bads.indexOf(key) !== -1
      })
    },

    validate () {
      const bads = this.getInvalidDataKeys()

      this.updateErrors(bads)
      return bads.length === 0
    }
  }
}
