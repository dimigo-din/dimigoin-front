<script>
import ContentWrapper from '@/components/ContentWrapper.vue'
import { freshman } from '@/src/api/index'

export default {
  name: 'ManagementFreshman',

  components: { ContentWrapper },

  data () {
    return {
      content: '',
      title: '',
      writer: '',
      klass: '0'
    }
  },

  methods: {
    reset () {
      this.content = ''
      this.title = ''
      this.writer = ''
      this.klass = '0'
    },
    async push () {
      await freshman.postMessage({
        'content': this.content,
        'title': this.title,
        'writer': this.writer,
        'specific_class': this.klass
      })
      this.reset()
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
          v-model="klass"
          class="push__input push__input--to"
          placeholder="반"
        />
      </div>
      <dimi-input
        v-model="writer"
        class="push__input"
        placeholder="작성자를 입력하세요."
      />
      <dimi-input
        v-model="title"
        class="push__input"
        placeholder="제목을 입력하세요."
      />
      <dimi-long-input
        v-model="content"
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
@import '~styles/variables';

.push {
  &__input {
    margin-bottom: 1rem;
  }

  &__input--to {
    display: inline-block;
    margin-left: 5px;
    width: 100px;
  }

  &__from {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  &__button {
    align-items: center;
    display: flex;
    justify-content: center;
  }
}
</style>
