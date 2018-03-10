<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'

export default {
  name: 'ManageCircle',

  components: { ContentWrapper, DefaultNavbar }
}
</script>

<template>
  <div class="mng">
    <default-navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .mng-circle {
    &__title {

    }
  }
</style>
