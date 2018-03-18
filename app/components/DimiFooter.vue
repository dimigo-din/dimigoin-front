<script>
export default {
  name: 'DimiFooter'
}
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="footer__container">
        <span class="footer__copyright"><slot name="copyright"/></span>
        <div class="footer__contact">
          <span class="footer__mail"><slot name="mail"/></span>
          <span class="footer__facebook"><slot name="facebook"/></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  height: 8rem;

  &__container {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__copyright {
    // TODO
  }

  &__mail {
    // TODO
  }

  &__facebook {
    // TODO
  }
}
</style>
