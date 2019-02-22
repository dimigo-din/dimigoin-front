<script>
export default {
  name: 'DimiInput',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },

  data () {
    return {
      innerValue: this.value
    }
  },

  computed: {
    computedClass () {
      return {
        'input': true
      }
    }
  },

  watch: {
    innerValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.innerValue = val
    }
  },

  methods: {
    emitEnter (event) {
      if (event instanceof KeyboardEvent) {
        this.$emit('enter', event)
      }
    }
  }
}
</script>

<template>
  <div class="input-wrapper">
    <input
      :id="id ? id : false"
      v-model="innerValue"
      :class="computedClass"
      :type="type"
      :placeholder="placeholder"
      @keyup.enter="emitEnter"
    >
    <dimi-error
      v-model="innerValue"
      errmsg = "TEST"
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
  padding: 0.75em 1.5em;
  border: 0;
  appearance: none;
  background-color: $gray-lighten;
  border-radius: 30px;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: inherit;

  &::placeholder {
    color: $gray;
  }
}

</style>
