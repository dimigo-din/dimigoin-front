<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'

import { ingang } from '@/src/api'

export default {
  name: 'Ingang',
  components: { ContentWrapper },

  data: () => ({
    pending: false,
    currentTab: 0,
    ingangs: [],
    modal: false,
    form: {
      desc: ''
    }
  }),

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.ingangs[0] = await ingang.getGradeTimeIngang(1, 1)
      this.ingangs[1] = await ingang.getGradeTimeIngang(1, 2)
      this.ingangs[2] = await ingang.getGradeTimeIngang(2, 1)
      this.ingangs[3] = await ingang.getGradeTimeIngang(2, 2)
      this.pending = false
    },

    restructure (notice) {
      return {
        'description': notice.desc,
        'date': this.timezone(new Date()).toISOString()
      }
    },

    async addNotice () {
      try {
        await ingang.addNotice(this.restructure(this.form))
        await this.$swal('추가하였습니다', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    timezone (val) {
      var timezoneOffset = new Date().getTimezoneOffset() * 60000
      return new Date(val - timezoneOffset)
    },

    closeModal () {
      this.modal = false
      this.form = {
        desc: ''
      }
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-internet-class"/>인강실 신청 관리
      <span
        v-if="currentTab < 2"
        class="ingang__excel"
        onclick="location.href='http://dev-api.dimigo.in/ingangs/excel/1'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
      <span
        v-if="currentTab > 1"
        class="ingang__excel"
        onclick="location.href='http://dev-api.dimigo.in/ingangs/excel/2'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
      <span
        class="ingang__notice"
        @click="modal = true">
        <span class="icon-notice"/>공지 추가
      </span>
    </h1>
    <dimi-card
      slot="main"
      class="ingang">
      <dimi-tab
        v-model="currentTab"
        :tabs="['1학년 1타임', '1학년 2타임', '2학년 1타임', '2학년 2타임']"/>
      <div
        v-if="pending"
        class="ingang__loader">
        <dimi-loader/>
      </div>
      <div
        v-else
        class="ingang__list">
        <div
          v-for="(klass, ckey) in ingangs[currentTab]"
          :key="ckey">
          <div class="ingang__cell ingang__klass">{{ klass.class }}반</div>
          <div
            v-for="(student, skey) in klass.request"
            :key="skey"
            class="ingang__cell ingang__student">
            <div>{{ student.user.serial }}</div>
            <div>{{ student.user.name }}</div>
          </div>
        </div>
      </div>
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

.ingang {
  padding: 0;

  &__excel {
    color: $aloes;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__loader {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__list {
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    width: 100%;
  }

  &__notice {
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__cell {
    color: $gray-dark;
    display: block;
    font-size: 18px;
    font-weight: $font-weight-bold;
    padding: 0 0.125rem;
    text-align: center;
  }

  &__klass {
    margin-top: 1rem;
  }

  &__student {
    color: $gray;
    display: block;
    margin: 16px;
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
