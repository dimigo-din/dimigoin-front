<script>
import { register } from '@/src/api/auth'
import awesomeMixin from './mixins/preserve-state'
import validator from './mixins/validator'

export default {
  name: 'RegisterStepTwo',

  mixins: [ awesomeMixin, validator ],

  data () {
    return {
      pending: false,
      formData: {
        id: {
          value: '',
          error: ''
        },

        password: {
          value: '',
          error: ''
        },

        repassword: {
          value: '',
          error: ''
        }
      }
    }
  },

  created () {
    if (Object.keys(this.mergeFormData()).length < 8) this.$router.push({ name: 'register/step/1' })
  },

  methods: {
    previous () {
      this.$router.push({
        name: 'register/step/1',
        params: {
          formData: this.mergeFormData()
        }
      })
    },

    async next () {
      if (this.pending) return

      if (!this.validate()) return

      if (!this.isRetypedPasswordOk()) {
        this.formData.repassword.error = '입력하신 비밀번호와 일치하지 않습니다.'
        return
      }

      try {
        this.pending = true
        const result = this.mergeFormData()
        await register(Object.keys(result).reduce((pv, cv) => {
          pv[cv] = result[cv].value
          return pv
        }, {}))
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.error('register', err)
        this.$swal('에러!', err.message, 'error')
      }
      this.pending = false
    },

    isRetypedPasswordOk () {
      return this.formData.password.value === this.formData.repassword.value
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
          for="input-id"
        >
          아이디
        </label>
        <dimi-input
          id="input-id"
          v-model="formData.id.value"
          :error-message="formData.id.error"
          class="register__input"
          placeholder="아이디를 입력하세요"
        />
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="input-password"
        >
          비밀번호
        </label>
        <dimi-input
          id="input-password"
          v-model="formData.password.value"
          :error-message="formData.password.error"
          type="password"
          class="register__input"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="input-repassword"
        >
          비밀번호 확인
        </label>
        <dimi-input
          id="input-repassword"
          v-model="formData.repassword.value"
          :error-message="formData.repassword.error"
          type="password"
          class="register__input"
          placeholder="비밀번호를 한번 더 입력하세요"
        />
      </div>
      <div class="register__nav">
        <div class="register__nav__start">
          <a
            class="register__nav__link register__nav__link--previous"
            @click="previous"
          >
            <span class="icon-arrow-slim-left" />뒤로
          </a>
        </div>
        <div class="register__circles">
          <div class="register__nav__circle register__nav__circle--active" />
          <div class="register__nav__circle" />
          <div class="register__nav__circle" />
        </div>
        <div class="register__nav__end">
          <a
            class="register__nav__link register__nav__link--next"
            @click="next"
          >
            {{ pending ? '로딩 중...' : '완료' }}
            <span
              v-if="!pending"
              class="icon-ok"
            />
          </a>
        </div>
      </div>
    </div>
  </dimi-card>
</template>

<style lang="scss" scoped>
.form__label {
  flex: 0 0 95px;
}
</style>
