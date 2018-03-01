<script>
export default {
  name: 'DimiNavbar'
}
</script>

<template>
  <div class="navbar">
    <div class="container">
      <div class="navbar__wrapper">
        <div class="navbar__brand"><slot name="brand"/></div>
        <div class="navbar__menu">
          <div class="navbar__start"><slot name="start"/></div>
          <div class="navbar__end"><slot name="end"/></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/typography';

.navbar {
  display: flex;
  width: 100vw;
  min-height: 3.5rem;
  background-color: $white;
  box-shadow: 0px 4px 16px 0 rgba(21, 19, 19, 0.1);
  align-items: center;
  &__wrapper {
    display: flex;
  }
  &__brand {
    @extend %h-text-l;
    @include font-extra-bold;
    justify-self: flex-start;
  }
  &__menu {
    display: flex;
    justify-content: space-between;
  }
  &__start {
    justify-self: flex-start;
  }
  &__end {
    justify-self: flex-end;
  }
}
</style>
