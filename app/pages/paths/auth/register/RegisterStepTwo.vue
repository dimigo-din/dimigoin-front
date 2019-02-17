<script>
import InputData from '@/pages/paths/auth/register/input-data'
import Illust from '@/assets/register-side-2.svg'
import RegisterStepWrapper from './RegisterStepWrapper.vue'
import { required, alphaNum, minLength } from 'vuelidate/lib/validators'

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
          required,
          alphaNum,
          minLength: minLength(5)
        }
      },
      password: {
        value: {
          required,
          minLength: minLength(8)
        }
      },
      repassword: {
        value: {
          required,
          minLength: minLength(8)
          // sameAs: sameAs('internalFormData.password')
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
      if (this.pending) return
      this.$v.internalFormData.$touch()
      if (this.$v.internalFormData.$error) return
      if (!this.isRetypedPasswordOk()) {
        this.internalFormData.repassword.error = '비밀번호가 일치하지 않습니다.'
        return
      } else {
        this.internalFormData.repassword.error = ''
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
          :class="{ 'input-id--error': $v.internalFormData.id.value.$error }"
          placeholder="아이디를 입력하세요"
        />
        <dimi-error
          v-if="!$v.internalFormData.id.value.required"
        >
          필수 정보입니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.id.value.alphaNum"
        >
          아이디는 영소문자만 사용할 수 있습니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.id.value.minLength"
        >
          5자 이상으로 입력하세요.
        </dimi-error>
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
          :class="{ 'input-password--error': $v.internalFormData.password.value.$error }"
          placeholder="비밀번호를 입력하세요"
        />
        <dimi-error
          v-if="!$v.internalFormData.password.value.required"
        >
          필수 정보입니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.password.value.minLength"
        >
          8자 이상으로 입력하세요.
        </dimi-error>
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
          :class="{ 'input-repassword--error': $v.internalFormData.repassword.value.$error }"
          placeholder="비밀번호를 한번 더 입력하세요"
        />
        <dimi-error
          v-if="!$v.internalFormData.repassword.value.required"
        >
          필수 정보입니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.repassword.value.minLength"
        >
          8자 이상으로 입력하세요.
        </dimi-error>
        <dimi-error
          :class="internalFormData.repassword.error"
        >
          {{ internalFormData.repassword.error }}
        </dimi-error>
        <!-- <dimi-error
          v-if="!$v.internalFormData.repassword.value.sameAs"
        >
          비밀번호가 일치하지 않습니다.
        </dimi-error> -->
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

</style>
