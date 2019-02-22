<script>
export default {
  name: 'DimiError',

  props: {
    errmsg: {
      type: String,
      default: ''
    }
  }

  
}
</script>

<template>
  <p
    v-if="errmsg"
    class= "errmsg"
    value = this.errmsg
  />
</template>

<style lang="scss">
@import '../scss/vars';

.error-message {
    position: absolute;
    padding-left: 1em;
    margin-top: 0.375em;
    color: $red;
    font-size: 12px;
  }

</style>
