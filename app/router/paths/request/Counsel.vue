<script>
import moment from 'moment'
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import { counsel } from '@/src/api'

export default {
  name: 'RequestCounsel',

  components: { ContentWrapper },

  data () {
    return {
      pending: false,
      currentTab: 0,
      list: []
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await counsel.getCounsel()
      this.pending = false
    },

    async toggleApply (idx) {
      try {
        if (idx < 0) await counsel.applyCounsel(idx)
        else await counsel.cancelCounsel(idx)
      } catch (err) {
        this.$swal('이런', err.message, 'err')
      } finally {
        await this.refresh()
      }
    },

    async printTime (startDate, endDate) {
      moment.local('ko')
      const start = moment(startDate)
      const end = moment(endDate)
      return start.isoWeekDay + '(' + start.month + '월' + start.day + '일)' + start.hour + '시' + start.minute + '분 ~' + end.hour + '시' + end.hour + '분'
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-comment"/>상담 신청
    </h1>

    <dimi-card
      slot="main"
      class="counsel__main">
      <dimi-tab
        v-model="currentTab"
        :tabs="['Wee 클래스 상담', '진로상담']"/>

      <div
        v-if="pending"
        class="counsel__loader-wrapper">
        <dimi-loader/>
      </div>

      <template v-else>
        <section
          v-if="currentTab === 0">
          <div class="counsel__field">
            <div class="counsel__item">
              Wee 클래스 상담은 친구·가족·이성관계, 학교폭력, 진로, 성격문제, 인터넷·스마트폰과 같이 학교생활, 학업문제 전반에 걸친 폭넓은 고민거리를 주제로 상담사 김주은께서 진행하시는 상담입니다.
            </div>
          </div>
          <div class="counsel__field">
            <div class="counsel__title">
              신청방법
            </div>
            <div class="counsel__item">
              Wee 클래스 상담실(본관 2층 남쪽 복도 끝)에 직접 방문하여 상담 신청서를 작성한 후 상담 시간을 예약하거나, 이 페이지의 하단에서 받을 수 있는 상담 신청서를 작성하여 다음의 이메일 주소로 전송한 이후 회신을 확인합니다 :<br>hotsoul486@naver.com
            </div>
          </div>
          <div class="counsel__field">
            <div class="counsel__title">
              주의사항
            </div>
            <div class="counsel__item">
              - 상담을 수업시간에 진행할 경우 보호자의 동의가 필요하며, 이에 필요한 보호자 동의서는 상담 신청서와 마찬가지로 이 페이지의 하단에서 받을 수 있습니다.<br>- 상담 신청과 상담 내용을 비롯한 상담 관련 정보는 모두 비밀엄수를 보장합니다.
            </div>
          </div>
        </section>
        <section
          v-if="currentTab === 1">
          <div class="counsel__field">
            <div class="counsel__item">
              진로 상담은 대학 진학 ·고졸 취업과 같이 상담자의 진로를 주제로 교사 남승완께서 진행하는 상담입니다. 매주 수요일·금요일에 상담 신청자에 한에 본교무실(본관 1층)에서 진행됩니다.
            </div>
          </div>
          <div class="counsel__field">
            <div class="counsel__title">
              신청방법
            </div>
            <div class="counsel__item">
              아래의 항목에서 원하는 일시에 진행되는 상담을 신청하고, 상담하고 싶은 주제 혹은 내용에 대해 다음의 이메일 주소로 메일을보냅니다 :<br>nsw55@naver.com
            </div>
          </div>
          <div
            v-for="(counsel, index) in list"
            :key="`counsel-${index}`">
            <div class="list__list">
              <span class="list__title">
                {{ printTime(counsel.startDate, counsel.endDate) }}
              </span>
              <!--
                <div
                  :class="{
                    'list__button': true,
                    'list__full': dets.maxCount === dets.count,
                    'list__applied':
                  }"
                  @click="toggleApply(counsel.idx)">
                  <template v-if="dets.status === 'request'">
                    <span class="icon-cross"/> 신청취소
                  </template>
                  <template v-else>
                    <template v-if="dets.maxCount > dets.count">
                      <span class="icon-ok"/> 신청하기
                    </template>
                    <template v-else>
                      <span class="icon-alert"/> 신청불가
                    </template>
                  </template>
                </div>
              -->
            </div>
          </div>
        </section>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.counsel {
  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__main {
    padding-top: 0;
  }

  &__item {
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
    padding: 16px 0;
  }

  &__title {
    color: $black !important;
    font-size: 16px;
    font-weight: $font-weight-bold;
    padding-top: 16px;
  }
}

.list {
  &__list {
    align-items: center;
    border-top: 1px solid $gray-lighter;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
  }

  &__title {
    color: $black !important;
    flex: 1;
    font-size: 16px;
    font-weight: $font-weight-bold;
    margin-right: 16px;
  }

  &__button {
    color: $pink;
    cursor: pointer;
  }

  &__full {
    color: $mustard;
  }

  &__applied {
    color: $gray-light;
  }
}
</style>
