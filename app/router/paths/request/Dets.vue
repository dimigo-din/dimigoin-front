<script>
import moment from 'moment'

import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import Detslist from '@/components/Detslist.vue'

import { utilDets } from '@/src/util'
import { apiDets } from '@/src/api'
const { getStudentDets } = afterschool

export default {
  name: 'RequestDets',
  components: { ContentWrapper, Detslist },

  data () {
    return {
      detslist: [],
      addlist: [],
      pending: false,
      currentTab: 0
    }
  },

  async created () {
    this.pending = true
    this.detslist = await getStudentDets()
    this.addlist = await getSpeakerDets()
    this.pending = false
  },
}
</script>

<template>
  <content-warpper>
    <h1 slot="header">
      Dets 신청
    </h1>

    <dimi-card
      slot="main"
      class="dets__main">

      <dimi-tab
        v-model="currentTab"
        :tabs="['강의 수강 신청', '강의 개설 신청']"
      />

      <div
        v-if="pending"
        class="dets__loader-wrapper">
        <dimi-loader/>
      </div>

      <template v-else>

        <section
          v-if="currentTab === 0"
          class="dets__list">
          <dets-list
            v-for="(item, index) in detslist"
            :key="`dets-${idx}`"
            class="dets__row"
            />
        </section>

        <section
          v-if="currentTab === 1"
          class="dets__addlist">

        </section>

      </template>

    </dimicard>
  </content-warpper>
</template>

<style lang="scss" scoped>

</style>
