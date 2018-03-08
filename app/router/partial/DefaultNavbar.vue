<script>
import DimiNavbar from '../../components/DimiNavbar.vue'

export default {
  name: 'DefaultNavbar',

  components: { DimiNavbar },

  methods: {
    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<template>
  <header>
    <dimi-navbar>
      <router-link
        slot="brand"
        :to="{ name: 'main' }"
        class="brand"
      >
        <span class="icon-dimigo"/>DIMIGOIN
      </router-link>
      <span slot="end">
        {{ $store.state.account.informations.name }}
        <a
          class="icon-logout logout-btn"
          title="로그아웃"
          @click="logout"/>
      </span>
    </dimi-navbar>
  </header>
</template>

<style lang="scss" scoped>
@import '../../scss/helpers/typography';

.brand {
  @extend %h-text-black;
  text-decoration: none;
}

.logout-btn {
  cursor: pointer;
}
</style>
