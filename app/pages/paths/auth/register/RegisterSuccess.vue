<script>
export default {
  name: 'RegisterSuccess'
}
</script>

<template>
  <dimi-card>
    <h1 class="title">환영합니다</h1>
    <div class="navigation">
      <dimi-button
        class="login-button"
        @click="() => $router.push({ name: 'login'})"
      >
        로그인
      </dimi-button>
    </div>
  </dimi-card>
</template>

<style lang="scss" scoped>
.row {
  margin-bottom: 1rem;
}

.title {
  margin-bottom: 3rem;
  color: $gray-dark;
  font-size: 2rem;
  font-weight: $font-weight-extra-bold;
  word-break: keep-all;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

</style>
