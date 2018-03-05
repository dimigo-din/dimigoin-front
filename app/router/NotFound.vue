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
        src="../assets/rose-in-glass.png"
        class="not-found__illust">
    </div>

    <div class="not-found__col">
      <img
        src="../assets/404.png"
        class="not-found__404">
      <p class="not-found__message">
        페이지를 찾을 수 없습니다 :(
        주소를 확인해주세요.
      </p>
      <a
        class="not-found__back"
        @click="back">-> 이전으로</a>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    font-size: 16px;
    color: $black;
    margin-top: 3.25rem;
    width: 14em;
    word-break: keep-all;
    line-height: 1.6;
  }

  &__back {
    @include font-bold;

    font-size: 16px;
    display: block;
    color: $red;
    margin-top: 1rem;
    cursor: pointer;
  }
}
</style>
