<script>
import { mapActions, mapGetters } from '@/store/modules/account/helpers'
import { required } from 'vuelidate/lib/validators'

import MealGroup from '@/components/MealGroup.vue'

export default {
  name: 'Login',

  components: { MealGroup },

  data () {
    return {
      id: '',
      password: '',
      pending: false
    }
  },

  validations: {
    id: {
      required
    },
    password: {
      required
    }
  },

  computed: {
    ...mapGetters(['isLoggedIn'])
  },

  created () {
    if (this.isLoggedIn) this.$router.push('/')
  },

  methods: {
    async confirmLoggingIn () {
      this.$v.$touch()
      if (this.$v.$error) return
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
    ...mapActions(['login'])
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
        <h2 class="section__title">
          로그인
        </h2>
        <div class="section__content section__content--mt">
          <dimi-input
            v-model="id"
            class="c-login__input"
            placeholder="아이디"
            type="text"
            :error="$v.id.$error"
            @enter="confirmLoggingIn"
          />
          <dimi-error :validation="$v.id" />
          <dimi-input
            v-model="password"
            class="c-login__input"
            placeholder="비밀번호"
            type="password"
            :error="$v.password.$error"
            @enter="confirmLoggingIn"
          />
          <dimi-error :validation="$v.password" />
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
      <dimi-divider vertical />
      <dimi-divider horizontal />
      <div class="section">
        <h2 class="section__title">
          오늘의 급식
        </h2>
        <div class="section__content">
          <meal-group />
        </div>
      </div>
    </dimi-card>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  align-items: center;

  @include until($tablet) {
    display: block;
    height: unset;
    padding: 12px;
  }
}

.c-login {
  display: flex;
  width: 100%;
  justify-content: center;

  @include until($tablet) {
    display: block;
    width: unset;

    .divider--vertical { display: none; }
    .divider--horizontal { display: block; }
  }

  .divider--horizontal { display: none; }

  &__input:last-of-type {
    margin-top: 1rem;
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
  width: 50%;
  flex-direction: column;
  padding: 2rem;

  @include until($tablet) {
    width: unset;
  }

  &__title {
    position: relative;
    font-size: 2.25em;
    font-weight: $font-weight-extra-bold;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 3em;
  }

  &__content--mt {
    margin-top: 7em;

    @include until($tablet) {
      margin-top: 1.5em;
    }
  }

  // Specify parent element due to css priority rules.
  .c-login__submit-btn {
    align-self: center;
    padding: 0.625em 2.75em;
    margin-top: 4rem;
    font-weight: $font-weight-extra-bold;

    @include until($tablet) {
      margin-top: 0.8rem;
    }
  }

  .c-login__register-description {

    align-self: center;
    margin-top: 1rem;
    color: $gray;
  }

  .c-login__register-link {
    color: $orange;
    text-decoration: none;
  }
}
</style>
