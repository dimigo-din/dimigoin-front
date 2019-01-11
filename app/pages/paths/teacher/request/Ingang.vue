<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import { format } from 'date-fns'

import * as ingang from '@/src/api/ingang'
import dummy from './dummy'

export default {
  name: 'Ingang',
  components: { ContentWrapper },

  filters: {
    blackDate (val) {
      return format(val, 'YY-MM-DD')
    }
  },

  data: () => ({
    pending: false,
    currentTab: 0,
    notice: '',
    blacklist: dummy,
    modal: {
      profile: {}
    }
  }),

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.notice = (await ingang.notice.getLatestNotice()).description
      this.pending = false
    },

    restructure (notice) {
      return {
        'description': notice,
        'date': this.timezone(new Date()).toISOString()
      }
    },

    openModal (black) {
      this.modale = {
        profile: black
      }
    },

    closeModal () {
      this.modal = {
        profile: {}
      }
    },

    async addNotice () {
      try {
        await ingang.notice.postNotice(this.restructure(this.notice))
        await this.$swal('추가하였습니다', '', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    timezone (val) {
      var timezoneOffset = new Date().getTimezoneOffset() * 60000
      return new Date(val - timezoneOffset)
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class" />인강실 신청 관리
    </h1>
    <dimi-card
      slot="main"
      class="ingang"
    >
      <dimi-tab
        v-model="currentTab"
        :tabs="['엑셀', '블랙리스트', '공지']"
      />
      <div
        v-if="pending"
        class="ingang__loader"
      >
        <dimi-loader />
      </div>
      <template v-else>
        <div
          v-if="currentTab === 0"
          class="excel"
        >
          <dimi-button
            :loading="pending"
            href="http://dev-api.dimigo.in/ingangs/excel/1"
            class="excel__item"
          >
            1학년 엑셀 다운
          </dimi-button>
          <dimi-button
            :loading="pending"
            href="http://dev-api.dimigo.in/ingangs/excel/2"
            class="excel__item"
          >
            2학년 엑셀 다운
          </dimi-button>
        </div>
        <div
          v-if="currentTab === 1"
          class="black__cards"
        >
          <dimi-card
            v-for="(black, i) in blacklist"
            :key="`${i}`"
            class="black__card"
            hover
            @click="openModal(black)"
          >
            <div class="black__title">
              {{ black.serial }} {{ black.name }}
            </div>
            <div class="blakc__date">
              {{ black.endDate | blackDate }}
            </div>
            <!--<div class="black__count">{{ black.totalCount }}</div>-->
          </dimi-card>
        </div>
        <div
          v-if="currentTab === 2"
        >
          <div class="notice">
            <dimi-long-input
              v-model="notice"
              :height="300"
              class="notice__input"
            />
          </div>
          <div class="notice__button">
            <dimi-button
              class="notice__button"
              @click="addNotice()"
            >
              공지 수정하기
            </dimi-button>
          </div>
        </div>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.ingang {
  border: 0;
  padding: 0;

  &__loader {
    align-items: center;
    display: flex;
    justify-content: center;
  }
}

.excel {
  display: flex;
  justify-content: center;
  margin: 16px;

  &__item {
    margin: 16px;
  }
}

.black {
  &__cards {
    background-color: #f7f7f7;
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  &__card {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.2s;
  }

  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__date {
    margin-top: 2px;
  }
}

.notice {
  display: flex;
  justify-content: center;

  &__input {
    margin: 6px 0;
    padding: 0 12px;
  }

  &__button {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: 3px 8px 6px 0;
  }
}

.modal {
  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__date {
    font-size: 14px;
    font-weight: $font-weight-light;
  }
}
</style>
