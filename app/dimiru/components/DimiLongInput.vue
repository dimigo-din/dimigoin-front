<script>
export default {
  name: 'DimiLongInput',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    height: {
      type: Number,
      required: true
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
    },
    value (val) {
      this.innerValue = val
    }
  }
}
</script>

<template>
  <div
    :style="{height: height+'px'}"
    class="input-wrapper"
  >
    <textarea
      v-model="innerValue"
      :type="type"
      :placeholder="placeholder"
      :style="{height: height+'px'}"
      class="input"
    />
  </div>
</template>

<style lang="scss">
@import '../scss/vars';

.input-wrapper {
  position: relative;
  width: 100%;
}

.input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75em 1.75em;
  border: 0;
  appearance: none;
  background-color: $gray-lighten;
  border-radius: 20px;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: inherit;
  line-height: 20pt;

  &::placeholder {
    color: $gray;
  }
}
</style>
