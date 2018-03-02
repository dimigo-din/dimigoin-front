<script>
export default {
  name: 'DimiInput',

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      innerValue: this.value
    }
  },

  watch: {
    innerValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<template>
  <input
    class="input"
    v-model="innerValue">
</template>

<style lang="scss">
.input {
  font-family: 'NanumSquareRound', sans-serif;
  appearance: none;
  border: none;
  height: 3em;
  min-width: 25em;
  background-color: $gray-lighten;
  border-radius: 20px;
  &:not(:last-child) {
    margin-bottom: 2em;
  }
  padding-left: 2em;
}
</style>
