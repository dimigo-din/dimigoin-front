<script>
export default {
  name: 'DimiError',

  props: {
    validation: {
      type: Object,
      default: function () {}
    }
  },

  data () {
    return {
      errorMessage: {
        required: '값을 입력해주세요.',
        numeric: '숫자만 입력해주세요.',
        email: '유효한 형식의 이메일을 입력해주세요.',
        maxLength: '유효한 길이의 값을 입력해주세요.',
        minLength: '유효한 길이의 값을 입력해주세요.',
        sameAs: '값이 일치하지 않습니다.'
      }
    }
  },

  computed: {
    error () {
      var validators = ['required', 'numeric', 'email', 'maxLength', 'minLength', 'sameAs']
      for (var idx = 0; idx < validators.length; idx++) {
        if (
          this.validation.hasOwnProperty(validators[idx]) &&
          !this.validation[validators[idx]]
        ) {
          return this.errorMessage[validators[idx]]
        }
      }
      return ''
    }
  }
}
</script>

<template>
  <p
    v-if="validation.$dirty"
    class="error-message"
  >
    {{ error }}
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
