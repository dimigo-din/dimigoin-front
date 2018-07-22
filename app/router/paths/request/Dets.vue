<script>
  import { dets } from '@/src/util'
  export default {
    name: 'RequestDets'
    data () {
      list: [],
      pending: false,
      currentTab: 0
    },
    computed: {
      dets () { return dets },

      currentList() {
        return this.list.filter(item => item.dets === dets[this.currentTab].code)
      }
    },
    methods: {

    }
  }
</script>

<template>
  <content-warpper>
    <h1 slot="header">
      Dets 신청
    </h1>

    <dimi-card
      slot="main"
      class="req-dets__main">

      <dimi-tab
        v-model="currentTab"
        :tabs="dets.map(v => v.text )"/>

      <div
        v-if="pending"
        class="req-dets__loader-wrapper">
        <dimi-loader/>
      </div>

    </dimicard>
  </content-warpper>
</template>

<style lang="scss" scoped>

</style>
