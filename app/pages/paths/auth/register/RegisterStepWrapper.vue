<script>
export default {
  name: 'RegisterStepWrapper',
  props: {
    illust: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <div class="container container--naive">
    <div class="row middle-xs start-xs center-sm">
      <div
        v-if="$slots.title || illust"
        class="register__side col-xs-12 col-sm-6"
      >
        <component
          :is="illust"
          class="register__illust"
        />
        <h3 class="register__subtitle"><slot name="title" /></h3>
      </div>
      <div class="col-xs">
        <dimi-card
          class="register__form"
          shadow
        >
          <slot name="form" />
        </dimi-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register__subtitle {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: $black;
  font-size: 1.5rem;
  font-weight: $font-weight-extra-bold;
  user-select: none;
  word-spacing: 0.325em;
}

.register__illust {
  display: none;
  width: 15rem;
  margin: 0 auto;

  @include from($tablet) {
    display: block;
  }
}

.register__form {
  padding: 3rem 2.5rem;
  text-align: left;

  /deep/ .form__field {
    margin-bottom: 1.5rem;

    @include until($desktop) {
      margin-bottom: 2rem;
    }
  }

  /deep/ .form__field--margin {
    margin-bottom: 3.5rem;
  }

  /deep/ .form__radio {
    margin: 0 1rem;
  }

  /deep/ .form__label {
    @include until($desktop) {
      margin-bottom: 0.5rem;
    }
  }
}

.register__form /deep/ .navigation {
  display: flex;
  margin-top: 4rem;

  &__circles {
    display: flex;
  }

  &__circle {
    width: 0.75rem;
    height: 0.75rem;
    margin: 0.125rem;
    background-color: $gray-lighter;
    border-radius: 50%;
  }

  &__circle--active {
    background-color: $red;
  }

  &__link {
    cursor: pointer;
    font-weight: $font-weight-bold;
  }

  &__link--next {
    color: $red;
  }

  &__link--previous {
    color: $gray;
  }
}

.register__form /deep/ .navigation__item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  &--start {
    justify-content: flex-start;
    margin-right: auto;
  }

  &--end {
    justify-content: flex-end;
    margin-left: auto;
  }
}
</style>
