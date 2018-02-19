<script>
export default {
  name: 'DimiInput'
}
</script>

<template>
  <input class="c-input">
</template>

<style lang="scss" scoped>
.c-input {
  font-family: 'NanumSquareRound', sans-serif;
  appearance: none;
  border: none;
  height: 3em;
  min-width: 25em;
  background-color: #f3f3f3;
  border-radius: 20px;
  &:not(:last-child) {
    margin-bottom: 2em;
  }
  padding-left: 2em;
}
</style>
