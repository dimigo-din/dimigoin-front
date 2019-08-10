<script>
export default {
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },

  data () {
    return {
      date: {
        hours: this.value.getHours(),
        minutes: this.value.getMinutes()
      }
    }
  },

  watch: {
    date: {
      handler (val) {
        this.$emit('input', new Date(
          this.value.getFullYear(),
          this.value.getMonth(),
          this.value.getDate(),
          val.hours,
          val.minutes
        ))
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="time-input">
    <dimi-input
      v-model="date.hours"
      class="time-input__input"
    />
    시
    <dimi-input
      v-model="date.minutes"
      class="time-input__input"
    />
    분
  </div>
</template>

<style lang="scss">
.time-input {
  display: flex;
  align-items: center;

  &__input {
    width: 6em;
    font-size: 16px;
  }

  &__input:nth-child(2) {
    margin-left: 1em;
  }
}
</style>
