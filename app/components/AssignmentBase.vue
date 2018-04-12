<script>
import moment from 'moment'
import ContentWrapper from '../router/partial/ContentWrapper.vue'
import DefaultNavbar from '../router/partial/DefaultNavbar.vue'
import DimiCard from './DimiCard.vue'

export default {
  name: 'AssignmentBase',
  components: { ContentWrapper, DefaultNavbar, DimiCard },

  filters: {
    deadline (val) {
      return moment(val).format('YYYY.MM.DD') + '까지'
    }
  },

  props: {
    assignments: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      selection: []
    }
  },

  methods: {
    toggle (i) {
      this.selection.splice(i, 1, !this.selection[i])
    }
  }
}
</script>

<template>
  <div>
    <default-navbar/>
    <div class="container">
      <div class="row">
        <main class="main col-xs">
          <content-wrapper class="assignment">
            <h1 slot="header">
              <slot name="header" />
            </h1>
            <dimi-card
              slot="main">
              <template v-for="(ass, i) in assignments">
                <div
                  :key="i"
                  class="assignment__assignment"
                  @click="toggle(i)">

                  <slot
                    :ass="ass"
                    name="badge"/>

                  <span class="assignment__item assignment__title">{{ ass.title }}</span>

                  <span class="assignment__item">
                    <slot
                      :ass="ass"
                      name="opponent"
                    />
                  </span>

                  <span class="assignment__item">{{ ass.deadline | deadline }}</span>

                  <div class="assignment__item assignment__expand">
                    <span :class="`icon-arrow-${selection[i] ? 'up' : 'down'}`"/>
                  </div>
                </div>

                <div
                  v-show="selection[i]"
                  :key="i + 'desc'"
                  class="assignment__assignment assignment__description">
                  {{ ass.description }}

                  <span class="assignment__nav">
                    <slot :ass="ass"/>
                  </span>
                </div>
              </template>
            </dimi-card>
          </content-wrapper>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.assignment {
  .c-card {
    padding: 0;
  }

  &__assignment {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
  }

  &__assignment:not(:first-of-type) {
    border-top: 1px solid $gray-lighter;
  }

  &__item {
    @include font-bold;
    color: $gray;
  }

  &__item:not(:last-child) {
    margin-right: 16px;
  }

  &__title {
    color: $black !important;
    flex: 1;
  }

  &__expand {
    margin-left: 16px;
  }

  &__description {
    align-items: stretch;
    color: $gray;
    cursor: default;
    flex-direction: column;
    font-size: 16px;
    line-height: 1.8;
  }

  &__nav {
    @include font-bold;
    color: $red;
    display: flex;
    font-size: 18px;
    justify-content: flex-end;
  }
}
</style>