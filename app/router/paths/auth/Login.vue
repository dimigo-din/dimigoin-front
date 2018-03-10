<script>
import { mapActions, mapState } from 'vuex'

import DimiButton from '../../../components/DimiButton.vue'
import DimiCard from '../../../components/DimiCard.vue'
import MealGroup from '../../../components/MealGroup.vue'
import DimiInput from '../../../components/DimiInput.vue'
import DimiDivider from '../../../components/DimiDivider.vue'

export default {
  name: 'Login',

  components: { DimiButton, DimiCard, MealGroup, DimiInput, DimiDivider },

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
        console.error('login', err)
        await this.$swal('에러!', err.message, 'error')
        this.pending = false
        return
      }

      this.$router.push({ name: 'main' })
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
        <h2 class="section__title">로그인</h2>
        <div class="section__content section__content--mt">
          <dimi-input
            v-model="id"
            class="c-login__input"
            placeholder="아이디"
            type="text"
            @enter="confirmLoggingIn"
          />
          <dimi-input
            v-model="password"
            class="c-login__input"
            placeholder="비밀번호"
            type="password"
            @enter="confirmLoggingIn"
          />
          <dimi-button
            :loading="pending"
            large
            class="c-login__submit-btn"
            @click="confirmLoggingIn"
          >
            LOGIN
          </dimi-button>
          <p class="c-login__register-description">
            또는
            <router-link
              :to="{ name: 'register' }"
              class="c-login__register-link"
            >
              회원가입
            </router-link>
          </p>
        </div>
      </div>
      <dimi-divider vertical/>
      <dimi-divider horizontal/>
      <div class="section">
        <h2 class="section__title">오늘의 급식</h2>
        <div class="section__content">
          <meal-group/>
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

  @include until($tablet) {
    display: block;
    padding: 12px;
    height: unset;
  }
}

.c-login {
  display: flex;
  justify-content: center;
  width: 100%;

  .divider--horizontal { display: none; }

  @include until($tablet) {
    width: unset;
    display: block;

    .divider--vertical { display: none; }
    .divider--horizontal { display: block; }
  }

  &__input {
    margin-bottom: 1rem;
  }

  .section:first-child {
    order: 2;
  }
  .section:last-child {
    order: 1;
  }
}

.section {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 50%;

  @include until($tablet) {
    width: unset;
  }

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

    @include until($tablet) {
      margin-top: 1.5em;
    }
  }

  // Specify parent element due to css priority rules.
  .c-login__submit-btn {
    @include font-extra-bold;

    align-self: center;
    margin-top: 3rem;
    padding: 0.625em 2.75em;

    @include until($tablet) {
      margin-top: 0.8rem;
    }
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
