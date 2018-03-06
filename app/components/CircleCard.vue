<script>
import DimiCard from './DimiCard.vue'
import DimiBadge from './DimiBadge.vue'

export default {
  name: 'CircleCard',

  components: { DimiCard, DimiBadge },

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
      switch (status) {
        case 'passed': return '합격'
        case 'failed': return '불합격'
        case 'waiting': return '보류'
      }
    }
  },

  methods: {
    openModal () {
      // TODO
      alert(this.circle.name)
    }
  }
}
</script>

<template>
  <dimi-card class="circle-card">
    <div class="circle-card__info">
      <img
        class="circle-card__logo"
        :title="circle.title || '동아리 로고 이미지'"
        :src="circle.imageUrl || 'http://via.placeholder.com/59x64'"
        @click="openModal"
      >

      <div>
        <h4 class="circle-card__name" @click="openModal">{{ circle.name }}</h4>
        <h5 class="circle-card__category" @click="openModal">{{ circle.category }}</h5>
      </div>
    </div>
    <div class="circle-card__description" @click="openModal">{{ circle.description }}</div>
    <dimi-badge
      v-if="hasBadge"
      class="circle-card__badge"
      :color="color">
      <slot>{{ colorName }}</slot>
    </dimi-badge>
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
}

</style>
