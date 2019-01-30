<script>
import { format } from 'date-fns'

export default {
  name: 'RegisterSuccess',
  filters: {
    formatDate (date) {
      return format(date, 'YYYY년 MM월 DD일')
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    birthday: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <dimi-card>
    <h1 class="title">코인오세요</h1>
    <div class="navigation">
      <dimi-button
        class="login-button"
        @click="() => $router.push({ name: 'login'})"
      >
        로그인
      </dimi-button>
    </div>
  </dimi-card>
</template>

<style lang="scss" scoped>
.row {
  margin-bottom: 1rem;
}

.title {
  margin-bottom: 3rem;
  color: $gray-dark;
  font-size: 2rem;
  font-weight: $font-weight-extra-bold;
  word-break: keep-all;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

</style>
