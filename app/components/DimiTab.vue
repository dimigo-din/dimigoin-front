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
    color: $gray;
    cursor: pointer;
    padding: 24px 0 12px 0;
    flex-basis: 160px;
    text-align: center;
  }

  &__item--active {
    border-bottom: solid 4px $red;
    color: $red;
  }
}
</style>
