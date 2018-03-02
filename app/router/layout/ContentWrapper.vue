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
  margin-top: 2rem;

  &__header {
    @extend %h-text-gray-dark;
    @include font-bold;
    font-size: 28px;
    margin-bottom: 1rem;
  }
}
</style>
