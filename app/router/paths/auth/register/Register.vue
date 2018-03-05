<script>
import DimiCard from '../../../../components/DimiCard.vue'

export default {
  name: 'Register',
  components: { DimiCard }
}
</script>

<template>
  <div class="register">
    <h1 class="register__title">
      <span class="icon-dimigo"/>DIMIGOIN
      <span class="register__subtitle">회원가입</span>
    </h1>
    <div class="register__content">
      <div class="container container--custom">
        <div class="row center-xs middle-xs">
          <router-view
            class="col-xs-24 col-md-12"
            name="side"/>
          <router-view
            class="col-xs-24 col-md-12"
            name="form"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../../scss/helpers/typography';

@include from($widescreen) {
  .container--custom {
    width: 55rem;
  }
}

</style>

<style lang="scss">
@import '../../../../scss/helpers/typography';

.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  &__title {
    @extend %h-text-xl;

    @include font-extra-bold;

    user-select: none;
    margin-top: 5rem;
    word-spacing: 0.325em;
  }

  &__subtitle {
    @extend %h-text-xl;
    @include font-regular;
  }

  &__content {
    margin-top: 6rem;
    display: flex;
    align-items: center;
    height: 50%;
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
  font-size: 14px;
  text-align: start;
  @extend %h-text-gray-dark;
  @include font-regular;
  padding: 0.5em 0;
}

.gender-radio {
  flex: 1 0;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;

  &__item {
    @include font-bold;

    display: block;
    flex: 1 0;
    font-size: 14px;
    padding: 0.9em 0 !important;
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
    @include font-bold;
    cursor: pointer;
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
    border-radius: 50%;
    background-color: $red;
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
    @include font-bold;

    @extend %h-text-l;
    @extend %h-text-black;

    user-select: none;
    margin-top: 2rem;
  }
}
</style>
