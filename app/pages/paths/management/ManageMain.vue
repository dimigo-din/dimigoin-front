<script>
import { mapState } from '@/store/modules/account/helpers'
import DefaultNavbar from '@/components/DefaultNavbar.vue'

export default {
  name: 'ManageMain',
  components: { DefaultNavbar },
  computed: {
    ...mapState({
      managements: state => state.informations.permissions
    })
  },
  async created () {
    await this.$store.dispatch('account/fetchPermissions')
  },
  methods: {
    clickService (item) {
      this.$router.push(item.to)
    }
  }
}
</script>

<template>
  <div>
    <default-navbar />
    <div class="main container">
      <h1 class="main__title">
        관리
      </h1>
      <div class="main__cards">
        <dimi-card
          v-for="(item, index) in managements"
          ref="cards"
          :key="`manage-${index}`"
          class="main__card"
          shadow
          hover
          @click.native="clickService(item)"
        >
          <h3 class="main__card-title">
            {{ item.title }}
          </h3>
        </dimi-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  &__title {
    margin-top: 3rem;
    font-size: 2.5rem;
    font-weight: $font-weight-extra-bold;
  }

  &__cards {
    display: grid;
    margin-top: 2rem;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .main__card {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__card-title {
    display: inline;
    font-size: 1.5rem;
    font-weight: $font-weight-extra-bold;
    line-height: 1.3;
    text-align: center;
  }
}
</style>
