<script>
export default {
  name: 'TheMain'
}
</script>

<template>
  <div class="container">
    <h1 class="main-title">DIMIGOIN</h1>
    <div class="info-wrapper">

    </div>
    <div class="service-wrapper">
      <div class="services"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/typography';

.container {
  margin: 0 auto;
  position: relative;
  max-width: 1024px;
}

.main-title {
  @extend .h-text-xl;
  @extend .h-font-bold;
  text-align: center;
}

.info-wrapper {

}

.service-wrapper {

}

</style>
