<script>
export default {
  name: 'ServiceWrapper'
}
</script>

<template>
  <div>
    <slot name="navbar" />
    <div class="container">
      <div class="wrapper">
        <div class="wrapper__menu">
          <slot name="menu" />
        </div>
        <main class="wrapper__main">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;

  &__menu {
    box-sizing: border-box;
    flex: 0 0 auto;
    flex-basis: 100%;
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;

    @include from($desktop) {
      flex-basis: 21%;
      max-width: 21%;
    }
  }

  &__main {
    box-sizing: border-box;
    flex: 0 0 auto;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
