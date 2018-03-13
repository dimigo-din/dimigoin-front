<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiButtonGroup from '../../../components/DimiButtonGroup.vue'

import { circle } from '../../../src/api'
import * as handleCircle from '../../../src/util/handle-circle-status'
import DimiButton from '../../../components/DimiButton.vue'

const status = [handleCircle.WAIT, handleCircle.ACCEPT, handleCircle.FAIL, handleCircle.FINAL]

export default {
  name: 'ManageCircle',

  components: { DimiButton, ContentWrapper, DimiCard, DimiButtonGroup },

  data: () => ({
    list: []
  }),

  computed: {
    status () {
      return status
    }
  },

  async created () {
    this.list = (await circle.getCircleApplicant()).map(v => ({
      ...v,
      status: this.status.indexOf(v.status)
    }))
  },

  methods: {
    async finish () {
      const { value: result } = await this.$swal({
        title: '경고',
        text: '마감하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        warning: 'warning',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCloseButton: true,
        showCancelButton: true
      })

      if (result) {
        // TODO 마감
      }
    },

    async updateStatus (event, applicant) {
      if (event.items.length < 3) {
        event.prevent = true
        return
      }

      const ask = type => this.$swal({
        title: '경고',
        text: `정말 ${type}시키실 건가요? 이 작업은 되돌릴 수 없습니다.`,
        type: 'warning',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true,
        showCloseButton: true
      })

      const setPrevent = () => {
        event.prevent = true
      }

      try {
        switch (event.value) {
          case 1:
            if (!((await ask('합격')).value)) setPrevent()
            else {
              await circle.setApplierStatus(applicant.idx, handleCircle.ACCEPT)
            }
            break
          case 2:
            if (!((await ask('불합격')).value)) setPrevent()
            else {
              await circle.setApplierStatus(applicant.idx, handleCircle.FAIL)
            }
            break
        }
      } catch (err) {
        this.$swal({
          title: '에러!',
          text: err.message,
          type: 'error'
        })
        setPrevent()
      }
      event.done()
    }
  }
}
</script>

<template>
  <content-wrapper class="mng-circle">
    <h1 slot="header"><span class="icon-club"/>동아리 신청자 관리</h1>
    <dimi-card
      slot="main"
      class="mng-circle__card">
      <h2 class="mng-circle__title">COIN 신청자 관리</h2>

      <table class="mng-circle__table">
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="index"
            class="applicant-row">

            <td class="applicant-row__cell applicant-row__serial">{{ item.serial }}</td>
            <td class="applicant-row__cell applicant-row__name">{{ item.name }}</td>
            <td class="applicant-row__cell applicant-row__status">
              <dimi-button-group
                v-if="item.status === 0"
                v-model="item.status"
                :items="['보류', '합격', '불합격']"
                :colors="['gray', 'aloes', 'orange']"
                @click="updateStatus($event, item)"/>

              <dimi-button-group
                v-else-if="item.status === 3"
                :items="['최종']"
                :colors="['cyan']"/>

              <dimi-button-group
                v-else
                :value="item.status - 1"
                :items="['합격', '불합격']"
                :colors="['aloes', 'orange']"/>
            </td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mng-circle {
  &__title {
    @include font-bold;
    color: $gray-dark;
    font-size: 24px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  &__card {
    overflow: auto;
  }

  &__table {
    width: 100%;
  }

  &__finish-btn {
    float: right;
    margin-top: 2rem;
  }
}

.applicant-row {
  &__cell {
    padding: 20px 10px;
    white-space: nowrap;
  }

  &__name {
    line-height: 1.5;
    white-space: normal;
    width: 99%;
  }

  &:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__status {
    text-align: right;
  }
}
</style>
