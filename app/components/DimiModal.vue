<template>
  <modal :name="name">
    <span
      class="icon-cross"
      @click="close"/>
    <slot/>
  </modal>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },

  methods: {
    close () {
      this.$modal.hide(this.name)
    }
  }
}
</script>

<style lang="scss">
  .v--modal {
    border-radius: 6px;
    border: solid 1px $gray-lighten;
    box-shadow: 0px 16px 36px -12px rgba(0,0,0,.5);
    padding: 24px;

    &-overlay {
      background: rgba(#151313, .7);
    }

    .icon-cross {
      opacity: 0.3;
      float: right;
    }
  }
</style>
