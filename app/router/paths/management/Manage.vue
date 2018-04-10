<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'

export default {
  name: 'Wrapper',

  components: { ContentWrapper, DefaultNavbar }
}
</script>

<template>
  <div>
    <default-navbar/>
    <div class="container">
      <div class="row">
        <main class="main col-xs">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>
