<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'

import { ingang } from '@/src/api'

export default {
  name: 'Ingang',
  components: { ContentWrapper },

  data: () => ({
    pending: false,
    currentTab: 0,
    ingangs: {
      fresh: [],
      sophomore: []
    }
  }),

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs.fresh = await ingang.getGradeIngang(1)
      this.ingangs.sophomore = await ingang.getGradeIngang(2)
      this.pending = false
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header"><span class="icon-internet-class"/>인강실 신청 관리
      <span
        v-if="currentTab < 2"
        class="ingang__excel"
        onclick="location.href='http://dev-api.dimigo.in/ingangs/excel/1'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
      <span
        v-if="currentTab > 1"
        class="ingang__excel"
        onclick="location.href='http://dev-api.dimigo.in/ingangs/excel/2'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
    </h1>
    <dimi-card
      slot="main"
      class="ingang">
      <dimi-tab
        v-model="currentTab"
        :tabs="['1학년 1타임', '1학년 2타임', '2학년 1타임', '2학년 2타임']"/>
      <div
        v-if="pending"
        class="ingang__loader">
        <dimi-loader/>
      </div>
      <table
        v-else
        class="ingang__list">
        <tbody>
          <tr
            v-for="(student, key) in ingangs.fresh"
            :key="key"
            class="ingang__row">
            <td class="ingang__cell ingang__cell--serial">{{ student.serial }}</td>
            <td class="ingang__cell ingang__cell--name">{{ student.name }}</td>
            <td class="ingang__cell ingang__cell--time">{{ student.time }}타임</td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.ingang {
  padding: 0;

  &__loader {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__list {
    color: $gray;
    display: block;
    font-weight: $font-weight-bold;
    max-height: 600px;
    min-height: 300px;
    overflow-y: auto;
    padding: 0 3rem;
    width: 100%;
  }

  &__excel {
    color: $aloes;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__row {
    padding: 0 1.5rem;
  }

  &__row:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__cell {
    padding: 24px 0;
    white-space: nowrap;
  }

  &__cell:not(:last-child) {
    padding-right: 24px;
  }

  &__cell--name {
    color: $black;
    width: 99%;
  }

  &__download {
    display: flex;
    justify-content: flex-end;
    padding: 24px;
  }
}
</style>
