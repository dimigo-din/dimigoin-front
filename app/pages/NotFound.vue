<script>
export default {
  name: 'NotFound',
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<template>
  <div class="not-found">
    <div class="not-found__col">
      <img
        src="@/assets/rose-in-glass.png"
        class="not-found__illust"
      >
    </div>

    <div class="not-found__col">
      <img
        src="@/assets/404.png"
        class="not-found__404"
      >
      <p class="not-found__message">
        페이지를 찾을 수 없습니다.
        주소를 다시 확인해주세요.
      </p>
      <a
        class="not-found__back"
        @click="back"
      >
        <span class="icon-long-arrow-right" /> 이전으로
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.not-found {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  user-select: none;

  &__col {
    margin: 32px;
  }

  &__illust {
    height: 256px;
  }

  &__404 {
    height: 120px;
  }

  &__message {
    width: 14em;
    margin-top: 3.25rem;
    color: $black;
    font-size: 16px;
    line-height: 1.6;
    word-break: keep-all;
  }

  &__back {
    display: block;
    margin-top: 1rem;
    color: $red;
    cursor: pointer;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }
}
</style>
