<script>
import ContentWrapper from '@/components/ContentWrapper.vue'

export default {
  name: 'SportBase',
  components: { ContentWrapper },

  props: {
    sports: {
      type: Array,
      default: () => []
    },
    matches: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    management: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      modals: {
        teamInfo: false
      },
      form: {}
    }
  },

  methods: {
    openTeamInfo (team) {
      this.form = team
      this.modals.teamInfo = true
    },
    closeTeamInfo () {
      this.modals.teamInfo = false
    },
    getMemberInfo (member) {
      console.log(member)
      return `${member.user.name}
        (${member.total_assist}도움 ${member.total_score}득점)`
    },
    getmatchesByTeam (idx) {
      return this.matches.filter(v => v.team1.idx === idx ||
        v.team2.idx === idx)
    },
    getMatchInfo (match, team) {
      let opponent, win, score
      if (match.team1.idx === team.idx) {
        opponent = match.team2
        team = match.team1
      } else {
        opponent = match.team1
        team = match.team2
      }

      if (!match.end_date) return `${opponent.name}`
      if (team.score < opponent.score) win = '패'
      else if (team.score > opponent.score) win = '승'
      else win = '무'
      score = `${team.score}:${opponent.score}`
      return `${opponent.name} - ${score} ${win}`
    },
    totalStatus (team) {
      return `총 ${team.total_win}승 ${team.total_defeat}패 ${team.total_score}득점`
    },
    computedColor (match, team) {
      let opponent
      if (match.team1.idx === team.idx) {
        opponent = match.team2
        team = match.team1
      } else {
        opponent = match.team1
        team = match.team2
      }
      if (team.score < opponent.score) return 'orange'
      else if (team.score > opponent.score) return 'cyan'
      else return 'gray'
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="sport__loading"
    >
      <dimi-loader />
    </div>
    <div v-else>
      <div class="row">
        <main class="main col-xs">
          <content-wrapper class="sport">
            <h1 slot="header">
              <slot name="header" />
            </h1>
            <dimi-card
              slot="main"
            >
              <template
                v-for="(spo, i) in sports"
              >
                <div
                  :key="`title-${i}`"
                  class="sport__sport"
                  @click="spo.open = !spo.open"
                >
                  <slot
                    :spo="spo"
                    name="badge"
                  />
                  <span class="sport__item sport__title">
                    {{ spo.event }}
                  </span>
                  <div
                    class="sport__item sport__expand"
                  >
                    <span :class="`icon-arrow-${spo.open ? 'up' : 'down'}`" />
                  </div>
                </div>
                <div
                  v-if="spo.open"
                  :key="`detail-${i}`"
                  class="sport__open"
                >
                  <div class="sport__detail">
                    <span class="sport__item">
                      팀 목록
                    </span>
                    <dimi-badge
                      v-for="(team, index) in spo.teams"
                      :key="`team-${index}`"
                      class="sport__badge"
                      color="gray"
                    >
                      <span
                        @click="openTeamInfo(team)"
                      >
                        {{ `${team.name}팀` }}
                      </span>
                    </dimi-badge>
                  </div>
                </div>
              </template>
              <div
                v-if="!sports.length"
                class="sport__empty"
              >
                현재 진행 중인 디미리그가 없습니다.
              </div>
              <dimi-modal
                :opened="modals.teamInfo"
                class="modal__modal"
                @close="closeTeamInfo"
              >
                <h3 class="modal__title">
                  {{ `${form.name}팀 정보` }}
                </h3>

                <div class="modal__field">
                  <label class="modal__label">
                    소개
                  </label>
                  <span>{{ form.introduction }}</span>
                </div>

                <div class="modal__field">
                  <label class="modal__label">
                    현재 현황
                  </label>
                  <span>{{ totalStatus(form) }}</span>
                </div>

                <div class="modal__field">
                  <label class="modal__label">
                    선수 목록
                  </label>
                  <span
                    v-for="(member, index) in form.members"
                    :key="`member-${index}`"
                  >
                    {{ getMemberInfo(member) }}
                    <br>
                  </span>
                </div>

                <div class="modal__field">
                  <label class="modal__label">
                    경기 목록
                  </label>
                  <dimi-badge
                    v-for="(match, index) in getmatchesByTeam(form.idx)"
                    :key="`badge-${index}`"
                    class="sport__badge"
                    :color="computedColor(match, form)"
                  >
                    {{ getMatchInfo(match, form) }}
                  </dimi-badge>
                </div>
              </dimi-modal>
            </dimi-card>
          </content-wrapper>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sport {
  .c-card {
    padding: 0;
  }

  &__loading {
    display: flex;
    justify-content: center;
  }

  &__badge {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    font-size: 14px;
  }

  &__sport {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
    cursor: pointer;
  }

  &__sport:not(:first-of-type) {
    border-top: 1px solid $gray-lighter;
  }

  &__open {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    padding: 24px;
    cursor: default;
  }

  &__item {
    color: $gray;
    font-weight: $font-weight-bold;
  }

  &__item:not(:last-child) {
    margin-right: 16px;
  }

  &__title {
    flex: 1;
    color: $black !important;
  }

  &__empty {
    padding: 24px;
    margin-right: 16px;
    color: $gray;
    font-size: 16px;
    font-weight: $font-weight-bold;
  }

  &__detail {
    flex: 1;
  }

  &__open {
    padding-top: 0;
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
}
</style>
