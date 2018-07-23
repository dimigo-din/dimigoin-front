<script>
import moment from 'moment'
import { dets } from '@/src/api/dets'
const { getStudentDets, applyDets, cancelDets } = dets

export default {
  name: 'Detslist',

  props: {
    item: {
      type: Array,
      required: true
    }
  },

  data () {
    opened: false,
    pending false
  },

  filters: {
    dateRange (item) {
      moment.locale('ko')
      const [a, b] = [moment(item.request_start_date), moment(item.request_end_date)]
      return `${a.fromNow()}에 시작 (${a.format('llll')})\n${b.fromNow()}에 마감 (${b.format('llll')})`
    }
  },

  method: {
    async refresh () {
    this.pending = true
    this.list = await getStudentDets()
    this.pending = false
  },

    async toggleApply (item) {
      try {
        if (item.status !== 'request') await applyDets(item)
        else await cancelDets(idx)
      } catch (err) {
        this.$swal('이런', err.message, 'error')
      }

      await refresh()
    }
  }

}
</script>

<template>
  <div class="dets-list">
    <div
      class="dets-list__otfb"
      @click.native="opened = true">
      <span class="dets-list__black">{{ item.title }}</span>
      <span class="dets-list__black07">{{ item.speakerName }}</span>
    </div>
    <div
      :opened="opened"
      class="dets-list__black80"
      @close="opened = false">
      <span class="dets-list__otfr">{{ item.description }}</span>
      <div>
        <span class="dets-list__otfb">강의실</span>
        <span class="dets-list__otfr">{{ item.room }}</span>
      </div>
      <div>
        <span class="dets-list__otfb">강의시각</span>
        <span class="dets-list__otfr">{{ item.day }} {{ item.time }}</span>
      </div>
      <div
      :class="{
        'dets-list': true,
        'dets-list__otfb': true,
        'dets-list__cell--button': true,
        'dets-list__cell--full': item.maxCount === item.count,
        'dets-list__cell--applied': item.status === 'request'
      }"
      :title="item | dateRange"
      @click="toggleApply(item)">

        <template v-if="item.status === 'request'">
          <span class="icon-cross"/> 신청취소
        </template>

        <template v-else>
          <template v-if="item.maxCount > item.count">
              <span class="icon-ok"/> 신청하기
          </template>
          <template v-else>
            <span class="icon-alert"/> 신청불가
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="css">
</style>
