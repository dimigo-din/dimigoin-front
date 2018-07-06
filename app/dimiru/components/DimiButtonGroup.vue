<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },

    items: {
      type: Array,
      required: true
    },

    colors: {
      type: Array,
      default: () => ['gray']
    }
  },

  computed: {
    color () {
      return this.colors[this.value]
    },

    classes () {
      return [
        'button-group',
        `button-group--${this.color}`
      ]
    }
  },

  methods: {
    onClick (index) {
      const event = {
        vm: this,
        value: index,
        items: this.items,
        prevent: false,
        done: function () {
          if (!this.prevent) this.vm.$emit('input', index)
        }
      }
      this.$emit('click', event)
    }
  }
}
</script>

<template>
  <div :class="classes">
    <div
      v-for="(item, index) in items"
      :key="`button-${index}`"
      :active="index === value"
      class="button-group__button"
      @click="onClick(index)">

      {{ item }}
    </div>
  </div>
</template>

<style lang="scss">
.button-group {
  @include font-bold;
  display: inline-block;
  font-size: 14px;
  user-select: none;

  &__button {
    border: 1px solid $black;
    cursor: pointer;
    display: inline-block;
    padding-bottom: 0.25em;
    padding-top: 0.35em;
    text-align: center;
    transition: all 0.2s ease-in-out;
    width: 70px;
  }

  &__button:first-child {
    border-bottom-left-radius: 4em;
    border-top-left-radius: 4em;
  }

  &__button:last-child {
    border-bottom-right-radius: 4em;
    border-top-right-radius: 4em;
  }

  &__button:first-child::before,
  &__button:last-child::after {
    content: '';
    display: inline-block;
    width: 2px;
  }

  &__button:not(:last-child) {
    border-right: 0;
  }
}

@mixin colored($color, $value) {
  .button-group--#{$color} {
    .button-group__button {
      border-color: $value;
      color: $value;
    }

    .button-group__button[active] {
      background-color: $value;
      color: $white;
    }
  }
}

@include colored('white', $white);
@include colored('black', $black);
@include colored('gray', $gray);
@include colored('gray-dark', $gray-dark);
@include colored('gray-light', $gray-light);
@include colored('gray-lighter', $gray-lighter);
@include colored('gray-lighten', $gray-lighten);

@include colored('red', $red);
@include colored('red-dark', $red-dark);

@include colored('pink', $pink);
@include colored('cyan', $cyan);
@include colored('aloes', $aloes);
@include colored('orange', $orange);
@include colored('mustard', $mustard);
</style>
