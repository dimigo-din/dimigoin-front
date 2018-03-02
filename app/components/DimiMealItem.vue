<script>
export default {
  name: 'DimiMealItem',

  props: {
    meal: {
      type: String,
      default: '아침? 점심? 저녁?'
    },
    current: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass () {
      return {
        'meal-item': true,
        'meal-item--current': this.current
      }
    },

    title () {
      return this.meal
    }
  }
}
</script>

<template>
  <div :class="computedClass">
    <h4 class="meal-item__title">
      {{ title }}
    </h4>
    <div class="meal-item__content">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/helpers/typography';

.meal-item {
  @extend %h-text-gray;
  min-height: 4.275em;
  word-break: keep-all;

  &:last-child {
    min-height: 3em;
  }

  &:not(:last-child):not(:first-child) {
    margin: 1.5em 0;
  }

  &__title {
    @extend %h-text-r;
    @include font-bold;
    margin-bottom: 0.5em;
  }

  &__content {
    @extend %h-text-xs;
    line-height: 1.6;
  }
}

.meal-item--current {
  .meal-item__title {
    @extend %h-text-red;
  }

  .meal-item__content {
    @extend %h-text-black;
  }
}

</style>
