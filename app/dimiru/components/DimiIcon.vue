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
  display:inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: -5px -5px 20px $white,
    5px 5px 20px $shadow;
  transition: all 0.2s ease-in-out;
  border: 0;
  outline: 0;
  border-radius: 100%;
  padding: 0.5em;
  width: 1em;
  height: 1em;

  &:hover {
    box-shadow: -2px -2px 5px $white, 2px 2px 5px $shadow;
  }

  &:active {
    box-shadow: inset 1px 1px 2px $shadow, inset -1px -1px 2px $white;
  }
}
</style>
