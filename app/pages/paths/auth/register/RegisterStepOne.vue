<script>
import { required, numeric, email, maxLength, minLength } from 'vuelidate/lib/validators'
import RegisterStepWrapper from './RegisterStepWrapper.vue'
import Illust from '@/assets/register-side-1.svg'

export default {
  name: 'RegisterStepOne',
  components: { RegisterStepWrapper },

  props: {
    formData: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      illust: Illust
    }
  },

  validations: {
    formData: {
      name: {
        required,
        maxLength: maxLength(30)
      },
      birthday: {
        required
      },
      email: {
        required,
        email
      },
      gender: {
        required
      },
      phone: {
        required,
        numeric,
        maxLength: maxLength(11),
        minLength: minLength(9)
      }
    }
  },

  methods: {
    next () {
      this.$v.formData.$touch()
      if (this.$v.formData.$error) return
      this.$emit('sync', this.formData)
      this.$emit('next')
    }
  }
}
</script>

<template>
  <register-step-wrapper :illust="illust">
    <template slot="title">Step 1. 기본 정보 입력</template>
    <div
      slot="form"
      class="form"
    >
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-2"
          for="input-name"
        >
          이름
        </label>
        <dimi-input
          id="input-name"
          v-model="formData.name"
          class="form__input col-xs"
          placeholder="실명을 입력하세요"
          :error="$v.formData.name.$error"
        />
        <dimi-error :validation="$v.formData.name" />
      </div>
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-2"
          for="input-birthday"
        >
          생일
        </label>
        <dimi-input
          id="input-birthday"
          v-model="formData.birthday"
          class="form__input col-xs"
          placeholder="생년월일을 8자리로 입력하세요"
          type="date"
          :error="$v.formData.birthday.$error"
        />
        <dimi-error :validation="$v.formData.birthday" />
      </div>
      <div class="form__field form__field--margin row middle-xs">
        <h4 class="form__label col-xs-12 col-md-2">성별</h4>
        <div class="col-xs">
          <div class="row">
            <dimi-button-radio
              v-model="formData.gender"
              class="form__radio col-xs"
              name="M"
            >
              남성
            </dimi-button-radio>
            <dimi-button-radio
              v-model="formData.gender"
              class="form__radio col-xs"
              name="F"
            >
              여성
            </dimi-button-radio>
            <dimi-error :validation="$v.formData.gender" />
          </div>
        </div>
      </div>
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-3"
          for="input-phone"
        >
          전화번호
        </label>
        <dimi-input
          id="input-phone"
          v-model="formData.phone"
          class="form__input col-xs"
          placeholder="대쉬(-) 없이 전화번호를 입력하세요"
          :error="$v.formData.phone.$error"
        />
        <dimi-error :validation="$v.formData.phone" />
      </div>
      <div class="form__field row middle-xs">
        <label
          class="form__label col-xs-12 col-md-3"
          for="input-email"
        >
          이메일
        </label>
        <dimi-input
          id="input-email"
          v-model="formData.email"
          class="form__input col-xs"
          placeholder="이메일 주소를 입력하세요"
          type="email"
          :error="$v.formData.email.$error"
        />
        <dimi-error :validation="$v.formData.email" />
      </div>
      <div class="navigation">
        <div class="navigation__item navigation__item--start" />
        <div class="navigation__item">
          <div class="navigation__circle navigation__circle--active" />
          <div class="navigation__circle" />
          <div class="navigation__circle" />
        </div>
        <div class="navigation__item navigation__item--end">
          <a
            class="navigation__link navigation__link--next"
            @click="next"
          >
            다음 단계<span class="icon-arrow-right" />
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
