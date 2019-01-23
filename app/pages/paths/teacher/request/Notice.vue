<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import * as notice from '@/src/api/notice'

export default {
  name: 'Notice',
  components: { ContentWrapper },

  data () {
    return {
      description: '',
      pending: false
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.description = await notice.getNotice()
      this.pending = false
    },

    async addNotice () {
      try {
        await notice.postNotice(this.resturct(this.description))
        this.$swal('성공적으로 추가되었습니다', '', 'success')
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      this.refresh()
    },

    resturct (desc) {
      return {
        'description': desc
      }
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class" />공지사항 관리
    </h1>
    <dimi-card
      slot="main"
    >
      <div
        v-if="pending"
        class="notice__loader"
      >
        <dimi-loader />
      </div>
      <template v-else>
        <div class="notice">
          <dimi-long-input
            v-model="description"
            :height="300"
            class="notice__input"
          />
        </div>
        <div class="notice__button">
          <dimi-button
            class="notice__button"
            @click="addNotice()"
          >
            공지사항 수정
          </dimi-button>
        </div>
      </template>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.notice {
  display: flex;
  justify-content: center;

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }

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
</style>
