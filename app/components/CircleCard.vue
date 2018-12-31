<script>
import lineClamp from 'line-clamp'
import * as handleStatus from '@/src/util/handle-circle-status'
import * as circle from '@/src/api/circle'

export default {
  name: 'CircleCard',

  props: {
    circle: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    opened: false,
    pending: false,
    imageurl: 'https://dev-api.dimigo.in/circles/image/'
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
      return !handleStatus.hasStatus(this.circle.status)
    },

    cancelable () {
      return this.circle.status === handleStatus.WAIT
    },

    getIntroduce () {
      return this.circle.introduce
    },

    finish () {
      return Date.now() > (new Date(this.circle.applyEndDate).getTime() +
        24 * 60 * 60 * 1000)
    },

    deadline () {
      const now = Date.now()
      return !this.finish &&
        now > new Date(this.circle.applyStartDate).getTime()
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
          await circle.applyCircle(this.circle.idx, this.introduce)
          this.$set(this.circle, 'status', handleStatus.WAIT)
        } else if (this.cancelable) {
          await circle.cancelCircle(this.circle.idx)
          this.$set(this.circle, 'status', null)
        }
      } catch (err) {
        console.error(err)
        this.$swal('이런!', err.message, 'error')
      }
      this.pending = false
    },

    async setFinal () {
      const { value: answer } = await this.$swal({
        title: '경고',
        text: `정말 본 동아리의 가입을 확정하실건가요?`,
        type: 'warning',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true,
        showCloseButton: true
      })

      if (!answer) return
      try {
        const circles = await circle.getAppliedCircle()
        const thisCircle = circles.find(v => Number(v.circleIdx) === Number(this.circle.idx)) || {}
        await circle.setFinal(thisCircle.idx)
        this.circle.status = handleStatus.FINAL
      } catch (err) {
        console.error(err)
        this.$swal({
          title: '에러!',
          text: err.message,
          type: 'error'
        })
      }
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

      <dimi-badge
        v-if="hasBadge"
        :color="color"
        class="circle-card__badge">
        <slot>{{ badgeText }}</slot>
      </dimi-badge>

      <div class="circle-card__info">
        <img
          :src="imageurl + circle.idx"
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

      <div
        v-if="circle.status === 'accept'"
        class="circle-card__final-wrapper">
        <div
          class="circle-card__final"
          @click.stop="setFinal">
          <span class="icon-ok"/> 가입하기
        </div>
      </div>
    </dimi-card>

    <dimi-modal
      :opened="opened"
      class="circle-card__modal"
      @close="opened = false">

      <div class="circle-card__modal-header">
        <img
          :src="imageurl + circle.idx"
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

      <div class="circle-card__modal-introduce-title">자기소개</div>
      <div class="modal__field">
        <dimi-long-input
          v-model="introduce"
          :height="500"
          placeholder="1000자 이내로 작성해주시고, 창을 받으시면 내용이 사라지실 수 있으니 미리 메모장에 적고 옮기는 걸 추천드려요!"
          class="modal__introduce"/>
      </div>
      <dimi-button
        v-if="!finish"
        :gray="!(applyable && deadline)"
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
@import '~styles/variables';

.circle-card {
  cursor: pointer;

  &__info {
    display: flex;
  }

  &__logo {
    margin-right: 20px;
  }

  &__name {
    line-height: 16px;
    margin-top: 12px;
  }

  &__category {
    color: $gray-light;
    margin-top: 6px;
    size: 14px;
  }

  /* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
  &__description {
    -webkit-box-orient: vertical;
    color: $black;
    display: -webkit-box;
    font-size: 14px;
    height: 14 * 1.8 * 3; // 3 lines
    -webkit-line-clamp: 3;
    line-height: 1.8;
    margin-top: 12px;
  }

  &__modal-introduce-title {
    color: $black;
    font-size: 24px;
    font-weight: $font-weight-bold;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  &__badge {
    margin: 0 auto 25px;
    max-width: 40px;
  }

  &__final-wrapper {
    display: flex;
    margin-top: 30px;
  }

  &__final {
    color: $orange;
    cursor: pointer;
    margin-left: auto;
    padding: 0.3rem;
  }

  &__modal {
    padding: 24px;
  }

  &__modal-header {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 24px;
  }

  &__modal-name {
    color: $black;
    font-size: 24px;
    font-weight: $font-weight-bold;
    line-height: 1.2;
    word-break: break-all;
  }

  &__modal-logo {
    margin-right: 24px;
  }

  &__modal-info + &__modal-info {
    margin-left: 12px;
  }

  &__modal-info-key {
    color: $gray-dark;
    font-size: 16px;
    line-height: 1.8;
  }

  &__modal-info-value {
    color: $gray-light;
    font-size: 16px;
    line-height: 1.8;
  }

  &__modal-description {
    color: $black;
    font-size: 16px;
    line-height: 1.8;
    margin-top: 32px;
  }

  &__submit-btn {
    float: right;
    font-weight: $font-weight-bold;
    margin-top: 20px;
  }

  &__submit-btn--post {
    background-color: $gray-lighter !important;
    color: $black !important;
  }

  &__logo,
  &__modal-logo {
    object-fit: contain;
  }
}

</style>
