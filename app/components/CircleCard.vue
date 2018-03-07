<script>
import DimiCard from './DimiCard.vue'
import DimiBadge from './DimiBadge.vue'
import DimiModal from './DimiModal.vue'

export default {
  name: 'CircleCard',
  components: { DimiCard, DimiBadge, DimiModal },

  props: {
    circle: {
      type: Object,
      default: () => ({})
    }
  },

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
        case 'passed': return '합격'
        case 'failed': return '불합격'
        case 'waiting': return '보류'
      }
    }
  },

  methods: {
    openModal () {
      // TODO
      this.$modal.show(this.circle.name)
    }
  }
}
</script>

<template>
  <dimi-card
    class="circle-card"
    @click.native="openModal">

    <div class="circle-card__info">
      <img
        :src="circle.imageUrl || 'http://via.placeholder.com/59x64'"
        :title="circle.title || '동아리 로고 이미지'"
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

    <dimi-modal
      :name="circle.name"
      class="circle-card__modal">

      <h2>{{ circle.name }}</h2>
    </dimi-modal>
  </dimi-card>
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
}

</style>