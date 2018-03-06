<script>
import { mapActions, mapState } from 'vuex'

import DimiButton from '../../../components/DimiButton.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiMeal from '../../../components/DimiMeal.vue'
import DimiInput from '../../../components/DimiInput.vue'
import DimiDivider from '../../../components/DimiDivider.vue'

export default {
  name: 'Login',

  components: { DimiButton, DimiCard, DimiMeal, DimiInput, DimiDivider },

  data () {
    return {
      id: '',
      password: '',
      pending: false
    }
  },

  computed: {
    ...mapState('account', {
      isLoggedIn: ({ auth }) => auth.isLoggedIn,
      needVerify: ({ auth }) => auth.needVerify
    })
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
        await this.$swal('에러!', err.message, 'error')
        this.pending = false
        return
      }

      this.pending = false
      if (this.needVerify) this.$router.push({ name: 'register/step/3' })
      else this.$router.push({ name: 'main' })
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
      <div class="section">
        <h2 class="section__title">오늘의 급식</h2>
        <div class="section__content">
          <dimi-meal/>
        </div>
      </div>
      <dimi-divider vertical/>
      <div class="section">
        <h2 class="section__title">로그인</h2>
        <div class="section__content section__content--mt">
          <dimi-input
            class="c-login__input"
            placeholder="아이디"
            type="text"
            v-model="id"
            @enter="confirmLoggingIn"
          />
          <dimi-input
            class="c-login__input"
            placeholder="비밀번호"
            type="password"
            v-model="password"
            @enter="confirmLoggingIn"
          />
          <dimi-button
            class="c-login__submit-btn"
            :loading="pending"
            large
            @click="confirmLoggingIn"
          >
            LOGIN
          </dimi-button>
          <p class="c-login__register-description">
            or
            <router-link
              :to="{ name: 'register' }"
              class="c-login__register-link"
            >
              register
            </router-link>
            (season limited)
          </p>
        </div>
      </div>
    </dimi-card>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../scss/helpers/typography';

.container {
  align-items: center;
  display: flex;
  height: 100vh;
}

.c-login {
  display: flex;
  justify-content: center;
  width: 100%;

  &__input {
    margin-bottom: 1rem;
  }
}

.section {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 50%;

  &__title {
    @include font-extra-bold;
    font-size: 2.25em;
    position: relative;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 3em;
    position: relative;
  }

  &__content--mt {
    margin-top: 7em;
  }

  // Specify parent element due to css priority rules.
  .c-login__submit-btn {
    @include font-extra-bold;

    align-self: center;
    margin-top: 3rem;
    padding: 0.625em 2.75em;
  }

  .c-login__register-description {
    @extend %h-text-gray;

    align-self: center;
    margin-top: 1rem;
  }

  .c-login__register-link {
    @extend %h-text-orange;
    text-decoration: none;
  }
}
</style>
