<script>
export default {
  name: 'DimiButtonGroup',

  props: {
    value: {
      type: Number,
      default: 0
    },

    items: {
      type: Array,
      required: true
    }
  },

  methods: {
    onClick (index) {
      const event = {
        vm: this,
        value: index,
        items: this.items,
        prevent: false,
        done () {
          if (!this.prevent) this.vm.$emit('input', index)
        }
      }
      this.$emit('click', event)
    }
  }
}
</script>

<template>
  <div class="long-button-group">
    <div
      v-for="(item, index) in items"
      :key="`button-${index}`"
      :active="index === value"
      class="long-button-group__button"
      @click="onClick(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/vars';

.long-button-group {
  display: inline-block;
  color: $white;
  font-size: 18px;
  font-weight: $font-weight-bold;
  user-select: none;

  &__button {
    display: table-cell;
    width: 205px;
    padding: 0.7em 2em;
    background-color: $red;
    box-shadow: 0 10px 24px 0 rgba(234, 51, 51, 0.61);
    cursor: pointer;
    text-align: center;
    text-shadow: 2px 2px 3px rgba(248, 105, 105, 0.9);
    transition: all 0.2s ease-in-out;
    vertical-align: middle;

    @include until($tablet) {
      word-break: keep-all;
    }
  }

  &__button:hover {
    box-shadow: 0 5px 12px 0 rgba(234, 51, 51, 0.41);
  }

  &__button:first-child {
    border-bottom-left-radius: 4em;
    border-top-left-radius: 4em;
  }

  &__button:last-child {
    border-bottom-right-radius: 4em;
    border-top-right-radius: 4em;
  }

  &__button:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
