<template>
  <modal :name="name"><slot/></modal>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
</style>
