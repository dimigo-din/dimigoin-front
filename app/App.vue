<script>
import 'dimigoincon'
import 'typeface-nanum-square-round'

import './scss/theme.scss'
import AwesomeFooter from './components/AwesomeFooter.vue'

import Snowf from 'vue-snowf'

export default {
  name: 'App',
  components: { Snowf, AwesomeFooter }
}
</script>

<template>
  <div
    id="app"
    class="root">
    <main class="root__router"><router-view/></main>
    <Snowf
      :amount="80"
      :size="10"
      :speed="1.5"
      :wind="2"
      :opacity="0.8"
      :swing="4"
      :image="null"
      :z-index="-999"
      :resize="true"
      color="#e0e0e0"
    />
    <awesome-footer class="root__footer"/>
  </div>
</template>

<style lang="scss">
.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__router {
    flex: 1 0 auto;
    padding-bottom: 32px;
  }
}
</style>
