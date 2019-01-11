<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import * as book from '@/src/api/book'

export default {
  name: 'RequestBook',

  components: { ContentWrapper },

  filters: {
    filterDate (time) {
      return format(time, 'YYYY-MM-DD')
    }
  },

  data () {
    return {
      list: [],
      notice: {},
      pending: false,
      modals: {
        book: false,
        notice: false
      },
      form: {
        title: '',
        author: '',
        publisher: '',
        price: null,
        possession: ''
      }
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await book.getStudentBook()
      this.notice = await book.getNotice()
      this.notice.desc = this.notice.desc.replace(/(?:\r\n|\r|\n)/g, '<br/>')
      this.pending = false
    },

    async createBook () {
      try {
        await book.addBook(this.restructure(this.form))
        await this.$swal('추가되었습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    closeModal () {
      this.modals = {
        book: false,
        notice: false
      }
      this.form = {
        title: '',
        author: '',
        publisher: '',
        price: null,
        possession: ''
      }
    },

    restructure (boook) {
      return {
        'name': boook['title'],
        'author': boook['author'],
        'publisher': boook['publisher'],
        'price': parseInt(boook['price']),
        'possession': boook['possession'] ? boook['possession'] : ''
      }
    },

    openEditModal (boook) {
      this.modals.book = boook
      this.form = {
        title: boook['title'],
        author: boook['author'],
        publisher: boook['publisher'],
        price: boook['price'],
        possession: boook['possession']
      }
    },

    async editBook (boook) {
      try {
        await book.changeBook(boook.idx, this.restructure(this.form))
        await this.$swal('수정되었습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async deleteBook (boook) {
      if (await this.$swal({
        type: 'warning',
        text: '정말 삭제하시겠습니까?',
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        showCancelButton: true
      })) {
        try {
          await book.deleteBook(boook.idx)
          this.$swal('삭제되었습니다', '', 'success')
          await this.refresh()
        } catch (err) {
          this.$swal('이런!', err.message, 'error')
        }
      }
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-book-sm" />도서 신청
      <span
        class="book__create"
        @click="modals.book = true"
      >
        <span class="icon-plus" />신청하기
      </span>
      <span
        class="book__notice"
        @click="modals.notice = true"
      >
        <span class="icon-notice" />도서부 공지
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
            <div
              class="book__detail"
            >
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
              class="book__item--edit"
              @click="openEditModal(book)"
            >
              <span class="icon-edit" /> 수정하기
            </div>
            <div
              class="book__item--delete"
              @click="deleteBook(book)"
            >
              <span class="icon-cross" /> 삭제하기
            </div>
          </div>
        </div>
      </template>
      <dimi-modal
        :opened="modals.book"
        @close="closeModal"
      >
        <h3 class="modal__title">
          도서 신청
        </h3>

        <div class="modal__field">
          <label class="modal__label">
            도서명
          </label>
          <dimi-input
            id="book-title"
            v-model="form.title"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            작가
          </label>
          <dimi-input
            id="book-author"
            v-model="form.author"
            class="modal__leftInput"
          />
          <label class="modal__label">
            출판사
          </label>
          <dimi-input
            id="book-publisher"
            v-model="form.publisher"
            placeholder=""
          />
        </div>

        <div class="modal__field">
          <label
            class="modal__label"
          >
            가격
          </label>
          <dimi-input
            id="book-price"
            v-model="form.price"
            class="modal__leftInput"
            placeholder="숫자만 입력하세요"
          />
          <label class="modal__label">
            보유시 사유
          </label>
          <dimi-input
            id="book-possession"
            v-model="form.possession"
            placeholder="미보유시 작성 X"
          />
        </div>

        <div class="modal__field">
          <div class="modal__button">
            <dimi-button @click="createBook">
              추가하기
            </dimi-button>
          </div>
        </div>
      </dimi-modal>
      <dimi-modal
        :opened="modals.notice"
        @close="closeModal"
      >
        <h3 class="modal__title">
          도서부 공지
          <span class="modal__date">
            {{ notice.date | filterDate }}
          </span>
        </h3>
        <div class="modal__field">
          <p class="modal__notice">
            {{ notice.desc }}
          </p>
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

  &__badge-icon {
    font-size: 9px;
    margin-right: 4px;
  }

  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__notice {
    color: $orange;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__create {
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

  &__down {
    display: flex;
    padding-top: 24px;
  }

  &__description {
    flex-direction: column;
    line-height: 1.8;
  }

  &__detail {
    flex: 1;
  }

  &__item--button {
    color: $pink;
    cursor: pointer;
  }

  &__item--edit {
    color: $mustard;
    cursor: pointer;
  }

  &__item--delete {
    color: $gray-light;
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

  &__leftInput {
    padding-right: 10px;
  }

  &__button {
    padding-top: 20px;
    position: absolute;
    right: 25px;
  }

  &__notice {
    flex-direction: column;
    font-family: inherit;
    font-weight: $font-weight-regular;
    line-height: 1.2rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  &__date {
    font-size: 14px;
    font-weight: $font-weight-light;
  }
}
</style>
