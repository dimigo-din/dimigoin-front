<script>
export default {
  name: 'DimiError',

  props: {
    message: {
      type: String,
      default: '유효한 값이 아닙니다.'
    }
  }
}
</script>

<template>
  <p class="error-message">
    {{ message }}
  </p>
</template>

<style lang="scss">
@import '../scss/vars';

.error-message {
  position: relative;
  width: 100%;
  padding-left: 1em;
  margin: 0.25rem;
  color: $red;
  font-size: 12px;
}
</style>
