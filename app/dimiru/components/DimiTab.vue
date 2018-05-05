<script>
export default {
  name: 'DimiTab',

  props: {
    tabs: {
      type: Array,
      required: true
    },

    smallTabs: {
      type: Array,
      default: () => []
    },

    value: {
      type: Number,
      default: 0
    }
  },

  watch: {
    value () {
      this.updateBarWidth()
    }
  },

  mounted () {
    this.updateBarWidth()
    window.addEventListener('resize', () => this.updateBarWidth())
  },

  methods: {
    go (value) {
      this.$emit('input', value)
    },

    updateBarWidth () {
      if (!this.$refs.tab || !this.$refs.bar) return

      const { tab, bar } = this.$refs
      const { offsetWidth: width, offsetLeft: left } = tab[0]

      bar.style.width = width + 'px'
      bar.style.marginLeft = (left + width * this.value) + 'px'
    }
  }
}
</script>

<template>
  <nav class="tab">
    <ul class="tab__list">
      <li
        v-for="(tab, idx) in tabs"
        ref="tab"
        :key="`tab-${idx}`"
        :class="['tab__item', idx === value && 'tab__item--active']"
        @click="go(idx)">

        <span class="tab__tab">{{ tab }}</span>
        <span class="tab__tab--tiny">{{ smallTabs[idx] || tab }}</span>
      </li>
    </ul>

    <div
      ref="bar"
      class="tab__bar"/>
  </nav>
</template>

<style lang="scss">
.tab {
  padding-bottom: 4px;
  width: 100%;

  &__list {
    display: flex;
    justify-content: center;
  }

  &__item {
    @include font-bold;
    color: $gray;
    cursor: pointer;
    flex-basis: 160px;
    font-size: 18px;
    padding: 24px 0 12px;
    text-align: center;
    transition: all 0.25s ease;
  }

  &__item--active {
    color: $red;
  }

  &__bar {
    background-color: $red;
    border-radius: 2px;
    color: $red;
    height: 4px;
    left: 0;
    position: absolute;
    transition: all 0.3s ease-in-out;
  }

  &__tab--tiny {
    @include from($tablet) {
      display: none;
    }
  }

  &__tab {
    @include until($tablet) {
      display: none;
    }
  }
}
</style>
