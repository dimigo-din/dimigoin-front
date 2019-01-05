<script>
export default {
  name: 'DimiFooter'
}
</script>

<template>
  <div class="footer">
    <div class="container container--naive">
      <div class="footer__container">
        <span class="footer__copyright">
          <slot name="copyright" />
        </span>
        <div class="footer__contacts">
          <span class="footer__contact footer__mail">
            <slot name="mail" />
          </span>
          <span class="footer__contact footer__facebook">
            <slot name="facebook" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.footer {
  align-items: center;
  background-color: $gray-lighter;
  display: flex;
  min-height: 8rem;

  @include until($tablet) {
    min-height: 12rem;
  }

  &__container {
    align-items: center;
    display: flex;
    justify-content: space-between;

    @include until($tablet) {
      flex-direction: column;
    }
  }

  &__contacts {
    display: flex;
    padding: 12px;

    @include until($tablet) {
      flex-direction: column;
      padding-bottom: 0;
      padding-top: 24px;
    }
  }

  &__contact {
    padding: 4px;
  }

  &__copyright {
    color: $gray-light;

  }

  &__mail {
    @include from($tablet) {
      padding-right: 64px;
    }
  }

  &__mail > *,
  &__facebook > * {
    color: $gray;
    text-decoration: none;
  }
}
</style>
