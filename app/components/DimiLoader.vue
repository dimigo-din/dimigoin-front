<script>
export default {
  name: 'DimiLoader',

  props: {
    size: {
      type: Number,
      default: 32
    }
  },

  computed: {}
}
</script>

<template>
  <div class="c-loader">loading</div>
</template>

<style lang="scss" scoped>

@keyframes loading {
  from {
    transform: rotate(20deg);
  }
  to {
    transform: rotate(380deg);
  }
}

.loader,
.loader::before,
.loader::after {
    animation: loading 1s infinite linear;
    border-radius: 50%;
}

.loader::before,
.loader::after {
    content: "";
    width: 80%;
    height: 80%;
    position: absolute;
}

</style>
