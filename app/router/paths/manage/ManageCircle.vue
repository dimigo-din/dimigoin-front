<script>
import ContentWrapper from '../../partial/ContentWrapper.vue'
import DefaultNavbar from '../../partial/DefaultNavbar.vue'
import DimiCard from '../../../components/DimiCard.vue'

export default {
  name: 'ManageCircle',

  components: { ContentWrapper, DefaultNavbar, DimiCard }
}
</script>

<template>
  <content-wrapper class="mng-circle">
    <h1 slot="header"><span class="icon-club"/>동아리 신청자 관리</h1>
    <dimi-card slot="main">
      <h2 class="mng-circle__title">Coin 신청자 관리</h2>
      <table>
        <tbody>
          <tr class="applicant-row">
            <td class="applicant-row__serial">{{ serial }}</td>
            <td class="applicant-row__name">{{ name }}</td>
            <td>
              <dimi-badge
                class="applicant-row__badge"
                @click="clickBadge"
              >{{ value }}</dimi-badge>
            </td>
          </tr>
        </tbody>
      </table>
    </dimi-card>
  </content-wrapper>
</template>

<style lang="scss" scoped>
.mng-circle {
  &__title {
    color: $gray-dark;
    font-size: 24px;
  }
}
</style>
