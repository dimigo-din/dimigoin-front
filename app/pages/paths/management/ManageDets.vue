<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import * as dets from '@/src/api/dets'
import days from '@/src/util/days'
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'ManageDets',
  components: { ContentWrapper },

  data () {
    return {
      list: {
        0: [],
        1: [],
        2: []
      },
      pending: false,
      currentGrade: 0,
      modal: false,
      create: true,
      form: {
        title: '',
        description: '',
        speakerSerial: '',
        speakerName: '',
        date: '',
        room: '',
        maxCount: null,
        targetGrade: null,
        endDate: new Date()
      }
    }
  },

  validation: {
    form:{
       title :{
        required
      },
      description :{
        required
      },
      speakerSerial :{
        required
      },
      date :{
        numeric
      },
      room :{
        required
      },
      maxCount :{
        numeric
      },
      targetGrade :{
        numeric
      }
    }
  },

  computed: {
    days () {
      return days.filter(v => v.idx < 5)
    }
  },

  async created () {
    this.refresh()
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list[0] = await dets.getGradeDets(1)
      this.list[1] = await dets.getGradeDets(2)
      this.list[2] = await dets.getGradeDets(3)
      this.pending = false
    },

    async editDets (parameter) {
      try {
        await dets.changeDets(parameter.idx, this.restructure(this.form))
        await this.$swal('수정되었습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async createDets () {
      try {
        await dets.createDets(this.restructure(this.form))
        await this.$swal('추가되었습니다', '', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    openEditModal (parameter) {
      this.modal = parameter
      this.create = false
      this.form = {
        title: parameter['title'],
        description: parameter['description'],
        speakerSerial: parameter['speakerSerial'],
        speakerName: parameter['speakerName'],
        date: parameter['date'],
        room: parameter['room'],
        maxCount: parameter['maxCount'],
        targetGrade: parameter['targetGrade'],
        endDate: new Date(parameter['endDate'])
      }
    },

    closeModal () {
      this.modal = false
      this.form = {
        title: '',
        description: '',
        speakerSerial: '',
        speakerName: '',
        date: '',
        room: '',
        maxCount: null,
        targetGrade: null,
        endDate: new Date()
      }
    },

    restructure (parameter) {
      return {
        'title': parameter['title'],
        'description': parameter['description'],
        'request_start_date': this.timezone(new Date()),
        'request_end_date': this.timezone(parameter['endDate']).toISOString(),
        'speakerserial': parameter['speakerSerial'],
        'speakername': parameter['speakerName'],
        'date': parameter['date'],
        'room': parameter['room'],
        'max_of_count': parseInt(parameter['maxCount']),
        'target_grade': parseInt(parameter['targetGrade'])
      }
    },

    async deleteDets (parameter) {
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
          await dets.deleteDets(parameter.idx)
          this.$swal('삭제되었습니다', '', 'success')
          await this.refresh()
        } catch (err) {
          this.$swal('이런!', err.message, 'error')
        }
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
      <span class="icon-dets-lg" />Dets 신청 관리
      <span
        class="dets__create"
        @click="modal = true"
      >
        <span class="icon-plus" />추가하기
      </span>
      <span
        class="dets__excel"
        onclick="location.href='http://dev-api.dimigo.in/dets/excel'"
      >
        <span class="icon-long-arrow-down" />엑셀 다운로드
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="dets__main"
    >
      <dimi-tab
        v-model="currentGrade"
        :tabs="['1학년', '2학년', '3학년']"
      />

      <div
        v-if="pending"
        class="dets__loader-wrapper"
      >
        <dimi-loader />
      </div>

      <template v-else>
        <div
          v-for="(dets, index) in list[currentGrade]"
          :key="`${index}`"
        >
          <div
            class="dets__dets"
            @click="dets.open = !dets.open"
          >
            <span class="dets__item dets__title">
              {{ dets.title }}
            </span>
            <span class="dets__item">
              {{ dets.speakerSerial }} {{ dets.speakerName }}
            </span>
            <div class="dets__item dets__expand">
              <span :class="`icon-arrow-${dets.open ? 'up' : 'down'}`" />
            </div>
          </div>

          <div
            v-if="dets.open"
            class="dets__open"
          >
            <span class="dets__item dets__description">
              {{ dets.description }}
            </span>
            <div
              class="dets__down"
            >
              <div
                class="dets__detail"
              >
                <span class="dets__item">
                  강의실
                </span>
                <span class="dets__item">
                  {{ dets.room }}
                </span>
                <span class="dets__item">
                  강의시각
                </span>
                <span class="dets__item">
                  {{ dets.date }}
                </span>
              </div>

              <div
                class="dets__item dets__item--edit"
                @click="openEditModal(dets)"
              >
                <span class="icon-edit" /> 수정하기
              </div>
              <div
                class="dets__item dets__item--delete"
                @click="deleteDets(dets)"
              >
                <span class="icon-cross" /> 삭제하기
              </div>
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
          {{ create ? 'Dets 추가' : 'Dets 수정' }}
        </h3>

        <div class="modal__field">
          <label class="modal__label">
            강의명
          </label>
          <dimi-input
            id="dets-title"
            v-model="form.title"
            placeholder="강의의 제목을 기입하세요"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            설명
          </label>
          <dimi-input
            id="dets-description"
            v-model="form.description"
            placeholder="강의의 주제을 기입하세요"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            강의시간
          </label>
          <dimi-input
            id="dets-time"
            v-model="form.date"
            class="modal__leftInput"
            placeholder="월요일 1타임"
          />
          <label class="modal__label">
            강의실
          </label>
          <dimi-input
            id="dets-room"
            v-model="form.room"
            placeholder="디지털컨텐츠실"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            총인원
          </label>
          <dimi-input
            id="dets-max"
            v-model="form.maxCount"
            class="modal__leftInput"
            placeholder="15"
          />
          <label class="modal__label">
            대상 학년
          </label>
          <dimi-input
            id="dets-grade"
            v-model="form.targetGrade"
            placeholder="1"
          />
        </div>

        <div class="modal__field">
          <label class="modal__label">
            학생 학번
          </label>
          <dimi-input
            id="dets-speaker-serial"
            v-model="form.speakerSerial"
            class="modal__leftInput"
            placeholder="1234"
          />
          <label class="modal__label">
            학생 이름
          </label>
          <dimi-input
            id="dets-speaker-name"
            v-model="form.speakerName"
            placeholder="홍길동"
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
              v-if="create"
            >
              <dimi-button
                @click="createDets"
              >
                추가하기
              </dimi-button>
            </template>
            <template
              v-else
            >
              <dimi-button
                @click="editDets(modal)"
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
.dets {
  &__loader-wrapper {
    display: flex;
    height: 35vh;
    align-items: center;
    justify-content: center;
  }

  &__main {
    padding-top: 0;
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

  &__dets {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    border-top: 1px solid $gray-lighter;
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
