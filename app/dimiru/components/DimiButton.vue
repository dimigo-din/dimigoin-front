<script>
export default {
  name: 'DimiButton',

  props: {
    gray: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: undefined
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass () {
      return {
        'btn': true,
        'btn--gray': this.gray,
        'btn--small': this.small,
        'btn--large': this.large,
        'btn--text': this.text,
        'btn--cursor-disable': !this.isActive
      }
    },

    computedRipple () {
      return this.gray ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 0, 0, .2)'
    },

    isActive () {
      return !this.loading && this.active
    }
  },

  methods: {
    click (e) {
      if (this.active) this.$emit('click', e)
    }
  }
}
</script>

<template>
  <a
    v-ripple="computedRipple"
    :class="computedClass"
    :href="href"
    @click="click"
  >
    <slot />
  </a>
</template>

<style lang='scss'>
@import '../scss/vars';

.btn {
  position: relative;
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 0.8em 2.7em;
  appearance: none;
  background-color: $red;
  border-radius: 2rem;
  box-shadow: 0 10px 24px 0 rgba(234, 51, 51, 0.61);
  color: $white;
  cursor: pointer;
  font-weight: $font-weight-bold;
  text-decoration: none;
  text-shadow: 2px 2px 3px rgba(248, 105, 105, 0.9);
  transition:
    all 0.2s ease-in-out,
    0.5s background-color ease;
  user-select: none;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 5px 12px 0 rgba(234, 51, 51, 0.41);
  }

  &--gray {
    background-color: $gray-lighten;
    box-shadow: 0 10px 24px 0 rgba(50, 50, 50, 0.11);
    color: $gray-dark;
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.35);
  }

  &--gray:hover {
    box-shadow: 0 5px 12px 0 rgba(234, 234, 234, 0.41);
  }

  &--text {
    background-color: transparent;
  }

  &--cursor-disable {
    cursor: not-allowed;
  }

  &--large {
    font-size: 24px;
  }

  &--small {
    font-size: 12px;
  }
}

</style>
