<script>
export default {
  name: 'DimiInput',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    errorMessage: {
      type: String,
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
        'input': true,
        'input--error': this.errorMessage
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
  }
}
</script>

<template>
  <div class="input-wrapper">
    <input
      :id="id"
      v-model="innerValue"
      :class="computedClass"
      :type="type"
      :placeholder="placeholder"
      @keyup.enter="$emit('enter')"
    >
    <p
      v-if="errorMessage"
      class="input__error-message"
    >
      {{ errorMessage }}
    </p>
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

  &::placeholder {
    color: $gray;
  }

  &--error {
    background-color: lighten($red, 35%);
  }

  &__error-message {
    position: absolute;
    padding-left: 1em;
    margin-top: 0.375em;
    color: $red;
    font-size: 12px;
  }
}

</style>
