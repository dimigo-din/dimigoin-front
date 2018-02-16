<script>
import { factory as PositionableFactory } from '../mixins/positionable'
import Colorable from '../mixins/colorable'
import Hoverable from '../mixins/hoverable'

import DimiLoader from './DimiLoader.vue'

export default {
  name: 'DimiButton',

  components: { DimiLoader },

  mixins: [PositionableFactory(['left', 'right']), Colorable, Hoverable],

  props: {
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
      default: ''
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

  data: () => ({
    defaultColor: 'red',
    defaultTextcolor: 'white',
    defaultHoverColor: 'red-dark'
  }),

  computed: {
    computedClass () {
      const classes = {
        'c-btn': true,
        'h-font-extra-bold': true,
        'h-float-right': this.right,
        'h-float-left': this.left,
        'h-text-s': this.small,
        'h-text-l': this.large,
        'c-btn--text': this.text,
        'c-btn--cursor-disable': !this.isActive,
        [this.computedColorClass]: this.hasColor,
        [this.computedTextColorClass]: this.hasTextColor,
        [this.computedHoverClass]: this.hasHoverClass && this.isActive
      }
      return classes
    },

    isActive () {
      return !this.loading && this.active
    },

    /* Override Colorable */
    computedColorClass () {
      return this.isActive
        ? `h-${this.color || this.defaultColor}`
        : `h-${this.hoverColor || this.defaultHoverColor}`
    }
  },

  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<template>
  <a
    v-if="!loading && active"
    :class="computedClass"
    :href="href"
    v-ripple="'rgba(255, 255, 255, .2)'"
    @click="click"
  >
    <slot/>
  </a>
  <a
    v-else
    :class="computedClass"
  >
    <dimi-loader
      v-if="loading"
      :color="computedTextColorClass"
    />
    <slot v-else/>
  </a>
</template>

<style lang='scss' scoped>

.c-btn {
  display: inline-flex;
  padding: 0.8em 2.7em;
  border-radius: 2rem;
  appearance: none;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  transition: .5s background-color ease;
}

.c-btn--text {
  background-color: transparent;
}

.c-btn--cursor-disable {
  cursor: default;
}

</style>
