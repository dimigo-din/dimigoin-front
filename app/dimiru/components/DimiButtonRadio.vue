<script>
import DimiButton from './DimiButton.vue'

export default {
  name: 'DimiButtonRadio',

  components: { DimiButton },

  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    click () {
      this.$emit('input', this.name)
    }
  }
}
</script>

<template>
  <dimi-button
    :small="small"
    :large="large"
    :gray="name !== value"
    @click="click"
  >
    <slot/>
  </dimi-button>
</template>
