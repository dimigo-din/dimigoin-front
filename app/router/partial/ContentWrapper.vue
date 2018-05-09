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
.content {
  padding: 2rem 0;

  &__header {
    @include font-bold;
    color: $gray-dark;
    font-size: 32px;
    padding-bottom: 1rem;
  }
}
</style>
