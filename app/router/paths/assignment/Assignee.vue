<script>
import moment from 'moment'
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'
import DimiCard from '../../../components/DimiCard.vue'
import DimiBadge from '../../../components/DimiBadge.vue'

export default {
  name: 'Assignee',
  components: { ContentWrapper, DefaultNavbar, DimiCard, DimiBadge },

  filters: {
    deadline (val) {
      return moment(val).format('YYYY.MM.DD') + '까지'
    }
  },

  data: () => ({
    selection: [],

    'assignments': [
      {
        'idx': 9,
        'title': 'API로 생성한 어사인먼트',
        'description': '제곧내임 API로 생성에 성공한 어사인먼트 사실 아까까지 있는 어사인먼트들은 다 파이썬으로 생성하거나 mysql sql문 쿼리로 작성해서 넣었음 사실 sql도 뻥ㅇ임 나 sql못해서 파이썬 orm으로 작성해서 넣거든 히히',
        'deadline': '2018-05-21T12:38:56',
        'target_grade': 3,
        'target_class': 3,
        'assignor': {
          'name': '진준기',
          'email': 'ruto1924@naver.com'
        },
        'reports': []
      },
      {
        'idx': 2,
        'title': '초코송이 만들기',
        'description': '못생긴 초콜릿',
        'deadline': '2018-12-23T12:52:10',
        'target_grade': 2,
        'target_class': 2,
        'assignor': {
          'name': '진준기',
          'email': 'ruto1924@naver.com'
        },
        'reports': [
          {
            'author': {
              'name': '진준기',
              'student_serial': '3331'
            },
            'uploaded_date': '2018-03-21T20:54:36',
            'file_name': null
          }
        ]
      }
    ]
  }),

  methods: {
    toggle (i) {
      this.selection.splice(i, 1, !this.selection[i])
    }
  }
}
</script>

<template>
  <div>
    <default-navbar/>
    <div class="container">
      <div class="row">
        <main class="main col-xs">
          <content-wrapper class="assignee">
            <h1 slot="header"><span class="icon-submission"/> 과제 제출</h1>
            <dimi-card slot="main">
              <template v-for="(ass, i) in assignments">
                <div
                  :key="i"
                  class="assignee__assignment">

                  <dimi-badge
                    :color="ass.reports ? 'aloes' : 'orange'"
                    class="assignee__badge">

                    <span :class="ass.reports ? 'icon-ok' : 'icon-cross'"/>
                    {{ ass.reports ? '제출' : '미제출' }}
                  </dimi-badge>

                  <span class="assignee__item assignee__title">{{ ass.title }}</span>

                  <span class="assignee__item">{{ ass.assignor.name }}</span>
                  <span class="assignee__item">{{ ass.deadline | deadline }}</span>

                  <div
                    class="assignee__item assignee__expand"
                    @click="toggle(i)">
                    <span :class="`icon-arrow-${selection[i] ? 'up' : 'down'}`"/>
                  </div>
                </div>

                <div
                  v-show="selection[i]"
                  :key="i + 'desc'"
                  class="assignee__assignment assignee__description">
                  {{ ass.description }}
                </div>
              </template>
            </dimi-card>
          </content-wrapper>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.assignee {
  .c-card {
    padding: 0;
  }

  &__assignment {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px;
  }

  &__assignment:not(:first-of-type) {
    border-top: 1px solid $gray-lighter;
  }

  &__item {
    @include font-bold;
    color: $gray;
  }

  &__badge,
  &__item:not(:last-child) {
    margin-right: 16px;
  }

  &__title {
    flex: 1;
    color: $black !important;
  }

  &__expand {
    margin-left: 16px;
  }

  &__description {
    color: $gray;
    font-size: 16px;
    line-height: 1.8;
  }
}
</style>
