<template>
  <div class="checkbox__wrapper">
    <span
      class="checkbox"
      :class="checked && 'checkbox--checked'"
      @click="checked = !checked">

      <span class="checkbox__icon icon-ok"/>
    </span>

    <span :class="$slots.default && 'checkbox__content'">
      <slot/>
    </span>
  </div>
</template>

<script>
export default {
  data: () => ({ checked: false }),

  watch: {
    checked (val) {
      this.$emit('checked', val)
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 1em;
  height: 1.1em;

  padding: 0.1em;
  padding-bottom: 0;

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
    font-size: 50%;
    color: $white;
  }

  &__icon::before {
    margin-left: -0.1em !important;
  }

  &__content {
    margin-left: 0.5em;
  }
}
</style>
