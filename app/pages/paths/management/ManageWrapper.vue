<script>
import DefaultNavbar from '@/components/DefaultNavbar.vue'
import ServiceWrapper from '@/components/ServiceWrapper.vue'
import { mapState } from '@/store/modules/account/helpers'

export default {
  name: 'ManageWrapper',
  components: { DefaultNavbar, ServiceWrapper },
  computed: {
    ...mapState({
      managements: state => state.informations.permissions
    })
  }
}
</script>

<template>
  <service-wrapper>
    <default-navbar slot="navbar" />
    <dimi-menu slot="menu">
      <dimi-menu-item
        v-for="(item, index) in managements"
        :key="`menu-item-${index}`"
        :to="{ name: item.to }"
      >
        {{ item.title }}
      </dimi-menu-item>
    </dimi-menu>
  </service-wrapper>
</template>
