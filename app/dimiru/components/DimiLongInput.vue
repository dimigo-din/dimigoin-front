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
      :style="{ height: height + 'px', padding: '1.2em 1.5em' }"
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
</style>
