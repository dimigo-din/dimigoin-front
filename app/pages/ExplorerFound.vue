<script>
export default {
  name: 'ExplorerFound',

  computed: {
    browsers: () => [
      { name: '구글 크롬', href: 'https://google.com/chrome' },
      { name: '파이어폭스', href: 'https://mozilla.org/firefox' }
    ]
  },

  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<template>
  <div class="ienope">
    <div class="ienope__col">
      <img
        src="@/assets/ienope.png"
        class="ienope__illust"
      >
    </div>

    <div class="ienope__col">
      <p class="ienope__message">
        <span class="ienope__firefox">
          크롬보다 30% 더 가볍고 2배 빠른 파이어폭스 퀀텀 쓰실?<br>
        </span>
        디미고인은 인터넷 익스플로러를 지원하지 않습니다.<br>
        인터넷 익스플로러를 끄고 다른 브라우저로 접속해 주세요.
      </p>

      <div class="ienope__links">
        <a
          v-for="b in browsers"
          :key="b.href"
          :href="b.href"
          class="ienope__link"
        >
          <span class="icon-long-arrow-right" /> {{ b.name }} 브라우저 다운로드
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.ienope {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-weight: $font-weight-bold;
  user-select: none;

  &__col {
    margin: 32px;
  }

  &__illust {
    height: 256px;
  }

  &__message {
    margin-bottom: 1.5rem;
    color: $black;
    font-size: 16px;
    line-height: 1.8;
    word-break: keep-all;
  }

  &__links {
    padding-bottom: 32px;
  }

  &__link {
    display: block;
    margin-top: 1rem;
    color: $pink;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
  }

  &__firefox {
    color: $gray-light;
    font-size: 14px;
    line-height: 1.4;
    opacity: 0;
    transition: all 0.5s ease;
  }

  &__col:hover &__firefox {
    margin-top: 0.5rem;
    opacity: 1;
  }
}
</style>
