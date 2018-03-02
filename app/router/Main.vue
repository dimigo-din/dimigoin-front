<script>
import DimiMeal from '../components/DimiMeal.vue'
import DimiCard from '../components/DimiCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Main',

  components: { DimiMeal, DimiCard },

  computed: {
    ...mapState('account', ['notifications']),
    ...mapState('service', ['serviceList'])
  },

  async mounted () {
    if (this.serviceList.length === 0) await this.fetchServiceList()
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
  <div class="container container--naive">
    <h1 class="brand"><span class="icon-dimigo"/>DIMIGOIN</h1>
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
            TODO
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
              hover
            >{{ service.name }}</dimi-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/typography';

.container {
  padding-top: 1rem;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  margin: .5em;
}

.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  &__title {
    @extend %h-text-l;
    @include font-bold;
    @extend %h-text-gray-dark;
    margin: 1rem 0;
  }
  &__content {
    display: flex;
    flex: 1;
  }
}

.brand {
  @extend %h-text-xl;
  @include font-extra-bold;
  text-align: center;
  margin: 3rem 0 3rem 0;
}

.info {
  display: flex;
  &__notification,
  &__meal {
    flex: 1;
  }
  &__meal {
    min-height: 15rem;
  }
}

.service {
  display: flex;
  &__cards {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem 0 0 -1rem;
  }
  &__card {
    flex: 1 25%;
    margin: 1rem 0 0 1rem;
  }
}

</style>
