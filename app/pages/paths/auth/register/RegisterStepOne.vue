<script>
import { required, numeric, email, maxLength, minLength } from 'vuelidate/lib/validators'
import InputData from './input-data'
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
      illust: Illust,
      internalFormData: {
        ...InputData.copyData(
          this.formData,
          ['name', 'birthday', 'email', 'gender', 'phone']
        )
      }
    }
  },

  validations: {
    internalFormData: {
      name: {
        value: {
          required
        }
      },
      birthday: {
        value: {
          required
        }
      },
      email: {
        value: {
          required,
          email
        }
      },
      gender: {
        value: {
          required
        }
      },
      phone: {
        value: {
          required,
          numeric,
          maxLength: maxLength(11),
          minLength: minLength(9)
        }
      }
    }
  },

  methods: {
    next () {
      this.$v.internalFormData.$touch()
      if (this.$v.internalFormData.$error) return
      this.$emit('sync', this.internalFormData)
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
          v-model="internalFormData.name.value"
          class="form__input col-xs"
          placeholder="실명을 입력하세요"
          :error="$v.internalFormData.name.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.name.value.required"
          message="이름을 입력해주세요."
        />
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
          v-model="internalFormData.birthday.value"
          class="form__input col-xs"
          placeholder="생년월일을 8자리로 입력하세요"
          type="date"
          :error="$v.internalFormData.birthday.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.birthday.value.required"
          message="생일을 입력해주세요."
        />
      </div>
      <div class="form__field form__field--margin row middle-xs">
        <h4 class="form__label col-xs-12 col-md-2">성별</h4>
        <div class="col-xs">
          <div class="row">
            <dimi-button-radio
              v-model="internalFormData.gender.value"
              class="form__radio col-xs"
              name="M"
            >
              남성
            </dimi-button-radio>
            <dimi-button-radio
              v-model="internalFormData.gender.value"
              class="form__radio col-xs"
              name="F"
            >
              여성
            </dimi-button-radio>
            <dimi-error
              v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.gender.value.required"
              message="성별을 입력해주세요."
            />
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
          v-model="internalFormData.phone.value"
          class="form__input col-xs"
          placeholder="대쉬(-) 없이 전화번호를 입력하세요"
          :error="$v.internalFormData.phone.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.phone.value.required"
          message="전화번호를 입력해주세요."
        />
        <dimi-error
          v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.phone.value.numeric"
          message="유효한 전화번호를 입력해주세요."
        />
        <dimi-error
          v-else-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.phone.value.maxLength || !$v.internalFormData.phone.value.minLength"
          message="유효한 길이의 전화번호를 입력해주세요."
        />
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
          v-model="internalFormData.email.value"
          class="form__input col-xs"
          placeholder="이메일 주소를 입력하세요"
          type="email"
          :error="$v.internalFormData.email.value.$error"
        />
        <dimi-error
          v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.email.value.required"
          message="이메일을 입력해주세요."
        />
        <dimi-error
          v-if="$v.internalFormData.name.value.$dirty && !$v.internalFormData.email.value.email"
          message="유효한 이메일을 입력해주세요."
        />
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
