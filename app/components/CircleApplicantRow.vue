<script>
import DimiBadge from './DimiBadge.vue'

export default {
  name: 'ClubApplicationRow',

  components: { DimiBadge },

  props: {
    executable: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: '보류'
    },

    serial: {
      type: String,
      default: '0000'
    },

    name: {
      type: String,
      default: ''
    },

    description: {
      type: String,
      default: ''
    }
  },

  methods: {
    clickBadge () {
      if (!this.executable) return
      // TODO show dropdown or just input event
    }
  }
}
</script>

<template>
  <div class="applicant-row">
    <dimi-badge
      class="applicant-row__badge"
      @click="clickBadge"
    >{{ value }}</dimi-badge>
    <span class="applicant-row__serial">{{ serial }}</span>
    <span class="applicant-row__name">{{ name }}</span>
    <p class="applicant-row__description">{{ description }}</p>
  </div>
</template>

<style lang="scss">
.applicant-row {
  display: flex;
  font-size: 16px;
  padding: 1.25em;
  width: 100%;

  &__badge { }

  &__serial {
    color: $gray;
  }

  &__desciption {
    color: $gray-light;
    flex-basis: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

}
</style>
