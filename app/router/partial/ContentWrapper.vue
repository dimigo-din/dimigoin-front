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
@import '~styles/variables';

.content {
  padding: 2rem 0;

  &__header {
    color: $gray-dark;
    font-size: 32px;
    font-weight: $font-weight-bold;
    padding-bottom: 1rem;
  }
}
</style>
