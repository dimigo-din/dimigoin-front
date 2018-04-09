<script>
import ContentWrapper from '../../../partial/ContentWrapper.vue'
import DimiButton from '../../../../components/DimiButton.vue'
import DimiCard from '../../../../components/DimiCard.vue'
import DimiLoader from '../../../../components/DimiLoader.vue'
import DimiTab from '../../../../components/DimiTab.vue'

import { ingang } from '../../../../src/api'

export default {
  name: 'Ingang',
  components: { ContentWrapper, DimiButton, DimiCard, DimiLoader, DimiTab },

  data: () => ({
    ingangs: [{}, {}],
    currentTab: 0,
    pending: true
  }),

  computed: {
    filteredStudents () {
      return (this.ingangs[this.currentTab].appliers || [])
        .reduce((pv, cv) => {}, [])
    }
  },

  async created () {
    try {
      this.ingangs = [
        await ingang.admin.getIngang(1),
        await ingang.admin.getIngang(2)
      ]
    } catch (err) {
      this.$swal({
        type: 'error',
        title: '에러!',
        text: err.message
      })
    }
    this.pending = false
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header"><span class="icon-internet-class"/>인강실 신청 관리</h1>
    <dimi-card
      slot="main"
      :class="$style['ingang']">
      <dimi-tab
        v-model="currentTab"
        :tabs="['1학년', '2학년']"/>
      <div
        v-if="pending"
        :class="$style['ingang__loader']">
        <dimi-loader/>
      </div>
      <table
        v-else
        :class="$style['ingang__list']">
        <tbody>
          <tr
            v-for="(student, key) in filteredStudents"
            :key="key"
            :class="$style['ingang__row']">
            <td :class="$style['ingang__cell']">{{ student.time }}</td>
            <td :class="$style['ingang__cell']">{{ student.serial }}</td>
            <td :class="$style['ingang__cell']">{{ student.name }}</td>
          </tr>
        </tbody>
      </table>
      <div :class="$style['ingang__download']">
        <dimi-button
          v-show="currentTab === 0"
          :class="$style['ingang__download-btn']"
          href="https://api.dimigo.in/ingangs/excel/1">1학년 엑셀 다운로드</dimi-button>
        <dimi-button
          v-show="currentTab === 1"
          href="https://api.dimigo.in/ingangs/excel/2">2학년 엑셀 다운로드</dimi-button>
      </div>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" module>
.ingang {
  padding: 0;

  &__loader {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__list {
    @include font-bold;
    color: $gray;
    display: block;
    max-height: 600px;
    min-height: 300px;
    overflow-y: auto;
    width: 100%;
  }

  &__download {
    display: flex;
    justify-content: flex-end;
    padding: 24px;
  }
}
</style>
