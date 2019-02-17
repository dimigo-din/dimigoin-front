<script>
import Logo from '@/assets/brand.svg'
import MealGroup from '@/components/MealGroup.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import { mapState } from 'vuex'
import restaurance from 'restaurance'
import NProgress from 'nprogress'
import { notice } from '@/src/api/notice'

export default {
  name: 'Main',
  components: { Logo, MealGroup, ServiceCards },

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
    NProgress.start()
    this.notice = await notice.getNotice()
    NProgress.done()
  },

  methods: {
    openSetting () {
      window.location.href = `https://student.dimigo.hs.kr/user/sso?token=${this.ssoToken}&url=/user/profile`
    },

    async logout () {
      await this.$store.dispatch('account/logout')
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
      @click="hots"
    >
      <logo style="width: 150px;" />
    </h1>
    <div class="info">
      <div class="column">
        <section class="info__profile info-section">
          <dimi-card
            shadow
            class="info__profile-card info-section__content"
          >
            <div class="profile-info__left">
              <img
                v-if="photoUrl"
                :src="photoCDN + photoUrl"
                class="profile-info__photo"
              >
              <span
                v-else
                class="profile-info__default-photo icon-profile"
              />

              <span class="profile-info">
                <template v-if="userType === 'T'">
                  <span class="profile-info__name">
                    {{ name }}
                  </span>
                  <span class="profile-info__serial">
                    선생님
                  </span>
                </template>
                <template v-else>
                  <span class="profile-info__serial">
                    {{ `${grade}학년 ${klass}반` }}
                  </span>
                  <span class="profile-info__name">
                    {{ name }}
                  </span>
                </template>
              </span>
            </div>

            <nav>
              <a
                class="icon-setting profile-info__btn"
                title="설정"
                @click="openSetting"
              />
              <a
                class="icon-logout profile-info__btn"
                title="로그아웃"
                @click="logout"
              />
            </nav>
          </dimi-card>
        </section>
        <section class="info__notification info-section">
          <dimi-card
            class="info__notice info-section__content"
            shadow
          >
            <p class="info__notice--content">{{ notice }}</p>
          </dimi-card>
        </section>
      </div>
      <div class="column">
        <section class="info__meal info-section">
          <dimi-card
            shadow
            class="info-section__content"
            @button="$router.push({ name: 'meal' })"
          >
            <span slot="button">
              주간 급식 보기
            </span>
            <meal-group />
          </dimi-card>
        </section>
      </div>
    </div>
    <div class="service">
      <div class="column">
        <section class="info-section">
          <service-cards />
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
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  margin: 0.5rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &__title {
    margin: 1rem 0;
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__content {
    display: flex;
    flex: 1;
  }
}

.brand {
  margin: 2rem 0 1rem 0.5rem;
  font-size: 36px;
  font-weight: $font-weight-extra-bold;
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
    display: block;
    color: $gray-dark;
    font-size: 18px;
    line-height: 2;
  }

  &__notice--content {
    font-family: inherit;
    font-weight: $font-weight-regular;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  &__profile,
  &__profile-card {
    display: flex;
    justify-content: space-between;
  }

  &__profile-card {
    min-height: 46px; // 44 (image height) + 1+1 (image borders)
    align-items: center;
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
    display: flex;
    align-items: center;
  }

  &__photo,
  &__default-photo {
    width: 44px;
    height: 44px;
    margin-right: 15px;
  }

  &__photo {
    border: 1px solid $gray-lighter;
    border-radius: 50%;
    object-fit: cover;
  }

  &__default-photo::before {
    margin-right: 0;
    margin-left: 0;
    font-size: 44px;
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
