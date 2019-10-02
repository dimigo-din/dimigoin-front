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
        year: this.value.getFullYear(),
        month: this.value.getMonth() + 1,
        date: this.value.getDate(),
        hours: this.value.getHours(),
        minutes: this.value.getMinutes()
      }
    }
  },

  watch: {
    date: {
      handler (val) {
        this.$emit('input', new Date(
          val.year,
          val.month - 1,
          val.date,
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
  <div class="date-input">
    <dimi-input
      v-model="date.year"
      class="date-input__input date-input__input--year"
    />
    년
    <dimi-input
      v-model="date.month"
      class="date-input__input date-input__input--time"
    />
    월
    <dimi-input
      v-model="date.date"
      class="date-input__input date-input__input--time"
    />
    일
    <dimi-input
      v-model="date.hours"
      class="date-input__input date-input__input--time"
    />
    시
    <dimi-input
      v-model="date.minutes"
      class="date-input__input date-input__input--time"
    />
    분
  </div>
</template>

<style lang="scss">
.date-input {
  display: flex;
  align-items: center;

  &__input {
    font-size: 16px;
  }

  &__input--year {
    width: 6em;
  }

  &__input--time {
    width: 4.75em;
    margin-left: 1em;
  }
}
</style>
