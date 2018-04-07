<script>
import { service } from '../src/api/index'
import DimiCard from './DimiCard.vue'
import DimiLoader from './DimiLoader.vue'

export default {
  name: 'ServiceCards',
  components: { DimiCard, DimiLoader },

  data: () => ({
    services: []
  }),

  async created () {
    this.services = await service.getServiceList()
    this.$nextTick(this.updateServiceCardHeight)
  },

  async mounted () {
    window.addEventListener('resize', () => this.updateServiceCardHeight())
  },

  methods: {
    updateServiceCardHeight () {
      const cards = this.$refs.cards || []
      cards.forEach(({ $el: v }) => (v.style.height = window.getComputedStyle(v).width))
    },

    clickServiceCard (service) {
      if (!service.url) return

      if (service.url.startsWith('http')) {
        window.open(service.url, '_blank')
      } else {
        this.$router.push({ name: service.url })
      }
    }
  }
}
</script>

<template>
  <div class="services">
    <div
      v-if="services.length === 0"
      class="services__loader">
      <dimi-loader/>
    </div>

    <div
      v-else
      class="services__cards">
      <dimi-card
        v-for="(service, index) in services"
        ref="cards"
        :key="`service-${index}`"
        :class="['services__card', !service.url && 'services__card--disabled']"
        shadow
        hover
        @click.native="clickServiceCard(service)">

        <div class="services__card-icon">
          <span :class="service.icon"/>
        </div>
        <h4 class="services__card-title">{{ service.title }}</h4>
        <p class="services__card-description">{{ service.description }}</p>
      </dimi-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/typography';

.services {
  &__cards {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    @include until($tablet) {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }

  &__loader {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
  }

  &__card {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__card--disable {
    display: none !important;
  }

  &__card-icon {
    font-size: 64px;
    @include until($tablet) {
      font-size: 42px;
    }
  }

  &__card-title {
    @include font-extra-bold;
    font-size: 24px;

    margin-top: 1.2rem;
    text-align: center;
    word-break: break-all;

    @include until($tablet) {
      font-size: 16px;
    }
  }

  &__card-description {
    color: $gray;
    font-size: 14px;
    line-height: 1.5;
    margin-top: 0.5rem;
    text-align: center;
    word-break: keep-all;
    @include until($tablet) {
      display: none;
    }
  }
}
</style>
