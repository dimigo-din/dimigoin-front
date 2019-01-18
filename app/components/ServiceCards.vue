<script>
import NProgress from 'nprogress'
import * as service from '@/src/api/service'
import * as permission from '@/src/api/permission'

export default {
  name: 'ServiceCards',

  data: () => ({
    services: [],
    isLoading: false
  }),

  async created () {
    this.toggleLoading()
    this.services = await service.getServiceList()
    await this.checkPermission()
    this.toggleLoading()
    this.$nextTick(() => this.updateServiceCardHeight())
  },

  async mounted () {
    window.addEventListener('resize', () => this.updateServiceCardHeight())
  },

  methods: {
    toggleLoading () {
      this.isLoading = !this.isLoading
      this.isLoading ? NProgress.start() : NProgress.done()
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

    async checkPermission () {
      const permissions = await permission.getPermission()
      if (permissions.length > 0) {
        this.services.unshift({
          order: 99,
          title: '관리',
          description: 'Dets, 인강실',
          icon: 'icon-submission',
          url: 'management'
        })
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
@import '~styles/variables';
@import '~styles/mixins';

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
    font-size: 24px;
    font-weight: $font-weight-extra-bold;

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
