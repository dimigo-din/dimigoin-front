<script>
import { required } from 'vuelidate/lib/validators'
import InputData from '@/pages/paths/auth/register/input-data'
import Illust from '@/assets/register-side-2.svg'
import RegisterStepWrapper from './RegisterStepWrapper.vue'

export default {
  name: 'RegisterStepTwo',
  components: { RegisterStepWrapper },

  props: {
    formData: {
      type: Object,
      required: true
    },

    onRegister: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      pending: false,
      illust: Illust,
      internalFormData: {
        ...InputData.copyData(
          this.formData,
          ['id', 'password', 'repassword']
        )
      }
    }
  },

  validations: {
    internalFormData: {
      id: {
        value: {
          required
        }
      },
      password: {
        value: {
          required
        }
      },
      repassword: {
        value: {
          required,
          match: function (repassword) {
            return (repassword === this.internalFormData.password.value)
          }
        }
      }
    }
  },

  methods: {
    previous () {
      this.$emit('sync', this.internalFormData)
      this.$emit('previous')
    },

    async next () {
      this.$v.internalFormData.$touch()
      if (this.pending) return
      if (this.$v.internalFormData.$error) return
      if (!this.isRetypedPasswordOk()) {
        this.internalFormData.repassword.error = '입력하신 비밀번호와 일치하지 않습니다.'
        return
      }

      this.pending = true
      try {
        this.$emit('sync', this.internalFormData)
        await this.onRegister()
      } catch (err) {
        console.error('register', err)
        this.$swal('에러!', err.message, 'error')
      }
      this.pending = false
    },

    isRetypedPasswordOk () {
      return this.internalFormData.password.value === this.internalFormData.repassword.value
    }
  }
}
</script>

<template>
  <register-step-wrapper :illust="illust">
    <template slot="title">Step 2. 아이디 / 비밀번호 입력</template>
    <div
      slot="form"
      class="form"
    >
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-3"
          for="input-id"
        >
          아이디
        </label>
        <dimi-input
          id="input-id"
          v-model="internalFormData.id.value"
          class="form__input col-xs"
          placeholder="아이디를 입력하세요"
          :error="$v.internalFormData.id.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.id.value.$dirty && !$v.internalFormData.id.value.required"
          message="아이디를 입력해주세요."
        />
      </div>
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-3"
          for="input-password"
        >
          비밀번호
        </label>
        <dimi-input
          id="input-password"
          v-model="internalFormData.password.value"
          type="password"
          class="form__input col-xs"
          placeholder="비밀번호를 입력하세요"
          :error="$v.internalFormData.password.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.password.value.$dirty && !$v.internalFormData.password.value.required"
          message="비밀번호를 입력해주세요."
        />
      </div>
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-4"
          for="input-repassword"
        >
          비밀번호 확인
        </label>
        <dimi-input
          id="input-repassword"
          v-model="internalFormData.repassword.value"
          type="password"
          class="form__input col-xs"
          placeholder="비밀번호를 한번 더 입력하세요"
          :error="$v.internalFormData.repassword.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.repassword.value.$dirty && !$v.internalFormData.repassword.value.required"
          message="비밀번호를 다시 입력해주세요."
        />
        <dimi-error
          v-else-if="!$v.internalFormData.repassword.value.match"
          message="비밀번호가 일치하지 않습니다."
        />
      </div>
      <div class="navigation">
        <div class="navigation__item navigation__item--start">
          <a
            class="navigation__link navigation__link--previous"
            @click="previous"
          >
            <span class="icon-arrow-slim-left" />뒤로
          </a>
        </div>
        <div class="navigation__item">
          <div class="navigation__circle" />
          <div class="navigation__circle navigation__circle--active" />
          <div class="navigation__circle" />
        </div>
        <div class="navigation__item navigation__item--end">
          <a
            class="navigation__link navigation__link--next"
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
  </register-step-wrapper>
</template>

<style lang="scss" scoped>
.error-message {
  margin-right: 1.2rem;
  text-align: right;
}
</style>
