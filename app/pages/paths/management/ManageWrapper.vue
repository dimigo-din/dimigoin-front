<script>
import DefaultNavbar from '@/components/DefaultNavbar.vue'
import ServiceWrapper from '@/components/ServiceWrapper.vue'
import { permission } from '@/src/api/permission'
import services from './services'

export default {
  name: 'ManageWrapper',
  components: { DefaultNavbar, ServiceWrapper },
  data: () => ({
    managements: []
  }),
  computed: {
    computedManagements () {
      return this.managements.map(item => {
        return services[item.section]
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    permission.getPermissions().then(result => {
      next(vm => (vm.managements = result))
    })
  }
}
</script>

<template>
  <service-wrapper>
    <default-navbar slot="navbar" />
    <dimi-menu slot="menu">
      <dimi-menu-item
        v-for="(item, index) in computedManagements"
        :key="`menu-item-${index}`"
        :to="{ name: item.to }"
      >
        {{ item.title }}
      </dimi-menu-item>
    </dimi-menu>
  </service-wrapper>
</template>
