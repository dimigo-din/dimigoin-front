<script>
import DimiCard from './DimiCard.vue'
import DimiBadge from './DimiBadge.vue'
import DimiModal from './DimiModal.vue'
import DimiButton from './DimiButton.vue'

export default {
  name: 'CircleCard',
  components: { DimiCard, DimiBadge, DimiModal, DimiButton },

  props: {
    circle: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({ submitted: false }), // TODO

  computed: {
    hasBadge () {
      const { status } = this.circle
      return ['passed', 'failed', 'waiting'].includes(status) // TODO
    },

    color () {
      const { status } = this.circle
      switch (status) {
        case 'passed': return 'aloes'
        case 'failed': return 'orange'
        case 'waiting': return 'gray'
      }
    },

    colorName () {
      const { status } = this.circle
      switch (status) { // TODO
        case 'final': return '최종 결정'
        case 'accept': return '합격'
        case 'failed': return '불합격'
        case 'waiting': return '대기 중'
      }
    }
  },

  methods: {
    openModal () {
      this.$modal.show(this.circle.name)
    },

    toggleSubmit () { // TODO
      if (this.submitted && !confirm('정말로 취소하시겠어요?')) return
      this.submitted = !this.submitted
    }
  }
}
</script>

<template>
  <div>
    <dimi-card
      class="circle-card"
      @click.native="openModal">

      <div class="circle-card__info">
        <img
          :src="circle.profileImg || 'http://via.placeholder.com/64x64'"
          :title="circle.title || '동아리 로고 이미지'"
          width="64"
          height="64"
          class="circle-card__logo">

        <div>
          <h4 class="circle-card__name">{{ circle.name }}</h4>
          <h5 class="circle-card__category">{{ circle.category }}</h5>
        </div>
      </div>

      <div class="circle-card__description">{{ circle.description }}</div>

      <dimi-badge
        v-if="hasBadge"
        :color="color"
        class="circle-card__badge">
        <slot>{{ colorName }}</slot>
      </dimi-badge>
    </dimi-card>

    <dimi-modal
      :name="circle.name"
      class="circle-card__modal">

      <div class="circle-card__modal-header">
        <img
          :src="circle.profileImg || 'http://via.placeholder.com/80x80'"
          :title="circle.title || '동아리 로고 이미지'"
          width="80"
          height="80"
          class="circle-card__modal-logo">

        <div>
          <h4 class="circle-card__modal-name">{{ circle.name }}</h4>
          <div>
            <span class="circle-card__modal-info">
              <span class="circle-card__modal-info-key">분류</span>
              <span class="circle-card__modal-info-value">{{ circle.category }}</span>
            </span>

            <span class="circle-card__modal-info">
              <span class="circle-card__modal-info-key">동장</span>
              <span class="circle-card__modal-info-value">
                {{ circle.chairSerial[0] }}학년
                {{ circle.chairSerial[1] }}반
                {{ circle.chairName }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="circle-card__modal-description">{{ circle.description }}</div>

      <dimi-button
        :class="`circle-card__${submitted ? 'post-' : ''}submit-btn`"
        @click="toggleSubmit">
        신청{{ submitted ? '취소' : '하기' }}
      </dimi-button>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
.circle-card {
  &__info {
    display: flex;
  }

  &__logo {
    margin-right: 20px;
  }

  &__name {
    margin-top: 12px;
  }

  &__category {
    size: 14px;
    margin-top: 6px;
    color: $gray-light;
  }

  &__description {
    color: $black;
    font-size: 14px;
    line-height: 1.8;
    margin-top: 12px;
  }

  &__badge {
    max-width: 40px;
    margin-left: auto;
  }

  &__modal {
    padding: 24px;
  }

  &__modal-header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 24px;
  }

  &__modal-name {
    @include font-bold;
  }

  &__modal-logo {
    margin-right: 24px;
  }

  &__modal-name {
    color: $black;
    font-size: 24px;
    line-height: 1.2;
  }

  &__modal-info + &__modal-info {
    margin-left: 12px;
  }

  &__modal-info-key {
    font-size: 16px;
    line-height: 1.8;
    color: $gray-dark;
  }

  &__modal-info-value {
    font-size: 16px;
    line-height: 1.8;
    color: $gray-light;
  }

  &__modal-description {
    color: $black;
    font-size: 16px;
    line-height: 1.8;
    margin-top: 32px;
  }

  &__submit-btn, &__post-submit-btn {
    float: right;
    margin-top: 20px;
    @include font-bold;
  }

  &__post-submit-btn {
    color: $black !important;
    background-color: $gray-lighter !important;

  }
}

</style>
