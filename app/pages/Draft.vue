<script>
export default {
  created () {
    this.$swal({
      type: 'error',
      title: '준비 중입니다!',
      text: '나중에 다시 찾아와주세요.',
      onClose: () => this.$router.back()
    })
  }
}
</script>

<template>
  <div class="draft"/>
</template>
