<script>
import validator from './mixins/validator'
import InputData from './input-data'
import RegisterStepWrapper from './RegisterStepWrapper.vue'
import Illust from '@/assets/register-side-1.svg'
import validators from '@/src/validators'

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
      },
      vld: validators
    }
  },

  methods: {
    next () {
      if (!this.validate()) return
      this.$emit('sync', this.internalFormData)
      this.$emit('next')
    },
    errorShow (formData) {
      return formData.changed || formData.error
    },
    setChanged (formData) {
      formData.changed = true
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
          @changed.once="setChanged(internalFormData.name)"
        >
          <dimi-error-message
            v-if="errorShow(internalFormData.name)"
            :value="internalFormData.name.value"
            :validators="[vld.required]"
          />
        </dimi-input>
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
          @changed.once="setChanged(internalFormData.birthday)"
        >
          <dimi-error-message
            v-if="errorShow(internalFormData.birthday)"
            :value="internalFormData.birthday.value"
            :validators="[vld.required, vld.date]"
          />
        </dimi-input>
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
          <dimi-error-message
            v-if="errorShow(internalFormData.gender)"
            :value="internalFormData.gender.value"
            :validators="[vld.required]"
          />
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
          type="phone"
          @changed.once="setChanged(internalFormData.phone)"
        >
          <dimi-error-message
            v-if="errorShow(internalFormData.phone)"
            :value="internalFormData.phone.value"
            :validators="[vld.required, vld.phone]"
          />
        </dimi-input>
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
          @changed.once="setChanged(internalFormData.email)"
        >
          <dimi-error-message
            v-if="errorShow(internalFormData.email)"
            :value="internalFormData.email.value"
            :validators="[vld.required, vld.email]"
          />
        </dimi-input>
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
.input-wrapper {
  position: relative;
  width: 100%;
}
</style>
