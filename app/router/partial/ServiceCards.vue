<script>
import { service } from '../../src/api'
import DimiCard from '../../components/DimiCard.vue'
import DimiLoader from '../../components/DimiLoader.vue'

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
      console.log(cards)
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
  <div class="service-cards">
    <div
      v-if="services.length === 0"
      class="service-card__loader">
      <dimi-loader/>
    </div>
    <dimi-card
      v-for="(service, index) in services"
      v-else
      ref="cards"
      :key="`service-${index}`"
      :class="['service-card', !service.url && 'service-card--disabled']"
      shadow
      hover
      @click.native="clickServiceCard(service)">

      <div class="service-card__icon">
        <span :class="service.icon"/>
      </div>
      <h4 class="service-card__title">{{ service.title }}</h4>
      <p class="service-card__description">{{ service.description }}</p>
    </dimi-card>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/helpers/typography';

.service-cards {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @include until($tablet) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

.service-card {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &--disabled {
    display: none !important;
  }

  &__icon {
    font-size: 64px;
    @include until($tablet) {
      font-size: 42px;
    }
  }

  &__title {
    @include font-extra-bold;
    font-size: 24px;

    margin-top: 1.2rem;
    text-align: center;
    word-break: break-all;

    @include until($tablet) {
      font-size: 16px;
    }
  }

  &__description {
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
