<script>
import ContentWrapper from '@/router/partial/ContentWrapper.vue'
import DefaultNavbar from '@/router/partial/DefaultNavbar.vue'
import { dets } from '@/src/api'
import { days } from '@/src/util/index'

export default {
  name: 'Dets',
  components: { ContentWrapper, DefaultNavbar },

  filters: {
    filterTime (time) {
      return '야자 ' + time + '타임'
    }
  },

  data () {
    return {
      list: {
        fresh: [],
        sophomore: [],
        junior: []
      },
      pending: false,
      currentGrade: 0,
      modals: {
        create: false,
        edit: false
      },
      form: {
        title: '',
        description: '',
        speakerSerial: '',
        speakerName: '',
        day: 0,
        time: null,
        room: '',
        maxCount: null,
        targetGrade: null
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
      this.list.fresh = await dets.getGradeDets(1)
      this.list.sophomore = await dets.getGradeDets(2)
      this.list.junior = await dets.getGradeDets(3)
      this.pending = false
    },

    getDayTextByCode (code) {
      return this.days.filter(v => v.code === code)[0].text
    },

    async editDets (parameter) {
      try {
        await dets.changeDets(parameter.idx, this.restructure(this.form))
        await this.$swal('수정되었습니다', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    async createDets () {
      try {
        await dets.createDets(this.restructure(this.form))
        await this.$swal('추가되었습니다', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$swal('이런!', err.message, 'error')
      }
    },

    openEditModal (parameter) {
      this.modals.edit = parameter
      this.form = {
        title: parameter['title'],
        description: parameter['description'],
        speakerSerial: parameter['speakerSerial'],
        speakerName: parameter['speakerName'],
        day: days.filter(v => v.code === parameter['day'])[0].idx,
        time: parameter['time'],
        room: parameter['room'],
        maxCount: parameter['maxCount'],
        targetGrade: parameter['targetGrade']
      }
    },

    closeModal () {
      this.modals = {
        create: false,
        edit: false
      }
      this.form = {
        title: '',
        description: '',
        speakerSerial: '',
        speakerName: '',
        day: 0,
        time: null,
        room: '',
        maxCount: null,
        targetGrade: null
      }
    },

    restructure (parameter) {
      return {
        'title': parameter['title'],
        'description': parameter['description'],
        'request_start_date': '2018-08-15T19:50:00.000',
        'request_end_date': '2019-01-31T23:00:00.000',
        'speakerserial': parameter['speakerSerial'],
        'speakername': parameter['speakerName'],
        'day': days.filter(v => v.idx === parameter['day'])[0].code,
        'time': parseInt(parameter['time']),
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
          this.$swal('삭제되었습니다', 'success')
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
      <span class="icon-dets-lg"/>Dets 신청 관리
      <span
        class="dets__create"
        @click="modals.create = true">
        <span class="icon-plus"/>추가하기
      </span>
      <span
        class="dets__excel"
        onclick="location.href='http://dev-api.dimigo.in/dets/excel'">
        <span class="icon-long-arrow-down"/>엑셀 다운로드
      </span>
    </h1>

    <dimi-card
      slot="main"
      class="dets__main">
      <dimi-tab
        v-model="currentGrade"
        :tabs="['1학년', '2학년', '3학년']"
      />

      <div
        v-if="pending"
        class="dets__loader-wrapper">
        <dimi-loader/>
      </div>

      <template v-else>

        <section
          v-if="currentGrade === 0">
          <div
            v-for="(dets, index) in list.fresh"
            :key="`dets_${index}`">

            <div
              class="dets__dets"
              @click="dets.open = !dets.open">

              <span class="dets__item dets__title">{{ dets.title }}</span>
              <span class="dets__item">{{ dets.speakerSerial }} {{ dets.speakerName }}</span>
              <div class="dets__item dets__expand">
                <span :class="`icon-arrow-${dets.open ? 'up' : 'down'}`"/>
              </div>
            </div>

            <div
              v-if="dets.open"
              class="dets__open">
              <span class="dets__item dets__description">{{ dets.description }}</span>
              <div
                class="dets__down">
                <div
                  class="dets__detail">
                  <span class="dets__item">강의실</span>
                  <span class="dets__item">{{ dets.room }}</span>
                  <span class="dets__item">강의시각</span>
                  <span class="dets__item">{{ getDayTextByCode(dets.day) }} {{ dets.time | filterTime }}</span>
                </div>
                <div
                  class="dets__item dets__item--edit"
                  @click="openEditModal(dets)">
                  <span class="icon-edit"/> 수정하기
                </div>

                <div
                  class="dets__item dets__item--delete"
                  @click="deleteDets(dets)">
                  <span class="icon-cross"/> 삭제하기
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          v-if="currentGrade === 1">
          <div
            v-for="(dets, index) in list.sophomore"
            :key="`dets_${index}`">

            <div
              class="dets__dets"
              @click="dets.open = !dets.open">

              <span class="dets__item dets__title">{{ dets.title }}</span>
              <span class="dets__item">{{ dets.speakerSerial }} {{ dets.speakerName }}</span>
              <div class="dets__item dets__expand">
                <span :class="`icon-arrow-${dets.open ? 'up' : 'down'}`"/>
              </div>
            </div>

            <div
              v-if="dets.open"
              class="dets__open">
              <span class="dets__item dets__description">{{ dets.description }}</span>
              <div
                class="dets__down">
                <div
                  class="dets__detail">
                  <span class="dets__item">강의실</span>
                  <span class="dets__item">{{ dets.room }}</span>
                  <span class="dets__item">강의시각</span>
                  <span class="dets__item">{{ getDayTextByCode(dets.day) }} {{ dets.time | filterTime }}</span>
                </div>
                <div
                  class="dets__item dets__item--edit"
                  @click="openEditModal(dets)">
                  <span class="icon-edit"/> 수정하기
                </div>

                <div
                  class="dets__item dets__item--delete"
                  @click="deleteDets(dets)">
                  <span class="icon-cross"/> 삭제하기
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          v-if="currentGrade === 2">
          <div
            v-for="(dets, index) in list.junior"
            :key="`dets_${index}`">

            <div
              class="dets__dets"
              @click="dets.open = !dets.open">

              <span class="dets__item dets__title">{{ dets.title }}</span>
              <span class="dets__item">{{ dets.speakerSerial }} {{ dets.speakerName }}</span>
              <div class="dets__item dets__expand">
                <span :class="`icon-arrow-${dets.open ? 'up' : 'down'}`"/>
              </div>
            </div>

            <div
              v-if="dets.open"
              class="dets__open">
              <span class="dets__item dets__description">{{ dets.description }}</span>
              <div
                class="dets__down">
                <div
                  class="dets__detail">
                  <span class="dets__item">강의실</span>
                  <span class="dets__item">{{ dets.room }}</span>
                  <span class="dets__item">강의시각</span>
                  <span class="dets__item">{{ getDayTextByCode(dets.day) }} {{ dets.time | filterTime }}</span>
                </div>
                <div
                  class="dets__item dets__item--edit"
                  @click="openEditModal(dets)">
                  <span class="icon-edit"/> 수정하기
                </div>

                <div
                  class="dets__item dets__item--delete"
                  @click="deleteDets(dets)">
                  <span class="icon-cross"/> 삭제하기
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
      <dimi-modal
        :opened="modals.create"
        class="modal__modal"
        @close="closeModal">
        <h3 class="modal__title">Dets 추가</h3>

        <div class="modal__field">
          <label class="modal__label">강의명</label>
          <dimi-input
            id="dets-title"
            v-model="form.title"
            placeholder="강의의 제목을 기입하세요"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">설명</label>
          <dimi-input
            id="dets-description"
            v-model="form.description"
            placeholder="강의의 주제을 기입하세요"/>
        </div>

        <div class="modal__field">
          <label class="modal__label modal__wday">요일</label>
          <dimi-dropdown
            :items="days.map(v => v.text)"
            v-model="form.day"
            class="modal__day"/>
          <label class="modal__label">강의실</label>
          <dimi-input
            id="dets-room"
            v-model="form.room"
            placeholder="디지털컨텐츠실"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">총인원</label>
          <dimi-input
            id="dets-max"
            v-model="form.maxCount"
            class="modal__leftInput"
            placeholder="15"/>
          <label class="modal__label">대상 학년</label>
          <dimi-input
            id="dets-grade"
            v-model="form.targetGrade"
            class="modal__leftInput"
            placeholder="1"/>
          <label class="modal__label">야자시간</label>
          <dimi-input
            id="dets-time"
            v-model="form.time"
            placeholder="2"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">학생 학번</label>
          <dimi-input
            id="dets-speaker-serial"
            v-model="form.speakerSerial"
            class="modal__leftInput"
            placeholder="1234"/>
          <label class="modal__label">학생 이름</label>
          <dimi-input
            id="dets-speaker-name"
            v-model="form.speakerName"
            placeholder="홍길동"/>
        </div>

        <div class="modal__field">
          <div class="modal__button">
            <dimi-button @click="createDets">추가하기</dimi-button>
          </div>
        </div>

      </dimi-modal>
      <dimi-modal
        :opened="modals.edit"
        class="modal__modal"
        @close="closeModal">
        <h3 class="modal__title">Dets 수정</h3>

        <div class="modal__field">
          <label class="modal__label">강의명</label>
          <dimi-input
            id="dets-title"
            v-model="form.title"
            placeholder="강의의 제목을 기입하세요"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">설명</label>
          <dimi-input
            id="dets-description"
            v-model="form.description"
            placeholder="강의의 주제을 기입하세요"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">요일</label>
          <dimi-dropdown
            :items="days.map(v => v.text)"
            v-model="form.day"
            class="modal__day"/>
          <label class="modal__label">강의실</label>
          <dimi-input
            id="dets-room"
            v-model="form.room"
            placeholder="디지털컨텐츠실"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">총인원</label>
          <dimi-input
            id="dets-max"
            v-model="form.maxCount"
            class="modal__leftInput"
            placeholder="15"/>
          <label class="modal__label">대상 학년</label>
          <dimi-input
            id="dets-grade"
            v-model="form.targetGrade"
            class="modal__leftInput"
            placeholder="1"/>
          <label class="modal__label">야자시간</label>
          <dimi-input
            id="dets-time"
            v-model="form.time"
            placeholder="2"/>
        </div>

        <div class="modal__field">
          <label class="modal__label">학생 학번</label>
          <dimi-input
            id="dets-speaker-serial"
            v-model="form.speakerSerial"
            class="modal__leftInput"
            placeholder="1234"/>
          <label class="modal__label">학생 이름</label>
          <dimi-input
            id="dets-speaker-name"
            v-model="form.speakerName"
            placeholder="홍길동"/>
        </div>

        <div class="modal__field">
          <div class="modal__button">
            <dimi-button @click="editDets(modals.edit)">수정하기</dimi-button>
          </div>
        </div>

      </dimi-modal>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
@import '~styles/variables';

.dets {
  &__loader-wrapper {
    align-items: center;
    display: flex;
    height: 35vh;
    justify-content: center;
  }

  &__main {
    padding-top: 0;
  }

  &__create {
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__excel {
    color: $aloes;
    cursor: pointer;
    float: right;
    font-size: 16px;
    margin-right: 0.5em;
    margin-top: 1em;
  }

  &__dets {
    align-items: center;
    border-top: 1px solid $gray-lighter;
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
    border-top: 1px solid $gray-lighter;
    cursor: default;
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

  &__day {
    padding-left: 60px;
    padding-right: 70px;
  }

  &__button {
    padding-top: 20px;
    position: absolute;
    right: 25px;
  }
}
</style>
