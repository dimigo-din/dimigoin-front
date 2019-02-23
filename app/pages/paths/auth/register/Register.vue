<script>
import Brand from '@/assets/brand.svg'
import RegisterStepOne from './RegisterStepOne.vue'
import RegisterStepTwo from './RegisterStepTwo.vue'
import RegisterStepThree from './RegisterStepThree.vue'
import RegisterSuccess from './RegisterSuccess.vue'
import { register } from '@/src/api/auth'

export default {
  name: 'Register',
  components: {
    Brand,
    RegisterStepOne,
    RegisterStepTwo,
    RegisterStepThree,
    RegisterSuccess
  },
  data: () => ({
    step: 1,
    formData: {
      name: '',
      birthday: '',
      gender: '',
      email: '',
      phone: '',
      id: '',
      password: '',
      repassword: ''
    },
    done: false
  }),

  methods: {
    async onRegister () {
      await register(this.formData)
      this.done = true
    },

    async onVerify (authcode) {
      await this.$store.dispatch('account/verify', { authcode })
      this.$router.push({ name: 'main' })
    },

    async onLogout () {
      await this.$store.dispatch('account/logout')
    }
  }
}
</script>

<template>
  <div class="register">
    <h1 class="register__title">
      <div @click="() => $router.push({ name: 'login' })">
        <brand
          style="
            height: 40px;
            cursor: pointer;
          "
        />
      </div>
      <span class="register__subtitle">
        회원가입
      </span>
    </h1>
    <div class="register__content">
      <register-step-three
        v-if="$store.getters['account/needVerify']"
        :on-verify="onVerify"
        :on-logout="onLogout"
      />
      <register-success
        v-else-if="done"
        v-bind="successInfo"
      />
      <register-step-one
        v-else-if="step === 1"
        :form-data="formData"
        @next="() => step = 2"
      />
      <register-step-two
        v-else-if="step === 2"
        :form-data="formData"
        :on-register="onRegister"
        @previous="() => step = 1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    display: flex;
    margin-top: 5rem;
    font-size: 36px;
    font-weight: $font-weight-extra-bold;
    user-select: none;
    word-spacing: 0.325em;
  }

  &__subtitle {
    padding-left: 0.5em;
    font-size: 36px;
    font-weight: $font-weight-regular;
  }

  &__content {
    display: flex;
    height: 50%;
    align-items: center;
    margin-top: 3rem;
  }
}
</style>
