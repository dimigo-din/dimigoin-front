<script>
import DimiFooter from '../../components/DimiFooter.vue'

export default {
  name: 'AwesomeFooter',
  components: { DimiFooter }
}
</script>

<template>
  <footer>
    <dimi-footer>
      <span slot="copyright">© 2018 Team DIMIGOIN</span>
      <span slot="mail"><span class="icon-email"/>contact@dimigo.in</span>
      <a
        slot="facebook"
        href="https://fb.com/dimigo.in"><span class="icon-facebook"/>fb.com/dimigo.in</a>
    </dimi-footer>
  </footer>
</template>

<style lang="scss">

</style>
