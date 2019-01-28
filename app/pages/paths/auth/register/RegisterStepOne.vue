<script>
import validator from './mixins/validator'
import InputData from './input-data'
import RegisterStepWrapper from './RegisterStepWrapper.vue'
import Illust from '@/assets/register-side-1.svg'

export default {
  name: 'RegisterStepOne',
  components: { RegisterStepWrapper },
  mixins: [ validator ],

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

  methods: {
    next () {
      if (!this.validate()) return
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
          :error-message="internalFormData.name.error"
          class="form__input col-xs"
          placeholder="실명을 입력하세요"
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
          :error-message="internalFormData.birthday.error"
          class="form__input col-xs"
          placeholder="생년월일을 8자리로 입력하세요"
          type="date"
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
          :error-message="internalFormData.phone.error"
          class="form__input col-xs"
          placeholder="대쉬(-) 없이 전화번호를 입력하세요"
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
          :error-message="internalFormData.email.error"
          class="form__input col-xs"
          placeholder="이메일 주소를 입력하세요"
          type="email"
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

</style>
