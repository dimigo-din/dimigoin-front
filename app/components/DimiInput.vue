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
  appearance: none;
  background-color: $gray-lighten;
  border: 0;
  border-radius: 20px;
  font-family: 'NanumSquareRound', sans-serif;
  height: 3em;
  min-width: 25em;
  padding-left: 2em;

  &:not(:last-child) {
    margin-bottom: 2em;
  }
}
</style>
