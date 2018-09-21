<script>
import Brand from '@/assets/brand.svg'
import MealGroup from '@/components/MealGroup.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import { mapState, mapActions } from 'vuex'
import restaurance from 'restaurance'
import { notice } from '@/src/api/index'

export default {
  name: 'Main',
  components: { Brand, MealGroup, ServiceCards },

  data: () => ({
    photoCDN: process.env.DIMIGO_API_URL + '/user_photo/',
    hos: (1 + new Date().getMonth()) === 4 && new Date().getDate() === 1,
    notice: ''
  }),

  computed: {
    ...mapState('account', {
      needVerify: ({ auth }) => auth.needVerify,
      name: ({ informations }) => informations.name,
      photoUrl: ({ informations }) => informations.photoUrl,
      grade: ({ informations }) => informations.grade,
      klass: ({ informations }) => informations.klass,
      userType: ({ informations }) => informations.userType,
      ssoToken: ({ informations }) => informations.ssoToken
    })
  },

  async created () {
    if (this.ie) return this.$router.push({ name: 'ienope' })

    try {
      await this.autoLogin()
      if (this.needVerify) this.$router.push({ name: 'register/step/3' })
      this.notice = (await notice.getLatestNotice())[0].desc
    } catch (err) {
      console.error(err)
    }
  },

  methods: {
    ...mapActions('account', ['autoLogin']),

    openSetting () {
      window.location.href = `https://student.dimigo.hs.kr/user/sso?token=${this.ssoToken}&url=/user/profile`
    },

    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push({ name: 'login' })
    },

    async hots () {
      if (!this.hos) return

      this.hos = false
      const elems = [...document.querySelectorAll('*')]
      await restaurance({}, elems.filter(e => e.children.length <= 1))
    }
  }
}
</script>

<template>
  <div class="container container--naive">
    <h1
      class="brand"
      @click="hots">
      <brand width="212px"/>
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
                  <span class="profile-info__serial"> 선생님</span>
                </template>
                <template v-else>
                  <span class="profile-info__serial">{{ `${grade}학년 ${klass}반` }}</span>
                  <span class="profile-info__name">{{ name }}</span>
                </template>

              </span>
            </div>

            <nav>
              <a
                class="icon-setting profile-info__btn"
                title="설정"
                @click="openSetting"/>
              <a
                class="icon-logout profile-info__btn"
                title="로그아웃"
                @click="logout"/>
            </nav>
          </dimi-card>
        </section>
        <section class="info__notification info-section">
          <h2 class="info-section__title">알림</h2>
          <dimi-card
            class="info__notice info-section__content"
            shadow>
            <span
              v-html="notice"/>
          </dimi-card>
        </section>
      </div>
      <div class="column">
        <section class="info__meal info-section">
          <h2 class="info-section__title">오늘의 급식</h2>
          <dimi-card
            shadow
            class="info-section__content"
            @button="$router.push({ name: 'meal' })">
            <span slot="button">주간 급식 보기</span>
            <meal-group/>
          </dimi-card>
        </section>
      </div>
    </div>
    <div class="service">
      <div class="column">
        <section class="info-section">
          <h2 class="info-section__title">서비스</h2>
          <service-cards/>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/mixins';

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
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
    margin: 1rem 0;
  }

  &__content {
    display: flex;
    flex: 1;
  }
}

.brand {
  font-size: 36px;
  font-weight: $font-weight-extra-bold;
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

  &__notice {
    color: $gray-dark;
    display: block;
    font-size: 18px;
    line-height: 2;
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

  &__btn {
    cursor: pointer;
    font-size: 23px;
  }

  &__btn:not(:last-child) {
    margin-right: 0.25em;
  }
}
</style>
