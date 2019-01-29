<script>
import Brand from '@/assets/brand.svg'

export default {
  name: 'Register',
  components: { Brand }
}
</script>

<template>
  <div class="register">
    <h1
      class="register__title"
      @click="$router.push('/')"
    >
      <brand height="36px" />
      <span class="register__subtitle">
        회원가입
      </span>
    </h1>
    <div class="register__content">
      <div class="container container--custom">
        <div class="row center-xs middle-xs">
          <router-view
            class="col-xs-12 col-md-6"
            name="side"
          />
          <router-view
            class="col-xs-12 col-md-6"
            name="form"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~styles/variables';
@import '~styles/mixins';

@include from($widescreen) {
  .container--custom {
    width: 55rem;
  }
}
</style>

<style lang="scss">
@import '~styles/variables';

.register {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;

  &__title {
    display: flex;
    margin-top: 5rem;
    cursor: pointer;
    font-size: 36px;
    font-weight: $font-weight-extra-bold;
    user-select: none;
    word-spacing: 0.325em;
  }

  &__subtitle {
    padding-left: 0.5em;
    font-size: 36px;
    font-weight: $font-weight-regular;
  }

  &__content {
    display: flex;
    height: 50%;
    align-items: center;
    margin-top: 6rem;
  }

  &__card {
    transition: all 0.5s ease;
  }

  &__form {
    padding: 0 1rem;
  }
}

.form__field {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 1.5rem 0;

  .register__input {
    flex: 1 0;
    font-size: 14px;
  }
}

.form__label {
  padding: 0.5em 0;
  color: $gray-dark;
  font-size: 14px;
  font-weight: $font-weight-regular;
  text-align: start;
}

.gender-radio {
  position: relative;
  display: flex;
  flex: 1 0;
  flex-wrap: wrap;
  justify-content: center;

  &__item {
    display: block;
    flex: 1 0;
    padding: 0.9em 0 !important;
    font-size: 14px;
    font-weight: $font-weight-regular;
  }

  &__item:first-child {
    margin-right: 0.75rem;
  }
}

.register__nav {
  display: flex;
  margin-top: 3rem;

  &__start {
    margin-right: auto;
  }

  &__end {
    margin-left: auto;
  }

  &__link {
    cursor: pointer;
    font-weight: $font-weight-bold;
  }

  &__link--next {
    color: $red;
  }

  &__link--previous {
    color: $gray-light;
  }
}

.register__circles {
  position: relative;

  &__circle {
    position: absolute;
    width: 12px;
    height: 12px;
    margin: 0.5rem;
    background-color: $red;
    border-radius: 50%;
    opacity: 0.3;
  }

  &__circle--active {
    opacity: 1;
  }
}

.register-side {
  &__illust {
    height: 200px;
  }

  &__title {
    margin-top: 2rem;
    color: $black;
    font-size: 24px;
    font-weight: $font-weight-bold;
    user-select: none;
  }
}
</style>
