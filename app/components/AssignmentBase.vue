<script>
import { format } from 'date-fns'
import timestamp from 'unix-timestamp'
import ContentWrapper from '@/components/ContentWrapper.vue'

export default {
  name: 'AssignmentBase',
  components: { ContentWrapper },

  filters: {
    deadline (val) {
      return format(timestamp.toDate(val), 'YYYY년 MM월 DD일 HH시 mm분까지')
    }
  },

  props: {
    assignments: {
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
      class="assignment__loading"
    >
      <dimi-loader />
    </div>
    <div v-else>
      <div class="row">
        <main class="main col-xs">
          <content-wrapper class="assignment">
            <h1 slot="header">
              <slot name="header" />
            </h1>
            <dimi-card
              slot="main"
            >
              <template
                v-for="(ass, i) in assignments"
              >
                <div
                  :key="i"
                  class="assignment__assignment"
                  @click="toggle(i)"
                >
                  <slot
                    :ass="ass"
                    name="badge"
                  />

                  <span class="assignment__item assignment__title">
                    {{ ass.title }}
                  </span>

                  <span class="assignment__item">
                    <slot
                      :ass="ass"
                      name="opponent"
                    />
                  </span>

                  <span class="assignment__item">
                    {{ ass.end_date | deadline }}
                  </span>

                  <div class="assignment__item assignment__expand">
                    <span :class="`icon-arrow-${selection[i] ? 'up' : 'down'}`" />
                  </div>
                </div>

                <div
                  v-show="selection[i]"
                  :key="i + 'desc'"
                  class="assignment__assignment assignment__description"
                >
                  {{ ass.description }}

                  <span class="assignment__nav">
                    <slot :ass="ass" />
                  </span>
                </div>
              </template>
              <template>
                <div class="assignment__empty">
                  아직 등록된 과제가 없습니다
                </div>
              </template>
            </dimi-card>
          </content-wrapper>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.assignment {
  &__loading {
    display: flex;
    justify-content: center;
  }

  .c-card {
    padding: 0;
  }

  &__assignment {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    cursor: pointer;
  }

  &__assignment:not(:first-of-type) {
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

  &__expand {
    margin-left: 16px;
  }

  &__description {
    flex-direction: column;
    align-items: stretch;
    color: $gray;
    cursor: default;
    font-size: 16px;
    line-height: 1.8;
  }

  &__nav {
    display: flex;
    justify-content: flex-end;
    color: $red;
    font-size: 18px;
    font-weight: $font-weight-bold;
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
