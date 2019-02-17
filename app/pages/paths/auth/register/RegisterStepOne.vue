<script>
import InputData from './input-data'
import RegisterStepWrapper from './RegisterStepWrapper.vue'
import Illust from '@/assets/register-side-1.svg'
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'

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
      },
      paddingLeftNum: '7em'
    }
  },

  validations: {
    internalFormData: {
      name: {
        value: {
          required,
          minLength: minLength(2)
        }
      },
      birthday: {
        value: {
          required
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
          numeric
        }
      },
      email: {
        value: {
          required,
          email
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
          :class="{ 'input-name--error': $v.internalFormData.name.value.$error }"
          placeholder="실명을 입력하세요"
        />
        <dimi-error
          v-if="!$v.internalFormData.name.value.required"
        >
          필수 정보입니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.name.value.minLength"
        >
          올바른 이름을 입력하세요.
        </dimi-error>
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
          :class="{ 'input-birthday--error': $v.internalFormData.birthday.value.$error }"
          placeholder="생년월일을 8자리로 입력하세요"
          type="date"
        />
        <dimi-error
          v-if="!$v.internalFormData.birthday.value.required"
        >
          필수 정보입니다.
        </dimi-error>
      </div>
      <div class="form__field form__field--margin row middle-xs">
        <h4 class="form__label col-xs-12 col-md-2">성별</h4>
        <div class="col-xs">
          <div
            class="row"
            :class="{ 'input-gender--error': $v.internalFormData.gender.value.$error }"
          >
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
          </div>
          <dimi-error
            v-if="!$v.internalFormData.gender.value.required"
          >
            필수 정보입니다.
          </dimi-error>
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
          :class="{ 'input-phone--error': $v.internalFormData.phone.value.$error }"
          placeholder="대쉬(-) 없이 전화번호를 입력하세요"
        />
        <dimi-error
          v-if="!$v.internalFormData.phone.value.required"
        >
          필수 정보입니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.phone.value.numeric"
        >
          올바른 전화번호를 입력하세요.
        </dimi-error>
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
          :class="{ 'input-email--error': $v.internalFormData.email.value.$error }"
          placeholder="이메일 주소를 입력하세요"
          type="email"
        />
        <dimi-error
          v-if="!$v.internalFormData.email.value.required"
        >
          필수 정보입니다.
        </dimi-error>
        <dimi-error
          v-if="!$v.internalFormData.email.value.email"
        >
          올바른 이메일을 입력하세요.
        </dimi-error>
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
@import '../../../../scss/variables';

.error-message {
  position: relative;
  width: 100%;
  padding-left: 1em;
  margin-top: 0.5em;
  color: $red;
  font-size: 12px;
}

</style>
