<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import { book } from '@/src/api/index'

export default {
  name: 'ManagementBook',

  components: { ContentWrapper },

  data () {
    return {
      list: [],
      pending: false,
      modal: false,
      form: {
        desc: ''
      }
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await book.getAllBook()
      this.pending = false
    },

    timezone (val) {
      var timezoneOffset = new Date().getTimezoneOffset() * 60000
      return new Date(val - timezoneOffset)
    },

    closeModal () {
      this.modal = false
      this.form = {
        description: ''
      }
    },

    restructure (notice) {
      return {
        'description': notice.desc,
        'date': this.timezone(new Date()).toISOString()
      }
    },

    async addNotice () {
      try {
        await book.addNotice(this.restructure(this.form))
        await this.$swal('추가하였습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async rejectBook (boook) {
      try {
        await book.rejectBook(boook.idx)
        this.$swal('거절하였습니다', '', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async acceptBook (boook) {
      try {
        await book.acceptBook(boook.idx)
        this.$swal('승인하였습니다', '', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    }
  }
}
</script>

<template>
  <content-wrapper>

    <h1 slot="header">
      <span class="icon-book-sm"/>도서신청 관리
      <span
        class="book__notice"
        @click="modal = true">
        <span class="icon-edit"/>공지 추가하기
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="book__main">

      <div
        v-if="pending"
        class="book__loader-wrapper">
        <dimi-loader/>
      </div>

      <template v-else>
        <div
          v-for="(book, idx) in list"
          :key="`${idx}`">
          <div
            class="book__book"
            @click="book.open = !book.open">
            <dimi-badge
              :color="book.acceptable === 'accept' ? 'aloes' : book.acceptable === 'reject' ? 'orange' : 'gray'"
              class="book__badge">
              {{ book.acceptable === 'accept' ? '수락' : book.acceptable === 'reject' ? '거절' : '대기' }}
            </dimi-badge>
            <span class="book__item book__title">{{ book.title }}</span>
            <span class="book__item">{{ book.author }}</span>
            <div class="book__item book__expand">
              <span :class="`icon-arrow-${book.open ? 'up' : 'down'}`"/>
            </div>
          </div>
          <div
            v-if="book.open"
            class="book__open">
            <div
              class="book__detail">
              <span class="book__item">출판사</span>
              <span class="book__item">{{ book.publisher }}</span>
              <span class="book__item">가격</span>
              <span class="book__item">{{ book.price }}</span>
              <span class="book__item">보유여부</span>
              <span
                :title="book.possession"
                class="book__item">
                {{ book.possession ? 'O' : 'X' }}
              </span>
            </div>
            <div
              class="book__item--accept"
              @click="acceptBook(book)">
              <span class="icon-ok"/> 승인하기
            </div>
            <div
              class="book__item--reject"
              @click="rejectBook(book)">
              <span class="icon-cross"/> 거절하기
            </div>
          </div>
        </div>
      </template>
      <dimi-modal
        :opened="modal"
        class="modal__modal"
        @close="closeModal">
        <h3 class="modal__title">공지 추가하기</h3>

        <div class="modal__field">
          <dimi-long-input
            v-model="form.desc"
            :height="500"
            class="modal__notice"/>
        </div>

        <div class="modal__field">
          <div class="modal__button">
            <dimi-button @click="addNotice">추가하기</dimi-button>
          </div>
        </div>
      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.book {
  &__badge {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
  }

  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__notice {
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__main {
    padding-top: 0;
  }

  &__book {
    align-items: center;
    border-bottom: 1px solid $gray-lighter;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
  }

  &__item {
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
    margin-right: 16px;
  }

  &__title {
    color: $black !important;
    flex: 1;
  }

  &__expand {
    margin-left: 16px;
  }

  &__open {
    align-items: stretch;
    border-bottom: 1px solid $gray-lighter;
    cursor: default;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
  }

  &__detail {
    flex: 1;
  }

  &__item--accept {
    color: $aloes;
    cursor: pointer;
  }

  &__item--reject {
    color: $red;
    cursor: pointer;
    margin-left: 16px;
  }
}

.modal {
  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__field {
    align-items: center;
    display: flex;
    margin: 1.5rem 0;
  }

  &__label {
    min-width: 6em;
  }

  &__button {
    padding-top: 20px;
    position: absolute;
    right: 25px;
  }

  &__notice {
    min-height: 80%;
  }
}
</style>
