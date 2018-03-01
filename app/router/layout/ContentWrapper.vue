<template>
  <div class="content">
    <div class="content__header">
      <slot name="header"/>
    </div>
    <main class="content__main">
      <slot name="main"/>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/helpers/typography';

.content {
  &__header {
    font-size: 28px;
    @include font-bold;
    @extend %h-text-gray-dark;
    margin-bottom: 1rem;
  }
  &__main { }
}
</style>
