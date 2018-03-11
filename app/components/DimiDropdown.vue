<script>
import DimiCard from './DimiCard.vue'
import DimiDivider from './DimiDivider.vue'

export default {
  name: 'DimiDropdown',
  components: { DimiCard, DimiDivider },

  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data: () => ({
    active: false,
    hovered: false
  }),

  computed: {
    classes () {
      return {
        'dropdown': true,
        'dropdown--active': this.active
      }
    }
  },

  mounted () {
    this.updateWidth()
    window.addEventListener('resize', () => this.updateWidth())
  },

  methods: {
    updateWidth () {
      if (!this.$refs.list || !this.$refs.items) return
      const { root, items, list } = this.$refs

      list.$el.style.display = 'block'
      const width = Math.max(...items.map(item => {
        const { display } = item.style
        item.style.display = '' // removes display: none;

        const { offsetWidth } = item
        item.style.display = display // restore

        return offsetWidth
      }))

      list.$el.style.display = ''
      root.style.width = list.$el.style.width = (width + 1) + 'px'
    },

    open () {
      this.active = true
    },

    closeDelayed () {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => (this.active = this.hovered), 500)
    },

    select (index) {
      this.active = false
      this.$emit('input', index)
    }
  }
}
</script>

<template>
  <div
    ref="root"
    :class="classes"
    @click="open"
    @mouseover="open(hovered = true)"
    @mouseout="closeDelayed(hovered = false)">

    <div class="dropdown__view">
      {{ items[value] }}
      <span class="dropdown__view-icon icon-arrow-down"/>
    </div>

    <dimi-card
      ref="list"
      class="dropdown__list"
      shadow>

      <template v-for="(item, index) in items">
        <p
          v-show="index !== value"
          ref="items"
          :key="`item-${index}`"
          class="dropdown__item"
          @click.stop="select(index)">

          <span class="dropdown__item-name">{{ item }}</span>
        </p>

        <dimi-divider
          :key="`divider-${index}`"
          class="dropdown__item-divider"/>
      </template>
    </dimi-card>
  </div>
</template>

<style lang="scss">
.dropdown {
  padding-bottom: 5px;
  padding-top: 5px;
  position: relative;
  white-space: nowrap;

  &__view {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &--active &__view {
    color: $pink;
  }

  &__view-icon {
    font-size: 50%;
    margin-left: 0.5em;
  }

  &__list {
    display: none;
    margin-top: 0.7em;

    padding: 0;
    position: absolute;
    z-index: 1;
  }

  &--active &__list {
    display: block;
  }

  &__item {
    padding: 15px 24px;
    text-align: center;
  }

  &__item:hover {
    background-color: $gray-lighten;
  }

  &__item-divider {
    margin: 0;
    position: relative !important;
  }

  &__item:last-child &__item-divider {
    display: none;
  }
}
</style>
