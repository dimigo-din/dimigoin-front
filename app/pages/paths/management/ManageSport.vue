<script>
import SportBase from '@/components/SportBase.vue'
import { sportManager, sportPublicService } from '@/src/api/sport'

export default {
  name: 'ManageSport',
  components: { SportBase },

  data: () => ({
    loading: false,
    sports: [],
    modals: {
      team: false,
      event: false,
      match: false
    },
    form: {},
    events: [],
    teams: [],
    matches: []
  }),

  async created () {
    await this.update()
  },

  methods: {
    async createEvent () {
      try {
        await sportManager.addSportEvent(this.form)
        await this.$swal('추가되었습니다.', '', 'success')
        this.update()
        this.closeModal()
      } catch (err) {
        this.$swal('이런!', '종목 등록을 실패했습니다.', 'error')
      }
      await this.update()
    },
    async createMatch () {
      try {
        await sportManager.addSportMatch(this.form)
        await this.$swal('추가되었습니다.', '', 'success')
        this.update()
        this.closeModal()
      } catch (err) {
        this.$swal('이런!', '경기 등록을 실패했습니다.', 'error')
      }
      await this.update()
    },
    async createTeam () {
      try {
        await sportManager.addSportTeam(this.form)
        await this.$swal('추가되었습니다.', '팀 등록을 실패했습니다.', 'success')
        this.update()
        this.closeModal()
      } catch (err) {
        this.$swal('이런!', '', 'error')
      }
      await this.update()
    },
    closeModal () {
      this.form = {}
      this.modals = {
        team: false,
        event: false,
        match: false
      }
    },
    async update () {
      this.loading = true

      this.sports = await sportPublicService.getAllSports()
      this.events = await sportPublicService.getAllSportEvent()
      this.teams = await sportPublicService.getAllSportTeam()
      this.matches = await sportPublicService.getAllSportMatch()

      this.loading = false
    }
  }
}
</script>

<template>
  <div>
    <sport-base
      :loading="loading"
      :sports="sports"
      :matches="matches"
      :management="true"
    >
      <span slot="header">
        <span class="sport__header">
          <span class="icon-ball" />디미리그 관리
          <span
            class="sport__plus"
            @click="modals.event = true"
          >
            <span class="icon-plus" />종목 추가하기
          </span>
          <span
            class="sport__plus"
            @click="modals.match = true"
          >
            <span class="icon-plus" />경기 추가하기
          </span>
          <span
            class="sport__plus"
            @click="modals.team = true"
          >
            <span class="icon-plus" />팀 추가하기
          </span>
        </span>
      </span>
    </sport-base>
    <dimi-modal
      :opened="modals.match"
      class="modal__modal"
      @close="closeModal"
    >
      <h3 class="modal__title">
        새로운 경기 추가
      </h3>

      <div class="modal__field">
        <label class="modal__label">
          경기 시작 시각
        </label>
        <dimi-date-input v-model="form.startTime" />
      </div>

      <div class="modal__field">
        <label class="modal__label">
          경기 종료 시각
        </label>
        <dimi-date-input v-model="form.endTime" />
      </div>

      <div class="modal__field">
        <label class="modal__label">
          경기 참여팀 1
        </label>
        <dimi-dropdown
          v-model="form.team1"
          :items="teams.map(v => `${v.name}팀`)"
          class="modal__dropdown"
        />
      </div>

      <div class="modal__field">
        <label class="modal__label">
          경기 참여팀 2
        </label>
        <dimi-dropdown
          v-model="form.team2"
          :items="teams.map(v => `${v.name}팀`)"
          class="modal__dropdown"
        />
      </div>

      <div class="modal__field">
        <div class="modal__button">
          <dimi-button
            @click="createMatch"
          >
            추가하기
          </dimi-button>
        </div>
      </div>
    </dimi-modal>

    <dimi-modal
      :opened="modals.team"
      class="modal__modal"
      @close="closeModal"
    >
      <h3 class="modal__title">
        새로운 팀 추가
      </h3>

      <div class="modal__field">
        <label class="modal__label">
          참가 종목
        </label>
        <dimi-dropdown
          v-model="form.event"
          :items="events.map(v => v.name)"
          class="modal__dropdown"
        />
      </div>

      <div class="modal__field">
        <label class="modal__label">
          팀 이름
        </label>
        <dimi-input
          id="team-name"
          v-model="form.title"
          placeholder="새로운 스포츠 팀의 이름을 입력하세요."
        />
      </div>

      <div class="modal__field">
        <label class="modal__label">
          팀 소개
        </label>
        <dimi-input
          id="team-name"
          v-model="form.introduction"
          placeholder="새로운 스포츠 팀의 한 줄 소개를 입력하세요."
        />
      </div>

      <div class="modal__field">
        <div class="modal__button">
          <dimi-button
            @click="createTeam"
          >
            추가하기
          </dimi-button>
        </div>
      </div>
    </dimi-modal>

    <dimi-modal
      :opened="modals.event"
      class="modal__modal"
      @close="closeModal"
    >
      <h3 class="modal__title">
        새로운 종목 추가
      </h3>

      <div class="modal__field">
        <label class="modal__label">
          종목 이름
        </label>
        <dimi-input
          id="event-title"
          v-model="form.title"
          placeholder="새로운 스포츠 종목의 이름을 입력하세요."
        />
      </div>
      <div class="modal__field">
        <div class="modal__button">
          <dimi-button
            @click="createEvent"
          >
            추가하기
          </dimi-button>
        </div>
      </div>
    </dimi-modal>
  </div>
</template>

<style lang="scss">
.sport {
  &__header {
    position: relative;
    display: block;
  }

  &__expand {
    margin-left: 16px;
  }

  &__plus {
    margin-top: 1em;
    margin-right: 0.5em;
    color: $red;
    cursor: pointer;
    float: right;
    font-size: 16px;
  }

  &__open {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    padding: 24px;
    cursor: default;
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

  &__dropdown {
    display: flex;
  }
}
</style>
