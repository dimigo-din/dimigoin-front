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
  display: flex;
  box-sizing: border-box;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -1rem;
  margin-left: -1rem;

  &__menu {
    max-width: 100%;
    box-sizing: border-box;
    flex: 0 0 auto;
    flex-basis: 100%;
    padding-right: 1rem;
    padding-left: 1rem;

    @include from($desktop) {
      max-width: 21%;
      flex-basis: 21%;
    }
  }

  &__main {
    max-width: 100%;
    box-sizing: border-box;
    flex: 0 0 auto;
    flex-basis: 0;
    flex-grow: 1;
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
