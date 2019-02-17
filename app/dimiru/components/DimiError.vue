<script>
export default {
  name: 'DimiError',

  props: {
    errorMessage: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template>
  <div class="error-wrapper">
    <p
      v-if="errorMessage"
      class="error"
    >
      <slot />
    </p>
  </div>
</template>

<style lang="scss">
@import '../scss/vars';

.error-wrapper {
  position: relative;
  width: 100%;

  .error {
    position: relative;
    width: 100%;
    padding-left: 1em;
    margin-top: 0.5em;
    color: $red;
    font-size: 12px;
  }
}

</style>
