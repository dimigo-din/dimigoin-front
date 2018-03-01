<script>
import DimiCard from '../../components/DimiCard.vue'
import ContentWrapper from '../layout/ContentWrapper.vue'

export default {
  name: 'RequestInfo',
  components: { DimiCard, ContentWrapper }
}
</script>

<template>
  <div class="request-info">
    <content-wrapper>
      <h1
        class="request-info__title"
        slot="header"
      >
        신청 현황
      </h1>
      <dimi-card
        class="request-info__content"
        slot="main"
      >

      </dimi-card>
    </content-wrapper>
  </div>
</template>

<style lang="scss" scoped>
.request-info {

}
</style>
