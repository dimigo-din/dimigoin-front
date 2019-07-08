<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { etcRequestor } from '@/src/api/etcs'

export default {
  name: 'RequestEtcs',

  components: { ContentWrapper },

  filters: {
    filterEndTime (time) {
      return format(time, 'YYYY년 MM월 DD일 HH시 mm분')
    }
  },

  data () {
    return {
      list: [],
      pending: false
    }
  },

  async created () {
    await this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await etcRequestor.getApplications()
      this.pending = false
    },

    async toggleApply (parameter) {
      try {
        if (parameter.status !== true) await etcRequestor.applyApplication(parameter.applicationIdx)
        else await etcRequestor.cancelApplication(parameter.requestIdx)
        this.$swal('성공하였습니다', '', 'success')
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      await this.refresh()
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-etcs-lg" />기타 신청
    </h1>

    <dimi-card
      slot="main"
      class="etcs__main"
    >
      <div
        v-if="pending"
        class="etcs__loader-wrapper"
      >
        <dimi-loader />
      </div>
      <template v-else>
        <div
          v-if="!list.length"
          class="etcs__empty"
        >
          아직 등록된 기타 신청이 없습니다
        </div>
        <div
          v-for="(etcs, index) in list"
          :key="`etcslist_${index}`"
        >
          <div
            class="etcs__etcs"
            @click="etcs.open = !etcs.open"
          >
            <span class="etcs__item etcs__title">
              {{ etcs.title }}
            </span>
            <div class="etcs__item etcs__expand">
              <span :class="`icon-arrow-${etcs.open ? 'up' : 'down'}`" />
            </div>
          </div>
          <div
            v-if="etcs.open"
            class="etcs__open"
          >
            <span class="etcs__item etcs__description">
              {{ etcs.description }}
            </span>
            <div
              class="etcs__down"
            >
              <div
                class="etcs__etcail"
              >
                <span class="etcs__item">
                  신청마감
                </span>
                <span class="etcs__item">
                  {{ etcs.endDate | filterEndTime }}
                </span>
                <span class="etcs__item">
                  인원
                </span>
                <span class="etcs__item">
                  {{ etcs.userCount }} / {{ etcs.maxUser }} 명
                </span>
              </div>

              <div
                :class="{
                  'etcs__item': true,
                  'etcs__item--button': true,
                  'etcs__item--full': etcs.userCount === etcs.maxUser,
                  'etcs__item--applied': etcs.status === 'request'
                }"
                @click="toggleApply(etcs)"
              >
                <template v-if="etcs.status === true">
                  <span class="icon-cross" /> 신청취소
                </template>
                <template v-else>
                  <template v-if="etcs.maxUser > etcs.userCount">
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
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
  .etcs {
    &__loader-wrapper {
      display: flex;
      height: 35vh;
      align-items: center;
      justify-content: center;
    }

    &__main {
      padding-top: 0;
      padding-bottom: 0;
    }

    &__etcs {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 24px;
      border-bottom: 1px solid $gray-lighter;
      cursor: pointer;
    }

    &__item {
      margin-right: 16px;
      color: $gray;
      font-size: 16px;
      font-weight: $font-weight-bold;
    }

    &__title {
      flex: 1;
      color: $black !important;
    }

    &__expand {
      margin-left: 16px;
    }

    &__open {
      align-items: stretch;
      justify-content: flex-start;
      padding: 24px;
      border-bottom: 1px solid $gray-lighter;
      cursor: default;
    }

    &__down {
      display: flex;
      padding-top: 24px;
    }

    &__description {
      flex-direction: column;
      font-family: inherit;
      font-weight: $font-weight-regular;
      line-height: 1.8;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    &__etcail {
      flex: 1;
    }

    &__item--button {
      color: $pink;
      cursor: pointer;
    }

    &__item--full {
      color: $mustard;
    }

    &__item--applied {
      color: $gray-light;
    }

    &__empty {
      padding: 24px;
      margin-right: 16px;
      color: $gray;
      font-size: 16px;
      font-weight: $font-weight-bold;
    }
  }
</style>
