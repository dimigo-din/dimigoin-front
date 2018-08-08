<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import { dets } from '@/src/api'
import { days } from '@/src/util/index'

export default {
  name: 'RequestDets',

  components: { ContentWrapper },

  filters: {
    filterTime (time) {
      return '야자 ' + time + '타임'
    }
  },

  data () {
    return {
      list: [],
      pending: false
    }
  },

  computed: {
    days () {
      return days.filter(v => v.idx < 5)
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await dets.getStudentDets()
      this.pending = false
    },

    async toggleApply (parameter) {
      try {
        if (parameter.status !== 'request') await dets.applyDets(parameter.idx)
        else await dets.cancelDets(parameter.idx)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      await this.refresh()
    },

    getDayTextByCode (code) {
      return this.days.filter(v => v.code === code)[0].text
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-dets-lg"/>Dets 신청
    </h1>

    <dimi-card
      slot="main"
      class="dets__main">
      <div
        v-if="pending"
        class="dets__loader-wrapper">
        <dimi-loader/>
      </div>
      <template v-else>
        <div
          v-for="(dets, index) in list"
          :key="`detslist_${index}`">
          <div
            class="dets__dets"
            @click="dets.open = !dets.open">
            <span class="dets__item dets__title">{{ dets.title }}</span>
            <span class="dets__item">{{ dets.speakerSerial }} {{ dets.speakerName }}</span>
            <div class="dets__item dets__expand">
              <span :class="`icon-arrow-${dets.open ? 'up' : 'down'}`"/>
            </div>
          </div>
          <div
            v-if="dets.open"
            class="dets__open">
            <span class="dets__item dets__description">{{ dets.description }}</span>
            <div
              class="dets__down">
              <div
                class="dets__detail">
                <span class="dets__item">강의실</span>
                <span class="dets__item">{{ dets.room }}</span>
                <span class="dets__item">강의시각</span>
                <span class="dets__item">{{ getDayTextByCode(dets.day) }} {{ dets.time | filterTime }}</span>
                <span class="dets__item">인원</span>
                <span class="dets__item">{{ dets.count }} / {{ dets.maxCount }} 명</span>
              </div>
              <div
                :class="{
                  'dets__item': true,
                  'dets__item--button': true,
                  'dets__item--full': dets.maxCount === dets.count,
                  'dets__item--applied': dets.status === 'request'
                }"
                @click="toggleApply(dets)">
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
            </div>
          </div>
        </div>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.dets {
  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__main {
    padding-top: 0;
  }

  &__dets {
    align-items: center;
    border-bottom: 1px solid $gray-lighter;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
  }

  &__item {
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
    margin-right: 16px;
  }

  &__title {
    color: $black !important;
    flex: 1;
  }

  &__expand {
    margin-left: 16px;
  }

  &__open {
    align-items: stretch;
    border-bottom: 1px solid $gray-lighter;
    cursor: default;
    justify-content: flex-start;
    padding: 24px;
  }

  &__down {
    display: flex;
    padding-top: 24px;
  }

  &__description {
    flex-direction: column;
    line-height: 1.8;
  }

  &__detail {
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
}
</style>
