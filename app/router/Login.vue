<script>
import { mapActions, mapState } from 'vuex'

import DimiButton from '../components/DimiButton.vue'
import DimiCard from '../components/DimiCard.vue'
import DimiMeal from '../components/DimiMeal.vue'
import DimiInput from '../components/DimiInput.vue'
import DimiDivider from '../components/DimiDivider.vue'

export default {
  name: 'TheLogin',

  components: { DimiButton, DimiCard, DimiMeal, DimiInput, DimiDivider },

  data () {
    return {
      id: '',
      password: '',
      pending: false,
      error: false
    }
  },

  computed: {
    ...mapState('account', {
      isLoggedIn: ({ auth }) => auth.isLoggedIn
    })
  },

  watch: {
    isLoggedIn () {
      if (this.isLoggedIn) this.$router.push('/')
    }
  },

  created () {
    if (this.isLoggedIn) this.$router.push('/')
  },

  methods: {
    async confirmLoggingIn () {
      try {
        this.pending = true
        await this.login({ id: this.id, password: this.password })
      } catch (err) {
        // TODO message according to error type
        this.error = err
      }
      this.pending = false
    },
    ...mapActions('account', ['login'])
  }
}
</script>

<template>
  <div class="container container--naive">
    <dimi-card
      class="c-login"
      shadow
    >
      <div class="c-login__section">
        <h2 class="c-login__section__title">오늘의 급식</h2>
        <div class="c-login__section__content">
          <dimi-meal/>
        </div>
      </div>
      <dimi-divider vertical/>
      <div class="c-login__section">
        <h2 class="c-login__section__title">로그인</h2>
        <div class="c-login__section__content c-login__section__content--mt">
          <dimi-input
            placeholder="아이디"
            type="text"
            v-model="id"
          />
          <dimi-input
            placeholder="비밀번호"
            type="password"
            v-model="password"
          />
          <dimi-button
            class="c-login__submit-btn"
            :loading="pending"
            large
            @click="confirmLoggingIn"
          >
            LOGIN
          </dimi-button>
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
  width: 100%;
  display: flex;
  justify-content: center;
  &__section {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 2rem;
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
