<script>
import { required } from 'vuelidate/lib/validators'
import Illust from '@/assets/register-side-3.svg'
import RegisterStepWrapper from './RegisterStepWrapper.vue'

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
        authcode: ''
      }
    }
  },

  validations: {
    formData: {
      authcode: {
        required
      }
    }
  },

  created () {
    if (!this.$store.getters['account/isLoggedIn'] ||
      !this.$store.getters['account/needVerify']) this.$router.back()
  },

  methods: {
    async confirm () {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) return
      this.pending = true

      try {
        await this.onVerify(this.formData.authcode)
      } catch (err) {
        console.error('authcode', err)
        this.$swal('에러!', err.message, 'error')
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
        <dimi-input
          id="input-authcode"
          v-model="formData.authcode"
          class="form__input col-xs"
          placeholder="인증 코드를 정확하게 입력하세요"
          :error="$v.formData.authcode.$error"
        />
        <dimi-error :validation="$v.formData.authcode" />
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

.error-message {
  margin-right: 1.2rem;
  text-align: right;
}
</style>
