<template>
  <div class="service">
    <div class="column">
      <section class="info-section">
        <h2 class="info-section__title">서비스</h2>
        <div class="service__cards">
          <dimi-card
            v-for="(service, index) in serviceList"
            :key="`service-${index}`"
            :class="['service__card', !service.url && 'service__card--disabled']"
            shadow
            hover
            @click.native="clickServiceCard(service)">

            <div class="service__card__icon">
              <span :class="service.icon"/>
            </div>
            <h4 class="service__card__title">{{ service.title }}</h4>
            <p class="service__card__description">{{ service.description }}</p>
          </dimi-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCards',
  props: {
    serviceList: {
      type: Array,
      required: true
    }
  },

  methods: {
    clickServiceCard (service) {
      if (!service.url) return
      if (service.url.startsWith('http')) return window.open(service.url, '_blank')
      this.$router.push({ name: service.url })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/helpers/typography';

.service__cards {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @include until($tablet) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

.service__card {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &--disabled.service__card {
    display: none;
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
