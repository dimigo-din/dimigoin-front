<script>
import DimiCard from '../../../components/DimiCard.vue'

import services from './services'

export default {
  name: 'TeacherMain',
  components: { DimiCard },
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
  <div :class="$style['main']">
    <h1 :class="$style['main__title']">관리</h1>
    <div :class="$style['main__cards']">
      <dimi-card
        v-for="(service, key) in services"
        ref="cards"
        :key="'service-' + key"
        :class="$style['main__card']"
        shadow
        hover
        @click.native="clickService(service)"
      >
        <span :class="[$style['main__card-icon'], service.icon]"/>
        <h3 :class="$style['main__card-title']">{{ service.title }}</h3>
        <p :class="$style['main__card-desc']">{{ service.description }}</p>
      </dimi-card>
    </div>
  </div>
</template>

<style lang="scss" module>
.main {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  text-align: center;

  &__title {
    @include font-extra-bold;
    font-size: 64px;
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
    @include font-extra-bold;
    font-size: 28px;
    margin-bottom: 12px;
  }

  &__card-desc {
    display: block;
    font-size: 18px;
  }
}
</style>
