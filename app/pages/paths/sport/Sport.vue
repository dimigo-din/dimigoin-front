<script>
import SportBase from '@/components/SportBase.vue'
import DefaultNavbar from '@/components/DefaultNavbar.vue'
import { sportPublicService } from '@/src/api/sport'

export default {
  name: 'ManageSport',
  components: { SportBase, DefaultNavbar },

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
    matchs: []
  }),

  async created () {
    await this.update()
  },

  methods: {
    async update () {
      this.loading = true

      this.sports = await sportPublicService.getAllSports()
      this.events = await sportPublicService.getAllSportEvent()
      this.teams = await sportPublicService.getAllSportTeam()
      this.matchs = await sportPublicService.getAllSportMatch()

      this.loading = false
    }
  }
}
</script>

<template>
  <div class="container">
    <default-navbar />
    <sport-base
      :loading="loading"
      :sports="sports"
      :matchs="matchs"
    >
      <span slot="header">
        <span class="sport__header">
          <span class="icon-ball" />디미리그
        </span>
      </span>
    </sport-base>
  </div>
</template>
