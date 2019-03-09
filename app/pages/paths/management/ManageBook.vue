<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import { bookManager } from '@/src/api/book'

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
      },
      viewEvaluted: false
    }
  },

  computed: {
    noticeInput () {
      return {
        desc: this.form.desc,
        date: this.timezone(new Date()).toISOString()
      }
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await bookManager.getAllBook()
      this.pending = false
    },

    timezone (val) {
      const timezoneOffset = new Date().getTimezoneOffset() * 60000
      return new Date(val - timezoneOffset)
    },

    closeModal () {
      this.modal = false
      this.form = {
        description: ''
      }
    },

    async addNotice () {
      try {
        await bookManager.addNotice(this.noticeInput)
        await this.$swal('추가하였습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async rejectBook (book) {
      try {
        await bookManager.rejectBook(book.idx)
        this.$swal('거절하였습니다', '', 'success')
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async acceptBook (book) {
      try {
        await bookManager.acceptBook(book.idx)
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
      <span class="icon-book-sm" />도서신청 관리
      <span
        class="book__notice"
        @click="modal = true"
      >
        <span class="icon-edit" />공지 추가하기
      </span>
      <span
        class="book__excel"
        onclick="location.href='http://dev-api.dimigo.in/book_info/excel'"
      >
        <span class="icon-long-arrow-down" />엑셀 다운로드
      </span>
      <span
        class="book__evaluated"
        @click="viewEvaluted = !viewEvaluted"
      >
        <span class="icon-list" />
        {{ viewEvaluted ? '처리 안 한 것만 보기' : '처리 한 것만 보기' }}
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="book__main"
    >
      <div
        v-if="pending"
        class="book__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <template v-else>
        <div
          v-for="(book, idx) in list"
          :key="`${idx}`"
        >
          <div
            v-if="viewEvaluted ? book.acceptable !== 'wait' : book.acceptable === 'wait'"
            class="book__book"
            @click="book.open = !book.open"
          >
            <dimi-badge
              :color="book.acceptable === 'accept' ? 'aloes' : book.acceptable === 'reject' ? 'orange' : 'gray'"
              class="book__badge"
            >
              {{ book.acceptable === 'accept' ? '수락' : book.acceptable === 'reject' ? '거절' : '대기' }}
            </dimi-badge>
            <span class="book__item book__title">
              {{ book.title }}
            </span>
            <span class="book__item">
              {{ book.author }}
            </span>
            <div class="book__item book__expand">
              <span :class="`icon-arrow-${book.open ? 'up' : 'down'}`" />
            </div>
          </div>
          <div
            v-if="book.open"
            class="book__open"
          >
            <div class="book__detail">
              <span class="book__item">
                출판사
              </span>
              <span class="book__item">
                {{ book.publisher }}
              </span>
              <span class="book__item">
                가격
              </span>
              <span class="book__item">
                {{ book.price }}
              </span>
              <span class="book__item">
                보유여부
              </span>
              <span
                :title="book.possession"
                class="book__item"
              >
                {{ book.possession ? 'O' : 'X' }}
              </span>
            </div>
            <div
              class="book__item--accept"
              @click="acceptBook(book)"
            >
              <span class="icon-ok" /> 승인하기
            </div>
            <div
              class="book__item--reject"
              @click="rejectBook(book)"
            >
              <span class="icon-cross" /> 거절하기
            </div>
          </div>
        </div>
      </template>
      <dimi-modal
        :opened="modal"
        class="modal__modal"
        @close="closeModal"
      >
        <h3 class="modal__title">
          공지 추가하기
        </h3>

        <div class="modal__field">
          <dimi-long-input
            v-model="form.desc"
            :height="500"
            class="modal__notice"
          />
        </div>

        <div class="modal__field">
          <div class="modal__button">
            <dimi-button @click="addNotice">
              추가하기
            </dimi-button>
          </div>
        </div>
      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.book {
  &__badge {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
  }

  &__loader-wrapper {
    display: flex;
    height: 35vh;
    align-items: center;
    justify-content: center;
  }

  &__notice {
    margin-top: 1em;
    margin-right: 0.5em;
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  &__excel, &__evaluated {
    margin-top: 1em;
    margin-right: 0.5em;
    color: $aloes;
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  &__main {
    padding-top: 0;
  }

  &__book {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    border-bottom: 1px solid $gray-lighter;
    cursor: pointer;
  }

  &__item {
    margin-right: 16px;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }

  &__title {
    flex: 1;
    color: $black !important;
  }

  &__expand {
    margin-left: 16px;
  }

  &__open {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    padding: 24px;
    border-bottom: 1px solid $gray-lighter;
    cursor: default;
  }

  &__detail {
    flex: 1;
  }

  &__item--accept {
    color: $aloes;
    cursor: pointer;
  }

  &__item--reject {
    margin-left: 16px;
    color: $red;
    cursor: pointer;
  }
}

.modal {
  &__title {
    color: $gray-dark;
    font-size: 24px;
    font-weight: $font-weight-bold;
  }

  &__field {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
  }

  &__label {
    min-width: 6em;
  }

  &__button {
    position: absolute;
    right: 25px;
    padding-top: 20px;
  }

  &__notice {
    min-height: 80%;
  }
}
</style>
