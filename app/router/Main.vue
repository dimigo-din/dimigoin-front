<script>
import DimiMeal from '../components/DimiMeal.vue'
import DimiCard from '../components/DimiCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Main',

  components: { DimiMeal, DimiCard },

  computed: {
    ...mapState('account', {
      name: ({ informations }) => informations.name,
      photoUrl: ({ informations }) => informations.photoUrl,
      grade: ({ informations }) => informations.grade,
      klass: ({ informations }) => informations.klass
    }),
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

    logout () {
      this.$store.dispatch('account/logout')
      this.$router.push({ name: 'login' })
    },

    clickServiceCard (service) {
      if (!service.url) return
      if (service.url.startsWith('http')) return window.open(service.url, '_blank')
      this.$router.push({ name: service.url })
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
        <section class="info__profile info-section">
          <h2 class="info-section__title">프로필</h2>
          <dimi-card
            class="info__profile info-section__content"
            shadow
          >
            <div class="profile-info">
              <span class="profile-info__serial">
                {{ `${grade}학년 ${klass}반` }}
              </span>
              <span class="profile-info__name">
                {{ name }}
              </span>
            </div>
            <div class="info__profile__nav">
              <a
                class="icon-logout logout-btn"
                title="로그아웃"
                @click="logout"/>
            </div>
          </dimi-card>
        </section>
        <section class="info__notification info-section">
          <h2 class="info-section__title">알림</h2>
          <dimi-card
            class="info__notice info-section__content"
            shadow
          >
            새로운 디미고인에 오신 것을 환영합니다!
          </dimi-card>
        </section>
      </div>
      <div class="column">
        <section class="info__meal info-section">
          <h2 class="info-section__title">오늘의 급식</h2>
          <dimi-card
            class="info__meal info-section__content"
            shadow
          >
            <dimi-meal/>
          </dimi-card>
        </section>
      </div>

    </div>
    <div class="service">
      <div class="column">
        <section class="info-section">
          <h2 class="info-section__title">서비스</h2>
          <div class="service__cards">
            <dimi-card
              v-for="(service, index) in serviceList"
              :key="`service-${index}`"
              :class="{ 'service__card': true, 'service__card--disabled': !service.url }"
              shadow
              hover
              @click="clickServiceCard(service)"
            >
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
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/helpers/typography';

.container {
  padding-top: 1rem;
}

.column {
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0.5rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  &__title {
    @extend %h-text-l;
    @extend %h-text-gray-dark;
    @include font-bold;
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
  margin: 3rem 0;
  text-align: center;
}

.info {
  min-height: 480px;
  display: flex;

  &__profile {
    display: flex;
    justify-content: space-between;
    min-height: 18px;
  }

  &__notification,
  &__meal {
    flex: 1;
  }

  &__meal {
    min-height: 15rem;
  }
}

.profile-info {
  font-size: 20px;

  &__serial {
    color: $gray;
  }

  &__name {
    color: $black;
  }
}

.service__cards {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.service__card {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &--disabled.service__card {
    background-color: $gray-lighten;
    cursor: not-allowed;
  }

  &__icon {
    @extend %h-text-3xl;
  }

  &__title {
    @extend %h-text-l;
    @include font-extra-bold;

    margin-top: 1.2rem;
  }

  &__description {

    color: $gray;
    font-size: 14px;
    margin-top: 0.85rem;
    word-break: keep-all;
  }
}

.logout-btn {
  cursor: pointer;
}
</style>
