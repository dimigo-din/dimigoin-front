<script>
export default {
  name: 'DimiErrorMessage',

  props: {
    value: {
      type: String,
      default: ''
    },
    validators: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    computedError () {
      var error = this.validators.length === 0
      this.validators.forEach(v => {
        error = error || !v(this.value)
      })
      return error
    }
  }
}
</script>

<template>
  <p
    v-if="computedError"
    class="error-message"
  >
    입력 값을 확인해주세요
  </p>
</template>

<style lang="scss" scoped>
@import '../scss/vars';

.error-message {
  position: absolute;
  padding-left: 1em;
  margin-top: 0.375em;
  color: $red;
  font-size: 12px;
}
</style>
