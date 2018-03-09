<script>
import DimiCard from './DimiCard.vue'
import DimiBadge from './DimiBadge.vue'
import DimiModal from './DimiModal.vue'
import DimiButton from './DimiButton.vue'

import lineClamp from 'line-clamp'
import * as handleStatus from '../src/util/handle-circle-status'
import * as circle from '../src/api/circle'

export default {
  name: 'CircleCard',
  components: { DimiCard, DimiBadge, DimiModal, DimiButton },

  props: {
    circle: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    opened: false,
    pending: false
  }),

  computed: {
    hasBadge () {
      return handleStatus.hasStatus(this.circle.status)
    },

    color () {
      return handleStatus.getColorByStatus(this.circle.status)
    },

    badgeText () {
      return handleStatus.getMessageByStatus(this.circle.status)
    },

    buttonText () {
      return this.circle.status ? '신청 취소' : '신청하기'
    },

    applyable () {
      return !handleStatus.hasStatus(this.circle.status) &&
        this.deadline
    },

    cancelable () {
      return this.circle.status === handleStatus.WAIT &&
        this.deadline
    },

    finish () {
      return Date.now() > new Date(this.circle.applyEndDate).getTime()
    },

    deadline () {
      const now = Date.now()
      return !this.finish &&
        now > new Date(this.circle.applyStartDate).getDate()
    }
  },

  watch: {
    circle () {
      this.updateClamp()
    }
  },

  mounted () {
    this.updateClamp()
    window.addEventListener('resize', () => this.updateClamp())
  },

  methods: {
    updateClamp () {
      document
        .querySelectorAll('.circle-card__description')
        .forEach(description => lineClamp(description, 4))
    },

    async toggleSubmit () {
      if (!this.deadline) {
        return this.$swal('이런!', '신청 기간이 아닙니다.', 'error')
      }
      this.pending = true
      try {
        if (this.applyable) {
          await circle.applyCircle(this.circle.idx)
          this.$set(this.circle, 'status', handleStatus.WAIT)
        } else if (this.cancelable) {
          await circle.cancelCircle(this.circle.idx)
          this.$set(this.circle, 'status', null)
        }
      } catch ({ message }) {
        this.$swal('이런!', message, 'error')
      }
      this.pending = false
    }
  }
}
</script>

<template>
  <div>
    <dimi-card
      v-ripple="'rgba(0, 0, 0, 0.05)'"
      class="circle-card"
      @click.native="opened = true">

      <div class="circle-card__info">
        <img
          :src="circle.profileImg"
          :title="circle.title"
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
        <slot>{{ badgeText }}</slot>
      </dimi-badge>
    </dimi-card>

    <dimi-modal
      :opened="opened"
      class="circle-card__modal"
      @close="opened = false">

      <div class="circle-card__modal-header">
        <img
          :src="circle.profileImg"
          :title="circle.title"
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
        v-if="!finish"
        :gray="applyable"
        :class="{
          'circle-card__submit-btn': true,
          'circle-card__submit-btn--post': hasBadge
        }"
        :loading="pending"
        @click="toggleSubmit">
        {{ buttonText }}
      </dimi-button>

      <div style="clear: both;"/>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
.circle-card {
  cursor: pointer;

  &__info {
    display: flex;
  }

  &__logo {
    margin-right: 20px;
  }

  &__name {
    margin-top: 12px;
    line-height: 16px;
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
    height: 14 * 1.8 * 3; // 3 lines

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__badge {
    max-width: 40px;
    margin-top: 36px;
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

  &__submit-btn {
    float: right;
    margin-top: 20px;
    @include font-bold;
  }

  &__submit-btn--post {
    color: $black !important;
    background-color: $gray-lighter !important;
  }

  &__logo, &__modal-logo {
    object-fit: contain;
  }
}

</style>
