<script>
import DimiMeal from './DimiMeal.vue'
import DimiCard from './DimiCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TheMain',

  components: { DimiMeal, DimiCard },

  computed: {
    ...mapState('account', ['notifications']),
    ...mapState('service', ['serviceList'])
  },

  async mounted () {
    await this.fetchServiceList()
    this.setServiceCardHeight()
    window.addEventListener('resize', this.setServiceCardHeight)
  },

  methods: {
    setServiceCardHeight () {
      const cards = document.querySelectorAll('.service__card')
      cards.forEach(v => (v.style.height = window.getComputedStyle(v).width))
    },
    ...mapActions('service', ['fetchServiceList'])
  }
}
</script>

<template>
  <div class="container">
    <h1 class="brand">DIMIGOIN</h1>
    <div class="info">
      <div class="column">
        <section class="info__profile section">
          <h2 class="section__title">프로필</h2>
          <dimi-card
            class="info__profile section__content"
            shadow
          >
            a <br> a
          </dimi-card>
        </section>
        <section class="info__notification section">
          <h2 class="section__title">알림({{ notifications.length }})</h2>
          <dimi-card
            class="info__notice section__content"
            shadow
          >
            a
          </dimi-card>
        </section>
      </div>
      <div class="column">
        <section class="info__meal section">
          <h2 class="section__title">오늘의 급식</h2>
          <dimi-card
            class="info__meal section__content"
            shadow
          >
            <dimi-meal/>
          </dimi-card>
        </section>
      </div>

    </div>
    <div class="service">
      <div class="column">
        <section class="section">
          <h2 class="section__title">서비스</h2>
          <div class="service__cards">
            <dimi-card
              v-for="(service, index) in serviceList"
              :key="`service-${index}`"
              class="service__card"
              shadow
            >{{ service.name }}</dimi-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/all';

.container {
  padding: 1em;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  margin: .75em;
}

.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  &__title {
    @extend .h-text-l;
    @extend .h-font-bold;
    @extend .h-text-gray-dark;
    margin: 1rem 0;
  }
  &__content {
    display: flex;
    padding: 1em;
    flex: 1;
  }
}

.brand {
  @extend .h-text-xl;
  @extend .h-font-extra-bold;
  text-align: center;
  margin: 2rem;
}

.info,
.service {
  display: flex;
}

.info {
  &__notification,
  &__meal {
    flex: 1;
  }
  &__meal {
    min-height: 15em;
  }
}

.service {
  &__cards {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem 0 0 -1rem;
  }
  &__card {
    display: flex;
    margin: 1rem 0 0 1rem;
    width: calc(25% - 1rem);
  }
}

</style>
