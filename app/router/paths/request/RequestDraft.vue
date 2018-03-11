<template>
  <div class="r-draft">
    <img
      class="r-draft__thinking"
      src="https://cdn.rawgit.com/twitter/twemoji/gh-pages/2/svg/1f914.svg">
  </div>
</template>

<script>
export default {
  created () {
    this.$swal({
      type: 'error',
      title: '준비 중입니다!',
      text: '여긴 아직이니까 돌아가세요',
      onClose: () => this.$router.push({ name: 'request' })
    })
  }
}
</script>

<style lang="scss">
  .r-draft {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 24px;

    &__thinking {
      height: 80vh;
      opacity: 0.02;
      width: auto;
    }
  }
</style>
