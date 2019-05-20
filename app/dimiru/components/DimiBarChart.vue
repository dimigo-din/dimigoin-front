<script>
export default {
  name: 'DimiBarChart',
  props: {
    progress: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: 'red',
      validator: c => ['mustard', 'orange', 'pink', 'red'].includes(c)
    }
  },
  computed: {
    computedClass () {
      return {
        [this.color]: true,
        'progress--small': (this.small)
      }
    },
    barStyle () {
      return {
        height: ((this.progress > 100) ? 100 : this.progress) + '%'
      }
    }
  }
}
</script>

<template>
  <div class="barchart">
    <div
      class="barchart__background"
      :class="computedClass"
    >
      <div
        class="barchart__bar"
        :class="computedClass"
        :style="barStyle"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.barchart {
  height: 100%;

  &__bar,
  &__background {
    width: 48px;
    border-radius: 24px;
  }

  &__bar {
    position: absolute;
    bottom: 0;
    min-height: 48px;
  }

  &__background {
    position: relative;
    height: 100%;
  }

  &__bar.red {
    background-color: $red;
  }

  &__bar.pink {
    background-color: $pink;
  }

  &__bar.mustard {
    background-color: $mustard;
  }

  &__bar.orange {
    background-color: $orange;
  }

  &__background.red {
    background-color: rgba(232, 60, 61, 0.5);
  }

  &__background.pink {
    background-color: rgba(255, 128, 129, 0.5);
  }

  &__background.mustard {
    background-color: rgba(253, 184, 18, 0.5);
  }

  &__background.orange {
    background-color: rgba(245, 105, 61, 0.5);
  }
}
</style>
