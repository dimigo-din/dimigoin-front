<script>
import Illust from '@/assets/register-side-3.svg'
import RegisterStepWrapper from './RegisterStepWrapper.vue'
import InputData from './input-data'

export default {
  name: 'RegisterStepThree',
  components: { RegisterStepWrapper },
  props: {
    onVerify: {
      type: Function,
      required: true
    },
    onLogout: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      illust: Illust,
      pending: false,
      formData: {
        authcode: new InputData()
      }
    }
  },

  created () {
    if (!this.$store.getters['account/isLoggedIn'] ||
      !this.$store.getters['account/needVerify']) this.$router.back()
  },

  methods: {
    async confirm () {
      this.pending = true

      try {
        await this.onVerify(this.formData.authcode)
      } catch (err) {
        this.formData.authcode.error = true
      }

      this.pending = false
    }
  }
}
</script>

<template>
  <register-step-wrapper :illust="illust">
    <template slot="title">Step 3. 인증 코드 입력</template>
    <div
      slot="form"
      class="form"
    >
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-3"
          for="input-authcode"
        >
          인증 코드
        </label>
        <div class="form__input col-xs">
          <dimi-input
            id="input-authcode"
            v-model="formData.authcode.value"
            placeholder="인증코드를 정확하게 입력하세요"
            @changed.once="formData.authcode.error=false"
          />
          <dimi-error-message
            v-if="formData.authcode.error"
          />
        </div>
      </div>
      <div class="navigation">
        <div class="navigation__item navigation__item--start">
          <dimi-button
            gray
            @click="onLogout"
          >
            로그아웃
          </dimi-button>
        </div>
        <div class="navigation__item">
          <div class="navigation__circle" />
          <div class="navigation__circle" />
          <div class="navigation__circle navigation__circle--active" />
        </div>
        <div class="navigation__item navigation__item--end">
          <dimi-button
            :loading="pending"
            @click="confirm"
          >
            인증
          </dimi-button>
        </div>
      </div>
    </div>
  </register-step-wrapper>
</template>

<style lang="scss" scoped>
.register__form .navigation {
  margin-top: 2rem;
}
</style>
