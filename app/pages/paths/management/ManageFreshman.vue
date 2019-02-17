<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import { freshmanManager } from '@/src/api/freshman'

export default {
  name: 'ManagementFreshman',

  components: { ContentWrapper },

  data () {
    return {
      form: {
        content: '',
        title: '',
        writer: '',
        klass: '0'
      }
    }
  },

  methods: {
    reset () {
      this.form = {
        content: '',
        title: '',
        writer: '',
        klass: '0'
      }
    },
    async push () {
      try {
        await freshmanManager.broadcastMessage(this.form)
        this.reset()
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
      <span class="icon-notice" />신입생 공지 관리
    </h1>

    <dimi-card
      slot="main"
      class="push__main"
    >
      <div>
        To.
        <dimi-input
          v-model="form.klass"
          class="push__input push__input--to"
          placeholder="반"
        />
      </div>
      <dimi-input
        v-model="form.writer"
        class="push__input"
        placeholder="작성자를 입력하세요."
      />
      <dimi-input
        v-model="form.title"
        class="push__input"
        placeholder="제목을 입력하세요."
      />
      <dimi-long-input
        v-model="form.content"
        :height="300"
        class="push__input"
        placeholder="내용을 입력하세요."
      />
      <div class="push__from">
        전체 공지의 경우 반 항목에 0을 입력하시면 됩니다.
      </div>
      <div class="push__button">
        <dimi-button
          @click="push"
        >
          공지하기
        </dimi-button>
      </div>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.push {
  &__input {
    margin-bottom: 1rem;
  }

  &__input--to {
    display: inline-block;
    width: 100px;
    margin-left: 5px;
  }

  &__from {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
