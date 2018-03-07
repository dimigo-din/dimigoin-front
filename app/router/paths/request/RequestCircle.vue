<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import CircleCard from '../../../components/CircleCard.vue'

import * as circle from '../../../src/api/circle'

export default {
  name: 'RequestCircle',

  components: { ContentWrapper, CircleCard },

  data () {
    return {
      pending: false,
      circles: []
    }
  },

  computed: {
    appliedCircles () {
      // TODO
      const base = {
        name: 'IT Factory COIN',
        category: '교육',
        imageUrl: 'http://via.placeholder.com/64x64',
        description: '부통령이 공식적인 상원의장이지만 부통령이 실제로 상원에 있는 경우는 드물다. 대신 상원임시의장(President protempore)가 대행하는 경우가 많다'
      }

      const set = [
        Object.assign({}, base, { status: 'passed' }),
        Object.assign({}, base, { status: 'failed' }),
        Object.assign({}, base, { status: 'waiting' })
      ]

      return [...set, ...set, ...set].slice(1)
    }
  },

  async created () {
    this.pending = true
    this.circles = await circle.getCircles()
    this.pending = false
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-club"/>2018년 동아리 가입 신청
    </h1>
    <div
      slot="main"
      class="circle">
      <section class="circle__section">
        <h2 class="circle__title">신청한 동아리</h2>
        <div class="circle__circles">
          <circle-card
            v-for="(circle, index) in appliedCircles"
            :key="`applied-circle-${index}`"
            :circle="circle"
          />
        </div>
      </section>
      <section class="circle__section">
        <h2 class="circle__title">전체 동아리</h2>
        <div class="circle__circles">
          <circle-card
            v-for="(circle, index) in circles"
            :key="`circle-${index}`"
            :circle="circle"
          />
        </div>
      </section>
    </div>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.circle {
  &__section:not(:last-child) {
    padding-bottom: 16px;
  }

  &__title {
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 20px;
  }

  &__circles {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  &__circle {

  }
}
</style>
