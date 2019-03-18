<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

import { ingangManager } from '@/src/api/ingang'

export default {
  name: 'ManageIngang',
  components: { ContentWrapper },
  data: () => ({
    pending: false,
    currentTab: 0,
    notice: '',
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
      this.notice = (await ingangManager.getAnnouncement()).description
      this.pending = false
    },

    restructure (notice) {
      return {
        'description': notice,
        'date': this.timezone(new Date()).toISOString()
      }
    },

    async addNotice () {
      try {
        await ingangManager.addAnnouncement(this.restructure(this.notice))
        await this.$swal('추가하였습니다', '', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async download (grade) {
      try {
        await ingangManager.downloadExcel(grade)
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    timezone (val) {
      const timezoneOffset = new Date().getTimezoneOffset() * 60000
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
        :tabs="['엑셀', '공지']"
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
            class="excel__item"
            @click="download(1)"
          >
            1학년 엑셀 다운
          </dimi-button>
          <dimi-button
            :loading="pending"
            class="excel__item"
            @click="download(2)"
          >
            2학년 엑셀 다운
          </dimi-button>
        </div>
        <div
          v-if="currentTab === 1"
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
.ingang {
  padding: 0;
  border: 0;

  &__loader {
    display: flex;
    align-items: center;
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

.notice {
  display: flex;
  justify-content: center;

  &__input {
    padding: 0 12px;
    margin: 6px 0;
  }

  &__button {
    display: flex;
    align-items: center;
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
