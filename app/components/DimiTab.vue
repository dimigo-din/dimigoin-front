<script>
export default {
  name: 'DimiTab',

  props: {
    tabs: {
      type: Array,
      required: true
    },
    tabIdx: {
      type: Number,
      default: 0
    }
  },

  methods: {
    go (tabIdx) {
      this.$emit('update:tabIdx', tabIdx)
    }
  }
}
</script>

<template>
  <nav class="tab">
    <ul class="tab__list">
      <li
        v-for="(tab, idx) in tabs"
        :key="`tab-${idx}`"
        :class="{
          'tab__item': true,
          'tab__item--active': idx === tabIdx
        }"
        @click="go(idx)"
      >{{ tab }}</li>
    </ul>
  </nav>
</template>

<style lang="scss">
.tab {
  width: 100%;
  &__list {
    display: flex;
    justify-content: center;
  }

  &__item {
    font-size: 18px;
    padding: 24px 65px 12px 65px;
    cursor: pointer;
  }

  &__item--active {
    color: $red;
    border-bottom: solid 4px $red;
  }
}
</style>
