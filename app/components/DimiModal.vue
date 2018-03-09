<template>
  <div
    v-if="opened"
    :opened="opened"
    class="modal__overlay"
    @click.stop="close">

    <div
      class="modal"
      @click.stop>
      <span
        class="icon-cross"
        @click.stop="close"/>

      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  .modal {
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;

    padding: 24px;
    max-width: 700px;

    border-radius: 6px;
    border: solid 1px $gray-lighten;

    background-color: $white;
    box-shadow: 0px 16px 36px -12px rgba(0,0,0,.5);

    &__overlay {
      z-index: 999;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100vh;
      box-sizing: border-box;

      display: flex;
      align-items: center;

      background: rgba(#151313, .7);
    }

    .icon-cross {
      opacity: 0.3;
      float: right;
    }
  }
</style>
