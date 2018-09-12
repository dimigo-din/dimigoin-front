<script>
import { sns } from '@/src/api'

export default {
  name: 'SnsCard',

  props: {
    post: {
      type: Object,
      default: {}
    }
  },

  data: () => ({
    post: this.post
  })
}
</script>

<template>
  <div class="post">
    <div
      v-if="!post"
      class="post__loader">
      <dimi-loader/>
    </div>

    <div
      v-else>
      <dimi-card
        class="post__card">
        <div
          class="post__profile">
        </div>
        <div
          class="post__content">
        </div>
      </dimi-card>
    </div>
  </div>
</template>
