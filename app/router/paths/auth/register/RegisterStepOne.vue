<script>
import DimiButtonRadio from '../../../../components/DimiButtonRadio.vue'
import DimiCard from '../../../../components/DimiCard.vue'
import DimiInput from '../../../../components/DimiInput.vue'

import awesomeMixin from './mixins/preserve-state'
import validator from './mixins/validator'

export default {
  name: 'RegisterStepOne',

  components: { DimiCard, DimiButtonRadio, DimiInput },

  mixins: [ awesomeMixin, validator ],

  data () {
    return {
      formData: {
        name: {
          value: '',
          error: ''
        },

        birthday: {
          value: '',
          error: ''
        },

        gender: {
          value: '',
          error: ''
        },

        email: {
          value: '',
          error: ''
        },

        phone: {
          value: '',
          error: ''
        }
      }
    }
  },

  methods: {
    next () {
      if (!this.validate()) return

      this.$router.push({
        name: 'register/step/2',
        params: {
          formData: this.mergeFormData()
        }
      })
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
          for="input-name">이름</label>
        <dimi-input
          class="register__input"
          id="input-name"
          placeholder="실명을 입력하세요"
          v-model="formData.name.value"
          :error-message="formData.name.error"
        />
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="input-birthday">생일</label>
        <dimi-input
          class="register__input"
          id="input-birthday"
          placeholder="생년월일을 8자리로 입력하세요"
          type="date"
          v-model="formData.birthday.value"
          :error-message="formData.birthday.error"
        />
      </div>
      <div class="form__field">
        <h4 class="form__label">성별</h4>
        <div class="gender-radio">
          <dimi-button-radio
            class="gender-radio__item"
            name="m"
            v-model="formData.gender.value"
          >남성</dimi-button-radio>
          <dimi-button-radio
            class="gender-radio__item"
            name="f"
            v-model="formData.gender.value"
          >여성</dimi-button-radio>
        </div>
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="input-phone">전화번호</label>
        <dimi-input
          class="register__input"
          id="input-phone"
          placeholder="대쉬(-) 없이 전화번호를 입력하세요"
          v-model="formData.phone.value"
          :error-message="formData.phone.error"
        />
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="input-email">이메일</label>
        <dimi-input
          class="register__input"
          id="input-email"
          placeholder="이메일 주소를 입력하세요"
          type="email"
          v-model="formData.email.value"
          :error-message="formData.email.error"
        />
      </div>
      <div class="register__nav">
        <div class="register__nav__start"/>
        <div class="register__circles">
          <div class="register__nav__circle register__nav__circle--active"/>
          <div class="register__nav__circle"/>
          <div class="register__nav__circle"/>
        </div>
        <div class="register__nav__end">
          <a
            class="register__nav__link register__nav__link--next"
            @click="next">다음 단계<span class="icon-arrow-slim-right"/></a>
        </div>
      </div>
    </div>
  </dimi-card>
</template>

<style lang="scss" scoped>
.form__label {
  flex: 0 0 60px;
}
</style>
