<script>
import DimiLoader from './DimiLoader.vue'
import variables from '../scss/_variables.scss'

export default {
  name: 'DimiButton',

  components: { DimiLoader },

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
    :class="computedClass"
    :href="href"
    v-ripple="'rgba(255, 255, 255, .2)'"
    @click="click"
  >
    <dimi-loader
      v-if="loading"
    />
    <slot v-else/>
  </a>
</template>

<style lang='scss'>
@import '../scss/helpers/typography';

.btn {
  display: inline-flex;
  padding: 0.8em 2.7em;
  border-radius: 2rem;
  appearance: none;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  background-color: $red;
  color: $white;
  transition: .5s background-color ease;
  @include font-extra-bold;
  &--gray {
    background-color: $gray-lighten;
    color: $gray;
  }
  &--text {
    background-color: transparent;
  }
  &--cursor-disable {
    cursor: default;
  }
  &--large {
    @extend %h-text-l;
  }
  &--small {
    @extend %h-text-s;
  }
}

</style>
