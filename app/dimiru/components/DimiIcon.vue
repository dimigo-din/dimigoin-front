<script>
export default {
  name: 'DimiIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    pointer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedStyle () {
      return {
        'cursor': this.pointer
          ? 'pointer' : 'default'
      }
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <slot />
    <a
      :class="`icon-${icon}`"
      :style="computedStyle"
      :title="title"
      @click="$emit('click')"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/vars';

.wrapper {
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  border: 0;
  border-radius: 100%;
  box-shadow: -5px -5px 20px $white,
    5px 5px 20px $shadow;
  outline: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: -2px -2px 5px $white, 2px 2px 5px $shadow;
  }

  &:active {
    box-shadow: inset 1px 1px 2px $shadow, inset -1px -1px 2px $white;
  }
}
</style>
