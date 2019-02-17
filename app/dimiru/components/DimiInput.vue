<script>
export default {
  name: 'DimiInput',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      innerValue: this.value
    }
  },

  computed: {
    computedClass () {
      return {
        'input': true,
        'input--prefix': this.prefix,
        'input--suffix': this.suffix
      }
    }
  },

  watch: {
    innerValue (val) {
      this.$emit('changed', this.id)
      this.$emit('input', val)
    },
    value (val) {
      this.innerValue = val
    }
  },

  methods: {
    emitEnter (event) {
      if (event instanceof KeyboardEvent) {
        this.$emit('enter', event)
      }
    }
  }
}
</script>

<template>
  <div class="input-wrapper">
    <span
      v-if="prefix"
      class="prefix"
    >
      {{ prefix }}
    </span>
    <input
      :id="id ? id : false"
      v-model="innerValue"
      :class="computedClass"
      :type="type"
      :placeholder="placeholder"
      @keyup.enter="emitEnter"
    >
    <span
      v-if="suffix"
      class="suffix"
    >
      {{ suffix }}
    </span>

    <!-- error here -->
    <slot />
  </div>
</template>

<style lang="scss">
@import '../scss/vars';

.input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.75em 1.5em;
  border: 0;
  appearance: none;
  background-color: $gray-lighten;
  border-radius: 30px;
  font-family: 'NanumSquareRound', sans-serif;
  font-size: inherit;

  &--prefix {
    padding-left: 2em;
  }

  &--suffix {
    padding-right: 2em;
  }

  &::placeholder {
    color: $gray;
  }
}

.prefix {
  position: absolute;
  top: 50%;
  left: 0.75em;
  transform: translate(0, -50%);
}

.suffix {
  position: absolute;
  top: 50%;
  right: 1.3em;
  transform: translate(0, -50%);
}

</style>
