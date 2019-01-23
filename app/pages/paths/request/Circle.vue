<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import CircleCard from '@/components/CircleCard.vue'

import * as circle from '@/src/api/circle'

export default {
  name: 'Circle',

  components: { ContentWrapper, CircleCard },

  data () {
    return {
      pending: false,
      circles: []
    }
  },

  computed: {
    appliedCircles () {
      return this.circles.filter(v => v.status)
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
      <span class="icon-club" />2019년 동아리 가입 신청🚀
    </h1>
    <div
      slot="main"
      class="circle"
    >
      <div
        v-if="pending"
        class="circle__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <template v-else>
        <section
          v-show="appliedCircles.length > 0"
          class="circle__section"
        >
          <h2 class="circle__title">
            신청한 동아리
          </h2>
          <div class="circle__circles">
            <circle-card
              v-for="(circle, index) in appliedCircles"
              :key="`applied-circle-${index}`"
              :circle="circle"
            />
          </div>
        </section>
        <section class="circle__section">
          <h2 class="circle__title">
            전체 동아리
          </h2>
          <div class="circle__circles">
            <circle-card
              v-for="(circle, index) in circles"
              :key="`circle-${index}`"
              :circle="circle"
            />
          </div>
        </section>
      </template>
    </div>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.circle {
  &__loader-wrapper {
    display: flex;
    height: 40vh;
    align-items: center;
    justify-content: center;
  }

  &__section {
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
}
</style>
