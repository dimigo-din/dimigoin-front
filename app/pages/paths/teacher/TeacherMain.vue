<script>
import permission from '@/mixins/permission'

import services from './services'

export default {
  name: 'TeacherMain',
  mixins: [permission('T')],
  data: () => ({ services }),
  mounted () {
    const cards = this.$refs.cards || []
    cards.forEach(({ $el: v }) => (v.style.height = window.getComputedStyle(v).width))
  },
  methods: {
    clickService (service) {
      this.$router.push({ name: service.to })
    }
  }
}
</script>

<template>
  <div>
    <not-found v-if="rejected"/>
    <template v-else>
      <div class="main">
        <h1 class="main__title">관리</h1>
        <div class="main__cards">
          <dimi-card
            v-for="(service, key) in services"
            ref="cards"
            :key="'service-' + key"
            class="main__card"
            shadow
            hover
            @click.native="clickService(service)"
          >
            <span :class="['main__card-icon', service.icon]"/>
            <h3 class="main__card-title">{{ service.title }}</h3>
            <p class="main__card-desc">{{ service.description }}</p>
          </dimi-card>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.main {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  text-align: center;

  &__title {
    font-size: 64px;
    font-weight: $font-weight-extra-bold;
  }

  &__cards {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    margin-top: 64px;
    padding-bottom: 7rem;
  }

  .main__card {
    cursor: pointer;
    margin: 0 1rem;
    padding: 4rem;
  }

  &__card-icon {
    display: block;
    font-size: 96px;
    margin-bottom: 24px;
  }

  &__card-title {
    font-size: 28px;
    font-weight: $font-weight-extra-bold;
    margin-bottom: 12px;
  }

  &__card-desc {
    color: $gray;
    display: block;
    font-size: 18px;
  }
}
</style>
