<template>
  <div class="content">
    <div class="content__header">
      <slot name="header" />
    </div>
    <main class="content__main">
      <slot name="main" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.content {
  &__header {
    margin-bottom: 1.5rem;
    color: $gray-dark;
    font-size: 26px;
    font-weight: $font-weight-bold;
  }
}
</style>
