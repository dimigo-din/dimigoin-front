<script>
export default {
  name: 'DimiError',

  props:{
    errorMessage: {
      type: boolean,
      default: false
    }
  }
}
</script>

<template>
    <p
      v-if="errorMessage"
      class="input__error-message"
    >
      {{ errorMessage }}
    </p>
</template>

<style lang="scss">
@import '../scss/vars';

&--error {
  background-color: lighten($red, 35%);
}

&__error-message {
  position: absolute;
  padding-left: 1em;
  margin-top: 0.375em;
  color: $red;
  font-size: 12px;
}

</style>