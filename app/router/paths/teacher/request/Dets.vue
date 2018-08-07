<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'
import { dets } from '@/src/api'
import { days } from '@/src/util/index'

export default {
  name: 'Dets',
  components: { ContentWrapper, DefaultNavbar },

  filters: {
    filterTime (time) {
      return '야자 ' + time + '타임'
    }
  },

  data () {
    return {
      pending: false,
      currentGrade: 0,
      list: {
        fresh: [],
        sophomore: [],
        junior: []
      }
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
      this.list.fresh = await dets.getGradeDets(1)
      this.list.sophomore = await dets.getGradeDets(2)
      this.list.junior = await dets.getGradeDets(3)
      this.pending = false
    },

    getDayTextByCode (code) {
      return this.days.filter(v => v.code === code)[0].text
    },

    color (color) {
      if (color === 'accept') {
        return 'aloes'
      } else if (color === 'reject') {
        return 'orange'
      } else if (color === 'wait') {
        return 'gray'
      }
    },

    async accept (parameter) {
      try {
        await dets.acceptDets(parameter.idx)
        await this.$swal('승인되었습니다', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async reject (parameter) {
      try {
        await dets.rejectDets(parameter.idx)
        await this.$swal('거절하였습니다', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    }
  }
}

</script>

<template>
  <content-wrapper>

    <h1 slot="header">
      <span class="icon-dets-lg"/>Dets 신청 관리
      <span
        onclick="location.href='https://api.dimigo.in/dets/excel'"
        class="dets__create">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="dets__main">
      <dimi-tab
        v-model="currentGrade"
        :tabs="['1학년', '2학년', '3학년']"
      />

      <div
        v-if="pending"
        class="dets__loader-wrapper">
        <dimi-loader/>
      </div>

      <template v-else>

        <section
          v-if="currentGrade === 0">
          <div
            v-for="(dets, index) in list.fresh"
            :key="`dets_${index}`">

            <div
              class="dets__dets"
              @click="dets.open = !dets.open">

              <dimi-badge
                :color="color(dets.detsStatus)"
                class="dets__badge">
                <template v-if="dets.detsStatus === 'accept'">통과</template>
                <template v-if="dets.detsStatus === 'reject'">탈락</template>
                <template v-if="dets.detsStatus === 'wait'">보류</template>
              </dimi-badge>

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
                </div>
                <div
                  class="dets__item--button"
                  @click="accept(dets)">
                  <span class="icon-edit"/> 승인하기
                </div>

                <div
                  class="dets__item--button dets__item--reject"
                  @click="reject(dets)">
                  <span class="icon-cross"/> 거절하기
                </div>

              </div>
            </div>
          </div>
        </section>

        <section
          v-if="currentGrade === 1">
          <div
            v-for="(dets, index) in list.sophomore"
            :key="`dets_${index}`">

            <div
              class="dets__dets"
              @click="dets.open = !dets.open">

              <dimi-badge
                :color="color(dets.detsStatus)"
                class="dets__badge">
                <template v-if="dets.detsStatus === 'accept'">통과</template>
                <template v-if="dets.detsStatus === 'reject'">탈락</template>
                <template v-if="dets.detsStatus === 'wait'">보류</template>
              </dimi-badge>

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
                </div>
                <div
                  class="dets__item--button"
                  @click="accept(dets)">
                  <span class="icon-edit"/> 승인하기
                </div>

                <div
                  class="dets__item--button dets__item--reject"
                  @click="reject(dets)">
                  <span class="icon-cross"/> 거절하기
                </div>

              </div>
            </div>
          </div>
        </section>

        <section
          v-if="currentGrade === 2">
          <div
            v-for="(dets, index) in list.junior"
            :key="`dets_${index}`">

            <div
              class="dets__dets"
              @click="dets.open = !dets.open">

              <dimi-badge
                :color="color(dets.detsStatus)"
                class="dets__badge">
                <template v-if="dets.detsStatus === 'accept'">통과</template>
                <template v-if="dets.detsStatus === 'reject'">탈락</template>
                <template v-if="dets.detsStatus === 'wait'">보류</template>
              </dimi-badge>

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
                </div>
                <div
                  class="dets__item--button"
                  @click="accept(dets)">
                  <span class="icon-edit"/> 승인하기
                </div>

                <div
                  class="dets__item--button dets__item--reject"
                  @click="reject(dets)">
                  <span class="icon-cross"/> 거절하기
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
@import '~styles/variables';

.dets {
  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__badge {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
  }

  &__main {
    padding-top: 0;
  }

  &__create {
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__create {
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__dets {
    align-items: center;
    border-top: 1px solid $gray-lighter;
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
    border-top: 1px solid $gray-lighter;
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

  &__item--reject {
    color: $gray-light;
    padding-left: 10px;
  }
}
</style>
