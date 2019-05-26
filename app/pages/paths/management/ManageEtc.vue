<script>
import { format } from 'date-fns'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { etcManager } from '@/src/api/etcs'
import timestamp from 'unix-timestamp'

export default {
  name: 'ManageEtcs',
  components: { ContentWrapper },

  filters: {
    deadline (val) {
      return format(timestamp.toDate(val), 'YYYY년 MM월 DD일 HH시 mm분까지')
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
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        targetFirst: false,
        targetSecond: false,
        targetThird: false,
        description: '',
        needIntroduce: false
      }
    }
  },

  computed: {
    etcsInput () {
      return {
        name: this.form.name,
        startDate: timestamp.fromDate((this.form.startDate).toISOString()),
        endDate: timestamp.fromDate((this.form.endDate).toISOString()),
        targetFirst: this.form.targetFirst,
        targetSecond: this.form.targetSecond,
        targetThird: this.form.targetThird,
        description: this.form.description
      }
    }
  },

  async created () {
    this.refresh()
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
        title: etcs.title,
        startDate: timestamp.fromDate(etcs.startDate),
        endDate: timestamp.fromDate(etcs.endDate),
        targetFirst: etcs.targetFirst,
        targetSecond: etcs.targetSecond,
        targetThird: etcs.targetThird,
        description: etcs.description
      }
    },

    closeModal () {
      this.modals = {
        edit: false,
        create: false
      }
      this.form = {
        title: '',
        startDate: new Date(),
        endDate: new Date(),
        targetFirst: false,
        targetSecond: false,
        targetThird: false,
        description: ''
      }
    },

    async deleteApplication (parameter) {
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
          await etcManager.deleteApplication(parameter.idx)
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
      <span class="icon-etcs-lg" />기타 신청 관리
      <span
        class="etcs__create"
        @click="modals.create = true"
      >
        <span class="icon-plus" />추가하기
      </span>
      <span
        class="etcs__excel"
        @click="downloadExcel()"
      >
        <span class="icon-long-arrow-down" />엑셀 다운로드
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
                  {{ etcs.endDate | deadline }}
                </span>
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
          <label class="modal__label">
            1학년
          </label>
          <dimi-checkbox
            id="etcs-grade"
            v-model="form.targetFirst"
          />
          <label class="modal__label">
            2학년
          </label>
          <dimi-checkbox
            id="etcs-grade"
            v-model="form.targetSecond"
          />
          <label class="modal__label">
            3학년
          </label>
          <dimi-checkbox
            id="etcs-grade"
            v-model="form.targetThird"
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

    &__leftInput {
      padding-right: 10px;
    }

    &__button {
      position: absolute;
      right: 25px;
      padding-top: 20px;
    }
  }
</style>
