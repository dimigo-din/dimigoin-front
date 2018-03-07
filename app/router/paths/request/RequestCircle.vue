<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import CircleCard from '../../../components/CircleCard.vue'

import * as circle from '../../../src/api/circle'

const coinDescription = '부통령이 공식적인 상원의장이지만 부통령이 실제로 상원에 있는 경우는 드물다. 대신 상원임시의장(President protempore)가 대행하는 경우가 많다'
const coinLongDescription = `암호화폐(Cryptocurrency)는 디지털 화폐의 한 종류로, 보안을 위해 해시 함수를 사용하여 새로운 코인을 생성하고 거래 내역을 검증하는 시스템으로 이루어져 있다. 미국에서는 거래 보안과 추가 유닛 제어, 자산 전송의 검증을 위해 암호화 디자인된, 디지털 자산(Digital Asset)으로 규정하고 있고, 유럽에서는 규제도 인정도 하지 않는 불간섭을 유지하고 있다.
21세기의 뜨거운 감자, 암호화폐! 디미고 유일 암호화폐 동아리 COIN에서 암호화폐에 대한 모든 것을 알아갈 수 있습니다.
비트코인과 비트코인 골드의 차이는? 뭐가 그리 잘 벌리길래 개미나 소나 암호화폐로 몰리는 걸까요? 그리고 대체 떡락이 무슨 말일까요?
COIN에서 그 모든 것을 배우고 거래까지 시작해요! 떡상과 떡락, 극락과 울상이 교차하는 암호화폐의 세상으로 COIN이 초대합니다. 지금 바로 코인하세요!`

export default {
  name: 'RequestCircle',

  components: { ContentWrapper, CircleCard },

  data () {
    return {
      pending: false,
      circles: []
    }
  },

  computed: {
    appliedCircles () {
      // TODO: Fetch *real* data

      const statusList = ['passed', 'failed', 'waiting']
      const base = {
        category: '교육',
        description: coinDescription,
        longDescription: coinLongDescription,
        imageUrl: 'http://via.placeholder.com/64x64',
        leader: { name: '류코인', grade: 'n', klass: 'm' }
      }

      const set = () => statusList
        .map(status => Object.assign({}, base, { status }))

      return [...set(), ...set(), ...set()].slice(0, -1)
        .map((o, i) => Object.assign(o, { name: `IT Factory COIN ${i}` }))
    }
  },

  async created () {
    this.pending = true
    this.circles = await circle.getCircles()
    this.pending = false
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-club"/>2018년 동아리 가입 신청
    </h1>
    <div
      slot="main"
      class="circle">
      <section class="circle__section">
        <h2 class="circle__title">신청한 동아리</h2>
        <div class="circle__circles">
          <circle-card
            v-for="(circle, index) in appliedCircles"
            :key="`applied-circle-${index}`"
            :circle="circle"
          />
        </div>
      </section>
      <section class="circle__section">
        <h2 class="circle__title">전체 동아리</h2>
        <div class="circle__circles">
          <circle-card
            v-for="(circle, index) in circles"
            :key="`circle-${index}`"
            :circle="circle"
          />
        </div>
      </section>
    </div>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.circle {
  &__section:not(:last-child) {
    padding-bottom: 16px;
  }

  &__title {
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 20px;
  }

  &__circles {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  &__circle {

  }
}
</style>
