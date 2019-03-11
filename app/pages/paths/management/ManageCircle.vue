<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

import { circleManager } from '@/src/api/circle'
import * as handleCircle from '@/src/util/handle-circle-status'

const status = [handleCircle.WAIT, handleCircle.ACCEPT, handleCircle.FAIL, handleCircle.FINAL]

export default {
  name: 'ManageCircle',

  components: { ContentWrapper },

  data: () => ({
    list: [],
    pending: false
  }),

  computed: {
    status () {
      return status
    }
  },

  async created () {
    this.pending = true
    try {
      this.list = (await circleManager.getCircleApplicant())
        .sort((a, b) => Number(a.serial) - Number(b.serial))
        .map(v => ({
          ...v,
          status: this.status.indexOf(v.status)
        }))
    } catch (err) {
      this.$swal('이런!', err.message, 'error')
    }

    this.pending = false
  },

  methods: {
    async updateStatus (event, applicant) {
      const setPrevent = () => {
        event.prevent = true
      }

      // 이미 합격/불합격/최종이 결정된 경우
      if (event.items.length < 3) {
        setPrevent()
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

      const type = {
        1: ['합격', handleCircle.ACCEPT],
        2: ['불합격', handleCircle.FAIL]
      }

      const answer = await ask(type[event.value][0])
      const setStatus = () => circleManager.setApplierStatus(applicant.idx, type[event.value][1])

      try {
        if (!answer.value) setPrevent()
        else await setStatus()
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
    <h1 slot="header">
      <span class="icon-club" />동아리 신청자 관리
    </h1>
    <dimi-card
      slot="main"
      class="mng-circle__card"
    >
      <table class="mng-circle__table">
        <tbody>
          <tr
            v-if="!list.length"
            class="applicant-row"
          >
            <td class="applicant-row__cell applicant-row__serial applicant-row__empty">
              아직 동아리를 신청한 사람이 없습니다
            </td>
          </tr>
          <tr
            v-for="(item, index) in list"
            :key="index"
            class="applicant-row"
          >
            <td class="applicant-row__cell applicant-row__serial">
              {{ item.serial }}
            </td>
            <td class="applicant-row__cell applicant-row__name">
              {{ item.name }} <br> {{ item.introduce }}
            </td>
            <td class="applicant-row__cell applicant-row__status">
              <dimi-button-group
                v-if="item.status === 0"
                v-model="item.status"
                :items="['보류', '합격', '불합격']"
                :colors="['gray', 'aloes', 'orange']"
                @click="updateStatus($event, item)"
              />

              <dimi-button-group
                v-else-if="item.status === 3"
                :items="['최종']"
                :colors="['cyan']"
              />

              <dimi-button-group
                v-else
                :value="item.status - 1"
                :items="['합격', '불합격']"
                :colors="['aloes', 'orange']"
              />
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
    padding-bottom: 10px;
    padding-left: 10px;
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__card {
    overflow: auto;
  }

  &__table {
    width: 100%;
  }

  &__finish-btn {
    margin-top: 2rem;
    float: right;
  }
}

.applicant-row {
  &__cell {
    padding: 20px 10px;
    white-space: nowrap;
  }

  &__name {
    width: 99%;
    line-height: 1.5;
    white-space: normal;
  }

  &:not(:last-child) {
    border-bottom: 1px solid $gray-lighter;
  }

  &__status {
    text-align: right;
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
