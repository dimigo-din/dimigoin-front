<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { etcManager } from '@/src/api/etcs'

export default {
  name: 'ManageEtcs',
  components: { ContentWrapper },

  filters: {
    filterEndTime (time) {
      return format(time, 'YYYY년 MM월 DD일 HH시 mm분')
    }
  },

  data () {
    return {
      list: [],
      pending: false,
      modals: {
        edit: false,
        create: false
      },
      currentEtcs: null,
      form: {
        hostSerial: '',
        title: '',
        endDate: new Date(),
        targetFirst: false,
        targetSecond: false,
        targetThird: false,
        description: '',
        maxUser: null
      }
    }
  },

  computed: {
    etcsInput () {
      return {
        hostSerial: this.form.hostSerial,
        title: this.form.title,
        startDate: new Date(),
        endDate: this.form.endDate,
        targetFirst: this.form.targetFirst,
        targetSecond: this.form.targetSecond,
        targetThird: this.form.targetThird,
        description: this.form.description,
        maxUser: this.form.maxUser
      }
    }
  },

  async created () {
    await this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list = await etcManager.getAllApplications()
      this.pending = false
    },

    async editApplication () {
      try {
        await etcManager.editApplication(this.currentEtcs.applicationIdx, this.etcsInput)
        await this.$swal('수정되었습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async createApplication () {
      try {
        await etcManager.createApplication(this.etcsInput)
        await this.$swal('추가되었습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    openEditModal (etcs) {
      this.modals.edit = true
      this.currentEtcs = etcs
      this.form = {
        hostSerial: etcs.hostSerial,
        title: etcs.title,
        endDate: new Date(etcs.endDate),
        targetFirst: etcs.targetFirst,
        targetSecond: etcs.targetSecond,
        targetThird: etcs.targetThird,
        description: etcs.description,
        maxUser: etcs.maxUser
      }
    },

    closeModal () {
      this.modals = {
        edit: false,
        create: false
      }
      this.form = {
        hostSerial: '',
        title: '',
        endDate: new Date(),
        targetFirst: false,
        targetSecond: false,
        targetThird: false,
        description: '',
        maxUser: null
      }
    },

    async deleteApplication (parameter) {
      const { value: answer } = await this.$swal({
        type: 'warning',
        text: '정말 삭제하시겠습니까?',
        confirmButtonColor: '#d61315',
        cancelButtonColor: '#ababab',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        showCancelButton: true
      })

      if (!answer) return
      try {
        await etcManager.deleteApplication(parameter.applicationIdx)
        this.list = await etcManager.getAllApplications()
        this.$swal('삭제되었습니다', '', 'success')
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
      await this.refresh()
    },

    async downloadExcel (parameter) {
      try {
        await etcManager.downloadExcel(parameter.applicationIdx, parameter.title)
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
      <span class="icon-etcs-lg" />기타 신청 관리
      <span
        class="etcs__create"
        @click="modals.create = true"
      >
        <span class="icon-plus" />추가하기
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="etcs__main"
    >
      <div
        v-if="pending"
        class="etcs__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <template v-else>
        <div
          v-if="!list.length"
          class="etcs__empty"
        >
          아직 등록된 기타 신청이 없습니다
        </div>
        <div
          v-for="(etcs, index) in list"
          :key="`${index}`"
        >
          <div
            class="etcs__etcs"
            @click="etcs.open = !etcs.open"
          >
            <span class="etcs__item etcs__title">
              {{ etcs.title }}
            </span>
            <div class="etcs__item etcs__expand">
              <span :class="`icon-arrow-${etcs.open ? 'up' : 'down'}`" />
            </div>
          </div>

          <div
            v-if="etcs.open"
            class="etcs__open"
          >
            <span class="etcs__item etcs__description">
              {{ etcs.description }}
            </span>
            <div
              class="etcs__down"
            >
              <div
                class="etcs__detail"
              >
                <span class="etcs__item">
                  신청마감
                </span>
                <span class="etcs__item">
                  {{ etcs.endDate | filterEndTime }}
                </span>
              </div>

              <div
                class="etcs__item etcs__item--down"
                @click="downloadExcel(etcs)"
              >
                <span class="icon-long-arrow-down" /> 엑셀 다운로드
              </div>
              <div
                class="etcs__item etcs__item--edit"
                @click="openEditModal(etcs)"
              >
                <span class="icon-edit" /> 수정하기
              </div>
              <div
                class="etcs__item etcs__item--delete"
                @click="deleteApplication(etcs)"
              >
                <span class="icon-cross" /> 삭제하기
              </div>
            </div>
          </div>
        </div>
      </template>

      <dimi-modal
        :opened="modals.edit || modals.create"
        class="modal__modal"
        @close="closeModal"
      >
        <h3 class="modal__title">
          {{ modals.create ? '기타 신청 추가' : '기타 신청 수정' }}
        </h3>

        <div class="modal__field">
          <label class="modal__label">
            기타 신청명
          </label>
          <dimi-input
            id="etcs-title"
            v-model="form.title"
            placeholder="기타 신청의 제목을 기입하세요"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            설명
          </label>
          <dimi-input
            id="etcs-description"
            v-model="form.description"
            placeholder="강의의 주제을 기입하세요"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label modal__labelCheckbox">
            1학년
          </label>
          <dimi-checkbox
            id="etcs-grade"
            v-model="form.targetFirst"
            class="modal__leftCheckbox"
          />
          <label class="modal__label modal__labelCheckbox">
            2학년
          </label>
          <dimi-checkbox
            id="etcs-grade"
            v-model="form.targetSecond"
            class="modal__leftCheckbox"
          />
          <label class="modal__label modal__labelCheckbox">
            3학년
          </label>
          <dimi-checkbox
            id="etcs-grade"
            v-model="form.targetThird"
            class="modal__leftCheckbox"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            총인원
          </label>
          <dimi-input
            id="etcs-max"
            v-model="form.maxUser"
            class="modal__leftInput"
            placeholder="10"
          />
          <label class="modal__label">
            대표 학번
          </label>
          <dimi-input
            id="dets-host"
            v-model="form.hostSerial"
            placeholder="1234"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            신청 마감
          </label>
          <dimi-date-input v-model="form.endDate" />
        </div>

        <div class="modal__field">
          <div class="modal__button">
            <template
              v-if="modals.create"
            >
              <dimi-button
                @click="createApplication"
              >
                추가하기
              </dimi-button>
            </template>
            <template
              v-else
            >
              <dimi-button
                @click="editApplication"
              >
                수정하기
              </dimi-button>
            </template>
          </div>
        </div>
      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
  .etcs {
    &__loader-wrapper {
      display: flex;
      height: 35vh;
      align-items: center;
      justify-content: center;
    }

    &__main {
      padding-top: 0;
      padding-bottom: 0;
    }

    &__create {
      margin-top: 1em;
      margin-right: 0.5em;
      color: $red;
      cursor: pointer;
      float: right;
      font-size: 16px;
    }

    &__excel {
      margin-top: 1em;
      margin-right: 0.5em;
      color: $aloes;
      cursor: pointer;
      float: right;
      font-size: 16px;
    }

    &__etcs {
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
      align-items: stretch;
      justify-content: flex-start;
      padding: 24px;
      border-top: 1px solid $gray-lighter;
      cursor: default;
    }

    &__down {
      display: flex;
      padding-top: 24px;
    }

    &__description {
      flex-direction: column;
      font-family: inherit;
      font-weight: $font-weight-regular;
      line-height: 1.8;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    &__detail {
      flex: 1;
    }

    &__item--down {
      color: $aloes;
      cursor: pointer;
    }

    &__item--edit {
      color: $mustard;
      cursor: pointer;
    }

    &__item--delete {
      color: $gray-light;
      cursor: pointer;
    }

    &__empty {
      padding: 24px;
      margin-right: 16px;
      color: $gray;
      font-size: 16px;
      font-weight: $font-weight-bold;
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

    &__labelCheckbox {
      min-width: 3em;
    }

    &__leftInput {
      padding-right: 10px;
    }

    &__leftCheckbox {
      padding-right: 20px;
    }

    &__button {
      position: absolute;
      right: 25px;
      padding-top: 20px;
    }
  }
</style>
