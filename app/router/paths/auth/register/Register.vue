<script>
import Brand from '@/assets/brand.svg'

export default {
  name: 'Register',
  components: { Brand },
  created () {
    this.$swal({
      type: 'error',
      title: '앗... 아아...',
      text: '지금은 가입할 수 없습니다.',
      onClose: () => this.$router.push('/')
    })
  }
}
</script>

<template>
  <div class="register">
    <h1
      class="register__title"
      @click="$router.push('/')">

      <brand height="36px"/>
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
@include from($widescreen) {
  .container--custom {
    width: 55rem;
  }
}
</style>

<style lang="scss">
.register {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__title {
    @include font-extra-bold;
    cursor: pointer;
    display: flex;
    font-size: 36px;
    margin-top: 5rem;
    user-select: none;
    word-spacing: 0.325em;
  }

  &__subtitle {
    @include font-regular;
    font-size: 36px;
    padding-left: 0.5em;
  }

  &__content {
    align-items: center;
    display: flex;
    height: 50%;
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
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: 1.5rem 0;

  .register__input {
    flex: 1 0;
    font-size: 14px;
  }
}

.form__label {
  @include font-regular;
  color: $gray-dark;
  font-size: 14px;
  padding: 0.5em 0;
  text-align: start;
}

.gender-radio {
  display: flex;
  flex: 1 0;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;

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
    background-color: $red;
    border-radius: 50%;
    height: 12px;
    margin: 0.5rem;
    opacity: 0.3;
    position: absolute;
    width: 12px;
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
    color: $black;
    font-size: 24px;
    margin-top: 2rem;
    user-select: none;
  }
}
</style>
