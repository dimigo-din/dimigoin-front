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
      :placeholder="placeholder">
    <p
      v-if="errorMessage"
      class="input__error-message"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="scss">
@import '../scss/helpers/typography';

.input-wrapper {
  position: relative;
}

.input {
  appearance: none;
  width: 100%;
  background-color: $gray-lighten;
  border: 0;
  border-radius: 20px;
  font-family: 'NanumSquareRound', sans-serif;
  padding: 0.75em 1.75em;

  &::placeholder {
    color: $gray;
  }

  &--error {
    background-color: lighten($red, 35%);
  }

  &__error-message {
    position: absolute;
    color: $red;
    padding-left: 1em;
    margin-top: 0.375em;
    @extend %h-text-s;
  }
}

</style>
