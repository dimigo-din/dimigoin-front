<script>
import moment from 'moment'
import throwable from '@/mixins/throwable'

import ContentWrapper from '@/router/partial/ContentWrapper.vue'

import { dets } from '@/src/api'
import { days } from '@/src/util/index'
const { getStudentDets, applyDets, cancelDets, createDets, getSpeakerDets, changeSpeakerDets, deleteSpeakerDets } = dets

export default {
  name: 'RequestDets',
  components: { ContentWrapper },
  filters: {
    dateRange (item) {
      moment.locale('ko')
      const [a, b] = [moment(item.request_start_date), moment(item.request_end_date)]
      return `${a.fromNow()}에 시작 (${a.format('llll')})\n${b.fromNow()}에 마감 (${b.format('llll')})`
    }
  },
  mixins: [throwable],

  data () {
    return {
      list: {
        dets: [],
        add: []
      },
      pending: false,
      currentTab: 0,
      modals: {
        creat: false,
        edit: false
      },
      form: {
        title: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        day: 0,
        time: 0,
        room: '',
        maxCount: '',
        targetGrade: ''
      }
    }
  },

  computed: {
    days () {
      return days
    },
    color (item) {
      if (item.detsStatus === 'accept') {
        return 'aloes'
      } else if (item.detsStatus === 'reject') {
        return 'orange'
      } else if (item.detsStatus === 'wait') {
        return 'gray'
      }
    }
  },

  async created () {
    this.pending = true
    this.list.dets = await getStudentDets()
    this.list.add = await getSpeakerDets()
    this.pending = false
  },

  methods: {
    async refresh () {
      this.pending = true
      this.list.dets = await getStudentDets()
      this.list.add = await getSpeakerDets()
      this.pending = false
    },

    async edit (dets) {
      try {
        await changeSpeakerDets(dets.idx, this.form)
        await this.$swal('수정되었습니다', 'success')
        this.closeModal()
      } catch (err) {
        this.$_throwable_handleError(err)
      }
      await this.refresh()
    },

    async toggleApply (item) {
      try {
        if (item.status !== 'request') await applyDets(item)
        else await cancelDets(item.idx)
      } catch (err) {
        this.$_throwable_handleError(err)
      }

      await this.refresh()
    },

    async create () {
      try {
        await createDets(this.form)
        await this.$swal('추가되었습니다', 'success')
        this.closeModal()
        await this.refresh()
      } catch (err) {
        this.$_throwable_handleError(err)
      }
    },

    openEditModal (dets) {
      this.modals.edit = dets
      this.form = {
        title: dets['title'],
        description: dets['description'],
        startDate: dets['request_start_date'],
        endDate: dets['request_end_date'],
        day: dets['day'],
        time: dets['time'],
        room: dets['room'],
        maxCount: dets['maxCount'],
        targetGrade: dets['targetGrade']
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
        startDate: new Date(),
        endDate: new Date(),
        day: 0,
        time: 0,
        room: '',
        maxCount: '',
        targetGrade: ''
      }
    },
    async deleteDets (dets) {
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
          await deleteSpeakerDets(dets.idx)
          this.$swal('삭제되었습니다', 'success')
        } catch (err) {
          this.$_throwable_handleError(err)
        }
        await this.refresh()
      }
    }
  }
}
</script>

<template>
  <content-wrapper>
    <h1 slot="header">
      <span class="icon-dets-lg"/>Dets 신청
      <span
        v-if="currentTab === 1"
        class="dets__add"
        @click="modal.add = true">
        <span class="icon-plus"/>신청하기
      </span>
    </h1>
    <dimi-card
      slot="main"
      class="dets__main">
      <dimi-tab
        v-model="currentTab"
        :tabs="['강의 수강 신청', '강의 개설 신청']"
      />
      <div
        v-if="pending"
        class="dets__loader-wrapper">
        <dimi-loader/>
      </div>
      <template v-else>
        <section
          v-if="currentTab === 0"
          class="dets__list">
          <div
            v-for="(item, index) in list.dets"
            :key="`detslist-${index}`"
            class="dets-list">
            <div
              class="dets-list__otfb"
              @click="item.open = !item.open">
              <span class="dets-list__black">{{ item.title }}</span>
              <span class="dets-list__black07">{{ item.speakerName }}</span>
              <span class="icon-arrow-down"/>
            </div>
            <div
              v-if="item.open"
              class="dets-list__black80">
              <span class="dets-list__otfr">{{ item.description }}</span>
              <div>
                <span class="dets-list__otfb">강의실</span>
                <span class="dets-list__otfr">{{ item.room }}</span>
              </div>
              <div>
                <span class="dets-list__otfb">강의시각</span>
                <span class="dets-list__otfr">{{ item.day }} {{ item.time }}</span>
              </div>
              <div
                :class="{
                  'dets-list': true,
                  'dets-list__otfb': true,
                  'dets-list__cell--button': true,
                  'dets-list__cell--full': item.maxCount === item.count,
                  'dets-list__cell--applied': item.status === 'request'
                }"
                :title="item | dateRange"
                @click="toggleApply(item)">
                <template v-if="item.status === 'request'">
                  <span class="icon-cross"/> 신청취소
                </template>
                <template v-else>
                  <template v-if="item.maxCount > item.count">
                    <span class="icon-ok"/> 신청하기
                  </template>
                  <template v-else>
                    <span class="icon-alert"/> 신청불가
                  </template>
                </template>
              </div>
            </div>
          </div>
        </section>
        <section
          v-if="currentTab === 1"
          class="dets__addlist">
          <div
            v-for="(item, index) in list.add"
            :key="`detslist-${index}`"
            class="dets-list">
            <div
              class="dets-list__otfb"
              @click="item.open = !item.open">
              <dimi-badge
                :color="color"
                class="dets__badge">
                <template v-if="item.detsStatus === 'accept'">통과</template>
                <template v-if="item.detsStatus === 'reject'">탈락</template>
                <template v-if="item.detsStatus === 'wait'">보류</template>
              </dimi-badge>
              <span class="dets-list__black">{{ item.title }}</span>
              <span class="dets-list__black07">{{ item.speakerName }}</span>
            </div>
            <div
              v-if="item.open"
              class="dets-list__black80">
              <span class="dets-list__otfr">{{ item.description }}</span>
              <div>
                <span class="dets-list__otfb">강의실</span>
                <span class="dets-list__otfr">{{ item.room }}</span>
              </div>
              <div>
                <span class="dets-list__otfb">강의시각</span>
                <span class="dets-list__otfr">{{ item.day }} {{ item.time }}</span>
              </div>
              <div class="dets__edit">
                <div
                  class="dets__edit"
                  @click="openEditModal(item)">
                  <span class="icon-edit"/> 수정하기
                </div>
                <div
                  class="dets__cancel"
                  @click="deleteDets(item)">
                  <span class="icon-cross"/> 취소하기
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </dimi-card>
    <dimi-modal
      :opened="modals.creat"
      class="dets__modal"
      @close="closeModal">
      <h3 class="dets__title">강의 개설 신청</h3>
      <div class="dets__form-field">
        <label class="dets__form-label">강의명</label>
        <dimi-input
          id="dets-title"
          v-model="form.title"
          class="dets__form-input"
          placeholder="강의의 제목을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">설명</label>
        <dimi-input
          id="dets-description"
          v-model="form.description"
          class="dets__form-input"
          placeholder="강의의 주제을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">요일</label>
        <dimi-dropdown
          :items="days.map(v => v.text)"
          :dropup="true"
          v-model="form.day"
          class="dets__days"/>
        <label class="dets__form-label">강의실</label>
        <dimi-input
          id="dets-room"
          v-model="form.room"
          class="dets__form-input"
          placeholder="희망하는 강의실을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">총인원</label>
        <dimi-input
          id="dets-max"
          v-model="form.maxCount"
          class="dets__form-input"
          placeholder="희망하는 총 인원을 기입하세요"/>
        <label class="dets__form-label">대상 학년</label>
        <dimi-input
          id="dets-grade"
          v-model="form.targetGrade"
          class="dets__form-input"
          placeholder="강의의 대상 학년을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">시작일</label>
        <dimi-date-input v-model="form.startDate"/>
        <label class="dets__form-label">종료일</label>
        <dimi-date-input v-model="form.endDate"/>
      </div>
      <div class="dets__submit">
        <dimi-button @click="create">신청하기</dimi-button>
      </div>
    </dimi-modal>
    <dimi-modal
      :opened="modals.edit"
      class="dets__modal"
      @close="closeModal">
      <h3 class="dets__title">강의 개설 수정</h3>
      <div class="dets__form-field">
        <label class="dets__form-label">강의명</label>
        <dimi-input
          id="dets-title"
          v-model="form.title"
          class="dets__form-input"
          placeholder="강의의 제목을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">설명</label>
        <dimi-input
          id="dets-description"
          v-model="form.description"
          class="dets__form-input"
          placeholder="강의의 주제을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">요일</label>
        <dimi-dropdown
          :items="days.map(v => v.text)"
          :dropup="true"
          v-model="form.day"
          class="dets__days"/>
        <label class="dets__form-label">강의실</label>
        <dimi-input
          id="dets-room"
          v-model="form.room"
          class="dets__form-input"
          placeholder="희망하는 강의실을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">총인원</label>
        <dimi-input
          id="dets-max"
          v-model="form.maxCount"
          class="dets__form-input"
          placeholder="희망하는 총 인원을 기입하세요"/>
        <label class="dets__form-label">대상 학년</label>
        <dimi-input
          id="dets-grade"
          v-model="form.targetGrade"
          class="dets__form-input"
          placeholder="강의의 대상 학년을 기입하세요"/>
      </div>
      <div class="dets__form-field">
        <label class="dets__form-label">시작일</label>
        <dimi-date-input v-model="form.startDate"/>
        <label class="dets__form-label">종료일</label>
        <dimi-date-input v-model="form.endDate"/>
      </div>
      <div class="dets__submit">
        <dimi-button @click="edit(modals.edit)">수정하기</dimi-button>
      </div>
    </dimi-modal>
  </content-wrapper>
</template>

<style lang="scss" scoped>

</style>
