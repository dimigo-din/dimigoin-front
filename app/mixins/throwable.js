export default {
  methods: {
    $_throwable_handleError (err) {
      this.$swal({
        type: 'error',
        title: '에러!',
        text: err.message
      })
    }
  },
  errorCaptured (err) {
    this.$_throwable_handleError(err)
    return false
  }
}
