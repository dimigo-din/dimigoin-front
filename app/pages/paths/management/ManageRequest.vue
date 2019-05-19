<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

export default {
  name: 'ManageRequest',
  components: { ContentWrapper },

  computed: {
    today: () => new Date().getDate(),
    month: () => 1 + new Date().getMonth(),
    year: () => new Date().getFullYear()
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-request" />신청 현황
    </h1>
    <dimi-card
      slot="main"
    >
      <div class="dashboard">
        <div class="dashboard__row">
          <div class="dashboard__item dashboard__snack">
            <h1 class="dashboard__title">
              <span class="icon-muffin" /> {{ month }}월 간식 신청 현황
            </h1>
            <div class="dashboard__content">
              <div class="dashboard__field">
                <div class="dashboard__status">
                  총인원 620명 중<br>
                  150명 신청
                </div>
                <div class="dashboard__percent">
                  24%
                </div>
              </div>
              <dimi-progressbar
                class="snack"
                :progress="24"
                color="orange"
                :small="false"
              />
            </div>
          </div>
          <div class="dashboard__item dashboard__circle">
            <h1 class="dashboard__title">
              <span class="icon-club-sm" /> {{ year }}년 동아리 가입 신청 현황
            </h1>
            <div class="dashboard__content">
              차트 컴포넌트를 만들자
            </div>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__item dashboard__afterschool">
            <h1 class="dashboard__title">
              <span class="icon-ball" /> {{ year }}년 상반기 방과 후 활동 신청 현황
            </h1>
            <div class="dashboard__content">
              차트 컴포넌트를 만들자
            </div>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__item dashboard__">
            <h1 class="dashboard__title">
              <span class="icon-comment" /> {{ month }}월 2주차 상담 신청 현황 - 진로 상담
            </h1>
            <div class="dashboard__content">
              차트 컴포넌트를 만들자
            </div>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__item">
            <h1 class="dashboard__title">
              <span class="icon-internet-class" /> {{ month }}월 {{ today }}일 인강실 사용 신청 현황
            </h1>
            <div class="dashboard__content">
              <div class="dashboard__ingang">
                <div class="dashboard__ingang--field">
                  <div class="dashboard__time">
                    1타임
                  </div>
                  <div class="dashboard__status">
                    30석 중 24석 신청
                  </div>
                </div>
                <dimi-progressbar
                  class="ingang"
                  :progress="80"
                  color="red"
                  :small="true"
                />
              </div>
              <div class="dashboard__ingang">
                <div class="dashboard__ingang--field">
                  <div class="dashboard__time">
                    2타임
                  </div>
                  <div class="dashboard__status">
                    30석 중 12석 신청
                  </div>
                </div>
                <dimi-progressbar
                  class="ingang"
                  :progress="40"
                  color="pink"
                  :small="true"
                />
              </div>
            </div>
          </div>
          <div class="dashboard__item">
            <h1 class="dashboard__title">
              <span class="icon-hourglass" /> {{ month }}월 2주차 잔류 신청 현황
            </h1>
            <div class="dashboard__content">
              차트 컴포넌트를 만들자
            </div>
          </div>
        </div>
      </div>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $gray;

  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__row:not(:first-child) {
    margin-top: 2em;
  }

  &__item {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 1em;
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 1.5em;
  }

  &__field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 1.8;
  }

  &__percent {
    color: $orange;
    font-size: 48px;
    font-weight: $font-weight-regular;
  }

  &__status {
    display: flex;
  }

  &__snack &__field {
    @include until($tablet) {
      flex-direction: column;
    }
  }

  &__snack &__percent {
    line-height: normal;
  }

  &__ingang {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__ingang--field {
    display: flex;
    width: 50%;
    flex-direction: column;
  }

  &__ingang:first-child {
    margin-bottom: 2em;
  }

  &__time {
    color: $gray-dark;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }
}

.progress.snack {
  display: flex;
  margin-top: 1em;
}

.progress.ingang {
  display: flex;
  padding-left: 0.5em;
}
</style>
