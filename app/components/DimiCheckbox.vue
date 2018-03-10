<template>
  <div class="checkbox__wrapper">
    <span
      :class="classes"
      @click="$emit('input', !value)">

      <span class="checkbox__icon icon-ok"/>
    </span>

    <span :class="$slots.default && 'checkbox__content'">
      <slot/>
    </span>
  </div>
</template>

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

<style lang="scss">
.checkbox {
  width: 1em;
  height: 1em;
  padding: 0.1em;

  border-radius: 50%;
  background-color: $gray-light;
  transition: background-color .2s ease;

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
    vertical-align: middle;

    color: $white;
    font-size: 50%;
  }

  &__content {
    margin-left: 0.5em;
  }
}
</style>
