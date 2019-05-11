<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

export default {
  name: 'SportBase',
  components: { ContentWrapper },

  props: {
    sports: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      selection: []
    }
  },

  methods: {
    toggle (i) {
      this.$set(this.selection, i, !this.selection[i])
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="sport__loading"
    >
      <dimi-loader />
    </div>
    <div v-else>
      <div class="row">
        <main class="main col-xs">
          <content-wrapper class="sport">
            <h1 slot="header">
              <slot name="header" />
            </h1>
            <dimi-card
              slot="main"
            >
              <template
                v-for="(spo, i) in sports"
              >
                <div
                  :key="i"
                  class="sport__sport"
                  @click="toggle(i)"
                >
                  <slot
                    :spo="spo"
                    name="badge"
                  />
                  <span class="sport__item sport__title">
                    {{ spo.name }}
                  </span>
                </div>
              </template>
              <div
                v-if="!sports.length"
                class="sport__empty"
              >
                현재 진행 중인 디미리그가 없습니다.
              </div>
            </dimi-card>
          </content-wrapper>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sport {
  &__loading {
    display: flex;
    justify-content: center;
  }

  &__sport {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    cursor: pointer;
  }

  &__sport:not(:first-of-type) {
    border-top: 1px solid $gray-lighter;
  }

  &__item {
    color: $gray;
    font-weight: $font-weight-bold;
  }

  &__item:not(:last-child) {
    margin-right: 16px;
  }

  &__title {
    flex: 1;
    color: $black !important;
  }

  &__empty {
    padding: 24px;
    margin-right: 16px;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }
}
</style>
