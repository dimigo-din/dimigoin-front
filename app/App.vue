<script>
import 'dimigoincon'
import 'typeface-nanum-square-round'

import './scss/theme.scss'
import AwesomeFooter from './router/partial/AwesomeFooter.vue'

export default {
  name: 'App',
  components: { AwesomeFooter }
}
</script>

<template>
  <div
    id="app"
    class="root">
    <main class="root__router"><router-view/></main>
    <awesome-footer class="root__footer"/>
  </div>
</template>

<style lang="scss">
.root {
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  &__router {
    flex: 1 0 auto;
    padding-bottom: 32px;
  }
}
</style>
