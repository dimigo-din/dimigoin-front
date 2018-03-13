<template>
  <transition name="fade">
    <div
      v-show="opened"
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
  </transition>
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
  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.25s ease-in-out;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  .modal {
    background-color: $white;
    border: solid 1px $gray-lighten;
    border-radius: 6px;
    box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    margin: 5vh auto;
    max-width: 700px;
    padding: 24px;
    position: relative;

    &__overlay {
      background: rgba(#151313, 0.7);
      box-sizing: border-box;
      height: 100%;
      left: 0;
      min-height: 100vh;
      overflow-y: auto;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 999;
    }

    .icon-cross {
      cursor: pointer;
      float: right;
      opacity: 0.3;
    }
  }
</style>
