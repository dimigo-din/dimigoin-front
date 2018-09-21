<script>
export default {
  name: 'AwesomeFooter'
}
</script>

<template>
  <footer>
    <dimi-footer>
      <span slot="copyright">© 2018 Team DIMIGOIN</span>
      <a
        slot="mail"
        href="mailto:contact@dimigo.in">
      <span class="icon-email"/> contact@dimigo.in</a>

      <a
        slot="facebook"
        href="https://fb.com/isdimigoin">
      <span class="icon-facebook-sm"/> fb.com/isdimigoin</a>
    </dimi-footer>
  </footer>
</template>
