<script>
export default {
  name: 'DimiFooter'
}
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <p class="footer__copyright">© 2018 Team DIMIGOIN</p>
        <div class="footer__contact">
          <a
            class="footer__mail"
            href="mailto:contact@dimigo.in"
          >contact@dimigo.in</a>
          <a
            class="footer__facebook"
            href="https://fb.com/dimigoin"
          >fb.com/dimigoin</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  height: 8rem;

  &__wrapper {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__copyright {

  }
}
</style>
