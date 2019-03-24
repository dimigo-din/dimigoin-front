<script>
import { format } from 'date-fns'
import koLocale from 'date-fns/locale/ko'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { counselRequestor } from '@/src/api/counsel'

export default {
  name: 'RequestCounsel',

  components: { ContentWrapper },

  filters: {
    filterTime (time) {
      return format(time, 'dddd ( MM월 DD일 ) hh시 mm분 ~', { locale: koLocale })
    },
    filterEndTime (time) {
      return format(time, 'hh시 mm분')
    }
  },

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
      this.list = await counselRequestor.getCounsels()
      this.pending = false
    },

    async toggleApply (parameter) {
      try {
        if (parameter.applied !== 'applied') await counselRequestor.applyCounsel(parameter.idx)
        else await counselRequestor.cancelCounsel(parameter.idx)
        this.$swal('성공하였습니다', '', 'success')
      } catch (err) {
        this.$swal('이런', err.message, 'error')
      } finally {
        await this.refresh()
      }
    },

    downloadPaper (event) {
      const setPrevent = () => {
        event.prevent = true
      }

      const hrefs = ['https://goo.gl/sY9qwe', 'https://goo.gl/e7YhGk']
      location.href = hrefs[event.value]
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-comment" />상담 신청
    </h1>

    <dimi-card
      slot="main"
      class="counsel__main"
    >
      <dimi-tab
        v-model="currentTab"
        :tabs="['Wee 클래스 상담', '진로상담']"
      />

      <div
        v-if="pending"
        class="counsel__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <template v-else>
        <section
          v-if="currentTab === 0"
        >
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
          <div
            class="counsel__buttons"
          >
            <dimi-long-button-group
              :items="['보호자 동의서 다운로드', '상담 신청서 다운로드']"
              @click="downloadPaper"
            />
          </div>
        </section>
        <section
          v-if="currentTab === 1"
        >
          <div class="counsel__field">
            <div class="counsel__item">
              진로 상담은 대학 진학 ·고졸 취업과 같이 상담자의 진로를 주제로 교사 남승완께서 진행하는 상담입니다. 매주 수요일·금요일에 상담 신청자에 한하여 본교무실(본관 1층)에서 진행됩니다.
            </div>
          </div>
          <div class="counsel__field">
            <div class="counsel__title">
              신청방법
            </div>
            <div class="counsel__item counsel_end">
              아래의 항목에서 원하는 일시에 진행되는 상담을 신청하고, 상담하고 싶은 주제 혹은 내용에 대해 다음의 이메일 주소로 메일을 보냅니다 :<br>nsw55@naver.com
            </div>
          </div>
          <div
            class="list__top"
          >
            <div
              v-for="(counsel, index) in list"
              :key="`counsel-${index}`"
            >
              <div class="list__list">
                <span class="list__title">
                  {{ counsel.startDate | filterTime }}{{ counsel.endDate | filterEndTime }}
                </span>
                <div
                  :class="{
                    'list__button': true,
                    'list__full': counsel.caniapplied === 'no',
                    'list__applied': counsel.applied === 'applied'
                  }"
                  @click="toggleApply(counsel)"
                >
                  <template v-if="counsel.applied === 'applied'">
                    <span class="icon-cross" /> 신청취소
                  </template>
                  <template v-else>
                    <template v-if="counsel.caniapplied === 'yes'">
                      <span class="icon-ok" /> 신청하기
                    </template>
                    <template v-else>
                      <span class="icon-alert" /> 신청불가
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.counsel {
  &__loader-wrapper {
    display: flex;
    height: 35vh;
    align-items: center;
    justify-content: center;
  }

  &__main {
    padding-top: 0;
  }

  &__item {
    padding: 16px 0;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
    line-height: 1.5em;
  }

  &__title {
    padding-top: 16px;
    color: $black !important;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }

  &__buttons {
    text-align: right;
  }
}

.list {
  &__top {
    padding-top: 32px;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    border-top: 1px solid $gray-lighter;
    cursor: pointer;
  }

  &__title {
    flex: 1;
    margin-right: 16px;
    color: $black !important;
    font-size: 16px;
    font-weight: $font-weight-bold;
    line-height: 1.5;
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
