<script>
import MealGroup from '../components/MealGroup.vue'
import DimiCard from '../components/DimiCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Main',

  components: { MealGroup, DimiCard },
  data: () => ({ photoCDN: 'https://api.dimigo.hs.kr/user_photo/' }),

  computed: {
    ...mapState('account', {
      needVerify: ({ auth }) => auth.needVerify,
      name: ({ informations }) => informations.name,
      photoUrl: ({ informations }) => informations.photoUrl,
      grade: ({ informations }) => informations.grade,
      klass: ({ informations }) => informations.klass,
      userType: ({ informations }) => informations.userType
    }),
    ...mapState('service', ['serviceList'])
  },

  async created () {
    try {
      await this.autoLogin()
      if (this.needVerify) this.$router.push({ name: 'register/step/3' })
    } catch (err) {
      console.error(err)
    }

    await this.fetchServiceList()
    this.updateServiceCardHeight()
  },

  async mounted () {
    window.addEventListener('resize', () => {
      this.updateMealCardHeight()
      this.updateServiceCardHeight()
    })
  },

  methods: {
    updateServiceCardHeight () {
      const cards = document.querySelectorAll('.service__card')
      cards.forEach(v => (v.style.height = window.getComputedStyle(v).width))
    },

    updateMealCardHeight () {
      const col = document.querySelector('.info .column:last-child')
      const meals = [...document.getElementsByClassName('meal-item')]

      if (!col || !meals.length) return
      const m = meals.reduce((h, meal) => h + meal.offsetHeight, 0)
      const t = col.querySelector('.info-section__title').offsetHeight

      col.style.minHeight = t + m +
        72 + // total margin between 4 meal items
        40 + // card paddings
        32 + // section bottom margin
        24 // title bottom margin
    },

    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push({ name: 'login' })
    },

    clickServiceCard (service) {
      if (!service.url) return
      if (service.url.startsWith('http')) return window.open(service.url, '_blank')
      this.$router.push({ name: service.url })
    },

    ...mapActions('account', ['autoLogin']),
    ...mapActions('service', ['fetchServiceList'])
  }
}
</script>

<template>
  <div class="container container--naive">
    <h1 class="brand">
      <span class="icon-dimigo"/>DIMIGOIN
    </h1>
    <div class="info">
      <div class="column">
        <section class="info__profile info-section">
          <h2 class="info-section__title">프로필</h2>
          <dimi-card
            shadow
            class="info__profile-card info-section__content">

            <div class="profile-info__left">
              <img
                v-if="photoUrl"
                :src="photoCDN + photoUrl"
                class="profile-info__photo">
              <span
                v-else
                class="profile-info__default-photo icon-profile"/>

              <span class="profile-info">
                <template v-if="userType === 'T'">
                  <span class="profile-info__name">{{ name }}</span>
                  <span class="profile-info__serial">{{ 선생님 }}</span>
                </template>
                <template v-else>
                  <span class="profile-info__serial">{{ `${grade}학년 ${klass}반` }}</span>
                  <span class="profile-info__name">{{ name }}</span>
                </template>

              </span>
            </div>

            <a
              class="icon-logout logout-btn"
              title="로그아웃"
              @click="logout"/>
          </dimi-card>
        </section>
        <section class="info__notification info-section">
          <h2 class="info-section__title">알림</h2>
          <dimi-card
            class="info__notice info-section__content"
            shadow>
            새로운 디미고인에 오신 것을 환영합니다!
          </dimi-card>
        </section>
      </div>
      <div class="column">
        <section class="info__meal info-section">
          <h2 class="info-section__title">오늘의 급식</h2>
          <dimi-card
            class="info-section__content"
            shadow>
            <meal-group @postFetch="updateMealCardHeight"/>
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
  display: flex;
  min-height: 480px;

  @include until($tablet) {
    display: block;
    width: 100%;
  }

  .column {
    @include until($tablet) {
      display: block;
      min-height: unset !important;
    }
  }

  &__profile,
  &__profile-card {
    display: flex;
    justify-content: space-between;
  }

  &__profile-card {
    align-items: center;
    min-height: 46px; // 44 (image height) + 1+1 (image borders)
  }

  &__notification,
  &__meal {

    flex: 1;
    @include until($tablet) {
      display: block;
    }
  }

  &__meal {
    min-height: 15rem;
  }
}

.profile-info {
  font-size: 20px;

  &__left {
    align-items: center;
    display: flex;
  }

  &__photo,
  &__default-photo {
    height: 44px;
    margin-right: 15px;
    width: 44px;
  }

  &__photo {
    border: 1px solid $gray-lighter;
    border-radius: 50%;
    object-fit: cover;
  }

  &__default-photo::before {
    font-size: 44px;
    margin-left: 0;
    margin-right: 0;
  }

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
    margin-top: 0.85rem;
    text-align: center;
    word-break: keep-all;
    @include until($tablet) {
      display: none;
    }
  }
}

.logout-btn {
  cursor: pointer;
  font-size: 23px;
}
</style>
