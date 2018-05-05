<script>
export default {
  data: () => ({
    year: '',
    month: '',
    date: '',
    hour: '',
    minute: ''
  }),

  computed: {
    string () {
      return `${this.year}-${this.month}-${this.date} ${this.hour}:${this.minute}`
    }
  }
}
</script>

<template lang="html">
  <div class="date-input">
    <dimi-input
      v-model="year"
      class="date-input__input date-input__input--year"/>
    년
    <dimi-input
      v-model="month"
      class="date-input__input date-input__input--time"/>
    월
    <dimi-input
      v-model="date"
      class="date-input__input date-input__input--time"/>
    일
    <dimi-input
      v-model="hour"
      class="date-input__input date-input__input--time"/>
    시
    <dimi-input
      v-model="minute"
      class="date-input__input date-input__input--time"/>
    분
  </div>
</template>

<style lang="scss">
.date-input {
  &__input {
    font-size: 16px;
  }

  &__input--year {
    width: 6em;
  }

  &__input--time {
    margin-left: 1em;
    width: 4.75em;
  }

  &__input--time:nth-child(2) {
    margin-left: 0;
  }
}
</style>
