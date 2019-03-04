<script>
import { service } from '@/src/api/service'
import { permission } from '@/src/api/permission'

export default {
  name: 'ServiceCards',

  data: () => ({
    services: [],
    isLoading: false
  }),

  async created () {
    this.toggleLoading()
    this.services = (await Promise.all([
      this.getManagementServices(),
      service.getServiceList()
    ])).reduce((a, b) => a.concat(b))
    this.toggleLoading()
    this.$nextTick(() => this.updateServiceCardHeight())
  },

  async mounted () {
    window.addEventListener('resize', () => this.updateServiceCardHeight())
  },

  methods: {
    toggleLoading () {
      this.isLoading = !this.isLoading
    },

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
    },

    async getManagementServices () {
      const permissions = await permission.getPermissions()
      if (permissions.length > 0) {
        return [{
          order: 99,
          title: '관리',
          description: '디미고인 관리 시스템',
          icon: 'icon-submission',
          url: 'management'
        }]
      }
    }
  }
}
</script>

<template>
  <div class="services">
    <div
      v-show="isLoading"
      class="services__loader"
    >
      <dimi-loader />
    </div>

    <div
      v-show="!isLoading"
      class="services__cards"
    >
      <dimi-card
        v-for="(service, index) in services"
        ref="cards"
        :key="`service-${index}`"
        :class="['services__card', !service.url && 'services__card--disabled']"
        shadow
        hover
        @click.native="clickServiceCard(service)"
      >
        <div class="services__card-icon">
          <span :class="service.icon" />
        </div>
        <h4 class="services__card-title">
          {{ service.title }}
        </h4>
        <p class="services__card-description">
          {{ service.description }}
        </p>
      </dimi-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
  }

  &__card:hover {
    transform: scale(1.05);
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
    margin-top: 1.2rem;
    font-size: 24px;
    font-weight: $font-weight-extra-bold;
    text-align: center;
    word-break: keep-all;

    @include until($tablet) {
      font-size: 16px;
    }
  }

  &__card-description {
    margin-top: 0.5rem;
    color: $gray;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    word-break: keep-all;
    @include until($tablet) {
      display: none;
    }
  }
}
</style>
