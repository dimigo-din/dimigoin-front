<script>
import { mapActions, mapState } from 'vuex'

import DimiButton from './DimiButton.vue'
import DimiCard from './DimiCard.vue'
import DimiMeal from './DimiMeal.vue'
import DimiInput from './DimiInput.vue'

export default {
  name: 'TheLogin',

  components: { DimiButton, DimiCard, DimiMeal, DimiInput },

  computed: {
    ...mapState('account', {
      pending: ({ auth }) => auth.pending
    })
  },

  methods: {
    ...mapActions('account', ['login'])
  }
}
</script>

<template>
  <div class="container">
    <dimi-card
      class="c-login"
      shadow
      style="width: 100%"
    >
      <div class="c-login__section">
        <h2 class="c-login__section__title">오늘의 급식</h2>
        <div class="c-login__section__content">
          <dimi-meal/>
        </div>
      </div>
      <div class="c-login__section">
        <h2 class="c-login__section__title">로그인</h2>
        <div class="c-login__section__content c-login__section__content--mt">
          <dimi-input
            placeholder="아이디"
            type="text"
          />
          <dimi-input
            placeholder="비밀번호"
            type="password"
          />
          <dimi-button
            class="c-login__submit-btn"
            :loading="pending"
            large
            @click="login"
          >LOGIN</dimi-button>
        </div>
      </div>
    </dimi-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    height: 100vh;
}

.c-login {
    display: flex;
    justify-content: center;
    &__section {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 4em;
        &:not(:last-child) {
            border-right: solid 1px $gray-light;
        }
        &__title {
            position: relative;
            font-size: 2.25em;
            @include font-extra-bold;
        }
        &__content {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 3em;
            &--mt {
                margin-top: 7em;
            }
        }
      // Specify parent element due to css priority rules.
      & .c-login__submit-btn {
          margin-top: 3em;
          align-self: center;
          padding: .625em 2.75em;
      }
    }
}
</style>
