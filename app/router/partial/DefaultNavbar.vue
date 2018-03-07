<script>
import DimiNavbar from '../../components/DimiNavbar.vue'

export default {
  name: 'DefaultNavbar',
  components: { DimiNavbar }
}
</script>

<template>
  <header>
    <dimi-navbar>
      <router-link
        slot="brand"
        :to="{ name: 'main' }"
        class="brand"
      >
        <span class="icon-dimigo"/>DIMIGOIN
      </router-link>
      <div slot="end">
        디미인
      </div>
    </dimi-navbar>
  </header>
</template>

<style lang="scss" scoped>
@import '../../scss/helpers/typography';

.brand {
  @extend %h-text-black;
  text-decoration: none;
}
</style>
