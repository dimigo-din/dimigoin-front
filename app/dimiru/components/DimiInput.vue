<script>
export default {
  name: 'DimiInput',

  props: {
    value: {
      type: String,
      default: ''
    },
    errorMessage: {
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
      :class="computedClass"
      v-model="innerValue"
      :type="type"
      :placeholder="placeholder"
      @keyup.enter="$emit('enter')">
    <p
      v-if="errorMessage"
      class="input__error-message"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
}

.input {
  appearance: none;
  background-color: $gray-lighten;
  border: 0;
  border-radius: 20px;
  box-sizing: border-box;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: inherit;
  padding: 0.75em 1.75em;
  width: 100%;

  &::placeholder {
    color: $gray;
  }

  &--error {
    background-color: lighten($red, 35%);
  }

  &__error-message {
    color: $red;
    font-size: 12px;
    margin-top: 0.375em;
    padding-left: 1em;
    position: absolute;
  }
}

</style>
