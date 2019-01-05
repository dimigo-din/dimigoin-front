<script>
export default {
  name: 'RegisterStepThree',

  data () {
    return {
      pending: false,
      formData: {
        authcode: {
          value: '',
          error: ''
        }
      }
    }
  },

  created () {
    if (!this.$store.state.account.auth.isLoggedIn) this.$router.back()
  },

  methods: {
    async confirm () {
      try {
        this.pending = true
        await this.$store.dispatch('account/verify', { authcode: this.formData.authcode.value })
      } catch (err) {
        this.formData.authcode.error = err.message
      }
      this.pending = false
      this.$router.push({ name: 'main' })
    }
  }
}
</script>

<template>
  <dimi-card shadow>
    <div class="register__form">
      <div class="form__field">
        <label
          class="form__label"
          for="input-authcode"
        >
          인증 코드
        </label>
        <dimi-input
          id="input-authcode"
          v-model="formData.authcode.value"
          :error-message="formData.authcode.error"
          class="register__input"
          placeholder="인증코드를 정확하게 입력하세요"
        />
      </div>
      <div class="register__final-btn">
        <dimi-button
          :loading="pending"
          @click="confirm"
        >
          인증
        </dimi-button>
      </div>
    </div>
  </dimi-card>
</template>

<style lang="scss" scoped>
  .form__label {
    flex: 0 0 70px;
  }
</style>
