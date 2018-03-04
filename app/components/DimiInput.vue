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
  padding: 0.75em 0 0.75em 1.75em;

  ::placeholder {
    color: $gray-light;
  }
}
</style>
