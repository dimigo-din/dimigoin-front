<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },

  computed: {
    classes () {
      return {
        'checkbox': true,
        'checkbox--checked': this.value
      }
    }
  }
}
</script>

<template>
  <div class="checkbox__wrapper">
    <span
      :class="classes"
      @click="$emit('input', !value)"
    >
      <span class="checkbox__icon icon-ok" />
    </span>

    <span :class="$slots.default && 'checkbox__content'">
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
@import '../scss/vars';

.checkbox {
  width: 1em;
  height: 1em;
  padding: 0.1em;
  background-color: $gray-light;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease;

  &--checked {
    background-color: $red;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  &__icon {
    display: inline-block;
    color: $white;
    font-size: 50%;
    vertical-align: middle;
  }

  &__content {
    margin-left: 0.5em;
  }
}
</style>
